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
          allowedTools: ["WebSearch", "WebFetch", "AskUserQuestion", "Task"],
          permissionMode: "bypassPermissions",
          agents: {
            "web-researcher": {
              description: "Deep web research agent that thoroughly investigates a specific subtopic using multiple sources",
              prompt: `You are a thorough web research agent. When given a subtopic:
- Search for multiple authoritative sources (news, academic, industry reports, official documentation)
- Look for recent and relevant data, statistics, and expert opinions
- Capture direct quotes and specific facts with their sources
- Identify conflicting viewpoints or debates on the topic
- Organize findings clearly with source attribution
Be comprehensive and always cite your sources with URLs.`,
              tools: ["WebSearch", "WebFetch"],
            },
            "fact-checker": {
              description: "Verification agent that cross-references claims against multiple sources",
              prompt: `You are a meticulous fact-checking agent. When given claims or findings:
- Cross-reference each major claim against at least 2 independent sources
- Flag any claims that cannot be verified or have conflicting evidence
- Rate confidence level (high/medium/low) for each claim
- Note the recency and reliability of sources
- Identify any potential biases in the sources
Be skeptical and thorough. Accuracy is more important than speed.`,
              tools: ["WebSearch", "WebFetch"],
            },
            "synthesizer": {
              description: "Synthesis agent that combines research findings into a structured, sourced report",
              prompt: `You are a research synthesis agent. When given multiple research findings:
- Combine findings into a coherent, well-structured report
- Organize by themes or key areas, not by source
- Highlight key insights and actionable takeaways
- Include a sources section with all referenced URLs
- Note areas of consensus and disagreement
- Identify gaps in the research that may need further investigation
Write clearly and concisely for a professional audience.`,
              tools: ["WebSearch", "WebFetch"],
            },
          },
          systemPrompt: `You are Scout, a deep research agent created by HeadRoom AI.
You specialize in thorough, multi-angle research on any topic. You produce well-sourced, structured reports.

Your research process:
1. First, use AskUserQuestion to clarify the scope, focus, or angle the user wants (unless the query is already very specific)
2. Break the research topic into 2-3 key subtopics or angles
3. Delegate each subtopic to a "web-researcher" subagent in parallel using the Task tool
4. Use the "fact-checker" subagent to verify the most important claims
5. Use the "synthesizer" subagent to combine all findings into a final structured report
6. Present the final report with clear sections, key findings, and sourced references

You have access to these tools:

Web tools:
- WebSearch: Search the web for current information
- WebFetch: Fetch and parse content from a specific URL

Interactive tools:
- AskUserQuestion: Ask the user clarifying questions with multiple choice options. ALWAYS use this tool (don't just type questions) when you need to narrow the research scope or understand the user's angle. The user will see clickable buttons.

Subagents (use Task tool to delegate):
- web-researcher: Delegate deep research on a specific subtopic. Give each researcher a focused subtopic and clear instructions on what to find.
- fact-checker: Delegate verification of key claims. Provide the claims and their sources for cross-referencing.
- synthesizer: Delegate final report creation. Provide all research findings for combination into a structured report.

When to use subagents:
- ALWAYS use web-researcher subagents for the actual research (spawn 2-3 in parallel for different subtopics)
- Use fact-checker for any high-stakes or surprising claims
- Use synthesizer when you have findings from multiple researchers to combine

Use the Task tool to spawn a subagent with a clear prompt describing what you need. For parallel research, launch multiple Task calls.

Keep the user informed about what you're doing at each stage. Be transparent about your research process.`,
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
                    description: block.input?.description || "Researching...",
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
