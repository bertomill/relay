"use client";

import { useState } from "react";
import { LearnLayout, ChapterNavigation } from "../components";

function LanguageToggle({
  language,
  setLanguage
}: {
  language: "typescript" | "python";
  setLanguage: (lang: "typescript" | "python") => void;
}) {
  return (
    <div className="flex bg-[#0d0d0d] border border-[#1f1f1f] rounded-lg p-1 w-fit">
      <button
        onClick={() => setLanguage("typescript")}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
          language === "typescript"
            ? "bg-[#d4a574] text-[#0a0a0a]"
            : "text-[#a1a1a1] hover:text-[#fafafa]"
        }`}
      >
        TypeScript
      </button>
      <button
        onClick={() => setLanguage("python")}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
          language === "python"
            ? "bg-[#d4a574] text-[#0a0a0a]"
            : "text-[#a1a1a1] hover:text-[#fafafa]"
        }`}
      >
        Python
      </button>
    </div>
  );
}

function CodeBlock({ filename, children }: { filename: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#1f1f1f]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-xs text-[#737373]">{filename}</span>
      </div>
      <pre className="p-4 text-sm font-mono overflow-x-auto">
        <code>{children}</code>
      </pre>
    </div>
  );
}

function BenefitCard({
  icon,
  title,
  description,
  delay = 0
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <div
      className="group bg-[#111111] border border-[#1f1f1f] rounded-xl p-5 hover:border-[#d4a574]/50 hover:bg-[#141414] transition-all duration-300 cursor-default"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-10 h-10 rounded-lg bg-[#d4a574]/10 flex items-center justify-center text-[#d4a574] mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h4 className="text-[#fafafa] font-medium mb-2">{title}</h4>
      <p className="text-sm text-[#a1a1a1]">{description}</p>
    </div>
  );
}

function StreamingDiagram() {
  const [step, setStep] = useState(0);
  const steps = [
    { label: "Initialize", description: "App initializes connection with AsyncGenerator" },
    { label: "Message 1", description: "Yield first message, agent executes tools" },
    { label: "Stream", description: "Receive streamed partial responses" },
    { label: "Message 2", description: "Send follow-up with image attachment" },
    { label: "Interrupt", description: "Queue messages or interrupt as needed" },
  ];

  return (
    <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-6 my-8">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-sm font-medium text-[#737373]">Interactive Flow Diagram</h4>
        <div className="flex gap-2">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="p-2 rounded-lg bg-[#1a1a1a] text-[#a1a1a1] hover:text-[#fafafa] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
            disabled={step === steps.length - 1}
            className="p-2 rounded-lg bg-[#1a1a1a] text-[#a1a1a1] hover:text-[#fafafa] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Flow visualization */}
      <div className="flex items-center justify-between gap-4 mb-8">
        {["App", "Agent", "Tools", "Environment"].map((node, i) => (
          <div key={node} className="flex-1">
            <div className={`h-12 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-300 ${
              (step === 0 && i <= 1) ||
              (step === 1 && i <= 2) ||
              (step === 2 && i <= 1) ||
              (step === 3 && i <= 3) ||
              (step === 4 && i <= 1)
                ? "bg-[#d4a574] text-[#0a0a0a]"
                : "bg-[#1a1a1a] text-[#737373]"
            }`}>
              {node}
            </div>
          </div>
        ))}
      </div>

      {/* Connection lines */}
      <div className="relative h-8 mb-6">
        <div className="absolute inset-x-0 top-1/2 h-0.5 bg-[#1f1f1f]" />
        <div
          className="absolute top-1/2 h-0.5 bg-[#d4a574] transition-all duration-500"
          style={{
            left: "12.5%",
            width: `${step === 0 ? 25 : step === 1 ? 50 : step === 2 ? 25 : step === 3 ? 75 : 25}%`
          }}
        />
        {/* Animated pulse */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#d4a574] animate-pulse transition-all duration-500"
          style={{
            left: `${step === 0 ? 37.5 : step === 1 ? 62.5 : step === 2 ? 37.5 : step === 3 ? 87.5 : 37.5}%`,
            transform: "translate(-50%, -50%)"
          }}
        />
      </div>

      {/* Step indicator */}
      <div className="flex gap-2 mb-4">
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === step ? "w-8 bg-[#d4a574]" : "w-1.5 bg-[#1f1f1f] hover:bg-[#2a2a2a]"
            }`}
          />
        ))}
      </div>

      {/* Step description */}
      <div className="bg-[#111111] rounded-lg p-4">
        <p className="text-sm">
          <span className="text-[#d4a574] font-medium">{steps[step].label}:</span>{" "}
          <span className="text-[#a1a1a1]">{steps[step].description}</span>
        </p>
      </div>
    </div>
  );
}

function ComparisonTable() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const features = [
    { feature: "Image Uploads", streaming: true, single: false },
    { feature: "Message Queueing", streaming: true, single: false },
    { feature: "Real-time Streaming", streaming: true, single: false },
    { feature: "Hook Integration", streaming: true, single: false },
    { feature: "Session Persistence", streaming: true, single: true },
    { feature: "Simple Setup", streaming: false, single: true },
    { feature: "Stateless Operation", streaming: false, single: true },
    { feature: "Lambda Compatible", streaming: false, single: true },
  ];

  return (
    <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden my-8">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#1f1f1f]">
            <th className="text-left text-sm font-medium text-[#737373] p-4">Feature</th>
            <th className="text-center text-sm font-medium text-[#d4a574] p-4">Streaming Input</th>
            <th className="text-center text-sm font-medium text-[#737373] p-4">Single Message</th>
          </tr>
        </thead>
        <tbody>
          {features.map((row, i) => (
            <tr
              key={row.feature}
              className={`border-b border-[#1f1f1f] last:border-0 transition-colors ${
                hoveredRow === i ? "bg-[#111111]" : ""
              }`}
              onMouseEnter={() => setHoveredRow(i)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <td className="p-4 text-sm text-[#a1a1a1]">{row.feature}</td>
              <td className="p-4 text-center">
                {row.streaming ? (
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#28c840]/20 text-[#28c840]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                ) : (
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#ff5f57]/20 text-[#ff5f57]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                )}
              </td>
              <td className="p-4 text-center">
                {row.single ? (
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#28c840]/20 text-[#28c840]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                ) : (
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#ff5f57]/20 text-[#ff5f57]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const streamingCodeTS = `import { query } from "@anthropic-ai/claude-agent-sdk";
import { readFileSync } from "fs";

async function* generateMessages() {
  // First message
  yield {
    type: "user" as const,
    message: {
      role: "user" as const,
      content: "Analyze this codebase for security issues"
    }
  };

  // Wait for conditions or user input
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Follow-up with image
  yield {
    type: "user" as const,
    message: {
      role: "user" as const,
      content: [
        {
          type: "text",
          text: "Review this architecture diagram"
        },
        {
          type: "image",
          source: {
            type: "base64",
            media_type: "image/png",
            data: readFileSync("diagram.png", "base64")
          }
        }
      ]
    }
  };
}

// Process streaming responses
for await (const message of query({
  prompt: generateMessages(),
  options: {
    maxTurns: 10,
    allowedTools: ["Read", "Grep"]
  }
})) {
  if (message.type === "result") {
    console.log(message.result);
  }
}`;

const streamingCodePy = `from claude_agent_sdk import ClaudeSDKClient, ClaudeAgentOptions
from claude_agent_sdk import AssistantMessage, TextBlock
import asyncio
import base64

async def streaming_analysis():
    async def message_generator():
        # First message
        yield {
            "type": "user",
            "message": {
                "role": "user",
                "content": "Analyze this codebase for security issues"
            }
        }

        # Wait for conditions
        await asyncio.sleep(2)

        # Follow-up with image
        with open("diagram.png", "rb") as f:
            image_data = base64.b64encode(f.read()).decode()

        yield {
            "type": "user",
            "message": {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Review this architecture diagram"
                    },
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": "image/png",
                            "data": image_data
                        }
                    }
                ]
            }
        }

    # Use ClaudeSDKClient for streaming input
    options = ClaudeAgentOptions(
        max_turns=10,
        allowed_tools=["Read", "Grep"]
    )

    async with ClaudeSDKClient(options) as client:
        await client.query(message_generator())

        async for message in client.receive_response():
            if isinstance(message, AssistantMessage):
                for block in message.content:
                    if isinstance(block, TextBlock):
                        print(block.text)

