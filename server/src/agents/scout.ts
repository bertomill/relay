import { query } from "@anthropic-ai/claude-agent-sdk";
import { Request, Response } from "express";
import { initSSE } from "./sse";

export const handleScout = async (req: Request, res: Response) => {
  const { message, sessionId } = req.body;

  if (!message) {
    res.status(400).json({ error: "Message is required" });
    return;
  }

  const sse = initSSE(res);
  const rawMessages: unknown[] = [];

  try {
    const options: Record<string, unknown> = {
      allowedTools: ["WebSearch", "WebFetch", "AskUserQuestion", "Task"],
      permissionMode: "bypassPermissions",
      agents: {
        "web-researcher": {
          description:
            "Deep web research agent that thoroughly investigates a specific subtopic using multiple sources",
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
          description:
            "Verification agent that cross-references claims against multiple sources",
          prompt: `You are a meticulous fact-checking agent. When given claims or findings:
- Cross-reference each major claim against at least 2 independent sources
- Flag any claims that cannot be verified or have conflicting evidence
- Rate confidence level (high/medium/low) for each claim
- Note the recency and reliability of sources
- Identify any potential biases in the sources
Be skeptical and thorough. Accuracy is more important than speed.`,
          tools: ["WebSearch", "WebFetch"],
        },
        synthesizer: {
          description:
            "Synthesis agent that combines research findings into a structured, sourced report",
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
          } else if (
            block.type === "tool_use" &&
            block.name === "AskUserQuestion"
          ) {
            sse.send({
              type: "ask_user_question",
              toolUseId: block.id,
              questions: block.input?.questions || [],
              rawMessage: msg,
            });
          } else if (block.type === "tool_use" && block.name === "Task") {
            sse.send({
              type: "subagent_start",
              agentType: block.input?.subagent_type || "unknown",
              description:
                block.input?.description || "Researching...",
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
    console.error("Scout agent error:", error);
    sse.send({
      type: "error",
      error: "An error occurred",
      rawError: String(error),
    });
    res.end();
  }
};
