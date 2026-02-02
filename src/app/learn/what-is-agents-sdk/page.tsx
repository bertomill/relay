"use client";

import { useState } from "react";
import { LearnLayout, ChapterNavigation } from "../components";

type CodePart = "import" | "forAwait" | "query" | "prompt" | "options" | "message" | null;

const explanations: Record<Exclude<CodePart, null>, { title: string; description: string }> = {
  import: {
    title: "Import the SDK",
    description: "The query function is the main entry point. It handles all the complexity of talking to Claude, managing tool calls, and streaming responses.",
  },
  forAwait: {
    title: "Async Iteration",
    description: "The SDK streams messages as they happen. Using 'for await' lets you process each message in real-time—you'll see Claude thinking, reading files, and making edits as they occur.",
  },
  query: {
    title: "The query() Function",
    description: "This is where the magic happens. You give Claude a task, and it figures out how to accomplish it using the tools you provide. It's an agentic loop that runs until the task is complete.",
  },
  prompt: {
    title: "Natural Language Prompt",
    description: "Just describe what you want in plain English. Claude understands context, can ask clarifying questions, and breaks down complex tasks into steps.",
  },
  options: {
    title: "Allowed Tools",
    description: "You control what Claude can do. Here we allow Read (view files), Edit (modify files), and Bash (run commands). Claude will only use tools you explicitly permit.",
  },
  message: {
    title: "Streamed Messages",
    description: "Each message shows what Claude is doing: reading auth.py, analyzing the code, finding the bug, and editing the file. You get full visibility into the agent's actions.",
  },
};

