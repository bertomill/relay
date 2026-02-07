# How We Built a Multi-Agent Research System with the Claude Agent SDK

*One query, five agents, one structured report. Here's the exact architecture behind Scout — and the two lines of config that make it all work.*

---

Most AI tools give you one shot at an answer. You type a question, a single model does its best, and you hope the sources are good.

For serious research — competitive analysis, market trends, technical deep-dives — that's not enough. You need multiple angles, fact-checking, and structured output with sources you can actually verify.

So we built Scout, a multi-agent research system that does exactly that. Here's how it works under the hood.

---

## The Architecture

Scout uses a four-layer architecture built on the Claude Agent SDK's sub-agent pattern.

### Layer 1: The Orchestrator

When you submit a query, the Scout orchestrator receives it. Its first job is to understand the scope. For ambiguous topics, it uses `AskUserQuestion` to clarify — "Which region?" "What time frame?" "Technical or business angle?"

Once the scope is clear, it breaks the topic into 2-3 subtopics and kicks off the research.

### Layer 2: Parallel Web Researchers

The orchestrator spawns multiple web-researcher sub-agents, each assigned a different subtopic. They run in parallel — one might be digging into policy implications while another is finding market data and a third is collecting expert opinions.

Each researcher is instructed to:
- Search multiple authoritative sources
- Capture specific data, statistics, and quotes
- Note conflicting viewpoints
- Cite everything with URLs

### Layer 3: Verification & Synthesis

Once the researchers report back, two more agents take over.

The **fact-checker** cross-references the major claims against independent sources. It rates confidence levels (high/medium/low) and flags anything unverifiable or contradictory.

The **synthesizer** combines all verified findings into a coherent narrative — organized by theme, not by source. Key insights first, gaps identified, sources listed.

### Layer 4: The Output

A structured research report with clear sections, inline citations, confidence indicators, and a complete source list.

---

## The Two Config Keys That Make It Work

Here's what surprised us most: the multi-agent pattern in the Claude Agent SDK requires almost no boilerplate.

### 1. The `agents` config

You define your sub-agents as a simple object:

```typescript
agents: {
  "web-researcher": {
    description: "Deep web research agent that investigates a specific subtopic",
    prompt: "You are a thorough web research agent. When given a subtopic...",
    tools: ["WebSearch", "WebFetch"],
  },
  "fact-checker": {
    description: "Verification agent that cross-references claims",
    prompt: "You are a meticulous fact-checking agent...",
    tools: ["WebSearch", "WebFetch"],
  },
  "synthesizer": {
    description: "Synthesis agent that combines findings into a report",
    prompt: "You are a research synthesis agent...",
    tools: ["WebSearch", "WebFetch"],
  },
}
```

Each agent gets a name, description, system prompt, and its own toolset. The SDK handles instantiation, execution, and result passing.

### 2. The `Task` tool

```typescript
allowedTools: ["WebSearch", "WebFetch", "AskUserQuestion", "Task"],
```

`Task` is the SDK's built-in mechanism for spawning sub-agents. When the orchestrator calls `Task` with a `subagent_type` matching a name in the `agents` config, the SDK creates a new agent instance with that agent's prompt and tools, runs it to completion, and returns the results.

The orchestrator's system prompt guides *when* and *why* to use sub-agents — but the actual capability comes from these two pieces of config.

---

## The Interactive Layer

Before diving into research, Scout can ask clarifying questions using the `AskUserQuestion` tool. The user sees clickable buttons — not freeform text — which keeps the interaction fast.

During research, the UI shows real-time sub-agent activity: which researchers are active, what they're investigating, and when verification starts. It's transparent by design.

---

## When Multi-Agent Makes Sense

Multi-agent isn't always the right call. For simple questions or one-step tasks, a single agent is faster and more efficient.

Multi-agent shines when:
- **The topic is broad** — it naturally decomposes into subtopics
- **Accuracy matters** — you need cross-referencing and fact-checking
- **Structured output is valuable** — reports, not chat messages
- **Parallel execution saves time** — three researchers working simultaneously beats one working sequentially

The orchestration overhead is real but modest. For research-grade output, the quality improvement is significant.

---

## Adding New Agents

One of the cleanest parts of this architecture: adding a new sub-agent requires one config entry and a system prompt update. No new files, no new API routes.

Want a sentiment analyzer? A competitor tracker? A citation formatter? Add it to the `agents` object, tell the orchestrator when to use it, and the SDK handles the rest.

---

## Try It

Scout is live on our site. You can see the full architecture diagram, read what each agent does, and run a research query yourself.

The multi-agent pattern is one of the most practical applications of the Claude Agent SDK — and it's surprisingly simple to implement once you understand the two key pieces: `agents` config and the `Task` tool.

---

*We're Lighten AI. We build custom AI agents for businesses using the Claude Agent SDK. If you're thinking about how multi-agent systems could handle research, analysis, or operations at your company — [let's talk](https://lightenai.com).*
