import { query } from "@anthropic-ai/claude-agent-sdk";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { message, sessionId } = await request.json();

  if (!message) {
    return new Response(JSON.stringify({ error: "Message is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Create a streaming response
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const rawMessages: unknown[] = [];

      try {
        // Build options - include resume if we have a sessionId
        const options: Record<string, unknown> = {
          allowedTools: ["Read", "Glob", "Grep", "WebSearch", "WebFetch", "AskUserQuestion", "Task"],
          permissionMode: "bypassPermissions",
          agents: {
            "code-reviewer": {
              description: "Expert code reviewer that analyzes code quality, patterns, and potential issues",
              prompt: `You are an expert code reviewer. Analyze the code thoroughly for:
- Code quality and best practices
- Potential bugs or edge cases
- Security vulnerabilities
- Performance issues
- Readability and maintainability
Provide specific, actionable feedback with file and line references.`,
              tools: ["Read", "Glob", "Grep"],
            },
            "researcher": {
              description: "Deep research agent that thoroughly investigates topics using web search",
              prompt: `You are a thorough research agent. When given a topic:
- Search for multiple authoritative sources
- Compare different perspectives and approaches
- Synthesize findings into a clear summary
- Include relevant links and references
Be comprehensive but organized in your research.`,
              tools: ["WebSearch", "WebFetch"],
            },
            "explainer": {
              description: "Patient teacher that breaks down complex code or concepts into understandable pieces",
              prompt: `You are a patient and clear teacher. When explaining code or concepts:
- Start with a high-level overview
- Break down complex parts step by step
- Use analogies and examples where helpful
- Anticipate and address common points of confusion
Make technical concepts accessible without oversimplifying.`,
              tools: ["Read", "Glob", "Grep"],
            },
            "architect": {
              description: "System architect that analyzes codebase structure and suggests improvements",
              prompt: `You are a senior software architect. Analyze codebases for:
- Overall architecture and design patterns
- Module organization and dependencies
- Scalability considerations
- Technical debt and refactoring opportunities
Provide strategic recommendations with clear reasoning.`,
              tools: ["Read", "Glob", "Grep"],
            },
          },
          systemPrompt: `You are Ray, a helpful AI assistant created by Relay.
You are friendly, concise, and helpful.
You help users with questions about AI agents, coding, and general tasks.
Keep your responses clear and to the point.

You have access to these tools:

Codebase tools (read-only):
- Read: View file contents
- Glob: Find files by pattern (e.g., **/*.ts, src/**/*.tsx)
- Grep: Search file contents with regex

Web tools:
- WebSearch: Search the web for current information, documentation, tutorials
- WebFetch: Fetch and parse content from a specific URL

Interactive tools:
- AskUserQuestion: Ask the user clarifying questions with multiple choice options when you need more information. ALWAYS use this tool (don't just type questions) when you need clarification. The user will see clickable buttons.

Subagents (use Task tool to delegate):
- code-reviewer: Delegate thorough code reviews and quality analysis
- researcher: Delegate deep research on topics requiring multiple sources
- explainer: Delegate detailed explanations of complex code or concepts
- architect: Delegate architectural analysis and system design review

When to use subagents:
- For tasks requiring deep, focused analysis (code review, research)
- When the task would benefit from specialized expertise
- For comprehensive work that goes beyond a quick answer

Use the Task tool to spawn a subagent with a clear prompt describing what you need.

Use these tools to help users understand code, find files, look up documentation, and answer questions. When a request is ambiguous, ALWAYS use the AskUserQuestion tool to clarify - never just type out questions in plain text.`,
        };

        // Resume session if sessionId provided
        if (sessionId) {
          options.resume = sessionId;
        }

        // Send the raw input first
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({
            type: "input",
            rawInput: { prompt: message, options: { ...options, systemPrompt: "..." } }
          })}\n\n`)
        );

        // Use the Claude Agent SDK query function
        for await (const msg of query({
          prompt: message,
          options,
        })) {
          // Collect raw messages for debugging
          rawMessages.push(msg);

          // Capture session ID from system init message
          if (msg.type === "system" && msg.subtype === "init" && msg.session_id) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({
                type: "session",
                sessionId: msg.session_id
              })}\n\n`)
            );
          }

          // Send each message as a server-sent event
          if (msg.type === "assistant" && msg.message?.content) {
            for (const block of msg.message.content) {
              if (block.type === "text") {
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({
                    type: "text",
                    text: block.text,
                    rawMessage: msg
                  })}\n\n`)
                );
              } else if (block.type === "tool_use" && block.name === "AskUserQuestion") {
                // Send AskUserQuestion as a special event for the frontend to render
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({
                    type: "ask_user_question",
                    toolUseId: block.id,
                    questions: block.input?.questions || [],
                    rawMessage: msg
                  })}\n\n`)
                );
              } else if (block.type === "tool_use" && block.name === "Task") {
                // Send Task tool usage as a subagent event
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({
                    type: "subagent_start",
                    agentType: block.input?.subagent_type || "unknown",
                    description: block.input?.description || "Working...",
                    rawMessage: msg
                  })}\n\n`)
                );
              }
            }
          } else {
            // Send other message types as raw data
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({
                type: "raw",
                rawMessage: msg
              })}\n\n`)
            );
          }
        }

        // Send all raw messages at the end
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({
            type: "complete",
            allRawMessages: rawMessages
          })}\n\n`)
        );

        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (error) {
        console.error("Agent error:", error);
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              type: "error",
              error: "An error occurred",
              rawError: String(error)
            })}\n\n`
          )
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
