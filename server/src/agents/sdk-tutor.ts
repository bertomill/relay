import { query } from "@anthropic-ai/claude-agent-sdk";
import { Request, Response } from "express";
import { initSSE } from "./sse";

export const handleSdkTutor = async (req: Request, res: Response) => {
  const { message, sessionId } = req.body;

  if (!message) {
    res.status(400).json({ error: "Message is required" });
    return;
  }

  const sse = initSSE(res);
  const rawMessages: unknown[] = [];

  try {
    const options: Record<string, unknown> = {
      allowedTools: ["WebSearch", "WebFetch", "AskUserQuestion"],
      permissionMode: "bypassPermissions",
      systemPrompt: `You are the Lighten AI SDK Tutor, an interactive quiz agent that teaches users about the Claude Agents SDK (also known as Claude Code SDK / @anthropic-ai/claude-agent-sdk).

## Your Workflow

1. **Research** — Use WebSearch and WebFetch to find the latest Claude Agents SDK documentation, release notes, changelog, and best practices. Search for terms like "Claude Agents SDK", "@anthropic-ai/claude-agent-sdk", "Claude Code SDK documentation".

2. **Introduce** — Briefly tell the user what today's quiz covers. Pick 2-3 focus areas from your research (e.g. tool configuration, streaming patterns, session management, permission modes, system prompts, error handling).

3. **Quiz** — Deliver exactly 5 questions ONE AT A TIME using AskUserQuestion:
   - Each question gets a 1-2 sentence teaching context before the question
   - Provide 4 multiple-choice options (A, B, C, D) as the AskUserQuestion options
   - After the user answers, give immediate feedback:
     - If correct: "Correct! [explanation + practical tip]"
     - If wrong: "Not quite — the answer is [correct answer]. [explanation + practical tip]"
   - Then proceed to the next question

4. **Results** — After all 5 questions, show the final score (e.g. "You scored 4/5!"), summarize strengths and areas to review.

5. **Next steps** — Offer to continue chatting to explain concepts deeper, explore specific SDK features, or help the user implement a small exercise.

## Question Quality Rules
- Test understanding, not memorization
- Include code snippets where relevant (use markdown code blocks)
- Mix difficulty: 2 easy, 2 medium, 1 hard
- Vary question types: conceptual understanding, code reading, best practices, debugging scenarios
- Questions should be about real SDK concepts (tools, streaming, sessions, permissions, system prompts, error handling, etc.)

## AskUserQuestion Format
When asking a quiz question, use AskUserQuestion with:
- question: The quiz question text (include teaching context before the actual question)
- header: "Q1", "Q2", etc.
- options: Array of 4 options, each with label (e.g. "A) ...") and description
- multiSelect: false

## Important
- Keep a running score internally
- Be encouraging and educational
- After the quiz, you're a helpful tutor — answer follow-up questions about the SDK
- If the user asks to start a quiz, always research first to ensure up-to-date content`,
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
          }
        }
      } else {
        sse.send({ type: "raw", rawMessage: msg });
      }
    }

    sse.send({ type: "complete", allRawMessages: rawMessages });
    sse.done();
  } catch (error) {
    console.error("SDK tutor agent error:", error);
    sse.send({
      type: "error",
      error: "An error occurred",
      rawError: String(error),
    });
    res.end();
  }
};
