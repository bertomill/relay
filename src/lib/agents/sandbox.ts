/**
 * Shared sandbox helper for running Agent SDK queries inside Vercel Sandbox.
 *
 * Each agent route calls runAgentInSandbox() with its specific options.
 * This function:
 *   1. Creates a sandbox from a pre-built snapshot
 *   2. Writes config.json with message + options + API key
 *   3. Runs runner.mjs (detached)
 *   4. Returns a ReadableStream that pipes the runner's stdout as SSE
 *   5. Stops the sandbox when done
 *
 * Because each sandbox is ephemeral, we can't use the SDK's `resume` feature.
 * Instead, conversation history is passed as context in the system prompt so
 * each invocation has full continuity.
 */

import { Sandbox } from "@vercel/sandbox";

const SNAPSHOT_ID = process.env.AGENT_SANDBOX_SNAPSHOT_ID?.trim();

export interface AgentOptions {
  allowedTools?: string[];
  permissionMode?: string;
  systemPrompt?: string;
  agents?: Record<string, unknown>;
  settingSources?: string[];
  cwd?: string;
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
  if (!SNAPSHOT_ID) {
    throw new Error(
      "AGENT_SANDBOX_SNAPSHOT_ID is not set. Run: npx tsx scripts/create-agent-snapshot.ts"
    );
  }

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

  // Create sandbox from snapshot
  const sandbox = await Sandbox.create({
    source: { type: "snapshot", snapshotId: SNAPSHOT_ID },
    timeout: 300_000, // 5 minutes
  });

  // Write config for the runner (runner.mjs is already in the snapshot)
  const config = JSON.stringify({ message: prompt, options, apiKey });
  await sandbox.writeFiles([
    { path: "config.json", content: Buffer.from(config) },
  ]);

  // Run the runner detached so we can stream logs
  const command = await sandbox.runCommand({
    cmd: "node",
    args: ["runner.mjs"],
    detached: true,
    env: {
      ANTHROPIC_API_KEY: apiKey,
      FAL_KEY: process.env.FAL_KEY || "",
      NODE_OPTIONS: "--max-old-space-size=512",
    },
  });

  const encoder = new TextEncoder();

  // Return a ReadableStream that pipes command logs as SSE
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

        // Stream logs from the sandbox runner
        for await (const log of command.logs()) {
          if (log.stream === "stdout") {
            controller.enqueue(encoder.encode(log.data));
          }
        }

        // Check exit code for errors
        const result = await command.wait();
        if (result.exitCode !== 0) {
          const stderr = await result.stderr();
          console.error("[sandbox] Runner failed:", stderr);
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "error", error: "Runner failed", rawError: stderr })}\n\n`
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
          await sandbox.stop();
        } catch {
          // Sandbox may already be stopped
        }
      }
    },
  });
}
