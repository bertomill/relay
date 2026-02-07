# Instagram Post: Scout Multi-Agent Architecture

---

**Visual:** Clean architecture diagram showing the 4-layer flow — Scout Orchestrator at top, three web-researcher nodes in middle, fact-checker + synthesizer below, Structured Research Report at bottom. Use the Lighten AI green (#6B8F71) accent. Arrows connecting layers.

**Alt slide:** Code snippet showing the `agents` config — clean, minimal, dark editor theme.

---

**Caption:**

We built an AI that doesn't just answer your question — it sends out a research team.

Meet Scout. When you ask it something, here's what happens behind the scenes:

The orchestrator breaks your topic into subtopics. It spawns parallel web-researcher agents — each one digging into a different angle at the same time. A fact-checker verifies the claims. A synthesizer writes the report.

Five agents. One query. Structured output with sources.

The whole pattern runs on the Claude Agent SDK with two pieces of config: an agents object that defines each sub-agent, and the Task tool that lets the orchestrator call them.

Try it live — link in bio.

---

**Hashtags:** #AI #AIAgents #MultiAgent #Claude #Anthropic #AIArchitecture #BuildInPublic #TechStartup #AIDevelopment #LightenAI
