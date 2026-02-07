# X/Twitter Thread: Scout Multi-Agent Architecture

---

**Tweet 1 (Hook)**

We built an AI research agent that spawns its own team of sub-agents.

One query. Five agents. Structured report with sources.

Here's the architecture (and the two lines of config that make it work):

---

**Tweet 2 (Architecture)**

The architecture has 4 layers:

1. Scout Orchestrator — breaks your query into subtopics
2. Web Researchers (x3) — search in parallel, each on a different angle
3. Fact-checker + Synthesizer — verify claims, combine findings
4. Structured Report — sourced, themed, confidence-rated

---

**Tweet 3 (The mechanism)**

The whole multi-agent pattern in the Claude Agent SDK comes down to:

1. An `agents` config — define each sub-agent's name, prompt, and tools
2. The `Task` tool — lets the orchestrator spawn sub-agents

The SDK handles instantiation, execution, and results. That's it.

---

**Tweet 4 (Code)**

Here's the actual config:

```
agents: {
  "web-researcher": {
    prompt: "Search multiple sources...",
    tools: ["WebSearch", "WebFetch"]
  },
  "fact-checker": { ... },
  "synthesizer": { ... }
}
```

+ add "Task" to allowedTools. Done.

---

**Tweet 5 (Interactive)**

Before researching, Scout can ask clarifying questions with clickable buttons (AskUserQuestion tool).

During research, you see each sub-agent working in real-time.

It's not a black box — you see the whole process.

---

**Tweet 6 (CTA)**

Scout is live — you can try it right now.

See the architecture, click each agent for an explanation, and run a research query:

lightenai.com/agents/scout

Building more of these at @LightenAI. Subscribe for the deep dives.