asyncio.run(streaming_analysis())`;

const singleCodeTS = `import { query } from "@anthropic-ai/claude-agent-sdk";

// Simple one-shot query
for await (const message of query({
  prompt: "Explain the authentication flow",
  options: {
    maxTurns: 1,
    allowedTools: ["Read", "Grep"]
  }
})) {
  if (message.type === "result") {
    console.log(message.result);
  }
}

// Continue conversation with session management
for await (const message of query({
  prompt: "Now explain the authorization process",
  options: {
    continue: true,
    maxTurns: 1
  }
})) {
  if (message.type === "result") {
    console.log(message.result);
  }
}`;

const singleCodePy = `from claude_agent_sdk import query, ClaudeAgentOptions, ResultMessage
import asyncio

async def single_message_example():
    # Simple one-shot query using query() function
    async for message in query(
        prompt="Explain the authentication flow",
        options=ClaudeAgentOptions(
            max_turns=1,
            allowed_tools=["Read", "Grep"]
        )
    ):
        if isinstance(message, ResultMessage):
            print(message.result)

    # Continue conversation with session management
    async for message in query(
        prompt="Now explain the authorization process",
        options=ClaudeAgentOptions(
            continue_conversation=True,
            max_turns=1
        )
    ):
        if isinstance(message, ResultMessage):
            print(message.result)

