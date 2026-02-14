/**
 * Shared sandbox helper for running Agent SDK queries inside E2B sandboxes.
 *
 * Each agent route calls runAgentInSandbox() with its specific options.
 * This function:
 *   1. Creates an E2B sandbox from a pre-built template
 *   2. Writes config.json with message + options + API key
 *   3. Runs runner.mjs
 *   4. Returns a ReadableStream that pipes the runner's stdout as SSE
 *   5. Kills the sandbox when done
 *
 * Because each sandbox is ephemeral, we can't use the SDK's `resume` feature.
 * Instead, conversation history is passed as context in the system prompt so
 * each invocation has full continuity.
 */

import { Sandbox } from "e2b";

const TEMPLATE_ID = process.env.E2B_TEMPLATE_ID?.trim() || "z3edal2dwyq0rp4yuhov";

export interface AgentOptions {
  allowedTools?: string[];
  permissionMode?: string;
  systemPrompt?: string;
  agents?: Record<string, unknown>;
  settingSources?: string[];
  cwd?: string;
  /** Files to write into the sandbox before running (path relative to /home/user → content) */
  sandboxFiles?: Record<string, string>;
  [key: string]: unknown;
}

export interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * Builds a prompt that includes conversation history for multi-turn continuity.
 * The history is prepended to the system prompt so the agent sees the full context.
 */
function buildPromptWithHistory(
  message: string,
  history: ConversationMessage[],
  systemPrompt: string
): { prompt: string; systemPrompt: string } {
  if (history.length === 0) {
    return { prompt: message, systemPrompt };
  }

  // Build conversation transcript to inject into system prompt
  const transcript = history
    .map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
    .join("\n\n");

  const augmentedSystemPrompt = `${systemPrompt}

## CRITICAL: Conversation History
You are CONTINUING an existing conversation. The transcript below shows what has already been said. You MUST:
- Continue naturally from exactly where the conversation left off
- Do NOT repeat any content you already said
- Do NOT re-run your initial workflow (no re-researching, no re-introducing yourself)
- Do NOT use tools unless the user's new message specifically requires new information
- Respond DIRECTLY to the user's latest message in context of the conversation

<conversation_history>
${transcript}
</conversation_history>`;

  return { prompt: message, systemPrompt: augmentedSystemPrompt };
}

export async function runAgentInSandbox(
  message: string,
  history: ConversationMessage[],
  agentOptions: AgentOptions
): Promise<ReadableStream> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not set");
  }

  // Build prompt with conversation history for multi-turn continuity
  const { prompt, systemPrompt } = buildPromptWithHistory(
    message,
    history,
    (agentOptions.systemPrompt as string) || ""
  );

  // Build the full options object (no `resume` — sandboxes are ephemeral)
  const options: Record<string, unknown> = {
    ...agentOptions,
    systemPrompt,
  };

  // Create E2B sandbox from template
  const sandbox = await Sandbox.create(TEMPLATE_ID, {
    timeoutMs: 600_000, // 10 minutes
  });

  // Write extra files into the sandbox (e.g. skill files)
  const sandboxFiles = agentOptions.sandboxFiles as Record<string, string> | undefined;
  if (sandboxFiles) {
    for (const [filePath, content] of Object.entries(sandboxFiles)) {
      await sandbox.files.write(`/home/user/${filePath}`, content);
    }
    // Don't pass sandboxFiles to the runner — they're a sandbox-only concern
    delete options.sandboxFiles;
  }

  // Write config for the runner (runner.mjs is already in the template)
  const config = JSON.stringify({ message: prompt, options, apiKey });
  await sandbox.files.write("/home/user/config.json", config);

  const encoder = new TextEncoder();

  // Return a ReadableStream that pipes command output as SSE
  return new ReadableStream({
    async start(controller) {
      try {
        // Send input event
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              type: "input",
              rawInput: {
                prompt: message,
                options: { ...options, systemPrompt: "..." },
              },
            })}\n\n`
          )
        );

        // Run the runner and stream stdout
        const result = await sandbox.commands.run("node runner.mjs", {
          cwd: "/home/user",
          envs: {
            ANTHROPIC_API_KEY: apiKey,
            FAL_KEY: process.env.FAL_KEY || "",
            NODE_OPTIONS: "--max-old-space-size=512",
          },
          timeoutMs: 0, // no command timeout (sandbox timeout governs)
          onStdout: (data) => {
            controller.enqueue(encoder.encode(data));
          },
        });

        // Check exit code for errors
        if (result.exitCode !== 0) {
          console.error("[sandbox] Runner failed:", result.stderr);
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "error", error: "Runner failed", rawError: result.stderr })}\n\n`
            )
          );
        }

        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (error) {
        console.error("Sandbox stream error:", error);
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              type: "error",
              error: "Sandbox execution failed",
              rawError: String(error),
            })}\n\n`
          )
        );
        controller.close();
      } finally {
        try {
          await sandbox.kill();
        } catch {
          // Sandbox may already be stopped
        }
      }
    },
  });
}
