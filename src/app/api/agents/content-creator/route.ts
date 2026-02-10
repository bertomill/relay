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
          settingSources: ["project"],
          cwd: process.cwd(),
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
3. **Then generate an image.** Run generate-image.ts to create a thumbnail. Pick a descriptive visual prompt that matches the post topic (no text in images). Display the image inline.
4. **Then offer X cross-post.** After the image, ask: "Want me to draft an X post to promote this?" If they say yes, draft a punchy tweet or short thread that teases the article. Output it clean and copy-paste-ready.
5. **Transcribe if uploaded.** If the user uploaded audio/video, run transcribe.ts first, then draft from the transcript.

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

## Script Commands (use only when needed)

### Transcribe audio/video
\`\`\`bash
npx tsx scripts/content-creator/transcribe.ts <file-path>
\`\`\`

### Generate images (auto-generate after every draft)
\`\`\`bash
npx tsx scripts/content-creator/generate-image.ts "<prompt>" [--size landscape_16_9] [--save-as filename]
\`\`\`
After generating, display inline: ![Generated thumbnail](publicUrl)
Use landscape_16_9 for LinkedIn/X/Medium/YouTube, square_hd for Instagram.

### Save content to Supabase (only after user says to save)
\`\`\`bash
echo '<json>' | npx tsx scripts/content-creator/save-content.ts
\`\`\`
JSON format: { column: {title, slug, description}, topic: {title, slug, description, image_url, author}, posts: [{platform, title, excerpt}] }

### List existing content
\`\`\`bash
npx tsx scripts/content-creator/list-content.ts
\`\`\`

## Key rules
- NEVER use AskUserQuestion — it does not work in this context
- ALWAYS research before drafting. 1-2 targeted web searches. Real data makes the content worth reading.
- Output ONLY the post content. No meta-commentary, no "here's your draft", no options menu. The user will copy-paste your output directly into LinkedIn/Medium
- After the draft, ALWAYS generate a thumbnail image automatically
- When the user asks for changes, output the FULL revised post (not just the diff)`,
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
            // Skip entire message if we've already processed this message ID
            const msgId = msg.message?.id;
            if (msgId && seenMsgIds.has(msgId)) {
              continue;
            }
            if (msgId) seenMsgIds.add(msgId);

            for (const block of msg.message.content) {
              if (block.type === "text") {
                let textToSend = block.text;

                // Deduplicate: the agent often repeats earlier output across turns
                if (allSentText.length > 0 && textToSend.startsWith(allSentText)) {
                  // New text contains all previous text as prefix — only send the delta
                  textToSend = textToSend.slice(allSentText.length);
                } else if (allSentText.length > 0 && allSentText.endsWith(textToSend)) {
                  // New text is a suffix of what we already sent — skip entirely
                  textToSend = "";
                } else if (allSentText.length > 0 && allSentText.includes(textToSend) && textToSend.length > 50) {
                  // Entire text block is a substring of what we already sent — skip
                  textToSend = "";
                } else if (allSentText.length > 0 && textToSend.length > 100) {
                  // Check for partial overlap: does sentText end with the beginning of newText?
                  // Only check last 500 chars to keep this fast
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
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({
                        type: "text",
                        text: textToSend,
                        rawMessage: msg,
                      })}\n\n`
                    )
                  );
                }
              } else if (
                block.type === "tool_use" &&
                block.name === "Task"
              ) {
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
            }
          } else {
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
        console.error("Content creator agent error:", error);
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
