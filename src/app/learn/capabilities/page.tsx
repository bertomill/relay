"use client";

import { useState } from "react";
import { LearnLayout, ChapterNavigation, CodeBlock } from "../components";

type CapabilityTab = "tools" | "hooks" | "subagents" | "mcp" | "permissions" | "sessions";

const tools = [
  { name: "Read", description: "Read any file in the working directory" },
  { name: "Write", description: "Create new files" },
  { name: "Edit", description: "Make precise edits to existing files" },
  { name: "Bash", description: "Run terminal commands, scripts, git operations" },
  { name: "Glob", description: "Find files by pattern (**/*.ts, src/**/*.py)" },
  { name: "Grep", description: "Search file contents with regex" },
  { name: "WebSearch", description: "Search the web for current information" },
  { name: "WebFetch", description: "Fetch and parse web page content" },
  { name: "AskUserQuestion", description: "Ask the user clarifying questions with multiple choice options" },
];

const capabilityTabs: { id: CapabilityTab; label: string }[] = [
  { id: "tools", label: "Built-in tools" },
  { id: "hooks", label: "Hooks" },
  { id: "subagents", label: "Subagents" },
  { id: "mcp", label: "MCP" },
  { id: "permissions", label: "Permissions" },
  { id: "sessions", label: "Sessions" },
];

