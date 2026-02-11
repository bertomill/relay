import { AgentConfig } from "./types";

const agents: AgentConfig[] = [
  {
    id: "ray",
    name: "Ray",
    tagline: "Your helpful AI assistant",
    description:
      "A versatile conversational agent that can help with coding, analysis, writing, brainstorming, and more. Ray is powered by Claude and designed for general-purpose tasks.",
    status: "active",
    iconPath:
      "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z",
    chatConfig: {
      apiEndpoint: "/api/agents/ray",
      storageKey: "ray-sessions",
      placeholder: "Message Ray...",
      emptyStateTitle: "Start a conversation",
      emptyStateDescription:
        "Ask Ray anything. I can help with coding, analysis, writing, and more.",
      loadingText: "Thinking...",
      starterPrompts: [
        "Help me write a Python script to parse CSV files",
        "Explain how async/await works in JavaScript",
        "Draft a professional email to follow up on a proposal",
        "Review this code snippet for potential bugs",
      ],
      fileUpload: {
        accept: "image/*",
        maxSizeMB: 20,
        endpoint: "/api/upload",
        imageEndpoint: "/api/fal/upload",
      },
    },
    capabilities: [
      {
        title: "General Assistance",
        description:
          "Get help with a wide range of tasks from writing to analysis to problem-solving.",
        icon: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z",
      },
      {
        title: "Code Generation",
        description:
          "Write, review, and debug code across multiple programming languages.",
        icon: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5",
      },
      {
        title: "Content Creation",
        description:
          "Draft emails, articles, reports, and other written content with context-aware suggestions.",
        icon: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10",
      },
      {
        title: "Data Analysis",
        description:
          "Analyze data, explain patterns, and help make sense of complex information.",
        icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
      },
    ],
    faq: [
      {
        question: "What model powers Ray?",
        answer:
          "Ray is powered by Claude, Anthropic's AI assistant. It uses the Claude Agents SDK to manage conversation sessions and tool use.",
      },
      {
        question: "Does Ray remember previous conversations?",
        answer:
          "Yes. Ray stores session history in your browser's localStorage. You can resume previous sessions or start fresh at any time. Sessions are stored locally and never sent to third parties.",
      },
      {
        question: "What are Ray's limitations?",
        answer:
          "Ray doesn't have access to the internet or external tools by default. It works best for tasks that rely on reasoning, language understanding, and code generation. For web research, try Scout instead.",
      },
      {
        question: "How is Ray different from Scout?",
        answer:
          "Ray is a general-purpose assistant for direct conversation and task completion. Scout is a specialized research agent that orchestrates multiple sub-agents to search the web, verify facts, and synthesize reports.",
      },
    ],
  },
  {
    id: "scout",
    name: "Scout",
    tagline: "Your AI research agent",
    description:
      "A multi-agent research system that breaks topics into subtasks, runs parallel web researchers, fact-checks claims, and synthesizes comprehensive reports with sources.",
    status: "active",
    iconPath:
      "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
    chatConfig: {
      apiEndpoint: "/api/agents/scout",
      storageKey: "scout-sessions",
      placeholder: "What would you like me to research?",
      emptyStateTitle: "Start a research session",
      emptyStateDescription:
        "Ask Scout to research any topic. I'll search multiple sources, verify claims, and synthesize a comprehensive report.",
      loadingText: "Researching...",
      starterPrompts: [
        "Research the latest AI regulations in the EU",
        "Compare React, Vue, and Svelte for a new project in 2025",
        "What are the current trends in renewable energy investment?",
        "Summarize recent breakthroughs in quantum computing",
      ],
    },
    capabilities: [
      {
        title: "Multi-Source Research",
        description:
          "Searches across multiple web sources simultaneously using parallel sub-agents for comprehensive coverage.",
        icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418",
      },
      {
        title: "Fact Verification",
        description:
          "Cross-references claims across sources and flags inconsistencies to ensure accuracy.",
        icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
      },
      {
        title: "Report Synthesis",
        description:
          "Combines findings from all sub-agents into a structured, sourced report with key insights highlighted.",
        icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
      },
      {
        title: "Interactive Refinement",
        description:
          "Asks clarifying questions when needed and lets you guide the research direction in real-time.",
        icon: "M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z",
      },
    ],
    faq: [
      {
        question: "How does Scout's multi-agent architecture work?",
        answer:
          "Scout uses an orchestrator pattern. When you submit a query, the main agent breaks it into subtopics and spawns parallel web-researcher sub-agents. Each sub-agent independently searches and summarizes findings. Results are then fact-checked and synthesized into a final report.",
      },
      {
        question: "What sources does Scout search?",
        answer:
          "Scout's web-researcher sub-agents search the open web using real-time search APIs. They can access news articles, documentation, forums, and public data. Sources are cited in the final report so you can verify claims.",
      },
      {
        question: "How long does a research session take?",
        answer:
          "Most queries complete in 1-3 minutes depending on complexity. Simple factual lookups are faster, while deep multi-topic research with fact-checking may take longer. You'll see sub-agent activity indicators in real-time.",
      },
      {
        question: "Can I guide the research while it's running?",
        answer:
          "Yes. Scout may ask clarifying questions during research to narrow scope or choose between approaches. You can also start a new query building on previous results within the same session.",
      },
      {
        question: "Is my research data stored?",
        answer:
          "Session history is stored in your browser's localStorage only. Nothing is sent to third-party services beyond the AI model API calls needed to generate responses. You can delete sessions at any time.",
      },
    ],
    architecture: [
      {
        nodes: [
          {
            label: "Scout Orchestrator",
            type: "orchestrator",
            description:
              "The main agent that receives your query, breaks it into subtopics, and coordinates the research workflow across all sub-agents.",
          },
        ],
      },
      {
        nodes: [
          {
            label: "web-researcher",
            type: "agent",
            description:
              "Parallel sub-agents that independently search the web for information on assigned subtopics, collecting sources and summarizing findings.",
          },
          {
            label: "web-researcher",
            type: "agent",
            description:
              "Parallel sub-agents that independently search the web for information on assigned subtopics, collecting sources and summarizing findings.",
          },
          {
            label: "web-researcher",
            type: "agent",
            description:
              "Parallel sub-agents that independently search the web for information on assigned subtopics, collecting sources and summarizing findings.",
          },
        ],
      },
      {
        nodes: [
          {
            label: "fact-checker",
            type: "agent",
            description:
              "Cross-references claims from the web researchers against multiple sources, flagging inconsistencies and verifying key facts.",
          },
          {
            label: "synthesizer",
            type: "agent",
            description:
              "Combines verified findings from all sub-agents into a coherent narrative, organizing information by theme and relevance.",
          },
        ],
      },
      {
        nodes: [
          {
            label: "Structured Research Report",
            type: "result",
            description:
              "The final output — a comprehensive, sourced report with key insights highlighted, organized into sections with inline citations.",
          },
        ],
      },
    ],
  },
  {
    id: "content-creator",
    name: "Content Creator",
    tagline: "Draft multi-platform content for Lighten AI",
    description:
      "A content creation agent that drafts platform-specific posts for X, Medium, LinkedIn, Instagram, and YouTube. Powered by the Claude Agent SDK with a content creation Skill for brand-consistent writing.",
    status: "active",
    iconPath:
      "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10",
    chatConfig: {
      apiEndpoint: "/api/agents/content-creator",
      storageKey: "content-creator-sessions",
      placeholder: "What content would you like to create?",
      emptyStateTitle: "Create multi-platform content",
      emptyStateDescription:
        "Tell me a topic and I'll draft tailored content for X, Medium, LinkedIn, Instagram, and YouTube.",
      loadingText: "Drafting...",
      starterPrompts: [
        "Draft a post about how AI agents can automate repetitive business tasks",
        "Write content about the difference between AI chatbots and AI agents",
        "Create a post explaining why small businesses should explore AI automation",
        "Draft content about Lighten AI's approach to making AI accessible",
      ],
      fileUpload: {
        accept: "audio/*,video/*,image/*",
        maxSizeMB: 50,
        endpoint: "/api/upload",
        imageEndpoint: "/api/fal/upload",
      },
    },
    capabilities: [
      {
        title: "Multi-Platform Drafting",
        description:
          "Creates tailored content for X, Medium, LinkedIn, Instagram, and YouTube — each formatted for the platform's style and audience.",
        icon: "M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z",
      },
      {
        title: "Brand Voice",
        description:
          "Writes in Lighten AI's voice — knowledgeable but approachable, avoiding hype and buzzwords.",
        icon: "M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z",
      },
      {
        title: "Topic Research",
        description:
          "Searches the web for up-to-date information to ensure content is accurate and timely.",
        icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
      },
      {
        title: "Content Strategy",
        description:
          "Helps plan content topics, suggest angles, and identify what resonates with your audience.",
        icon: "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6",
      },
    ],
    faq: [
      {
        question: "What platforms does Content Creator support?",
        answer:
          "Content Creator drafts for five platforms: X (Twitter), Medium, LinkedIn, Instagram, and YouTube. Each draft is tailored to the platform's format and audience expectations.",
      },
      {
        question: "How does it maintain brand consistency?",
        answer:
          "The agent uses a content creation Skill loaded from the project that contains Lighten AI's brand voice guidelines, platform-specific style rules, and the content database schema. This ensures every draft is on-brand.",
      },
      {
        question: "Can I create content for just one platform?",
        answer:
          "Yes. Just specify which platform you want and the agent will draft content only for that platform. You can also ask for a subset like 'X and LinkedIn only'.",
      },
      {
        question: "Does it research topics?",
        answer:
          "Yes. The agent has web search and web fetch tools so it can research topics for accuracy before drafting. This is especially useful for technical or time-sensitive content.",
      },
    ],
  },
];

export function getAllAgents(): AgentConfig[] {
  return agents;
}

export function getAgentBySlug(slug: string): AgentConfig | undefined {
  return agents.find((a) => a.id === slug);
}
