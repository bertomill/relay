import { runAgentInSandbox } from "@/lib/agents/sandbox";
import { NextRequest } from "next/server";

// Vercel deployment config
export const runtime = "nodejs";
export const maxDuration = 300; // 5 minutes (Vercel Pro plan max)

export async function POST(request: NextRequest) {
  const { message, history = [] } = await request.json();

  if (!message) {
    return new Response(JSON.stringify({ error: "Message is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const stream = await runAgentInSandbox(message, history, {
      allowedTools: ["Read", "Glob", "Grep", "WebSearch", "WebFetch", "AskUserQuestion", "Task", "Bash"],
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

Bash tools:
- Bash: Run shell commands. Use this for image generation.

Image generation:
- Generate an image: \`npx tsx scripts/content-creator/generate-image.ts "<prompt>" [--size landscape_16_9]\`
- Edit an uploaded image: \`npx tsx scripts/content-creator/generate-image.ts "<prompt>" --image-url <url> [--strength 0.75]\`
- When the user uploads an image, the message will contain [Uploaded image: <url>]. Use --image-url with that URL.
- The script outputs JSON with a \`url\` field. Display results inline: ![description](url)
- Sizes: landscape_16_9, square_hd, square, portrait_4_3, portrait_16_9, landscape_4_3

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
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Ray agent error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to start agent", details: String(error) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
