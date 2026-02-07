# YouTube Video Script: How We Built a Multi-Agent Research System

**Title:** We Built an AI Research Agent That Spawns Sub-Agents — Here's How
**Length:** ~8-9 minutes
**Thumbnail:** Architecture diagram with arrows flowing between agent nodes, bold text "MULTI-AGENT AI", your face reacting in corner

---

## INTRO (0:00 - 0:45)

**[Talking head, direct to camera]**

What if instead of asking one AI a question and hoping for the best — you had an AI that broke your question apart, sent out a team of researchers, fact-checked everything, and handed you a sourced report?

That's what we built. It's called Scout, and it runs on Anthropic's Claude Agent SDK.

Today I'm going to show you the exact architecture — how the orchestrator works, how sub-agents get spawned, and the two config keys that make the whole thing possible.

Let's get into it.

---

## THE PROBLEM (0:45 - 1:30)

**[Talking head with graphic overlay]**

Here's the problem with a single-agent research workflow.

**[GRAPHIC: Single agent icon with arrows going out to web and back]**

You ask it to research a topic. It searches once, maybe twice, and gives you an answer based on whatever it found first. There's no cross-referencing. No verification. No structure.

**[GRAPHIC: Red X marks appearing: "narrow sources", "no fact-checking", "surface-level"]**

For anything non-trivial — market research, competitive analysis, technical deep-dives — that's not good enough.

So we asked: what if the agent could delegate?

---

## THE ARCHITECTURE (1:30 - 3:30)

**[Cut to screen share: architecture diagram]**

**[GRAPHIC: Architecture diagram building layer by layer]**

Here's the architecture. Four layers.

**[Layer 1 appears: Scout Orchestrator at top]**

Layer one — the Scout Orchestrator. This is the brain. When you send a query, this agent receives it. Its first job is to understand what you're asking and break it into subtopics.

Say you ask: "What are the current trends in renewable energy investment?"

The orchestrator might break that into three angles: technology trends, policy and regulation, and market and funding data.

**[Layer 2 appears: three web-researcher nodes]**

Layer two — web researchers. The orchestrator spawns three sub-agents in parallel. Each one gets a specific subtopic and a clear set of instructions: search multiple sources, find data and statistics, capture quotes, note conflicting viewpoints.

They all run at the same time. That's the key — parallel execution.

**[Layer 3 appears: fact-checker and synthesizer]**

Layer three — verification and synthesis. Once the researchers report back, two more agents take over.

The fact-checker cross-references the major claims against independent sources. It rates confidence levels — high, medium, low — and flags anything that can't be verified.

The synthesizer takes all the verified findings and combines them into a coherent report. Not organized by source — organized by theme. Key insights up top, sources at the bottom.

**[Layer 4 appears: Structured Research Report]**

Layer four — the output. A structured research report with sections, citations, confidence levels, and identified gaps.

**[Cut back to talking head]**

That's five agents working together on a single query. And here's the thing — the user doesn't manage any of this. They type a question and get a report.

---

## HOW IT ACTUALLY WORKS IN CODE (3:30 - 5:30)

**[Cut to screen share: code editor with route.ts]**

Alright, let me show you how simple this actually is with the Claude Agent SDK.

**[Highlight the agents config object]**

There are really just two things that make this work.

Number one — the `agents` config. This is where you define your sub-agents. Each one gets a name, a description, a system prompt, and its own set of tools.

```typescript
agents: {
  "web-researcher": {
    description: "Deep web research agent...",
    prompt: "You are a thorough web research agent...",
    tools: ["WebSearch", "WebFetch"],
  },
  "fact-checker": { ... },
  "synthesizer": { ... },
}
```

That's it. Three agents, defined right in the config. The SDK knows they exist and knows how to run them.

**[Highlight allowedTools]**

Number two — the `Task` tool in `allowedTools`.

```typescript
allowedTools: ["WebSearch", "WebFetch", "AskUserQuestion", "Task"],
```

`Task` is the Claude Agent SDK's built-in tool for spawning sub-agents. When the orchestrator decides it needs a web researcher, it calls the `Task` tool with `subagent_type: "web-researcher"` — and the SDK handles everything. It spins up a new agent instance with that agent's prompt and tools, runs it, and returns the results.

