import { query } from "@anthropic-ai/claude-agent-sdk";
import { Request, Response } from "express";
import { initSSE } from "./sse";

export const handleOutreach = async (req: Request, res: Response) => {
  const { message, sessionId } = req.body;

  if (!message) {
    res.status(400).json({ error: "Message is required" });
    return;
  }

  const sse = initSSE(res);
  const rawMessages: unknown[] = [];

  try {
    const options: Record<string, unknown> = {
      allowedTools: ["Skill", "WebSearch", "WebFetch"],
      permissionMode: "bypassPermissions",
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

    sse.send({
      type: "input",
      rawInput: {
        prompt: message,
        options: { ...options, systemPrompt: "..." },
      },
    });

    for await (const msg of query({ prompt: message, options })) {
      rawMessages.push(msg);

      if (
        (msg as any).type === "system" &&
        (msg as any).subtype === "init" &&
        (msg as any).session_id
      ) {
        sse.send({ type: "session", sessionId: (msg as any).session_id });
      }

      if (
        (msg as any).type === "assistant" &&
        (msg as any).message?.content
      ) {
        for (const block of (msg as any).message.content) {
          if (block.type === "text") {
            sse.send({ type: "text", text: block.text, rawMessage: msg });
          } else if (block.type === "tool_use") {
            if (block.name === "Task") {
              sse.send({
                type: "subagent_start",
                agentType: block.input?.subagent_type || "unknown",
                description: block.input?.description || "Working...",
                rawMessage: msg,
              });
            }

            const statusMap: Record<string, string> = {
              Skill: "Loading outreach guidelines...",
              WebSearch: "Researching this person...",
              WebFetch: "Reading their profile...",
              AskUserQuestion: "Preparing questions...",
            };
            const status = statusMap[block.name as string];
            if (status) {
              sse.send({ type: "status", status });
            }
          }
        }
      } else {
        if ((msg as any).type === "result") {
          sse.send({ type: "status", status: "Thinking..." });
        }
        sse.send({ type: "raw", rawMessage: msg });
      }
    }

    sse.send({ type: "complete", allRawMessages: rawMessages });
    sse.done();
  } catch (error) {
    console.error("Outreach agent error:", error);
    sse.send({
      type: "error",
      error: "An error occurred",
      rawError: String(error),
    });
    res.end();
  }
};