export default function WhatIsAgentsSDK() {
  const [activePart, setActivePart] = useState<CodePart>(null);

  const highlight = (part: CodePart) =>
    activePart === part
      ? "bg-[#d4a574]/20 text-[#d4a574]"
      : "hover:bg-[#d4a574]/10 cursor-pointer transition-colors";

  return (
    <LearnLayout>
      <div className="mb-12">
        <p className="text-sm text-[#d4a574] font-medium mb-2">Chapter 1</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          What is the Agents SDK?
        </h1>
        <p className="text-lg text-[#a1a1a1] max-w-2xl">
          The Claude Agents SDK lets you build AI agents that can read files, write code,
          run commands, and complete complex tasks autonomously. Here&apos;s what it looks like:
        </p>
      </div>

      {/* Interactive code breakdown */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Code block */}
        <div className="flex-1">
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1f1f1f]">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-xs text-[#737373]">agent.ts</span>
            </div>
            <pre className="p-6 text-sm md:text-base font-mono overflow-x-auto">
              <code>
                {/* Line 1: Import */}
                <span
                  className={`inline-block rounded px-1 -mx-1 ${highlight("import")}`}
                  onMouseEnter={() => setActivePart("import")}
                  onMouseLeave={() => setActivePart(null)}
                  onClick={() => setActivePart(activePart === "import" ? null : "import")}
                >
                  <span className="text-[#c586c0]">import</span>
                  <span className="text-[#fafafa]">{" { "}</span>
                  <span className="text-[#9cdcfe]">query</span>
                  <span className="text-[#fafafa]">{" } "}</span>
                  <span className="text-[#c586c0]">from</span>
                  <span className="text-[#ce9178]">{" \"@anthropic-ai/claude-agent-sdk\""}</span>
                  <span className="text-[#fafafa]">;</span>
                </span>
                {"\n\n"}
                {/* Line 2: for await */}
                <span
                  className={`inline-block rounded px-1 -mx-1 ${highlight("forAwait")}`}
                  onMouseEnter={() => setActivePart("forAwait")}
                  onMouseLeave={() => setActivePart(null)}
                  onClick={() => setActivePart(activePart === "forAwait" ? null : "forAwait")}
                >
                  <span className="text-[#c586c0]">for await</span>
                  <span className="text-[#fafafa]">{" ("}</span>
                  <span className="text-[#c586c0]">const</span>
                  <span className="text-[#9cdcfe]"> message</span>
                  <span className="text-[#c586c0]"> of</span>
                </span>
                {" "}
                <span
                  className={`inline-block rounded px-1 -mx-1 ${highlight("query")}`}
                  onMouseEnter={() => setActivePart("query")}
                  onMouseLeave={() => setActivePart(null)}
                  onClick={() => setActivePart(activePart === "query" ? null : "query")}
                >
                  <span className="text-[#dcdcaa]">query</span>
                  <span className="text-[#fafafa]">({"{"}</span>
                </span>
                {"\n"}
                {/* Line 3: prompt */}
                {"  "}
                <span
                  className={`inline-block rounded px-1 -mx-1 ${highlight("prompt")}`}
                  onMouseEnter={() => setActivePart("prompt")}
                  onMouseLeave={() => setActivePart(null)}
                  onClick={() => setActivePart(activePart === "prompt" ? null : "prompt")}
                >
                  <span className="text-[#9cdcfe]">prompt</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#ce9178]">&quot;Find and fix the bug in auth.py&quot;</span>
                  <span className="text-[#fafafa]">,</span>
                </span>
                {"\n"}
                {/* Line 4: options */}
                {"  "}
                <span
                  className={`inline-block rounded px-1 -mx-1 ${highlight("options")}`}
                  onMouseEnter={() => setActivePart("options")}
                  onMouseLeave={() => setActivePart(null)}
                  onClick={() => setActivePart(activePart === "options" ? null : "options")}
                >
                  <span className="text-[#9cdcfe]">options</span>
                  <span className="text-[#fafafa]">: {"{ "}</span>
                  <span className="text-[#9cdcfe]">allowedTools</span>
                  <span className="text-[#fafafa]">: [</span>
                  <span className="text-[#ce9178]">&quot;Read&quot;</span>
                  <span className="text-[#fafafa]">, </span>
                  <span className="text-[#ce9178]">&quot;Edit&quot;</span>
                  <span className="text-[#fafafa]">, </span>
                  <span className="text-[#ce9178]">&quot;Bash&quot;</span>
                  <span className="text-[#fafafa]">] {"}"}</span>
                </span>
                {"\n"}
                <span className="text-[#fafafa]">{"})) {"}</span>
                {"\n"}
                {/* Line 5: console.log */}
                {"  "}
                <span
                  className={`inline-block rounded px-1 -mx-1 ${highlight("message")}`}
                  onMouseEnter={() => setActivePart("message")}
                  onMouseLeave={() => setActivePart(null)}
                  onClick={() => setActivePart(activePart === "message" ? null : "message")}
                >
                  <span className="text-[#9cdcfe]">console</span>
                  <span className="text-[#fafafa]">.</span>
                  <span className="text-[#dcdcaa]">log</span>
                  <span className="text-[#fafafa]">(</span>
                  <span className="text-[#9cdcfe]">message</span>
                  <span className="text-[#fafafa]">);</span>
                </span>
                {"\n"}
                <span className="text-[#fafafa]">{"}"}</span>
              </code>
            </pre>
          </div>
          <p className="text-xs text-[#525252] mt-3 text-center">
            Click or hover over any part of the code to learn more
          </p>
        </div>

        {/* Explanation panel */}
        <div className="lg:w-[340px] shrink-0">
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 min-h-[200px] sticky top-8">
            {activePart ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#d4a574] rounded-full" />
                  <h3 className="font-semibold text-[#fafafa]">
                    {explanations[activePart].title}
                  </h3>
                </div>
                <p className="text-sm text-[#a1a1a1] leading-relaxed">
                  {explanations[activePart].description}
                </p>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-8">
                <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#525252]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </div>
                <p className="text-sm text-[#525252]">
                  Hover over the code to explore each part
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Key concepts */}
      <div className="mt-16 grid md:grid-cols-3 gap-6">
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4a574]/20 to-[#b8845f]/10 flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-[#d4a574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </div>
          <h3 className="font-semibold mb-2">Natural Language</h3>
          <p className="text-sm text-[#737373]">
            Describe tasks in plain English. No need to write complex logic—Claude figures out the steps.
          </p>
        </div>
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4a574]/20 to-[#b8845f]/10 flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-[#d4a574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <h3 className="font-semibold mb-2">Safe by Default</h3>
          <p className="text-sm text-[#737373]">
            You explicitly grant permissions. Claude can only use tools you allow, keeping you in control.
          </p>
        </div>
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4a574]/20 to-[#b8845f]/10 flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-[#d4a574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          <h3 className="font-semibold mb-2">Real-time Streaming</h3>
          <p className="text-sm text-[#737373]">
            Watch the agent work in real-time. Every file read, edit, and command streams to you as it happens.
          </p>
        </div>
      </div>

      <ChapterNavigation currentChapterId="what-is-agents-sdk" />
    </LearnLayout>
  );
}
