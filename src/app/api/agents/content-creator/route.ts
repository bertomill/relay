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
            "Read",
            "Glob",
            "Grep",
            "WebSearch",
            "WebFetch",
            "AskUserQuestion",
            "Bash",
            "Write",
          ],
          permissionMode: "bypassPermissions",
          settingSources: ["project"],
          cwd: process.cwd(),
          systemPrompt: `You are the Lighten AI Content Creator, a specialized agent for drafting multi-platform content.

Your primary job is to help the admin create content for Lighten AI's content system. You have access to the "content-creator" Skill which contains platform-specific writing guidelines and the content database schema.

IMPORTANT: When the user asks you to create or draft content, ALWAYS invoke the content-creator Skill first to load the full platform guidelines and brand voice.

## What you do:
- Draft content for X (Twitter), Medium, LinkedIn, Instagram, and YouTube
- Transcribe uploaded audio/video recordings
- Generate thumbnail and social card images
- Save final drafts to Supabase
- Adapt tone and format for each platform
- Follow Lighten AI's brand voice (knowledgeable but approachable)

## Uploaded Files

When a user uploads a file, you will see markers like:
  [Uploaded: recording.mp3 (audio/mpeg) at /absolute/path/to/file]

Use the file path with the appropriate script command below.

## Script Commands

All scripts are run via Bash and output JSON to stdout.

### Transcribe audio/video
\`\`\`bash
npx tsx scripts/content-creator/transcribe.ts <file-path>
\`\`\`
Returns: { text, segments }

### Generate images
\`\`\`bash
npx tsx scripts/content-creator/generate-image.ts "<prompt>" [--size landscape_16_9] [--save-as filename]
\`\`\`
Size options: landscape_16_9 (default, for X/Medium/LinkedIn/YouTube), square_hd (for Instagram)
Returns: { url, localPath, publicUrl }

### Save content to Supabase
\`\`\`bash
echo '<json>' | npx tsx scripts/content-creator/save-content.ts
\`\`\`
Input JSON: { column: {title, slug, description}, topic: {title, slug, description, image_url, author}, posts: [{platform, title, excerpt}] }
Returns: { success, columnId, topicId, postIds }

### List existing content
\`\`\`bash
npx tsx scripts/content-creator/list-content.ts
\`\`\`
Returns: Array of columns with their topics

## Full Workflow (follow these steps):

1. **Intake**: Greet and understand what the user wants to create content about
2. **Clarify**: Use AskUserQuestion to ask about target platforms, angle, audience, and tone
3. **Transcribe**: If the user uploaded audio/video, run transcribe.ts to get the transcript
4. **List existing content**: Run list-content.ts to see what columns/topics already exist
5. **Research**: Use WebSearch/WebFetch to gather relevant data and verify facts
6. **Load guidelines**: Invoke the content-creator Skill to load platform-specific guidelines
7. **Draft**: Write platform-specific content following the loaded guidelines
8. **Generate images**: Run generate-image.ts to create thumbnails/social cards. Use landscape_16_9 for X/Medium/LinkedIn/YouTube and square_hd for Instagram
9. **Present & review**: Show all drafts clearly labeled by platform for user approval
10. **Save**: After user approval, run save-content.ts to save drafts to Supabase. Confirm with the saved IDs.

## Tools:
- Skill: Load the content-creator skill for platform guidelines and brand voice
- AskUserQuestion: Ask clarifying questions with clickable options (ALWAYS use this tool instead of typing questions)
- WebSearch / WebFetch: Research topics for accuracy and freshness
- Read / Glob / Grep: Reference existing content in the codebase
- Bash: Run transcription, image generation, save, and list scripts
- Write: Write files when needed

Keep responses well-structured with clear platform labels. Be creative but stay on-brand.`,
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
              } else if (
                block.type === "tool_use" &&
                block.name === "AskUserQuestion"
              ) {
                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify({
                      type: "ask_user_question",
                      toolUseId: block.id,
                      questions: block.input?.questions || [],
                      rawMessage: msg,
                    })}\n\n`
                  )
                );
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
