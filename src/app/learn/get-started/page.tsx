"use client";

import { useState } from "react";
import { LearnLayout, ChapterNavigation, CodeBlock } from "../components";

type InstallMethod = "curl" | "homebrew" | "winget";
type SdkLanguage = "typescript" | "python";
type CompareTab = "client-sdk" | "cli";

export default function GetStarted() {
  const [installMethod, setInstallMethod] = useState<InstallMethod>("curl");
  const [sdkLanguage, setSdkLanguage] = useState<SdkLanguage>("typescript");
  const [compareTab, setCompareTab] = useState<CompareTab>("client-sdk");

  return (
    <LearnLayout>
      <div className="mb-12">
        <p className="text-sm text-[#d4a574] font-medium mb-2">Chapter 7</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Get Started
        </h1>
        <p className="text-lg text-[#a1a1a1] max-w-2xl">
          Set up the Claude Agents SDK in four simple steps.
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-12">
        {/* Step 1: Install Claude Code */}
        <div className="flex gap-6">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#d4a574] text-[#0a0a0a] flex items-center justify-center font-bold text-lg shrink-0">
              1
            </div>
            <div className="w-px h-full bg-[#1f1f1f] mt-4" />
          </div>
          <div className="flex-1 pb-8">
            <h3 className="text-xl font-semibold mb-2">Install Claude Code</h3>
            <p className="text-[#a1a1a1] mb-4">
              The SDK uses Claude Code as its runtime:
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

            <p className="text-sm text-[#525252] mt-3">
              See Claude Code setup for Windows and other options.
            </p>
          </div>
        </div>

        {/* Step 2: Install the SDK */}
        <div className="flex gap-6">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#d4a574] text-[#0a0a0a] flex items-center justify-center font-bold text-lg shrink-0">
              2
            </div>
            <div className="w-px h-full bg-[#1f1f1f] mt-4" />
          </div>
          <div className="flex-1 pb-8">
            <h3 className="text-xl font-semibold mb-2">Install the SDK</h3>

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

        {/* Step 3: Set your API key */}
        <div className="flex gap-6">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#d4a574] text-[#0a0a0a] flex items-center justify-center font-bold text-lg shrink-0">
              3
            </div>
            <div className="w-px h-full bg-[#1f1f1f] mt-4" />
          </div>
          <div className="flex-1 pb-8">
            <h3 className="text-xl font-semibold mb-2">Set your API key</h3>

            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4 font-mono text-sm mb-4">
              <span className="text-[#c586c0]">export</span>
              <span className="text-[#a1a1a1]"> ANTHROPIC_API_KEY=</span>
              <span className="text-[#ce9178]">your-api-key</span>
            </div>

            <p className="text-sm text-[#a1a1a1] mb-4">
              Get your key from the{" "}
              <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="text-[#d4a574] hover:underline">
                Console
              </a>.
            </p>

            {/* Third-party providers */}
            <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-4">
              <p className="text-sm text-[#737373] mb-3">
                The SDK also supports authentication via third-party API providers:
              </p>
              <ul className="space-y-2 text-sm text-[#a1a1a1]">
                <li className="flex items-start gap-2">
                  <span className="text-[#d4a574] mt-0.5">•</span>
                  <span>
                    <strong className="text-[#fafafa]">Amazon Bedrock:</strong> set{" "}
                    <code className="text-[#d4a574] text-xs">CLAUDE_CODE_USE_BEDROCK=1</code>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d4a574] mt-0.5">•</span>
                  <span>
                    <strong className="text-[#fafafa]">Google Vertex AI:</strong> set{" "}
                    <code className="text-[#d4a574] text-xs">CLAUDE_CODE_USE_VERTEX=1</code>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d4a574] mt-0.5">•</span>
                  <span>
                    <strong className="text-[#fafafa]">Microsoft Foundry:</strong> set{" "}
                    <code className="text-[#d4a574] text-xs">CLAUDE_CODE_USE_FOUNDRY=1</code>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Step 4: Run your first agent */}
        <div className="flex gap-6">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#d4a574] text-[#0a0a0a] flex items-center justify-center font-bold text-lg shrink-0">
              4
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">Run your first agent</h3>
            <p className="text-[#a1a1a1] mb-4">
              This example creates an agent that lists files in your current directory using built-in tools.
            </p>

            <CodeBlock filename="first-agent.ts">
              <span className="text-[#c586c0]">import</span>
              <span className="text-[#fafafa]">{" { "}</span>
              <span className="text-[#9cdcfe]">query</span>
              <span className="text-[#fafafa]">{" } "}</span>
              <span className="text-[#c586c0]">from</span>
              <span className="text-[#ce9178]">{" \"@anthropic-ai/claude-agent-sdk\""}</span>
              <span className="text-[#fafafa]">;</span>
              {"\n\n"}
              <span className="text-[#c586c0]">for await</span>
              <span className="text-[#fafafa]"> (</span>
              <span className="text-[#c586c0]">const</span>
              <span className="text-[#9cdcfe]"> message</span>
              <span className="text-[#c586c0]"> of</span>
              <span className="text-[#fafafa]"> </span>
              <span className="text-[#dcdcaa]">query</span>
              <span className="text-[#fafafa]">({"{"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  "}</span>
              <span className="text-[#9cdcfe]">prompt</span>
              <span className="text-[#fafafa]">: </span>
              <span className="text-[#ce9178]">&quot;What files are in this directory?&quot;</span>
              <span className="text-[#fafafa]">,</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  "}</span>
              <span className="text-[#9cdcfe]">options</span>
              <span className="text-[#fafafa]">: {"{ "}</span>
              <span className="text-[#9cdcfe]">allowedTools</span>
              <span className="text-[#fafafa]">: [</span>
              <span className="text-[#ce9178]">&quot;Bash&quot;</span>
              <span className="text-[#fafafa]">, </span>
              <span className="text-[#ce9178]">&quot;Glob&quot;</span>
              <span className="text-[#fafafa]">] {"}"}</span>
              <span className="text-[#fafafa]">,</span>
              {"\n"}
              <span className="text-[#fafafa]">{"})) {"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  "}</span>
              <span className="text-[#c586c0]">if</span>
              <span className="text-[#fafafa]"> (</span>
              <span className="text-[#ce9178]">&quot;result&quot;</span>
              <span className="text-[#c586c0]"> in</span>
              <span className="text-[#9cdcfe]"> message</span>
              <span className="text-[#fafafa]">) </span>
              <span className="text-[#9cdcfe]">console</span>
              <span className="text-[#fafafa]">.</span>
              <span className="text-[#dcdcaa]">log</span>
              <span className="text-[#fafafa]">(</span>
              <span className="text-[#9cdcfe]">message</span>
              <span className="text-[#fafafa]">.</span>
              <span className="text-[#9cdcfe]">result</span>
              <span className="text-[#fafafa]">);</span>
              {"\n"}
              <span className="text-[#fafafa]">{"}"}</span>
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Compare section */}
      <div className="mt-20 pt-12 border-t border-[#1f1f1f]">
        <h3 className="text-2xl font-bold mb-3">Compare the Agent SDK to other Claude tools</h3>
        <p className="text-[#a1a1a1] mb-8">
          The Claude platform offers multiple ways to build with Claude. Here&apos;s how the Agent SDK fits in:
        </p>

        {/* Compare tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { id: "client-sdk" as const, label: "Agent SDK vs Client SDK" },
            { id: "cli" as const, label: "Agent SDK vs Claude Code CLI" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCompareTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                compareTab === tab.id
                  ? "bg-[#d4a574] text-[#0a0a0a]"
                  : "bg-[#1a1a1a] text-[#a1a1a1] hover:bg-[#252525] hover:text-[#fafafa]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Compare content */}
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 md:p-8">
          {compareTab === "client-sdk" && (
            <div className="space-y-6">
              <p className="text-[#a1a1a1]">
                The Anthropic Client SDK gives you direct API access: you send prompts and implement tool execution yourself. The Agent SDK gives you Claude with built-in tool execution.
              </p>
              <p className="text-[#a1a1a1]">
                With the Client SDK, you implement a tool loop. With the Agent SDK, Claude handles it.
              </p>
            </div>
          )}

          {compareTab === "cli" && (
            <div className="space-y-6">
              <p className="text-[#a1a1a1]">
                Same capabilities, different interface:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#1f1f1f]">
                      <th className="text-left py-3 pr-4 text-[#737373] font-medium">Use case</th>
                      <th className="text-left py-3 text-[#737373] font-medium">Best choice</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#1f1f1f]/50">
                      <td className="py-3 pr-4 text-[#a1a1a1]">Interactive development</td>
                      <td className="py-3">
                        <code className="text-[#d4a574] bg-[#d4a574]/10 px-2 py-0.5 rounded">CLI</code>
                      </td>
                    </tr>
                    <tr className="border-b border-[#1f1f1f]/50">
                      <td className="py-3 pr-4 text-[#a1a1a1]">CI/CD pipelines</td>
                      <td className="py-3">
                        <code className="text-[#d4a574] bg-[#d4a574]/10 px-2 py-0.5 rounded">SDK</code>
                      </td>
                    </tr>
                    <tr className="border-b border-[#1f1f1f]/50">
                      <td className="py-3 pr-4 text-[#a1a1a1]">Custom applications</td>
                      <td className="py-3">
                        <code className="text-[#d4a574] bg-[#d4a574]/10 px-2 py-0.5 rounded">SDK</code>
                      </td>
                    </tr>
                    <tr className="border-b border-[#1f1f1f]/50">
                      <td className="py-3 pr-4 text-[#a1a1a1]">One-off tasks</td>
                      <td className="py-3">
                        <code className="text-[#d4a574] bg-[#d4a574]/10 px-2 py-0.5 rounded">CLI</code>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-[#a1a1a1]">Production automation</td>
                      <td className="py-3">
                        <code className="text-[#d4a574] bg-[#d4a574]/10 px-2 py-0.5 rounded">SDK</code>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-sm text-[#737373]">
                Many teams use both: CLI for daily development, SDK for production.
              </p>
            </div>
          )}
        </div>
      </div>

      <ChapterNavigation currentChapterId="get-started" />
    </LearnLayout>
  );
}