export default function Capabilities() {
  const [activeCapability, setActiveCapability] = useState<CapabilityTab>("tools");

  return (
    <LearnLayout>
      <div className="mb-12">
        <p className="text-sm text-[#d4a574] font-medium mb-2">Chapter 5</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Capabilities
        </h1>
        <p className="text-lg text-[#a1a1a1] max-w-2xl">
          Everything that makes Claude Code powerful is available in the SDK:
        </p>
      </div>

      {/* Capability tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {capabilityTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCapability(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              activeCapability === tab.id
                ? "bg-[#d4a574] text-[#0a0a0a]"
                : "bg-[#1a1a1a] text-[#a1a1a1] hover:bg-[#252525] hover:text-[#fafafa]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Capability content */}
      <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 md:p-8">
        {/* Built-in tools */}
        {activeCapability === "tools" && (
          <div className="space-y-6">
            <p className="text-[#a1a1a1]">
              Your agent can read files, run commands, and search codebases out of the box. Key tools include:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1f1f1f]">
                    <th className="text-left py-3 pr-4 text-[#737373] font-medium">Tool</th>
                    <th className="text-left py-3 text-[#737373] font-medium">What it does</th>
                  </tr>
                </thead>
                <tbody>
                  {tools.map((tool) => (
                    <tr key={tool.name} className="border-b border-[#1f1f1f]/50">
                      <td className="py-3 pr-4">
                        <code className="text-[#d4a574] bg-[#d4a574]/10 px-2 py-0.5 rounded">
                          {tool.name}
                        </code>
                      </td>
                      <td className="py-3 text-[#a1a1a1]">{tool.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Hooks */}
        {activeCapability === "hooks" && (
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-[#a1a1a1]">
                Run custom code at key points in the agent lifecycle. SDK hooks use callback functions to validate, log, block, or transform agent behavior.
              </p>
              <p className="text-sm text-[#737373]">
                Available hooks: <code className="text-[#d4a574]">PreToolUse</code>, <code className="text-[#d4a574]">PostToolUse</code>, <code className="text-[#d4a574]">Stop</code>, <code className="text-[#d4a574]">SessionStart</code>, <code className="text-[#d4a574]">SessionEnd</code>, <code className="text-[#d4a574]">UserPromptSubmit</code>, and more.
              </p>
            </div>
            <p className="text-sm text-[#737373]">This example logs all file changes to an audit file:</p>
            <CodeBlock filename="hooks-example.ts">
              <span className="text-[#c586c0]">const</span>
              <span className="text-[#9cdcfe]"> logFileChange</span>
              <span className="text-[#fafafa]">: </span>
              <span className="text-[#4ec9b0]">HookCallback</span>
              <span className="text-[#fafafa]"> = </span>
              <span className="text-[#c586c0]">async</span>
              <span className="text-[#fafafa]"> (</span>
              <span className="text-[#9cdcfe]">input</span>
              <span className="text-[#fafafa]">) =&gt; {"{"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  "}</span>
              <span className="text-[#c586c0]">const</span>
              <span className="text-[#9cdcfe]"> filePath</span>
              <span className="text-[#fafafa]"> = </span>
              <span className="text-[#9cdcfe]">input</span>
              <span className="text-[#fafafa]">.</span>
              <span className="text-[#9cdcfe]">tool_input</span>
              <span className="text-[#fafafa]">?.</span>
              <span className="text-[#9cdcfe]">file_path</span>
              <span className="text-[#fafafa]">;</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  "}</span>
              <span className="text-[#dcdcaa]">appendFileSync</span>
              <span className="text-[#fafafa]">(</span>
              <span className="text-[#ce9178]">&quot;./audit.log&quot;</span>
              <span className="text-[#fafafa]">, </span>
              <span className="text-[#ce9178]">{"`Modified: ${filePath}\\n`"}</span>
              <span className="text-[#fafafa]">);</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  "}</span>
              <span className="text-[#c586c0]">return</span>
              <span className="text-[#fafafa]"> {"{}"};</span>
              {"\n"}
              <span className="text-[#fafafa]">{"}"};</span>
            </CodeBlock>
          </div>
        )}

        {/* Subagents */}
        {activeCapability === "subagents" && (
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-[#a1a1a1]">
                Spawn specialized agents to handle focused subtasks. Your main agent delegates work, and subagents report back with results.
              </p>
              <p className="text-sm text-[#737373]">
                Define custom agents with specialized instructions. Include <code className="text-[#d4a574]">Task</code> in allowedTools since subagents are invoked via the Task tool:
              </p>
            </div>
            <CodeBlock filename="subagents-example.ts">
              <span className="text-[#9cdcfe]">options</span>
              <span className="text-[#fafafa]">: {"{"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  "}</span>
              <span className="text-[#9cdcfe]">allowedTools</span>
              <span className="text-[#fafafa]">: [</span>
              <span className="text-[#ce9178]">&quot;Read&quot;</span>
              <span className="text-[#fafafa]">, </span>
              <span className="text-[#ce9178]">&quot;Glob&quot;</span>
              <span className="text-[#fafafa]">, </span>
              <span className="text-[#ce9178]">&quot;Task&quot;</span>
              <span className="text-[#fafafa]">],</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  "}</span>
              <span className="text-[#9cdcfe]">agents</span>
              <span className="text-[#fafafa]">: {"{"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"    "}</span>
              <span className="text-[#ce9178]">&quot;code-reviewer&quot;</span>
              <span className="text-[#fafafa]">: {"{"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"      "}</span>
              <span className="text-[#9cdcfe]">description</span>
              <span className="text-[#fafafa]">: </span>
              <span className="text-[#ce9178]">&quot;Expert code reviewer&quot;</span>
              <span className="text-[#fafafa]">,</span>
              {"\n"}
              <span className="text-[#fafafa]">{"      "}</span>
              <span className="text-[#9cdcfe]">prompt</span>
              <span className="text-[#fafafa]">: </span>
              <span className="text-[#ce9178]">&quot;Analyze code quality...&quot;</span>
              <span className="text-[#fafafa]">,</span>
              {"\n"}
              <span className="text-[#fafafa]">{"      "}</span>
              <span className="text-[#9cdcfe]">tools</span>
              <span className="text-[#fafafa]">: [</span>
              <span className="text-[#ce9178]">&quot;Read&quot;</span>
              <span className="text-[#fafafa]">, </span>
              <span className="text-[#ce9178]">&quot;Glob&quot;</span>
              <span className="text-[#fafafa]">]</span>
              {"\n"}
              <span className="text-[#fafafa]">{"    }"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  }"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"}"}</span>
            </CodeBlock>
          </div>
        )}

        {/* MCP */}
        {activeCapability === "mcp" && (
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-[#a1a1a1]">
                Connect to external systems via the Model Context Protocol: databases, browsers, APIs, and hundreds more.
              </p>
              <p className="text-sm text-[#737373]">
                This example connects the Playwright MCP server to give your agent browser automation capabilities:
              </p>
            </div>
            <CodeBlock filename="mcp-example.ts">
              <span className="text-[#9cdcfe]">options</span>
              <span className="text-[#fafafa]">: {"{"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  "}</span>
              <span className="text-[#9cdcfe]">mcpServers</span>
              <span className="text-[#fafafa]">: {"{"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"    "}</span>
              <span className="text-[#9cdcfe]">playwright</span>
              <span className="text-[#fafafa]">: {"{"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"      "}</span>
              <span className="text-[#9cdcfe]">command</span>
              <span className="text-[#fafafa]">: </span>
              <span className="text-[#ce9178]">&quot;npx&quot;</span>
              <span className="text-[#fafafa]">,</span>
              {"\n"}
              <span className="text-[#fafafa]">{"      "}</span>
              <span className="text-[#9cdcfe]">args</span>
              <span className="text-[#fafafa]">: [</span>
              <span className="text-[#ce9178]">&quot;@playwright/mcp@latest&quot;</span>
              <span className="text-[#fafafa]">]</span>
              {"\n"}
              <span className="text-[#fafafa]">{"    }"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  }"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"}"}</span>
            </CodeBlock>
          </div>
        )}

        {/* Permissions */}
        {activeCapability === "permissions" && (
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-[#a1a1a1]">
                Control exactly which tools your agent can use. Allow safe operations, block dangerous ones, or require approval for sensitive actions.
              </p>
              <p className="text-sm text-[#737373]">
                This example creates a read-only agent that can analyze but not modify code:
              </p>
            </div>
            <CodeBlock filename="permissions-example.ts">
              <span className="text-[#9cdcfe]">options</span>
              <span className="text-[#fafafa]">: {"{"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  "}</span>
              <span className="text-[#9cdcfe]">allowedTools</span>
              <span className="text-[#fafafa]">: [</span>
              <span className="text-[#ce9178]">&quot;Read&quot;</span>
              <span className="text-[#fafafa]">, </span>
              <span className="text-[#ce9178]">&quot;Glob&quot;</span>
              <span className="text-[#fafafa]">, </span>
              <span className="text-[#ce9178]">&quot;Grep&quot;</span>
              <span className="text-[#fafafa]">],</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  "}</span>
              <span className="text-[#9cdcfe]">permissionMode</span>
              <span className="text-[#fafafa]">: </span>
              <span className="text-[#ce9178]">&quot;bypassPermissions&quot;</span>
              {"\n"}
              <span className="text-[#fafafa]">{"}"}</span>
            </CodeBlock>
          </div>
        )}

        {/* Sessions */}
        {activeCapability === "sessions" && (
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-[#a1a1a1]">
                Maintain context across multiple exchanges. Claude remembers files read, analysis done, and conversation history. Resume sessions later, or fork them to explore different approaches.
              </p>
              <p className="text-sm text-[#737373]">
                This example captures the session ID from the first query, then resumes to continue with full context:
              </p>
            </div>
            <CodeBlock filename="sessions-example.ts">
              <span className="text-[#6a9955]">{"// First query: capture the session ID"}</span>
              {"\n"}
              <span className="text-[#c586c0]">let</span>
              <span className="text-[#9cdcfe]"> sessionId</span>
              <span className="text-[#fafafa]">;</span>
              {"\n"}
              <span className="text-[#c586c0]">for await</span>
              <span className="text-[#fafafa]"> (</span>
              <span className="text-[#c586c0]">const</span>
              <span className="text-[#9cdcfe]"> msg</span>
              <span className="text-[#c586c0]"> of</span>
              <span className="text-[#fafafa]"> </span>
              <span className="text-[#dcdcaa]">query</span>
              <span className="text-[#fafafa]">({"{ "}</span>
              <span className="text-[#9cdcfe]">prompt</span>
              <span className="text-[#fafafa]">: </span>
              <span className="text-[#ce9178]">&quot;Read auth module&quot;</span>
              <span className="text-[#fafafa]">{" }"})) {"{"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  "}</span>
              <span className="text-[#c586c0]">if</span>
              <span className="text-[#fafafa]"> (</span>
              <span className="text-[#9cdcfe]">msg</span>
              <span className="text-[#fafafa]">.</span>
              <span className="text-[#9cdcfe]">type</span>
              <span className="text-[#fafafa]"> === </span>
              <span className="text-[#ce9178]">&quot;system&quot;</span>
              <span className="text-[#fafafa]">) </span>
              <span className="text-[#9cdcfe]">sessionId</span>
              <span className="text-[#fafafa]"> = </span>
              <span className="text-[#9cdcfe]">msg</span>
              <span className="text-[#fafafa]">.</span>
              <span className="text-[#9cdcfe]">session_id</span>
              <span className="text-[#fafafa]">;</span>
              {"\n"}
              <span className="text-[#fafafa]">{"}"}</span>
              {"\n\n"}
              <span className="text-[#6a9955]">{"// Resume with full context"}</span>
              {"\n"}
              <span className="text-[#c586c0]">for await</span>
              <span className="text-[#fafafa]"> (</span>
              <span className="text-[#c586c0]">const</span>
              <span className="text-[#9cdcfe]"> msg</span>
              <span className="text-[#c586c0]"> of</span>
              <span className="text-[#fafafa]"> </span>
              <span className="text-[#dcdcaa]">query</span>
              <span className="text-[#fafafa]">({"{"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  "}</span>
              <span className="text-[#9cdcfe]">prompt</span>
              <span className="text-[#fafafa]">: </span>
              <span className="text-[#ce9178]">&quot;Now find all places that call it&quot;</span>
              <span className="text-[#fafafa]">,</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  "}</span>
              <span className="text-[#9cdcfe]">options</span>
              <span className="text-[#fafafa]">: {"{ "}</span>
              <span className="text-[#9cdcfe]">resume</span>
              <span className="text-[#fafafa]">: </span>
              <span className="text-[#9cdcfe]">sessionId</span>
              <span className="text-[#fafafa]">{" }"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"})) {"}</span>
              <span className="text-[#9cdcfe]">console</span>
              <span className="text-[#fafafa]">.</span>
              <span className="text-[#dcdcaa]">log</span>
              <span className="text-[#fafafa]">(</span>
              <span className="text-[#9cdcfe]">msg</span>
              <span className="text-[#fafafa]">); {"}"}</span>
            </CodeBlock>
          </div>
        )}
      </div>

      <ChapterNavigation currentChapterId="capabilities" />
    </LearnLayout>
  );
}
