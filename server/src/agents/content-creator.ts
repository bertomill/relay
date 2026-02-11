import { query } from "@anthropic-ai/claude-agent-sdk";
import { Request, Response } from "express";
import { initSSE } from "./sse";

export const handleContentCreator = async (req: Request, res: Response) => {
  const { message, sessionId } = req.body;

  if (!message) {
    res.status(400).json({ error: "Message is required" });
    return;
  }

  const sse = initSSE(res);
  const rawMessages: unknown[] = [];
  const seenMsgIds = new Set<string>();
  let allSentText = "";

  try {
    const options: Record<string, unknown> = {
      allowedTools: [
        "Read",
        "Glob",
        "Grep",
        "WebSearch",
        "WebFetch",
        "Bash",
        "Write",
      ],
      permissionMode: "bypassPermissions",
      systemPrompt: `You are the Lighten AI Content Creator. Your job is to draft content quickly and well.

## CRITICAL: The user's first message already contains everything you need

The admin dashboard pre-loads context into the starter prompt:
- **Platform** (LinkedIn, X, or both) — already specified
- **Target audience** (e.g. "Shopify merchants") — already specified if set
- **Topic/idea** and optional context — already specified

DO NOT ask clarifying questions about platform, audience, or topic. This information is in the message. Go straight to drafting.

## Workflow

1. **Research first.** ALWAYS run 1-2 WebSearch queries before drafting. Find recent stats, trends, data points, or real examples related to the topic and audience. This makes the content credible and valuable, not generic. Search for things like "[topic] statistics 2025 2026", "[topic] [audience] trends", or "[topic] case study results".
2. **Then draft.** Weave the research into your post naturally (cite specific numbers, name real companies/tools, reference real trends). Output ONLY the post content. No preamble like "Here's your draft:", no options menu, no "Want me to refine?" footer. Just clean, copy-paste-ready text.
3. **Then offer X cross-post.** After the draft, ask: "Want me to draft an X post to promote this?" If they say yes, draft a punchy tweet or short thread that teases the article. Output it clean and copy-paste-ready.

## Platform Guidelines

### LinkedIn
Professional tone. Hook opener, business value focus, thought leadership angle. 200-500 words. End with a question or CTA. Short paragraphs. Bold key phrases for skimmability.

### X (Twitter)
Punchy thread-style. Hook in first line. Short paragraphs. Use line breaks. No hashtags unless asked. Max ~280 chars per tweet in a thread. Mark tweet breaks with ---.

## Brand Voice
- **Tone**: Knowledgeable but approachable. Not corporate-speak.
- **Audience**: Business owners and operators exploring AI automation
- **Key themes**: AI making work lighter, practical automation, demystifying AI
- **Brand name**: "Lighten AI" (always capitalize both words)
- **Avoid**: Hype, buzzwords, overpromising, "revolutionary", "game-changing"
- **NEVER use em dashes (—).** Use commas, periods, colons, or parentheses instead.

## Key rules
- NEVER use AskUserQuestion — it does not work in this context
- ALWAYS research before drafting. 1-2 targeted web searches. Real data makes the content worth reading.
- Output ONLY the post content. No meta-commentary, no "here's your draft", no options menu. The user will copy-paste your output directly into LinkedIn/Medium
- When the user asks for changes, output the FULL revised post (not just the diff)`,
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
        const msgId = (msg as any).message?.id;
        if (msgId && seenMsgIds.has(msgId)) {
          continue;
        }
        if (msgId) seenMsgIds.add(msgId);

        for (const block of (msg as any).message.content) {
          if (block.type === "text") {
            let textToSend = block.text;

            // Deduplicate: the agent often repeats earlier output across turns
            if (
              allSentText.length > 0 &&
              textToSend.startsWith(allSentText)
            ) {
              textToSend = textToSend.slice(allSentText.length);
            } else if (
              allSentText.length > 0 &&
              allSentText.endsWith(textToSend)
            ) {
              textToSend = "";
            } else if (
              allSentText.length > 0 &&
              allSentText.includes(textToSend) &&
              textToSend.length > 50
            ) {
              textToSend = "";
            } else if (allSentText.length > 0 && textToSend.length > 100) {
              const tail = allSentText.slice(-500);
              const maxCheck = Math.min(tail.length, textToSend.length);
              let overlap = 0;
              for (let i = 1; i <= maxCheck; i++) {
                if (tail.slice(-i) === textToSend.slice(0, i)) {
                  overlap = i;
                }
              }
              if (overlap > 50) {
                textToSend = textToSend.slice(overlap);
              }
            }

            if (textToSend) {
              allSentText += textToSend;
              sse.send({
                type: "text",
                text: textToSend,
                rawMessage: msg,
              });
            }
          } else if (block.type === "tool_use" && block.name === "Task") {
            sse.send({
              type: "subagent_start",
              agentType: block.input?.subagent_type || "unknown",
              description: block.input?.description || "Working...",
              rawMessage: msg,
            });
          }
        }
      } else {
        sse.send({ type: "raw", rawMessage: msg });
      }
    }

    sse.send({ type: "complete", allRawMessages: rawMessages });
    sse.done();
  } catch (error) {
    console.error("Content creator agent error:", error);
    sse.send({
      type: "error",
      error: "An error occurred",
      rawError: String(error),
    });
    res.end();
  }
};