**[Highlight systemPrompt section]**

The orchestrator's system prompt then ties it together — it tells the main agent *when* to use sub-agents and in what order. But the system prompt alone doesn't give it the ability. It's the `agents` config plus the `Task` tool that creates the mechanism.

**[Cut back to talking head]**

So to summarize: `agents` config defines who the sub-agents are. `Task` tool lets the orchestrator call them. System prompt guides the workflow. That's the whole multi-agent pattern.

---

## THE INTERACTIVE LAYER (5:30 - 6:30)

**[Screen share: Scout chat UI]**

One more thing I want to show you. Before the orchestrator starts researching, it can ask you clarifying questions.

**[Show AskUserQuestion UI with clickable buttons]**

This uses the `AskUserQuestion` tool from the Claude Agent SDK. The agent sends a question with multiple-choice options, the user clicks one, and the research narrows down.

So if you ask "Tell me about AI regulation" — Scout might ask: "Which region? EU, US, or global overview?" You click EU, and now all three web researchers are focused on EU-specific regulation.

**[Show subagent status indicators in the UI]**

And while it's working, you can see the sub-agents in real time. "Researching EU AI Act timeline..." "Checking compliance requirements..." — each one reporting what it's doing.

It's not a black box. You see the process.

---

## WHEN TO USE THIS PATTERN (6:30 - 7:30)

**[Talking head]**

Now — should you use multi-agent for everything? No.

**[GRAPHIC: "Single agent is fine for..." with bullet points]**

Single agent is fine for:
- Simple Q&A
- One-step tasks
- Anything where speed matters more than depth

**[GRAPHIC: "Multi-agent shines for..." with bullet points]**

Multi-agent shines when:
- The topic is broad and needs multiple angles
- Accuracy matters and you need fact-checking
- You want structured, sourced output
- The task naturally decomposes into subtasks

The overhead of orchestration isn't free. But for research, analysis, and any complex workflow — the quality difference is massive.

---

## ADDING A NEW AGENT (7:30 - 8:15)

**[Screen share: code editor]**

And here's the beautiful part. Want to add a new sub-agent — say, a "sentiment-analyzer" that checks public opinion?

You add one entry to the `agents` config:

```typescript
"sentiment-analyzer": {
  description: "Analyzes public sentiment...",
  prompt: "You are a sentiment analysis agent...",
  tools: ["WebSearch", "WebFetch"],
}
```

Update the orchestrator's system prompt to know when to use it. That's it. No new files. No new routes. The SDK handles the rest.

---

## OUTRO (8:15 - 8:45)

**[Talking head, direct to camera]**

So that's Scout — a multi-agent research system built on the Claude Agent SDK. Five agents, one query, structured output.

If you want to try it yourself, we have it live on our site — link in the description. You can see the architecture, read how each agent works, and run a research query right there.

And if you're thinking about how multi-agent systems could handle real work in your business — that's what we do at Lighten AI. Link below.

Subscribe if you want more deep dives like this. See you in the next one.

---

## VIDEO DESCRIPTION

We built a multi-agent AI research system called Scout using the Claude Agent SDK. In this video, I break down the exact architecture — how the orchestrator breaks queries into subtopics, spawns parallel web-researcher sub-agents, fact-checks claims, and synthesizes structured reports.

I show you the two key pieces of config that make multi-agent work: the `agents` definition and the `Task` tool. Plus how to add new sub-agents in minutes.

Chapters:
0:00 Intro
0:45 The problem with single-agent research
1:30 The architecture (4 layers)
3:30 How it works in code
5:30 The interactive layer
6:30 When to use multi-agent
7:30 Adding a new agent
8:15 Final thoughts

Links:
- Try Scout: https://lightenai.com/agents/scout
- Claude Agent SDK: https://docs.anthropic.com/en/docs/agents-and-tools/claude-agent-sdk
- Lighten AI: https://lightenai.com
- Previous video — Vercel vs Claude Agent SDK: [add link]

#AI #AIAgents #Claude #Anthropic #MultiAgent #AIArchitecture #BuildInPublic #AIDevelopment
