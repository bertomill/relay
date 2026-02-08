export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  concept: string;
  reading: string;
  quiz: QuizQuestion[];
  buildChallenge: string;
}

export const lessons: Lesson[] = [
  {
    id: "tool-use",
    title: "Giving Agents Tools",
    concept: "Tool Use",
    reading: `The Claude Agents SDK lets you define **tools** that your agent can call. Tools are functions your agent can invoke to interact with the outside world — search the web, read files, query databases, or call APIs.

Each tool has a **name**, a **description** (so the agent knows when to use it), and an **input schema** defined with JSON Schema or Zod. When the agent decides it needs a tool, it generates a tool_use block, your code executes the function, and the result is sent back.

Key patterns:
- Tools should have clear, specific descriptions
- Input schemas validate the agent's parameters
- Tools can be async and return structured data
- You can limit which tools an agent has access to`,
    quiz: [
      {
        question: "What does the agent generate when it wants to use a tool?",
        options: ["A function call", "A tool_use block", "A system prompt", "A text response"],
        correctIndex: 1,
        explanation: "The agent generates a tool_use block containing the tool name and input parameters.",
      },
      {
        question: "Why do tools need descriptions?",
        options: [
          "For documentation only",
          "So the agent knows when and how to use them",
          "To validate the output",
          "They don't need descriptions",
        ],
        correctIndex: 1,
        explanation: "Descriptions help the agent understand when a tool is appropriate and what it does.",
      },
      {
        question: "What defines the expected input format for a tool?",
        options: ["A text prompt", "An input schema (JSON Schema / Zod)", "The tool name", "The system prompt"],
        correctIndex: 1,
        explanation: "Input schemas using JSON Schema or Zod define and validate the parameters the agent can pass.",
      },
    ],
    buildChallenge: "Build an agent with a custom tool that fetches the current weather for a given city using a public API. The tool should accept a city name and return temperature and conditions.",
  },
  {
    id: "multi-agent",
    title: "Multi-Agent Orchestration",
    concept: "Orchestrator Pattern",
    reading: `The **orchestrator pattern** uses a main agent that delegates tasks to specialized sub-agents. Think of it like a project manager assigning work to team members.

In the Claude Agents SDK, you define sub-agents with their own system prompts and tools. The orchestrator agent has a special tool (often called "Task" or "delegate") that lets it spawn sub-agents.

When to use multi-agent:
- Different tasks need different expertise or tools
- You want parallel execution of independent subtasks
- You need to isolate context (each sub-agent gets only what it needs)
- Complex workflows with distinct phases

The orchestrator decides which sub-agent to call, what to pass it, and how to combine results.`,
    quiz: [
      {
        question: "What is the orchestrator's primary role?",
        options: [
          "Execute all tasks itself",
          "Delegate tasks to specialized sub-agents",
          "Store conversation history",
          "Handle authentication",
        ],
        correctIndex: 1,
        explanation: "The orchestrator coordinates work by delegating to sub-agents that have specialized capabilities.",
      },
      {
        question: "When should you use multi-agent vs single agent?",
        options: [
          "Always use multi-agent",
          "When different tasks need different tools or expertise",
          "Only for chatbots",
          "When the task is simple",
        ],
        correctIndex: 1,
        explanation: "Multi-agent shines when tasks need different specializations, parallel execution, or context isolation.",
      },
      {
        question: "What does each sub-agent receive?",
        options: [
          "The full conversation history",
          "Only what the orchestrator passes to it",
          "All tools from all agents",
          "Nothing — it generates from scratch",
        ],
        correctIndex: 1,
        explanation: "Sub-agents receive only the context the orchestrator provides, enabling context isolation.",
      },
    ],
    buildChallenge: "Build a research agent with an orchestrator that delegates to two sub-agents: one for web searching and one for summarizing findings. The orchestrator should combine their results into a final report.",
  },
  {
    id: "streaming",
    title: "Streaming Responses",
    concept: "Server-Sent Events",
    reading: `Streaming lets your agent send responses **token by token** instead of waiting for the full response. This is critical for good UX — users see the agent "thinking" in real time.

The Claude Agents SDK supports streaming via **Server-Sent Events (SSE)**. Your API route streams events like:
- \`text\` — a chunk of the agent's response
- \`tool_use\` — the agent wants to call a tool
- \`complete\` — the response is finished
- \`error\` — something went wrong

On the client, you use \`fetch\` with a \`ReadableStream\` reader, parsing each SSE event and updating the UI incrementally. Each event is a line starting with \`data: \` followed by JSON.

Best practices:
- Always handle the \`error\` event type
- Use \`AbortController\` so users can cancel
- Buffer partial JSON for tool_use events
- Show a typing indicator while streaming`,
    quiz: [
      {
        question: "What protocol is commonly used for streaming agent responses?",
        options: ["WebSockets", "Server-Sent Events (SSE)", "GraphQL subscriptions", "Long polling"],
        correctIndex: 1,
        explanation: "SSE is the standard for streaming Claude agent responses — it's simpler than WebSockets for one-way data flow.",
      },
      {
        question: "Why is streaming important for agent UX?",
        options: [
          "It reduces server costs",
          "Users see responses in real time instead of waiting",
          "It's required by the API",
          "It improves accuracy",
        ],
        correctIndex: 1,
        explanation: "Streaming gives users immediate feedback, making the agent feel responsive and interactive.",
      },
      {
        question: "How should you handle cancellation during streaming?",
        options: [
          "Close the browser tab",
          "Use an AbortController",
          "Wait for it to finish",
          "Send a stop message",
        ],
        correctIndex: 1,
        explanation: "AbortController lets you cleanly cancel the fetch request and stop the stream.",
      },
    ],
    buildChallenge: "Build a streaming chat endpoint that sends SSE events for text, tool use, and completion. Create a simple client that renders the stream in real time with a cancel button.",
  },
  {
    id: "system-prompts",
    title: "Crafting System Prompts",
    concept: "System Prompts",
    reading: `The **system prompt** is your agent's personality, knowledge, and behavioral rules. It's the most important piece of your agent's configuration.

Great system prompts:
- Define the agent's **role** clearly ("You are a research assistant that...")
- Specify the **output format** ("Respond in markdown with headers")
- Set **boundaries** ("Only answer questions about X")
- Describe **available tools** and when to use them
- Include **examples** of ideal interactions

Anti-patterns to avoid:
- Vague instructions ("Be helpful")
- Contradictory rules
- Over-constraining (too many rules = confused agent)
- Not mentioning tools (agent won't know they exist)

The system prompt is sent with every API call, so keep it focused. Put detailed reference docs in tools instead.`,
    quiz: [
      {
        question: "What should a system prompt primarily define?",
        options: [
          "The API key",
          "The agent's role, format, boundaries, and tool usage",
          "The user's preferences",
          "The database schema",
        ],
        correctIndex: 1,
        explanation: "A good system prompt clearly defines role, output format, boundaries, and how to use available tools.",
      },
      {
        question: "Why should you avoid putting large reference docs in the system prompt?",
        options: [
          "It's not allowed",
          "It's sent with every API call, increasing cost and latency",
          "The agent can't read it",
          "It causes errors",
        ],
        correctIndex: 1,
        explanation: "System prompts are sent with every call. Large docs should be accessed via tools when needed.",
      },
      {
        question: "What's an anti-pattern in system prompts?",
        options: [
          "Clear role definition",
          "Specifying output format",
          "Vague instructions like 'Be helpful'",
          "Including tool descriptions",
        ],
        correctIndex: 2,
        explanation: "Vague instructions don't give the agent enough guidance. Be specific about what you want.",
      },
    ],
    buildChallenge: "Write system prompts for three different agents: a code reviewer, a customer support bot, and a data analyst. Each should have a clear role, output format, boundaries, and tool descriptions.",
  },
  {
    id: "sessions",
    title: "Managing Conversation Sessions",
    concept: "Session Management",
    reading: `**Sessions** let your agent remember previous conversations. Without sessions, every message starts from scratch.

Common session patterns:
- **Client-side**: Store messages in localStorage. Simple but lost on device switch.
- **Server-side**: Store in a database (Supabase, Redis). Persistent across devices.
- **Hybrid**: Client-side for speed, synced to server for persistence.

When resuming a session, you send the full message history back to the API. The agent sees the context and can continue naturally.

Key considerations:
- **Context window limits**: Long sessions need summarization or truncation
- **Session IDs**: Use UUIDs to uniquely identify conversations
- **Message format**: Each message needs role (user/assistant) and content
- **Tool results**: Must be included in history for the agent to reference`,
    quiz: [
      {
        question: "What happens without session management?",
        options: [
          "The agent is faster",
          "Every message starts from scratch with no memory",
          "The agent has unlimited memory",
          "Nothing changes",
        ],
        correctIndex: 1,
        explanation: "Without sessions, the agent has no context from previous messages — each turn is independent.",
      },
      {
        question: "How does an agent 'remember' a conversation?",
        options: [
          "It stores memories internally",
          "You send the full message history with each API call",
          "It uses a built-in database",
          "It reads from a file",
        ],
        correctIndex: 1,
        explanation: "You resend the conversation history with each API call. The agent sees it as context.",
      },
      {
        question: "What should you do when a session gets very long?",
        options: [
          "Delete it and start over",
          "Summarize or truncate older messages",
          "Increase the API limit",
          "Split it into multiple agents",
        ],
        correctIndex: 1,
        explanation: "Summarization or truncation keeps sessions within context window limits while preserving key information.",
      },
    ],
    buildChallenge: "Build a session manager that stores conversations in localStorage with session switching. Include a session list, the ability to create/delete sessions, and auto-resume of the last active session.",
  },
  {
    id: "error-handling",
    title: "Robust Error Handling",
    concept: "Error Handling",
    reading: `Agents interact with external systems, so errors are inevitable. Good error handling makes the difference between a frustrating and a reliable agent.

Layers of error handling:
1. **API errors**: Rate limits, authentication failures, network issues
2. **Tool errors**: External API down, invalid data, timeouts
3. **Agent errors**: Hallucinated tool names, malformed parameters
4. **Stream errors**: Connection drops, partial responses

Patterns:
- **Retry with backoff**: For transient errors (rate limits, network)
- **Graceful degradation**: If a tool fails, tell the agent and let it adapt
- **User feedback**: Show meaningful error messages, not raw stack traces
- **Timeouts**: Set reasonable limits on tool execution
- **Fallbacks**: If one approach fails, try another`,
    quiz: [
      {
        question: "What should happen when a tool call fails?",
        options: [
          "Crash the entire agent",
          "Return the error to the agent so it can adapt",
          "Silently ignore it",
          "Retry indefinitely",
        ],
        correctIndex: 1,
        explanation: "Returning errors to the agent lets it decide how to proceed — maybe try a different approach.",
      },
      {
        question: "When should you retry a failed request?",
        options: [
          "Always",
          "Never",
          "For transient errors like rate limits, with exponential backoff",
          "Only on the first failure",
        ],
        correctIndex: 2,
        explanation: "Retry with backoff is appropriate for transient errors. Permanent errors should not be retried.",
      },
      {
        question: "What's a good practice for error messages shown to users?",
        options: [
          "Show the full stack trace",
          "Show meaningful messages, not raw technical details",
          "Show nothing",
          "Show the API response body",
        ],
        correctIndex: 1,
        explanation: "Users need helpful, understandable error messages. Save technical details for logs.",
      },
    ],
    buildChallenge: "Build an agent endpoint with comprehensive error handling: retry logic for rate limits, graceful tool failure recovery, stream error handling, and user-friendly error messages.",
  },
  {
    id: "ask-user",
    title: "Interactive Agents with AskUserQuestion",
    concept: "Human-in-the-Loop",
    reading: `The **AskUserQuestion** pattern lets agents pause and ask for clarification. Instead of guessing, the agent presents options and waits for user input.

This is powerful for:
- **Ambiguous requests**: "Which format do you prefer?"
- **Confirmation**: "I'm about to delete 5 files. Continue?"
- **Preference gathering**: "Single-select or multi-select?"
- **Branching workflows**: Different paths based on user choice

Implementation:
1. Define AskUserQuestion as a tool the agent can call
2. When the agent uses it, pause streaming and show the UI
3. Collect the user's answer
4. Send the answer back as a tool result
5. The agent continues with the new information

The tool schema typically includes: question text, options array, and whether multi-select is allowed.`,
    quiz: [
      {
        question: "When should an agent ask the user a question?",
        options: [
          "Never — agents should always decide",
          "When the request is ambiguous or needs confirmation",
          "Before every response",
          "Only at the start of a conversation",
        ],
        correctIndex: 1,
        explanation: "Asking clarifying questions when needed leads to better outcomes than guessing.",
      },
      {
        question: "How is the user's answer sent back to the agent?",
        options: [
          "As a new user message",
          "As a tool result for the AskUserQuestion tool call",
          "Through a separate API",
          "It's stored in the session",
        ],
        correctIndex: 1,
        explanation: "The answer is sent as a tool_result, maintaining the tool use / tool result flow.",
      },
      {
        question: "What makes a good question for the user?",
        options: [
          "Open-ended with no options",
          "Specific with clear options to choose from",
          "Technical jargon",
          "Multiple questions at once",
        ],
        correctIndex: 1,
        explanation: "Specific questions with clear options reduce friction and help the agent get exactly what it needs.",
      },
    ],
    buildChallenge: "Build an agent that uses AskUserQuestion to gather requirements for a blog post: topic, tone, length, and audience. Then have it draft the post based on the answers.",
  },
];

export function getTodayLesson(): Lesson {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return lessons[dayOfYear % lessons.length];
}
