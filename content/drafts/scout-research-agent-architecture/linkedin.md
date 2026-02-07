# LinkedIn Post: Scout Multi-Agent Architecture

**Title:** We Built an AI That Sends Out a Research Team — Here's the Architecture

---

Most AI tools give you one model, one answer, one shot.

We built something different.

Scout is a multi-agent research system built on the Claude Agent SDK. When you ask it a question, here's what actually happens:

1. The orchestrator breaks your query into 2-3 subtopics
2. It spawns parallel web-researcher sub-agents — each investigating a different angle simultaneously
3. A fact-checker cross-references the major claims
4. A synthesizer combines everything into a structured, sourced report

Five agents. One query. One report with citations.

The surprising part? The entire multi-agent pattern comes down to two pieces of config:

- An `agents` object that defines each sub-agent's role, prompt, and tools
- The `Task` tool that lets the orchestrator spawn them

That's it. The Claude Agent SDK handles instantiation, parallel execution, and result passing.

We've open-sourced the architecture on our site — you can see the diagram, click each agent to understand what it does, and try a live research query.

This is what AI agents look like when they move beyond chatbots.

---

Try Scout: lightenai.com/agents/scout

#AIAgents #Claude #Anthropic #MultiAgent #AIArchitecture #BuildInPublic
