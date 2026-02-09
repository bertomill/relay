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

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const rawMessages: unknown[] = [];

      try {
        const options: Record<string, unknown> = {
          allowedTools: [
            "Skill",
            "WebSearch",
            "WebFetch",
          ],
          permissionMode: "bypassPermissions",
          settingSources: ["project"],
          cwd: process.cwd(),
          systemPrompt: `You are the Lighten AI LinkedIn Outreach Agent, a specialized agent that helps Berto craft personalized, authentic LinkedIn messages.

IMPORTANT: When asked to draft an outreach message, ALWAYS invoke the linkedin-outreach Skill first to load the full outreach guidelines, message frameworks, and anti-patterns.

## What you do:
- Draft personalized LinkedIn connection request notes, first DMs, follow-ups, and re-engagement messages
- Research the contact using WebSearch/WebFetch when a LinkedIn URL or company name is provided
- Ask clarifying questions about the relationship, goal, and tone before drafting
- Review drafts against anti-patterns and LinkedIn best practices
- Iterate on drafts based on user feedback

## Workflow:

1. **Load guidelines**: Invoke the linkedin-outreach Skill to load outreach best practices
2. **Clarify**: Ask the user directly in your message (NOT via AskUserQuestion tool) about:
   - What type of message (connection request, first DM, follow-up, re-engagement)?
   - What's the goal (start a conversation, book a meeting, share something)?
   - What's the relationship context (how do you know them, what do you have in common)?
   Keep clarifying questions short and conversational. If the user already provided enough context, skip straight to drafting.
3. **Research**: If a LinkedIn URL, company name, or person name is provided, use WebSearch to learn about them (recent posts, company news, background)
4. **Draft**: Write 1-2 message options following the skill guidelines
5. **Self-review**: Check against anti-patterns (no em dashes, no cliches, no pitchy language, respect character limits)
6. **Present**: Show the draft(s) with brief reasoning for the approach

## Key rules:
- NEVER use em dashes in messages (this is the #1 AI tell)
- Keep connection request notes under 300 characters
- Keep first DMs under 500 characters
- Lead with genuine curiosity, never with a pitch
- Sound human, not like a LinkedIn bot
- End with a soft, low-pressure question
- Ask clarifying questions as plain text in the chat (this is a multi-turn conversation)

## Tools:
- Skill: Load the linkedin-outreach skill for guidelines and frameworks
- WebSearch / WebFetch: Research the contact, their company, recent activity

Keep responses well-structured. When presenting drafts, show just the message text ready to copy.`,
        };

        if (sessionId) {
          options.resume = sessionId;
        }

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

        for await (const msg of query({
          prompt: message,
          options,
        })) {
          rawMessages.push(msg);

          if (
            msg.type === "system" &&
            msg.subtype === "init" &&
            msg.session_id
          ) {
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({
                  type: "session",
                  sessionId: msg.session_id,
                })}\n\n`
              )
            );
          }

          if (msg.type === "assistant" && msg.message?.content) {
            for (const block of msg.message.content) {
              if (block.type === "text") {
                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify({
                      type: "text",
                      text: block.text,
                      rawMessage: msg,
                    })}\n\n`
                  )
                );
              } else if (block.type === "tool_use") {
                if (block.name === "Task") {
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({
                        type: "subagent_start",
                        agentType: block.input?.subagent_type || "unknown",
                        description: block.input?.description || "Working...",
                        rawMessage: msg,
                      })}\n\n`
                    )
                  );
                }

                // Emit status updates for tool use
                const statusMap: Record<string, string> = {
                  Skill: "Loading outreach guidelines...",
                  WebSearch: "Researching this person...",
                  WebFetch: "Reading their profile...",
                  AskUserQuestion: "Preparing questions...",
                };
                const status = statusMap[block.name as string];
                if (status) {
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({
                        type: "status",
                        status,
                      })}\n\n`
                    )
                  );
                }
              }
            }
          } else {
            // Emit "Thinking..." when the agent receives tool results and is about to reason
            if (msg.type === "result") {
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({
                    type: "status",
                    status: "Thinking...",
                  })}\n\n`
                )
              );
            }

            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({
                  type: "raw",
                  rawMessage: msg,
                })}\n\n`
              )
            );
          }
        }

        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              type: "complete",
              allRawMessages: rawMessages,
            })}\n\n`
          )
        );

        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (error) {
        console.error("Outreach agent error:", error);
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              type: "error",
              error: "An error occurred",
              rawError: String(error),
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
