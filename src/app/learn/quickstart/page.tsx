"use client";

import { useState } from "react";
import { LearnLayout, ChapterNavigation, CodeBlock } from "../components";

type InstallMethod = "curl" | "homebrew" | "winget";
type SdkLanguage = "typescript" | "python";

export default function Quickstart() {
  const [installMethod, setInstallMethod] = useState<InstallMethod>("curl");
  const [sdkLanguage, setSdkLanguage] = useState<SdkLanguage>("typescript");

  return (
    <LearnLayout>
      <div className="mb-12">
        <p className="text-sm text-[#d4a574] font-medium mb-2">Chapter 2</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Quickstart
        </h1>
        <p className="text-lg text-[#a1a1a1] max-w-2xl">
          Get started with the Python or TypeScript Agent SDK to build AI agents that work autonomously.
        </p>
      </div>

      {/* Intro */}
      <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 md:p-8 mb-12">
        <p className="text-[#a1a1a1] mb-4">
          Use the Agent SDK to build an AI agent that reads your code, finds bugs, and fixes them—all without manual intervention.
        </p>
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-[#fafafa]">What you&apos;ll do:</h3>
          <ul className="space-y-2 text-[#a1a1a1]">
            <li className="flex items-start gap-2">
              <span className="text-[#d4a574] mt-0.5">•</span>
              <span>Set up a project with the Agent SDK</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#d4a574] mt-0.5">•</span>
              <span>Create a file with some buggy code</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#d4a574] mt-0.5">•</span>
              <span>Run an agent that finds and fixes the bugs automatically</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Prerequisites */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-4">Prerequisites</h3>
        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 bg-[#1a1a1a] border border-[#1f1f1f] rounded-lg text-sm text-[#a1a1a1]">
            Node.js 18+ or Python 3.10+
          </span>
          <a
            href="https://console.anthropic.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#1a1a1a] border border-[#1f1f1f] rounded-lg text-sm text-[#d4a574] hover:bg-[#252525] transition-colors"
          >
            An Anthropic account (sign up here) →
          </a>
        </div>
      </div>

      {/* Setup Steps */}
      <div className="space-y-8">
        <h3 className="text-xl font-semibold">Setup</h3>

        {/* Step 1: Install Claude Code */}
        <div className="flex gap-6">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#d4a574] text-[#0a0a0a] flex items-center justify-center font-bold text-lg shrink-0">
              1
            </div>
            <div className="w-px h-full bg-[#1f1f1f] mt-4" />
          </div>
          <div className="flex-1 pb-8">
            <h4 className="text-lg font-semibold mb-2">Install Claude Code</h4>
            <p className="text-[#a1a1a1] mb-4">
              The Agent SDK uses Claude Code as its runtime. Install it for your platform:
            </p>

            {/* Install method tabs */}
            <div className="flex gap-2 mb-4">
              {[
                { id: "curl" as const, label: "macOS/Linux/WSL" },
                { id: "homebrew" as const, label: "Homebrew" },
                { id: "winget" as const, label: "WinGet" },
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setInstallMethod(method.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    installMethod === method.id
                      ? "bg-[#d4a574] text-[#0a0a0a]"
                      : "bg-[#1a1a1a] text-[#a1a1a1] hover:bg-[#252525] hover:text-[#fafafa]"
                  }`}
                >
                  {method.label}
                </button>
              ))}
            </div>

            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4 font-mono text-sm">
              {installMethod === "curl" && (
                <span className="text-[#a1a1a1]">curl -fsSL https://claude.ai/install.sh | bash</span>
              )}
              {installMethod === "homebrew" && (
                <span className="text-[#a1a1a1]">brew install claude-code</span>
              )}
              {installMethod === "winget" && (
                <span className="text-[#a1a1a1]">winget install Anthropic.ClaudeCode</span>
              )}
            </div>

            <div className="mt-4 bg-[#111111] border border-[#1f1f1f] rounded-xl p-4">
              <p className="text-sm text-[#a1a1a1]">
                After installing Claude Code onto your machine, run{" "}
                <code className="text-[#d4a574] bg-[#d4a574]/10 px-1.5 py-0.5 rounded">claude</code>
                {" "}in your terminal and follow the prompts to authenticate. The SDK will use this authentication automatically.
              </p>
            </div>

            <p className="text-sm text-[#525252] mt-3">
              For more information on Claude Code installation, see{" "}
              <a href="#" className="text-[#d4a574] hover:underline">Claude Code setup</a>.
            </p>
          </div>
        </div>

        {/* Step 2: Create a project folder */}
        <div className="flex gap-6">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#d4a574] text-[#0a0a0a] flex items-center justify-center font-bold text-lg shrink-0">
              2
            </div>
            <div className="w-px h-full bg-[#1f1f1f] mt-4" />
          </div>
          <div className="flex-1 pb-8">
            <h4 className="text-lg font-semibold mb-2">Create a project folder</h4>
            <p className="text-[#a1a1a1] mb-4">
              Create a new directory for this quickstart:
            </p>

            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4 font-mono text-sm">
              <span className="text-[#a1a1a1]">mkdir my-agent && cd my-agent</span>
            </div>

            <p className="text-sm text-[#525252] mt-3">
              For your own projects, you can run the SDK from any folder; it will have access to files in that directory and its subdirectories by default.
            </p>
          </div>
        </div>

        {/* Step 3: Install the SDK */}
        <div className="flex gap-6">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#d4a574] text-[#0a0a0a] flex items-center justify-center font-bold text-lg shrink-0">
              3
            </div>
            <div className="w-px h-full bg-[#1f1f1f] mt-4" />
          </div>
          <div className="flex-1 pb-8">
            <h4 className="text-lg font-semibold mb-2">Install the SDK</h4>
            <p className="text-[#a1a1a1] mb-4">
              Install the Agent SDK package for your language:
            </p>

            {/* Language tabs */}
            <div className="flex gap-2 mb-4">
              {[
                { id: "typescript" as const, label: "TypeScript" },
                { id: "python" as const, label: "Python" },
              ].map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setSdkLanguage(lang.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    sdkLanguage === lang.id
                      ? "bg-[#d4a574] text-[#0a0a0a]"
                      : "bg-[#1a1a1a] text-[#a1a1a1] hover:bg-[#252525] hover:text-[#fafafa]"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4 font-mono text-sm">
              {sdkLanguage === "typescript" && (
                <span className="text-[#a1a1a1]">npm install @anthropic-ai/claude-agent-sdk</span>
              )}
              {sdkLanguage === "python" && (
                <span className="text-[#a1a1a1]">pip install claude-agent-sdk</span>
              )}
            </div>
          </div>
        </div>

        {/* Step 4: Set your API key */}
        <div className="flex gap-6">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#d4a574] text-[#0a0a0a] flex items-center justify-center font-bold text-lg shrink-0">
              4
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold mb-2">Set your API key</h4>
            <p className="text-[#a1a1a1] mb-4">
              If you&apos;ve already authenticated Claude Code (by running{" "}
              <code className="text-[#d4a574] bg-[#d4a574]/10 px-1.5 py-0.5 rounded">claude</code>
              {" "}in your terminal), the SDK uses that authentication automatically.
            </p>
            <p className="text-[#a1a1a1] mb-4">
              Otherwise, you need an API key, which you can get from the{" "}
              <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="text-[#d4a574] hover:underline">
                Claude Console
              </a>.
            </p>
            <p className="text-[#a1a1a1] mb-4">
              Create a <code className="text-[#d4a574] bg-[#d4a574]/10 px-1.5 py-0.5 rounded">.env</code> file in your project directory and store the API key there:
            </p>

            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4 font-mono text-sm mb-6">
              <span className="text-[#9cdcfe]">ANTHROPIC_API_KEY</span>
              <span className="text-[#fafafa]">=</span>
              <span className="text-[#ce9178]">your-api-key</span>
            </div>

            {/* Cloud providers callout */}
            <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-4 mb-4">
              <p className="text-sm text-[#a1a1a1]">
                <span className="text-[#fafafa] font-medium">Using Amazon Bedrock, Google Vertex AI, or Microsoft Azure?</span>{" "}
                See the setup guides for{" "}
                <a href="#" className="text-[#d4a574] hover:underline">Bedrock</a>,{" "}
                <a href="#" className="text-[#d4a574] hover:underline">Vertex AI</a>, or{" "}
                <a href="#" className="text-[#d4a574] hover:underline">Azure AI Foundry</a>.
              </p>
            </div>

            {/* Warning callout */}
            <div className="bg-[#1a1a1a] border border-[#d4a574]/30 rounded-xl p-4">
              <p className="text-sm text-[#a1a1a1]">
                <span className="text-[#d4a574]">Note:</span> Unless previously approved, Anthropic does not allow third party developers to offer claude.ai login or rate limits for their products, including agents built on the Claude Agent SDK. Please use the API key authentication methods described in this document instead.
              </p>
            </div>
          </div>
        </div>
      </div>

      <ChapterNavigation currentChapterId="quickstart" />
    </LearnLayout>
  );
}
