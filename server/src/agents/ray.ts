import { query } from "@anthropic-ai/claude-agent-sdk";
import { Request, Response } from "express";
import { initSSE } from "./sse";

export const handleRay = async (req: Request, res: Response) => {
  const { message, sessionId } = req.body;

  if (!message) {
    res.status(400).json({ error: "Message is required" });
    return;
  }

  const sse = initSSE(res);
  const rawMessages: unknown[] = [];

  try {
    const options: Record<string, unknown> = {
      allowedTools: [
        "Read",
        "Glob",
        "Grep",
        "WebSearch",
        "WebFetch",
        "AskUserQuestion",
        "Task",
      ],
      permissionMode: "bypassPermissions",
      agents: {
        "code-reviewer": {
          description:
            "Expert code reviewer that analyzes code quality, patterns, and potential issues",
          prompt: `You are an expert code reviewer. Analyze the code thoroughly for:
- Code quality and best practices
- Potential bugs or edge cases
- Security vulnerabilities
- Performance issues
- Readability and maintainability
Provide specific, actionable feedback with file and line references.`,
          tools: ["Read", "Glob", "Grep"],
        },
        researcher: {
          description:
            "Deep research agent that thoroughly investigates topics using web search",
          prompt: `You are a thorough research agent. When given a topic:
- Search for multiple authoritative sources
- Compare different perspectives and approaches
- Synthesize findings into a clear summary
- Include relevant links and references
Be comprehensive but organized in your research.`,
          tools: ["WebSearch", "WebFetch"],
        },
        explainer: {
          description:
            "Patient teacher that breaks down complex code or concepts into understandable pieces",
          prompt: `You are a patient and clear teacher. When explaining code or concepts:
- Start with a high-level overview
- Break down complex parts step by step
- Use analogies and examples where helpful
- Anticipate and address common points of confusion
Make technical concepts accessible without oversimplifying.`,
          tools: ["Read", "Glob", "Grep"],
        },
        architect: {
          description:
            "System architect that analyzes codebase structure and suggests improvements",
          prompt: `You are a senior software architect. Analyze codebases for:
- Overall architecture and design patterns
- Module organization and dependencies
- Scalability considerations
- Technical debt and refactoring opportunities
Provide strategic recommendations with clear reasoning.`,
          tools: ["Read", "Glob", "Grep"],
        },
      },
      systemPrompt: `You are Ray, a helpful AI assistant created by HeadRoom AI.
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
    console.error("Ray agent error:", error);
    sse.send({
      type: "error",
      error: "An error occurred",
      rawError: String(error),
    });
    res.end();
  }
};