asyncio.run(single_message_example())`;

export default function StreamingInputPage() {
  const [language, setLanguage] = useState<"typescript" | "python">("typescript");

  return (
    <LearnLayout>
      {/* Hero section */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#d4a574]/10 border border-[#d4a574]/20 rounded-full text-[#d4a574] text-xs font-medium mb-4">
          <span className="w-1.5 h-1.5 bg-[#d4a574] rounded-full animate-pulse" />
          Chapter 11
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Streaming Input
        </h1>
        <p className="text-xl text-[#a1a1a1] max-w-2xl">
          Understanding the two input modes for Claude Agent SDK and when to use each
        </p>
      </div>

      {/* Overview */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Overview</h2>
        <p className="text-[#a1a1a1] mb-6 leading-relaxed">
          The Claude Agent SDK supports two distinct input modes for interacting with agents:
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-[#111111] border border-[#d4a574]/30 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#d4a574] flex items-center justify-center">
                <svg className="w-4 h-4 text-[#0a0a0a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#fafafa]">Streaming Input Mode</h3>
                <span className="text-xs text-[#d4a574]">Default & Recommended</span>
              </div>
            </div>
            <p className="text-sm text-[#a1a1a1]">
              A persistent, interactive session with full access to all agent capabilities
            </p>
          </div>

          <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[#737373]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#fafafa]">Single Message Input</h3>
                <span className="text-xs text-[#737373]">Simpler, but limited</span>
              </div>
            </div>
            <p className="text-sm text-[#a1a1a1]">
              One-shot queries that use session state and resuming
            </p>
          </div>
        </div>

        <p className="text-[#a1a1a1] leading-relaxed">
          This guide explains the differences, benefits, and use cases for each mode to help you choose the right approach for your application.
        </p>
      </section>

      {/* Streaming Input Mode */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#d4a574] flex items-center justify-center">
            <svg className="w-5 h-5 text-[#0a0a0a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold">Streaming Input Mode</h2>
          <span className="px-2 py-0.5 bg-[#d4a574]/20 text-[#d4a574] text-xs font-medium rounded">Recommended</span>
        </div>

        <p className="text-[#a1a1a1] mb-6 leading-relaxed">
          Streaming input mode is the <strong className="text-[#fafafa]">preferred</strong> way to use the Claude Agent SDK.
          It provides full access to the agent&apos;s capabilities and enables rich, interactive experiences.
        </p>

        <p className="text-[#a1a1a1] mb-8 leading-relaxed">
          It allows the agent to operate as a long-lived process that takes in user input, handles interruptions,
          surfaces permission requests, and handles session management.
        </p>

        {/* Interactive Diagram */}
        <h3 className="text-lg font-medium mb-4">How It Works</h3>
        <StreamingDiagram />

        {/* Benefits */}
        <h3 className="text-lg font-medium mb-4">Benefits</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <BenefitCard
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
            title="Image Uploads"
            description="Attach images directly to messages for visual analysis and understanding"
            delay={0}
          />
          <BenefitCard
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            }
            title="Queued Messages"
            description="Send multiple messages that process sequentially, with ability to interrupt"
            delay={50}
          />
          <BenefitCard
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
            title="Tool Integration"
            description="Full access to all tools and custom MCP servers during the session"
            delay={100}
          />
          <BenefitCard
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            }
            title="Hooks Support"
            description="Use lifecycle hooks to customize behavior at various points"
            delay={150}
          />
          <BenefitCard
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
            title="Real-time Feedback"
            description="See responses as they're generated, not just final results"
            delay={200}
          />
          <BenefitCard
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            }
            title="Context Persistence"
            description="Maintain conversation context across multiple turns naturally"
            delay={250}
          />
        </div>

        {/* Code Example */}
        <h3 className="text-lg font-medium mb-4">Implementation Example</h3>
        <div className="mb-4">
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>
        <CodeBlock filename={language === "typescript" ? "streaming-example.ts" : "streaming_example.py"}>
          {language === "typescript" ? streamingCodeTS : streamingCodePy}
        </CodeBlock>
      </section>

      {/* Single Message Input */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-[#737373]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold">Single Message Input</h2>
        </div>

        <p className="text-[#a1a1a1] mb-6 leading-relaxed">
          Single message input is simpler but more limited. Use it for straightforward, one-shot queries.
        </p>

        {/* When to use */}
        <h3 className="text-lg font-medium mb-4">When to Use Single Message Input</h3>
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-5 mb-8">
          <p className="text-[#a1a1a1] mb-4">Use single message input when:</p>
          <ul className="space-y-2">
            {[
              "You need a one-shot response",
              "You do not need image attachments, hooks, etc.",
              "You need to operate in a stateless environment, such as a lambda function"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[#a1a1a1]">
                <span className="w-5 h-5 rounded-full bg-[#1a1a1a] flex items-center justify-center text-xs text-[#737373] shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Limitations Warning */}
        <h3 className="text-lg font-medium mb-4">Limitations</h3>
        <div className="bg-[#2a1a1a] border border-[#ff5f57]/30 rounded-xl p-5 mb-8">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#ff5f57]/20 flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-[#ff5f57]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-[#ff5f57] mb-2">Warning</p>
              <p className="text-sm text-[#a1a1a1] mb-3">
                Single message input mode does <strong className="text-[#fafafa]">not</strong> support:
              </p>
              <ul className="space-y-1.5">
                {[
                  "Direct image attachments in messages",
                  "Dynamic message queueing",
                  "Real-time interruption",
                  "Hook integration",
                  "Natural multi-turn conversations"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-[#a1a1a1]">
                    <svg className="w-4 h-4 text-[#ff5f57]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <h3 className="text-lg font-medium mb-4">Implementation Example</h3>
        <div className="mb-4">
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>
        <CodeBlock filename={language === "typescript" ? "single-message.ts" : "single_message.py"}>
          {language === "typescript" ? singleCodeTS : singleCodePy}
        </CodeBlock>
      </section>

      {/* Comparison */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Feature Comparison</h2>
        <p className="text-[#a1a1a1] mb-4">
          Compare the capabilities of each input mode at a glance:
        </p>
        <ComparisonTable />
      </section>

      {/* Summary */}
      <section className="mb-8">
        <div className="bg-gradient-to-r from-[#d4a574]/10 to-transparent border border-[#d4a574]/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-3">Quick Summary</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-[#d4a574] mb-2">Choose Streaming Input when:</p>
              <ul className="space-y-1 text-sm text-[#a1a1a1]">
                <li>• Building interactive applications</li>
                <li>• Need real-time feedback</li>
                <li>• Working with images or files</li>
                <li>• Require full agent capabilities</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium text-[#737373] mb-2">Choose Single Message when:</p>
              <ul className="space-y-1 text-sm text-[#a1a1a1]">
                <li>• Simple one-shot queries</li>
                <li>• Stateless environments (Lambda)</li>
                <li>• Minimal setup required</li>
                <li>• No advanced features needed</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ChapterNavigation currentChapterId="streaming-input" />
    </LearnLayout>
  );
}
