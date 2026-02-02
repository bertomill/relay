"use client";

import { LearnLayout, ChapterNavigation } from "../components";

export default function Types() {
  return (
    <LearnLayout>
      <div className="mb-12">
        <p className="text-sm text-[#d4a574] font-medium mb-2">Chapter 4</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Types
        </h1>
        <p className="text-lg text-[#a1a1a1] max-w-2xl">
          TypeScript type definitions for the Claude Agent SDK.
        </p>
      </div>

      {/* Options Type */}
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">Options</code>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Configuration object for the <code className="text-[#d4a574] bg-[#d4a574]/10 px-1.5 py-0.5 rounded">query()</code> function.
          </p>

          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1f1f1f] bg-[#0d0d0d]">
                    <th className="text-left py-3 px-4 text-[#737373] font-medium whitespace-nowrap">Property</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium whitespace-nowrap">Type</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium whitespace-nowrap">Default</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f1f]/50">
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">abortController</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">AbortController</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">new AbortController()</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Controller for cancelling operations</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">additionalDirectories</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string[]</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">[]</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Additional directories Claude can access</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">agents</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">Record&lt;string, AgentDefinition&gt;</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">undefined</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Programmatically define subagents</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">allowDangerouslySkipPermissions</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">boolean</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">false</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Enable bypassing permissions. Required when using <code className="text-[#d4a574] text-xs">permissionMode: &apos;bypassPermissions&apos;</code></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">allowedTools</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string[]</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">All tools</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">List of allowed tool names</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">betas</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">SdkBeta[]</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">[]</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Enable beta features (e.g., <code className="text-[#d4a574] text-xs">[&apos;context-1m-2025-08-07&apos;]</code>)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">canUseTool</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">CanUseTool</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">undefined</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Custom permission function for tool usage</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">continue</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">boolean</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">false</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Continue the most recent conversation</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">cwd</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">process.cwd()</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Current working directory</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">disallowedTools</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string[]</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">[]</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">List of disallowed tool names</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">enableFileCheckpointing</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">boolean</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">false</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Enable file change tracking for rewinding</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">env</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">Dict&lt;string&gt;</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">process.env</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Environment variables</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">executable</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">&apos;bun&apos; | &apos;deno&apos; | &apos;node&apos;</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">Auto-detected</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">JavaScript runtime to use</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">executableArgs</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string[]</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">[]</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Arguments to pass to the executable</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">extraArgs</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">Record&lt;string, string | null&gt;</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">{"{}"}</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Additional arguments</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">fallbackModel</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">undefined</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Model to use if primary fails</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">forkSession</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">boolean</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">false</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">When resuming, fork to a new session ID instead of continuing the original</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">hooks</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">Partial&lt;Record&lt;HookEvent, HookCallbackMatcher[]&gt;&gt;</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">{"{}"}</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Hook callbacks for events</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">includePartialMessages</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">boolean</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">false</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Include partial message events</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">maxBudgetUsd</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">number</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">undefined</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Maximum budget in USD for the query</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">maxThinkingTokens</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">number</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">undefined</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Maximum tokens for thinking process</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">maxTurns</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">number</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">undefined</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Maximum conversation turns</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">mcpServers</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">Record&lt;string, McpServerConfig&gt;</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">{"{}"}</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">MCP server configurations</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">model</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">Default from CLI</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Claude model to use</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">outputFormat</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">{"{ type: 'json_schema', schema: JSONSchema }"}</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">undefined</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Define output format for structured results</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">pathToClaudeCodeExecutable</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">Built-in executable</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Path to Claude Code executable</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">permissionMode</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">PermissionMode</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">&apos;default&apos;</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Permission mode for the session</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">permissionPromptToolName</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">undefined</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">MCP tool name for permission prompts</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">plugins</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">SdkPluginConfig[]</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">[]</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Load custom plugins from local paths</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">resume</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">undefined</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Session ID to resume</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">resumeSessionAt</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">undefined</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Resume session at a specific message UUID</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">sandbox</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">SandboxSettings</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">undefined</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Configure sandbox behavior programmatically</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">settingSources</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">SettingSource[]</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">[]</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Control which filesystem settings to load. Must include &apos;project&apos; to load CLAUDE.md files</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">stderr</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">(data: string) =&gt; void</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">undefined</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Callback for stderr output</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">strictMcpConfig</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">boolean</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">false</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Enforce strict MCP validation</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">systemPrompt</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string | {"{ type: 'preset', preset: 'claude_code', append?: string }"}</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">undefined</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">System prompt configuration. Use preset object form to extend Claude Code&apos;s system prompt</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">tools</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string[] | {"{ type: 'preset', preset: 'claude_code' }"}</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs whitespace-nowrap">undefined</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Tools available to the agent</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Query Interface */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">Query</code>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Interface returned by the <code className="text-[#d4a574] bg-[#d4a574]/10 px-1.5 py-0.5 rounded">query()</code> function.
          </p>

          {/* Interface definition */}
          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden mb-8">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#1f1f1f]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-xs text-[#737373]">Query.ts</span>
            </div>
            <pre className="p-4 text-sm font-mono overflow-x-auto">
              <code>
                <span className="text-[#c586c0]">interface</span>
                <span className="text-[#4ec9b0]"> Query</span>
                <span className="text-[#c586c0]"> extends</span>
                <span className="text-[#4ec9b0]"> AsyncGenerator</span>
                <span className="text-[#fafafa]">&lt;</span>
                <span className="text-[#4ec9b0]">SDKMessage</span>
                <span className="text-[#fafafa]">, </span>
                <span className="text-[#4ec9b0]">void</span>
                <span className="text-[#fafafa]">&gt; {"{"}</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  "}</span>
                <span className="text-[#dcdcaa]">interrupt</span>
                <span className="text-[#fafafa]">(): </span>
                <span className="text-[#4ec9b0]">Promise</span>
                <span className="text-[#fafafa]">&lt;</span>
                <span className="text-[#4ec9b0]">void</span>
                <span className="text-[#fafafa]">&gt;;</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  "}</span>
                <span className="text-[#dcdcaa]">rewindFiles</span>
                <span className="text-[#fafafa]">(</span>
                <span className="text-[#9cdcfe]">userMessageUuid</span>
                <span className="text-[#fafafa]">: </span>
                <span className="text-[#4ec9b0]">string</span>
                <span className="text-[#fafafa]">): </span>
                <span className="text-[#4ec9b0]">Promise</span>
                <span className="text-[#fafafa]">&lt;</span>
                <span className="text-[#4ec9b0]">void</span>
                <span className="text-[#fafafa]">&gt;;</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  "}</span>
                <span className="text-[#dcdcaa]">setPermissionMode</span>
                <span className="text-[#fafafa]">(</span>
                <span className="text-[#9cdcfe]">mode</span>
                <span className="text-[#fafafa]">: </span>
                <span className="text-[#4ec9b0]">PermissionMode</span>
                <span className="text-[#fafafa]">): </span>
                <span className="text-[#4ec9b0]">Promise</span>
                <span className="text-[#fafafa]">&lt;</span>
                <span className="text-[#4ec9b0]">void</span>
                <span className="text-[#fafafa]">&gt;;</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  "}</span>
                <span className="text-[#dcdcaa]">setModel</span>
                <span className="text-[#fafafa]">(</span>
                <span className="text-[#9cdcfe]">model</span>
                <span className="text-[#fafafa]">?: </span>
                <span className="text-[#4ec9b0]">string</span>
                <span className="text-[#fafafa]">): </span>
                <span className="text-[#4ec9b0]">Promise</span>
                <span className="text-[#fafafa]">&lt;</span>
                <span className="text-[#4ec9b0]">void</span>
                <span className="text-[#fafafa]">&gt;;</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  "}</span>
                <span className="text-[#dcdcaa]">setMaxThinkingTokens</span>
                <span className="text-[#fafafa]">(</span>
                <span className="text-[#9cdcfe]">maxThinkingTokens</span>
                <span className="text-[#fafafa]">: </span>
                <span className="text-[#4ec9b0]">number</span>
                <span className="text-[#fafafa]"> | </span>
                <span className="text-[#4ec9b0]">null</span>
                <span className="text-[#fafafa]">): </span>
                <span className="text-[#4ec9b0]">Promise</span>
                <span className="text-[#fafafa]">&lt;</span>
                <span className="text-[#4ec9b0]">void</span>
                <span className="text-[#fafafa]">&gt;;</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  "}</span>
                <span className="text-[#dcdcaa]">supportedCommands</span>
                <span className="text-[#fafafa]">(): </span>
                <span className="text-[#4ec9b0]">Promise</span>
                <span className="text-[#fafafa]">&lt;</span>
                <span className="text-[#4ec9b0]">SlashCommand</span>
                <span className="text-[#fafafa]">[]&gt;;</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  "}</span>
                <span className="text-[#dcdcaa]">supportedModels</span>
                <span className="text-[#fafafa]">(): </span>
                <span className="text-[#4ec9b0]">Promise</span>
                <span className="text-[#fafafa]">&lt;</span>
                <span className="text-[#4ec9b0]">ModelInfo</span>
                <span className="text-[#fafafa]">[]&gt;;</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  "}</span>
                <span className="text-[#dcdcaa]">mcpServerStatus</span>
                <span className="text-[#fafafa]">(): </span>
                <span className="text-[#4ec9b0]">Promise</span>
                <span className="text-[#fafafa]">&lt;</span>
                <span className="text-[#4ec9b0]">McpServerStatus</span>
                <span className="text-[#fafafa]">[]&gt;;</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  "}</span>
                <span className="text-[#dcdcaa]">accountInfo</span>
                <span className="text-[#fafafa]">(): </span>
                <span className="text-[#4ec9b0]">Promise</span>
                <span className="text-[#fafafa]">&lt;</span>
                <span className="text-[#4ec9b0]">AccountInfo</span>
                <span className="text-[#fafafa]">&gt;;</span>
                {"\n"}
                <span className="text-[#fafafa]">{"}"}</span>
              </code>
            </pre>
          </div>

          {/* Methods table */}
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#1f1f1f]">
              <h4 className="text-sm font-medium text-[#737373]">Methods</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1f1f1f] bg-[#0d0d0d]">
                    <th className="text-left py-3 px-4 text-[#737373] font-medium whitespace-nowrap">Method</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f1f]/50">
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">interrupt()</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Interrupts the query (only available in streaming input mode)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">rewindFiles(userMessageUuid)</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Restores files to their state at the specified user message. Requires <code className="text-[#d4a574] text-xs">enableFileCheckpointing: true</code></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">setPermissionMode(mode)</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Changes the permission mode (only available in streaming input mode)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">setModel(model)</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Changes the model (only available in streaming input mode)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">setMaxThinkingTokens(maxThinkingTokens)</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Changes the maximum thinking tokens (only available in streaming input mode)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">supportedCommands()</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Returns available slash commands</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">supportedModels()</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Returns available models with display info</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">mcpServerStatus()</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Returns status of connected MCP servers</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">accountInfo()</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Returns account information</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* AgentDefinition Type */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">AgentDefinition</code>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Configuration for a subagent defined programmatically.
          </p>

          {/* Type definition */}
          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden mb-8">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#1f1f1f]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-xs text-[#737373]">AgentDefinition.ts</span>
            </div>
            <pre className="p-4 text-sm font-mono overflow-x-auto">
              <code>
                <span className="text-[#c586c0]">type</span>
                <span className="text-[#4ec9b0]"> AgentDefinition</span>
                <span className="text-[#fafafa]"> = {"{"}</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  "}</span>
                <span className="text-[#9cdcfe]">description</span>
                <span className="text-[#fafafa]">: </span>
                <span className="text-[#4ec9b0]">string</span>
                <span className="text-[#fafafa]">;</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  "}</span>
                <span className="text-[#9cdcfe]">tools</span>
                <span className="text-[#fafafa]">?: </span>
                <span className="text-[#4ec9b0]">string</span>
                <span className="text-[#fafafa]">[];</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  "}</span>
                <span className="text-[#9cdcfe]">prompt</span>
                <span className="text-[#fafafa]">: </span>
                <span className="text-[#4ec9b0]">string</span>
                <span className="text-[#fafafa]">;</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  "}</span>
                <span className="text-[#9cdcfe]">model</span>
                <span className="text-[#fafafa]">?: </span>
                <span className="text-[#ce9178]">&apos;sonnet&apos;</span>
                <span className="text-[#fafafa]"> | </span>
                <span className="text-[#ce9178]">&apos;opus&apos;</span>
                <span className="text-[#fafafa]"> | </span>
                <span className="text-[#ce9178]">&apos;haiku&apos;</span>
                <span className="text-[#fafafa]"> | </span>
                <span className="text-[#ce9178]">&apos;inherit&apos;</span>
                <span className="text-[#fafafa]">;</span>
                {"\n"}
                <span className="text-[#fafafa]">{"}"}</span>
              </code>
            </pre>
          </div>

          {/* Fields table */}
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1f1f1f] bg-[#0d0d0d]">
                    <th className="text-left py-3 px-4 text-[#737373] font-medium whitespace-nowrap">Field</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium whitespace-nowrap">Required</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f1f]/50">
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">description</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Yes</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Natural language description of when to use this agent</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">tools</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1]">No</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Array of allowed tool names. If omitted, inherits all tools</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">prompt</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Yes</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">The agent&apos;s system prompt</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">model</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1]">No</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Model override for this agent. If omitted, uses the main model</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SettingSource Type */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">SettingSource</code>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Controls which filesystem-based configuration sources the SDK loads settings from.
          </p>

          {/* Type definition */}
          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden mb-8">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#1f1f1f]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-xs text-[#737373]">SettingSource.ts</span>
            </div>
            <pre className="p-4 text-sm font-mono overflow-x-auto">
              <code>
                <span className="text-[#c586c0]">type</span>
                <span className="text-[#4ec9b0]"> SettingSource</span>
                <span className="text-[#fafafa]"> = </span>
                <span className="text-[#ce9178]">&apos;user&apos;</span>
                <span className="text-[#fafafa]"> | </span>
                <span className="text-[#ce9178]">&apos;project&apos;</span>
                <span className="text-[#fafafa]"> | </span>
                <span className="text-[#ce9178]">&apos;local&apos;</span>
                <span className="text-[#fafafa]">;</span>
              </code>
            </pre>
          </div>

          {/* Values table */}
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1f1f1f] bg-[#0d0d0d]">
                    <th className="text-left py-3 px-4 text-[#737373] font-medium whitespace-nowrap">Value</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium">Description</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium">Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f1f]/50">
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">&apos;user&apos;</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Global user settings</td>
                    <td className="py-3 px-4">
                      <code className="text-xs text-[#a1a1a1] font-mono">~/.claude/settings.json</code>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">&apos;project&apos;</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Shared project settings (version controlled)</td>
                    <td className="py-3 px-4">
                      <code className="text-xs text-[#a1a1a1] font-mono">.claude/settings.json</code>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">&apos;local&apos;</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Local project settings (gitignored)</td>
                    <td className="py-3 px-4">
                      <code className="text-xs text-[#a1a1a1] font-mono">.claude/settings.local.json</code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Default behavior */}
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 mb-8">
            <h4 className="font-semibold mb-2">Default behavior</h4>
            <p className="text-sm text-[#a1a1a1]">
              When <code className="text-[#d4a574] bg-[#d4a574]/10 px-1.5 py-0.5 rounded">settingSources</code> is omitted or undefined, the SDK does not load any filesystem settings. This provides isolation for SDK applications.
            </p>
          </div>

          {/* Why use settingSources */}
          <div className="space-y-6">
            <h4 className="font-semibold text-lg">Why use settingSources?</h4>

            <div>
              <p className="text-sm text-[#a1a1a1] mb-3">Load all filesystem settings (legacy behavior):</p>
              <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
                <pre className="p-4 text-sm font-mono overflow-x-auto">
                  <code>
                    <span className="text-[#6a9955]">// Load all settings like SDK v0.0.x did</span>
                    {"\n"}
                    <span className="text-[#c586c0]">const</span>
                    <span className="text-[#9cdcfe]"> result</span>
                    <span className="text-[#fafafa]"> = </span>
                    <span className="text-[#dcdcaa]">query</span>
                    <span className="text-[#fafafa]">({"{"}</span>
                    {"\n"}
                    <span className="text-[#fafafa]">{"  "}</span>
                    <span className="text-[#9cdcfe]">prompt</span>
                    <span className="text-[#fafafa]">: </span>
                    <span className="text-[#ce9178]">&quot;Analyze this code&quot;</span>
                    <span className="text-[#fafafa]">,</span>
                    {"\n"}
                    <span className="text-[#fafafa]">{"  "}</span>
                    <span className="text-[#9cdcfe]">options</span>
                    <span className="text-[#fafafa]">: {"{"}</span>
                    {"\n"}
                    <span className="text-[#fafafa]">{"    "}</span>
                    <span className="text-[#9cdcfe]">settingSources</span>
                    <span className="text-[#fafafa]">: [</span>
                    <span className="text-[#ce9178]">&apos;user&apos;</span>
                    <span className="text-[#fafafa]">, </span>
                    <span className="text-[#ce9178]">&apos;project&apos;</span>
                    <span className="text-[#fafafa]">, </span>
                    <span className="text-[#ce9178]">&apos;local&apos;</span>
                    <span className="text-[#fafafa]">]  </span>
                    <span className="text-[#6a9955]">// Load all settings</span>
                    {"\n"}
                    <span className="text-[#fafafa]">{"  }"}</span>
                    {"\n"}
                    <span className="text-[#fafafa]">{"}"});</span>
                  </code>
                </pre>
              </div>
            </div>

            <div>
              <p className="text-sm text-[#a1a1a1] mb-3">Load only specific setting sources:</p>
              <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
                <pre className="p-4 text-sm font-mono overflow-x-auto">
                  <code>
                    <span className="text-[#6a9955]">// Load only project settings, ignore user and local</span>
                    {"\n"}
                    <span className="text-[#c586c0]">const</span>
                    <span className="text-[#9cdcfe]"> result</span>
                    <span className="text-[#fafafa]"> = </span>
                    <span className="text-[#dcdcaa]">query</span>
                    <span className="text-[#fafafa]">({"{"}</span>
                    {"\n"}
                    <span className="text-[#fafafa]">{"  "}</span>
                    <span className="text-[#9cdcfe]">prompt</span>
                    <span className="text-[#fafafa]">: </span>
                    <span className="text-[#ce9178]">&quot;Run CI checks&quot;</span>
                    <span className="text-[#fafafa]">,</span>
                    {"\n"}
                    <span className="text-[#fafafa]">{"  "}</span>
                    <span className="text-[#9cdcfe]">options</span>
                    <span className="text-[#fafafa]">: {"{"}</span>
                    {"\n"}
                    <span className="text-[#fafafa]">{"    "}</span>
                    <span className="text-[#9cdcfe]">settingSources</span>
                    <span className="text-[#fafafa]">: [</span>
                    <span className="text-[#ce9178]">&apos;project&apos;</span>
                    <span className="text-[#fafafa]">]  </span>
                    <span className="text-[#6a9955]">// Only .claude/settings.json</span>
                    {"\n"}
                    <span className="text-[#fafafa]">{"  }"}</span>
                    {"\n"}
                    <span className="text-[#fafafa]">{"}"});</span>
                  </code>
                </pre>
              </div>
            </div>

            <div>
              <p className="text-sm text-[#a1a1a1] mb-3">Testing and CI environments:</p>
              <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
                <pre className="p-4 text-sm font-mono overflow-x-auto">
                  <code>
                    <span className="text-[#6a9955]">// Ensure consistent behavior in CI by excluding local settings</span>
                    {"\n"}
                    <span className="text-[#c586c0]">const</span>
                    <span className="text-[#9cdcfe]"> result</span>
                    <span className="text-[#fafafa]"> = </span>
                    <span className="text-[#dcdcaa]">query</span>
                    <span className="text-[#fafafa]">({"{"}</span>
                    {"\n"}
                    <span className="text-[#fafafa]">{"  "}</span>
                    <span className="text-[#9cdcfe]">prompt</span>
                    <span className="text-[#fafafa]">: </span>
                    <span className="text-[#ce9178]">&quot;Run tests&quot;</span>
                    <span className="text-[#fafafa]">,</span>
                    {"\n"}
                    <span className="text-[#fafafa]">{"  "}</span>
                    <span className="text-[#9cdcfe]">options</span>
                    <span className="text-[#fafafa]">: {"{"}</span>
                    {"\n"}
                    <span className="text-[#fafafa]">{"    "}</span>
                    <span className="text-[#9cdcfe]">settingSources</span>
                    <span className="text-[#fafafa]">: [</span>
                    <span className="text-[#ce9178]">&apos;project&apos;</span>
                    <span className="text-[#fafafa]">],  </span>
                    <span className="text-[#6a9955]">// Only team-shared settings</span>
                    {"\n"}
                    <span className="text-[#fafafa]">{"    "}</span>
                    <span className="text-[#9cdcfe]">permissionMode</span>
                    <span className="text-[#fafafa]">: </span>
                    <span className="text-[#ce9178]">&apos;bypassPermissions&apos;</span>
                    {"\n"}
                    <span className="text-[#fafafa]">{"  }"}</span>
                    {"\n"}
                    <span className="text-[#fafafa]">{"}"});</span>
                  </code>
                </pre>
              </div>
            </div>

            <div>
              <p className="text-sm text-[#a1a1a1] mb-3">SDK-only applications:</p>
              <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
                <pre className="p-4 text-sm font-mono overflow-x-auto">
                  <code>
                    <span className="text-[#6a9955]">// Define everything programmatically (default behavior)</span>
                    {"\n"}
                    <span className="text-[#6a9955]">// No filesystem dependencies - settingSources defaults to []</span>
                    {"\n"}
                    <span className="text-[#c586c0]">const</span>
                    <span className="text-[#9cdcfe]"> result</span>
                    <span className="text-[#fafafa]"> = </span>
                    <span className="text-[#dcdcaa]">query</span>
                    <span className="text-[#fafafa]">({"{"}</span>
                    {"\n"}
                    <span className="text-[#fafafa]">{"  "}</span>
                    <span className="text-[#9cdcfe]">prompt</span>
                    <span className="text-[#fafafa]">: </span>
                    <span className="text-[#ce9178]">&quot;Review this PR&quot;</span>
                    <span className="text-[#fafafa]">,</span>
                    {"\n"}
                    <span className="text-[#fafafa]">{"  "}</span>
                    <span className="text-[#9cdcfe]">options</span>
                    <span className="text-[#fafafa]">: {"{"}</span>
                    {"\n"}
                    <span className="text-[#fafafa]">{"    "}</span>
                    <span className="text-[#6a9955]">// settingSources: [] is the default, no need to specify</span>
                    {"\n"}
                    <span className="text-[#fafafa]">{"    "}</span>
                    <span className="text-[#9cdcfe]">agents</span>
                    <span className="text-[#fafafa]">: {"{ "}</span>
                    <span className="text-[#6a9955]">/* ... */</span>
                    <span className="text-[#fafafa]"> {"}"},</span>
                    {"\n"}
                    <span className="text-[#fafafa]">{"    "}</span>
                    <span className="text-[#9cdcfe]">mcpServers</span>
                    <span className="text-[#fafafa]">: {"{ "}</span>
                    <span className="text-[#6a9955]">/* ... */</span>
                    <span className="text-[#fafafa]"> {"}"},</span>
                    {"\n"}
                    <span className="text-[#fafafa]">{"    "}</span>
                    <span className="text-[#9cdcfe]">allowedTools</span>
                    <span className="text-[#fafafa]">: [</span>
                    <span className="text-[#ce9178]">&apos;Read&apos;</span>
                    <span className="text-[#fafafa]">, </span>
                    <span className="text-[#ce9178]">&apos;Grep&apos;</span>
                    <span className="text-[#fafafa]">, </span>
                    <span className="text-[#ce9178]">&apos;Glob&apos;</span>
                    <span className="text-[#fafafa]">]</span>
                    {"\n"}
                    <span className="text-[#fafafa]">{"  }"}</span>
                    {"\n"}
                    <span className="text-[#fafafa]">{"}"});</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* CanUseTool Type */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">CanUseTool</code>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Custom permission function type for controlling tool usage.
          </p>

          {/* Type definition */}
          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#1f1f1f]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-xs text-[#737373]">CanUseTool.ts</span>
            </div>
            <pre className="p-4 text-sm font-mono overflow-x-auto">
              <code>
                <span className="text-[#c586c0]">type</span>
                <span className="text-[#4ec9b0]"> CanUseTool</span>
                <span className="text-[#fafafa]"> = (</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  "}</span>
                <span className="text-[#9cdcfe]">toolName</span>
                <span className="text-[#fafafa]">: </span>
                <span className="text-[#4ec9b0]">string</span>
                <span className="text-[#fafafa]">,</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  "}</span>
                <span className="text-[#9cdcfe]">input</span>
                <span className="text-[#fafafa]">: </span>
                <span className="text-[#4ec9b0]">ToolInput</span>
                <span className="text-[#fafafa]">,</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  "}</span>
                <span className="text-[#9cdcfe]">options</span>
                <span className="text-[#fafafa]">: {"{"}</span>
                {"\n"}
                <span className="text-[#fafafa]">{"    "}</span>
                <span className="text-[#9cdcfe]">signal</span>
                <span className="text-[#fafafa]">: </span>
                <span className="text-[#4ec9b0]">AbortSignal</span>
                <span className="text-[#fafafa]">;</span>
                {"\n"}
                <span className="text-[#fafafa]">{"    "}</span>
                <span className="text-[#9cdcfe]">suggestions</span>
                <span className="text-[#fafafa]">?: </span>
                <span className="text-[#4ec9b0]">PermissionUpdate</span>
                <span className="text-[#fafafa]">[];</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  }"}</span>
                {"\n"}
                <span className="text-[#fafafa]">) </span>
                <span className="text-[#c586c0]">=&gt;</span>
                <span className="text-[#fafafa]"> </span>
                <span className="text-[#4ec9b0]">Promise</span>
                <span className="text-[#fafafa]">&lt;</span>
                <span className="text-[#4ec9b0]">PermissionResult</span>
                <span className="text-[#fafafa]">&gt;;</span>
              </code>
            </pre>
          </div>
        </section>

        {/* PermissionResult Type */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">PermissionResult</code>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Result of a permission check.
          </p>

          {/* Type definition */}
          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#1f1f1f]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-xs text-[#737373]">PermissionResult.ts</span>
            </div>
            <pre className="p-4 text-sm font-mono overflow-x-auto">
              <code>
                <span className="text-[#c586c0]">type</span>
                <span className="text-[#4ec9b0]"> PermissionResult</span>
                <span className="text-[#fafafa]"> = </span>
                {"\n"}
                <span className="text-[#fafafa]">{"  | {"}</span>
                {"\n"}
                <span className="text-[#fafafa]">{"      "}</span>
                <span className="text-[#9cdcfe]">behavior</span>
                <span className="text-[#fafafa]">: </span>
                <span className="text-[#ce9178]">&apos;allow&apos;</span>
                <span className="text-[#fafafa]">;</span>
                {"\n"}
                <span className="text-[#fafafa]">{"      "}</span>
                <span className="text-[#9cdcfe]">updatedInput</span>
                <span className="text-[#fafafa]">: </span>
                <span className="text-[#4ec9b0]">ToolInput</span>
                <span className="text-[#fafafa]">;</span>
                {"\n"}
                <span className="text-[#fafafa]">{"      "}</span>
                <span className="text-[#9cdcfe]">updatedPermissions</span>
                <span className="text-[#fafafa]">?: </span>
                <span className="text-[#4ec9b0]">PermissionUpdate</span>
                <span className="text-[#fafafa]">[];</span>
                {"\n"}
                <span className="text-[#fafafa]">{"    }"}</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  | {"}</span>
                {"\n"}
                <span className="text-[#fafafa]">{"      "}</span>
                <span className="text-[#9cdcfe]">behavior</span>
                <span className="text-[#fafafa]">: </span>
                <span className="text-[#ce9178]">&apos;deny&apos;</span>
                <span className="text-[#fafafa]">;</span>
                {"\n"}
                <span className="text-[#fafafa]">{"      "}</span>
                <span className="text-[#9cdcfe]">message</span>
                <span className="text-[#fafafa]">: </span>
                <span className="text-[#4ec9b0]">string</span>
                <span className="text-[#fafafa]">;</span>
                {"\n"}
                <span className="text-[#fafafa]">{"      "}</span>
                <span className="text-[#9cdcfe]">interrupt</span>
                <span className="text-[#fafafa]">?: </span>
                <span className="text-[#4ec9b0]">boolean</span>
                <span className="text-[#fafafa]">;</span>
                {"\n"}
                <span className="text-[#fafafa]">{"    }"}</span>
              </code>
            </pre>
          </div>
        </section>

        {/* McpServerConfig Type */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">McpServerConfig</code>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Configuration for MCP servers.
          </p>

          {/* Main union type definition */}
          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden mb-8">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#1f1f1f]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-xs text-[#737373]">McpServerConfig.ts</span>
            </div>
            <pre className="p-4 text-sm font-mono overflow-x-auto">
              <code>
                <span className="text-[#c586c0]">type</span>
                <span className="text-[#4ec9b0]"> McpServerConfig</span>
                <span className="text-[#fafafa]"> = </span>
                {"\n"}
                <span className="text-[#fafafa]">{"  | "}</span>
                <span className="text-[#4ec9b0]">McpStdioServerConfig</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  | "}</span>
                <span className="text-[#4ec9b0]">McpSSEServerConfig</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  | "}</span>
                <span className="text-[#4ec9b0]">McpHttpServerConfig</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  | "}</span>
                <span className="text-[#4ec9b0]">McpSdkServerConfigWithInstance</span>
                <span className="text-[#fafafa]">;</span>
              </code>
            </pre>
          </div>

          {/* McpStdioServerConfig */}
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <code className="text-[#d4a574]">McpStdioServerConfig</code>
          </h3>
          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden mb-8">
            <pre className="p-4 text-sm font-mono overflow-x-auto">
              <code>
                <span className="text-[#c586c0]">type</span>
                <span className="text-[#4ec9b0]"> McpStdioServerConfig</span>
                <span className="text-[#fafafa]"> = {"{"}</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  "}</span>
                <span className="text-[#9cdcfe]">type</span>
                <span className="text-[#fafafa]">?: </span>
                <span className="text-[#ce9178]">&apos;stdio&apos;</span>
                <span className="text-[#fafafa]">;</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  "}</span>
                <span className="text-[#9cdcfe]">command</span>
                <span className="text-[#fafafa]">: </span>
                <span className="text-[#4ec9b0]">string</span>
                <span className="text-[#fafafa]">;</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  "}</span>
                <span className="text-[#9cdcfe]">args</span>
                <span className="text-[#fafafa]">?: </span>
                <span className="text-[#4ec9b0]">string</span>
                <span className="text-[#fafafa]">[];</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  "}</span>
                <span className="text-[#9cdcfe]">env</span>
                <span className="text-[#fafafa]">?: </span>
                <span className="text-[#4ec9b0]">Record</span>
                <span className="text-[#fafafa]">&lt;</span>
                <span className="text-[#4ec9b0]">string</span>
                <span className="text-[#fafafa]">, </span>
                <span className="text-[#4ec9b0]">string</span>
                <span className="text-[#fafafa]">&gt;;</span>
                {"\n"}
                <span className="text-[#fafafa]">{"}"};</span>
              </code>
            </pre>
          </div>

          {/* McpSSEServerConfig */}
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <code className="text-[#d4a574]">McpSSEServerConfig</code>
          </h3>
          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden mb-8">
            <pre className="p-4 text-sm font-mono overflow-x-auto">
              <code>
                <span className="text-[#c586c0]">type</span>
                <span className="text-[#4ec9b0]"> McpSSEServerConfig</span>
                <span className="text-[#fafafa]"> = {"{"}</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  "}</span>
                <span className="text-[#9cdcfe]">type</span>
                <span className="text-[#fafafa]">: </span>
                <span className="text-[#ce9178]">&apos;sse&apos;</span>
                <span className="text-[#fafafa]">;</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  "}</span>
                <span className="text-[#9cdcfe]">url</span>
                <span className="text-[#fafafa]">: </span>
                <span className="text-[#4ec9b0]">string</span>
                <span className="text-[#fafafa]">;</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  "}</span>
                <span className="text-[#9cdcfe]">headers</span>
                <span className="text-[#fafafa]">?: </span>
                <span className="text-[#4ec9b0]">Record</span>
                <span className="text-[#fafafa]">&lt;</span>
                <span className="text-[#4ec9b0]">string</span>
                <span className="text-[#fafafa]">, </span>
                <span className="text-[#4ec9b0]">string</span>
                <span className="text-[#fafafa]">&gt;;</span>
                {"\n"}
                <span className="text-[#fafafa]">{"}"};</span>
              </code>
            </pre>
          </div>

          {/* McpHttpServerConfig */}
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <code className="text-[#d4a574]">McpHttpServerConfig</code>
          </h3>
          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden mb-8">
            <pre className="p-4 text-sm font-mono overflow-x-auto">
              <code>
                <span className="text-[#c586c0]">type</span>
                <span className="text-[#4ec9b0]"> McpHttpServerConfig</span>
                <span className="text-[#fafafa]"> = {"{"}</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  "}</span>
                <span className="text-[#9cdcfe]">type</span>
                <span className="text-[#fafafa]">: </span>
                <span className="text-[#ce9178]">&apos;http&apos;</span>
                <span className="text-[#fafafa]">;</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  "}</span>
                <span className="text-[#9cdcfe]">url</span>
                <span className="text-[#fafafa]">: </span>
                <span className="text-[#4ec9b0]">string</span>
                <span className="text-[#fafafa]">;</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  "}</span>
                <span className="text-[#9cdcfe]">headers</span>
                <span className="text-[#fafafa]">?: </span>
                <span className="text-[#4ec9b0]">Record</span>
                <span className="text-[#fafafa]">&lt;</span>
                <span className="text-[#4ec9b0]">string</span>
                <span className="text-[#fafafa]">, </span>
                <span className="text-[#4ec9b0]">string</span>
                <span className="text-[#fafafa]">&gt;;</span>
                {"\n"}
                <span className="text-[#fafafa]">{"}"};</span>
              </code>
            </pre>
          </div>

          {/* McpSdkServerConfigWithInstance */}
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <code className="text-[#d4a574]">McpSdkServerConfigWithInstance</code>
          </h3>
          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
            <pre className="p-4 text-sm font-mono overflow-x-auto">
              <code>
                <span className="text-[#c586c0]">type</span>
                <span className="text-[#4ec9b0]"> McpSdkServerConfigWithInstance</span>
                <span className="text-[#fafafa]"> = {"{"}</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  "}</span>
                <span className="text-[#9cdcfe]">type</span>
                <span className="text-[#fafafa]">: </span>
                <span className="text-[#ce9178]">&apos;sdk&apos;</span>
                <span className="text-[#fafafa]">;</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  "}</span>
                <span className="text-[#9cdcfe]">name</span>
                <span className="text-[#fafafa]">: </span>
                <span className="text-[#4ec9b0]">string</span>
                <span className="text-[#fafafa]">;</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  "}</span>
                <span className="text-[#9cdcfe]">instance</span>
                <span className="text-[#fafafa]">: </span>
                <span className="text-[#4ec9b0]">McpServer</span>
                <span className="text-[#fafafa]">;</span>
                {"\n"}
                <span className="text-[#fafafa]">{"}"};</span>
              </code>
            </pre>
          </div>
        </section>

        {/* SdkPluginConfig Type */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">SdkPluginConfig</code>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Configuration for loading plugins in the SDK.
          </p>

          {/* Type definition */}
          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden mb-8">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#1f1f1f]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-xs text-[#737373]">SdkPluginConfig.ts</span>
            </div>
            <pre className="p-4 text-sm font-mono overflow-x-auto">
              <code>
                <span className="text-[#c586c0]">type</span>
                <span className="text-[#4ec9b0]"> SdkPluginConfig</span>
                <span className="text-[#fafafa]"> = {"{"}</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  "}</span>
                <span className="text-[#9cdcfe]">type</span>
                <span className="text-[#fafafa]">: </span>
                <span className="text-[#ce9178]">&apos;local&apos;</span>
                <span className="text-[#fafafa]">;</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  "}</span>
                <span className="text-[#9cdcfe]">path</span>
                <span className="text-[#fafafa]">: </span>
                <span className="text-[#4ec9b0]">string</span>
                <span className="text-[#fafafa]">;</span>
                {"\n"}
                <span className="text-[#fafafa]">{"}"};</span>
              </code>
            </pre>
          </div>

          {/* Fields table */}
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1f1f1f] bg-[#0d0d0d]">
                    <th className="text-left py-3 px-4 text-[#737373] font-medium whitespace-nowrap">Field</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium whitespace-nowrap">Type</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f1f]/50">
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">type</code>
                    </td>
                    <td className="py-3 px-4">
                      <code className="text-[#a1a1a1]">&apos;local&apos;</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Must be &apos;local&apos; (only local plugins currently supported)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">path</code>
                    </td>
                    <td className="py-3 px-4">
                      <code className="text-[#a1a1a1]">string</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Absolute or relative path to the plugin directory</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Example */}
          <p className="text-sm text-[#a1a1a1] mb-3">Example:</p>
          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden mb-4">
            <pre className="p-4 text-sm font-mono overflow-x-auto">
              <code>
                <span className="text-[#9cdcfe]">plugins</span>
                <span className="text-[#fafafa]">: [</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  { "}</span>
                <span className="text-[#9cdcfe]">type</span>
                <span className="text-[#fafafa]">: </span>
                <span className="text-[#ce9178]">&apos;local&apos;</span>
                <span className="text-[#fafafa]">, </span>
                <span className="text-[#9cdcfe]">path</span>
                <span className="text-[#fafafa]">: </span>
                <span className="text-[#ce9178]">&apos;./my-plugin&apos;</span>
                <span className="text-[#fafafa]">{" }"},</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  { "}</span>
                <span className="text-[#9cdcfe]">type</span>
                <span className="text-[#fafafa]">: </span>
                <span className="text-[#ce9178]">&apos;local&apos;</span>
                <span className="text-[#fafafa]">, </span>
                <span className="text-[#9cdcfe]">path</span>
                <span className="text-[#fafafa]">: </span>
                <span className="text-[#ce9178]">&apos;/absolute/path/to/plugin&apos;</span>
                <span className="text-[#fafafa]">{" }"}</span>
                {"\n"}
                <span className="text-[#fafafa]">]</span>
              </code>
            </pre>
          </div>
          <p className="text-sm text-[#737373]">
            For complete information on creating and using plugins, see Plugins.
          </p>
        </section>

        {/* Message Types */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Message Types</h2>

          {/* SDKMessage */}
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <code className="text-[#d4a574]">SDKMessage</code>
          </h3>
          <p className="text-[#a1a1a1] mb-6">
            Union type of all possible messages returned by the query.
          </p>

          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#1f1f1f]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-xs text-[#737373]">SDKMessage.ts</span>
            </div>
            <pre className="p-4 text-sm font-mono overflow-x-auto">
              <code>
                <span className="text-[#c586c0]">type</span>
                <span className="text-[#4ec9b0]"> SDKMessage</span>
                <span className="text-[#fafafa]"> = </span>
                {"\n"}
                <span className="text-[#fafafa]">{"  | "}</span>
                <span className="text-[#4ec9b0]">SDKAssistantMessage</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  | "}</span>
                <span className="text-[#4ec9b0]">SDKUserMessage</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  | "}</span>
                <span className="text-[#4ec9b0]">SDKUserMessageReplay</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  | "}</span>
                <span className="text-[#4ec9b0]">SDKResultMessage</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  | "}</span>
                <span className="text-[#4ec9b0]">SDKSystemMessage</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  | "}</span>
                <span className="text-[#4ec9b0]">SDKPartialAssistantMessage</span>
                {"\n"}
                <span className="text-[#fafafa]">{"  | "}</span>
                <span className="text-[#4ec9b0]">SDKCompactBoundaryMessage</span>
                <span className="text-[#fafafa]">;</span>
              </code>
            </pre>
          </div>

          {/* SDKAssistantMessage */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <code className="text-[#d4a574]">SDKAssistantMessage</code>
            </h3>
            <p className="text-[#a1a1a1] mb-4">
              Assistant response message.
            </p>
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
              <pre className="p-4 text-sm font-mono overflow-x-auto">
                <code>
                  <span className="text-[#c586c0]">type</span>
                  <span className="text-[#4ec9b0]"> SDKAssistantMessage</span>
                  <span className="text-[#fafafa]"> = {"{"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">type</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#ce9178]">&apos;assistant&apos;</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">uuid</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">UUID</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">session_id</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">message</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">APIAssistantMessage</span>
                  <span className="text-[#fafafa]">; </span>
                  <span className="text-[#6a9955]">// From Anthropic SDK</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">parent_tool_use_id</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]"> | </span>
                  <span className="text-[#4ec9b0]">null</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"}"};</span>
                </code>
              </pre>
            </div>
          </div>

          {/* SDKUserMessage */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <code className="text-[#d4a574]">SDKUserMessage</code>
            </h3>
            <p className="text-[#a1a1a1] mb-4">
              User input message.
            </p>
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
              <pre className="p-4 text-sm font-mono overflow-x-auto">
                <code>
                  <span className="text-[#c586c0]">type</span>
                  <span className="text-[#4ec9b0]"> SDKUserMessage</span>
                  <span className="text-[#fafafa]"> = {"{"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">type</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#ce9178]">&apos;user&apos;</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">uuid</span>
                  <span className="text-[#fafafa]">?: </span>
                  <span className="text-[#4ec9b0]">UUID</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">session_id</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">message</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">APIUserMessage</span>
                  <span className="text-[#fafafa]">; </span>
                  <span className="text-[#6a9955]">// From Anthropic SDK</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">parent_tool_use_id</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]"> | </span>
                  <span className="text-[#4ec9b0]">null</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"}"};</span>
                </code>
              </pre>
            </div>
          </div>

          {/* SDKUserMessageReplay */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <code className="text-[#d4a574]">SDKUserMessageReplay</code>
            </h3>
            <p className="text-[#a1a1a1] mb-4">
              Replayed user message with required UUID.
            </p>
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
              <pre className="p-4 text-sm font-mono overflow-x-auto">
                <code>
                  <span className="text-[#c586c0]">type</span>
                  <span className="text-[#4ec9b0]"> SDKUserMessageReplay</span>
                  <span className="text-[#fafafa]"> = {"{"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">type</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#ce9178]">&apos;user&apos;</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">uuid</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">UUID</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">session_id</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">message</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">APIUserMessage</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">parent_tool_use_id</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]"> | </span>
                  <span className="text-[#4ec9b0]">null</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"}"};</span>
                </code>
              </pre>
            </div>
          </div>

          {/* SDKResultMessage */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <code className="text-[#d4a574]">SDKResultMessage</code>
            </h3>
            <p className="text-[#a1a1a1] mb-4">
              Final result message.
            </p>
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
              <pre className="p-4 text-sm font-mono overflow-x-auto">
                <code>
                  <span className="text-[#c586c0]">type</span>
                  <span className="text-[#4ec9b0]"> SDKResultMessage</span>
                  <span className="text-[#fafafa]"> =</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  | {"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"      "}</span>
                  <span className="text-[#9cdcfe]">type</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#ce9178]">&apos;result&apos;</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"      "}</span>
                  <span className="text-[#9cdcfe]">subtype</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#ce9178]">&apos;success&apos;</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"      "}</span>
                  <span className="text-[#9cdcfe]">uuid</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">UUID</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"      "}</span>
                  <span className="text-[#9cdcfe]">session_id</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"      "}</span>
                  <span className="text-[#9cdcfe]">duration_ms</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">number</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"      "}</span>
                  <span className="text-[#9cdcfe]">duration_api_ms</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">number</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"      "}</span>
                  <span className="text-[#9cdcfe]">is_error</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">boolean</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"      "}</span>
                  <span className="text-[#9cdcfe]">num_turns</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">number</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"      "}</span>
                  <span className="text-[#9cdcfe]">result</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"      "}</span>
                  <span className="text-[#9cdcfe]">total_cost_usd</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">number</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"      "}</span>
                  <span className="text-[#9cdcfe]">usage</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">NonNullableUsage</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"      "}</span>
                  <span className="text-[#9cdcfe]">modelUsage</span>
                  <span className="text-[#fafafa]">: {"{ ["}</span>
                  <span className="text-[#9cdcfe]">modelName</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">]: </span>
                  <span className="text-[#4ec9b0]">ModelUsage</span>
                  <span className="text-[#fafafa]">{" }"};</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"      "}</span>
                  <span className="text-[#9cdcfe]">permission_denials</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">SDKPermissionDenial</span>
                  <span className="text-[#fafafa]">[];</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"      "}</span>
                  <span className="text-[#9cdcfe]">structured_output</span>
                  <span className="text-[#fafafa]">?: </span>
                  <span className="text-[#4ec9b0]">unknown</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"    }"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  | {"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"      "}</span>
                  <span className="text-[#9cdcfe]">type</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#ce9178]">&apos;result&apos;</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"      "}</span>
                  <span className="text-[#9cdcfe]">subtype</span>
                  <span className="text-[#fafafa]">:</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"        | "}</span>
                  <span className="text-[#ce9178]">&apos;error_max_turns&apos;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"        | "}</span>
                  <span className="text-[#ce9178]">&apos;error_during_execution&apos;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"        | "}</span>
                  <span className="text-[#ce9178]">&apos;error_max_budget_usd&apos;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"        | "}</span>
                  <span className="text-[#ce9178]">&apos;error_max_structured_output_retries&apos;</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"      "}</span>
                  <span className="text-[#9cdcfe]">uuid</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">UUID</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"      "}</span>
                  <span className="text-[#9cdcfe]">session_id</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"      "}</span>
                  <span className="text-[#9cdcfe]">duration_ms</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">number</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"      "}</span>
                  <span className="text-[#9cdcfe]">duration_api_ms</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">number</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"      "}</span>
                  <span className="text-[#9cdcfe]">is_error</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">boolean</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"      "}</span>
                  <span className="text-[#9cdcfe]">num_turns</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">number</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"      "}</span>
                  <span className="text-[#9cdcfe]">total_cost_usd</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">number</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"      "}</span>
                  <span className="text-[#9cdcfe]">usage</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">NonNullableUsage</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"      "}</span>
                  <span className="text-[#9cdcfe]">modelUsage</span>
                  <span className="text-[#fafafa]">: {"{ ["}</span>
                  <span className="text-[#9cdcfe]">modelName</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">]: </span>
                  <span className="text-[#4ec9b0]">ModelUsage</span>
                  <span className="text-[#fafafa]">{" }"};</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"      "}</span>
                  <span className="text-[#9cdcfe]">permission_denials</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">SDKPermissionDenial</span>
                  <span className="text-[#fafafa]">[];</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"      "}</span>
                  <span className="text-[#9cdcfe]">errors</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">[];</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"    }"}</span>
                </code>
              </pre>
            </div>
          </div>

          {/* SDKSystemMessage */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <code className="text-[#d4a574]">SDKSystemMessage</code>
            </h3>
            <p className="text-[#a1a1a1] mb-4">
              System initialization message.
            </p>
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
              <pre className="p-4 text-sm font-mono overflow-x-auto">
                <code>
                  <span className="text-[#c586c0]">type</span>
                  <span className="text-[#4ec9b0]"> SDKSystemMessage</span>
                  <span className="text-[#fafafa]"> = {"{"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">type</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#ce9178]">&apos;system&apos;</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">subtype</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#ce9178]">&apos;init&apos;</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">uuid</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">UUID</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">session_id</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">apiKeySource</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">ApiKeySource</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">cwd</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">tools</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">[];</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">mcp_servers</span>
                  <span className="text-[#fafafa]">: {"{"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"    "}</span>
                  <span className="text-[#9cdcfe]">name</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"    "}</span>
                  <span className="text-[#9cdcfe]">status</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  }"}[];</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">model</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">permissionMode</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">PermissionMode</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">slash_commands</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">[];</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">output_style</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"}"};</span>
                </code>
              </pre>
            </div>
          </div>

          {/* SDKPartialAssistantMessage */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <code className="text-[#d4a574]">SDKPartialAssistantMessage</code>
            </h3>
            <p className="text-[#a1a1a1] mb-4">
              Streaming partial message (only when <code className="text-[#d4a574]">includePartialMessages</code> is true).
            </p>
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
              <pre className="p-4 text-sm font-mono overflow-x-auto">
                <code>
                  <span className="text-[#c586c0]">type</span>
                  <span className="text-[#4ec9b0]"> SDKPartialAssistantMessage</span>
                  <span className="text-[#fafafa]"> = {"{"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">type</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#ce9178]">&apos;stream_event&apos;</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">event</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">RawMessageStreamEvent</span>
                  <span className="text-[#fafafa]">; </span>
                  <span className="text-[#6a9955]">// From Anthropic SDK</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">parent_tool_use_id</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]"> | </span>
                  <span className="text-[#4ec9b0]">null</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">uuid</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">UUID</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">session_id</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"}"};</span>
                </code>
              </pre>
            </div>
          </div>

          {/* SDKCompactBoundaryMessage */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <code className="text-[#d4a574]">SDKCompactBoundaryMessage</code>
            </h3>
            <p className="text-[#a1a1a1] mb-4">
              Message indicating a conversation compaction boundary.
            </p>
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
              <pre className="p-4 text-sm font-mono overflow-x-auto">
                <code>
                  <span className="text-[#c586c0]">type</span>
                  <span className="text-[#4ec9b0]"> SDKCompactBoundaryMessage</span>
                  <span className="text-[#fafafa]"> = {"{"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">type</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#ce9178]">&apos;system&apos;</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">subtype</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#ce9178]">&apos;compact_boundary&apos;</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">uuid</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">UUID</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">session_id</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">compact_metadata</span>
                  <span className="text-[#fafafa]">: {"{"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"    "}</span>
                  <span className="text-[#9cdcfe]">trigger</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#ce9178]">&apos;manual&apos;</span>
                  <span className="text-[#fafafa]"> | </span>
                  <span className="text-[#ce9178]">&apos;auto&apos;</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"    "}</span>
                  <span className="text-[#9cdcfe]">pre_tokens</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">number</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  }"};</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"}"};</span>
                </code>
              </pre>
            </div>
          </div>

          {/* SDKPermissionDenial */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <code className="text-[#d4a574]">SDKPermissionDenial</code>
            </h3>
            <p className="text-[#a1a1a1] mb-4">
              Information about a denied tool use.
            </p>
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
              <pre className="p-4 text-sm font-mono overflow-x-auto">
                <code>
                  <span className="text-[#c586c0]">type</span>
                  <span className="text-[#4ec9b0]"> SDKPermissionDenial</span>
                  <span className="text-[#fafafa]"> = {"{"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">tool_name</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">tool_use_id</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">tool_input</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">ToolInput</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"}"};</span>
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* Hook Types */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-4">Hook Types</h2>
          <p className="text-[#a1a1a1] mb-8">
            For a comprehensive guide on using hooks with examples and common patterns, see the Hooks guide.
          </p>

          {/* HookEvent */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <code className="text-[#d4a574]">HookEvent</code>
            </h3>
            <p className="text-[#a1a1a1] mb-4">
              Available hook events.
            </p>
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
              <pre className="p-4 text-sm font-mono overflow-x-auto">
                <code>
                  <span className="text-[#c586c0]">type</span>
                  <span className="text-[#4ec9b0]"> HookEvent</span>
                  <span className="text-[#fafafa]"> =</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  | "}</span>
                  <span className="text-[#ce9178]">&apos;PreToolUse&apos;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  | "}</span>
                  <span className="text-[#ce9178]">&apos;PostToolUse&apos;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  | "}</span>
                  <span className="text-[#ce9178]">&apos;PostToolUseFailure&apos;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  | "}</span>
                  <span className="text-[#ce9178]">&apos;Notification&apos;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  | "}</span>
                  <span className="text-[#ce9178]">&apos;UserPromptSubmit&apos;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  | "}</span>
                  <span className="text-[#ce9178]">&apos;SessionStart&apos;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  | "}</span>
                  <span className="text-[#ce9178]">&apos;SessionEnd&apos;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  | "}</span>
                  <span className="text-[#ce9178]">&apos;Stop&apos;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  | "}</span>
                  <span className="text-[#ce9178]">&apos;SubagentStart&apos;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  | "}</span>
                  <span className="text-[#ce9178]">&apos;SubagentStop&apos;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  | "}</span>
                  <span className="text-[#ce9178]">&apos;PreCompact&apos;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  | "}</span>
                  <span className="text-[#ce9178]">&apos;PermissionRequest&apos;</span>
                  <span className="text-[#fafafa]">;</span>
                </code>
              </pre>
            </div>
          </div>

          {/* HookCallback */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <code className="text-[#d4a574]">HookCallback</code>
            </h3>
            <p className="text-[#a1a1a1] mb-4">
              Hook callback function type.
            </p>
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
              <pre className="p-4 text-sm font-mono overflow-x-auto">
                <code>
                  <span className="text-[#c586c0]">type</span>
                  <span className="text-[#4ec9b0]"> HookCallback</span>
                  <span className="text-[#fafafa]"> = (</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">input</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">HookInput</span>
                  <span className="text-[#fafafa]">, </span>
                  <span className="text-[#6a9955]">// Union of all hook input types</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">toolUseID</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]"> | </span>
                  <span className="text-[#4ec9b0]">undefined</span>
                  <span className="text-[#fafafa]">,</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">options</span>
                  <span className="text-[#fafafa]">: {"{"} </span>
                  <span className="text-[#9cdcfe]">signal</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">AbortSignal</span>
                  <span className="text-[#fafafa]">{" }"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">) </span>
                  <span className="text-[#c586c0]">=&gt;</span>
                  <span className="text-[#fafafa]"> </span>
                  <span className="text-[#4ec9b0]">Promise</span>
                  <span className="text-[#fafafa]">&lt;</span>
                  <span className="text-[#4ec9b0]">HookJSONOutput</span>
                  <span className="text-[#fafafa]">&gt;;</span>
                </code>
              </pre>
            </div>
          </div>

          {/* HookCallbackMatcher */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <code className="text-[#d4a574]">HookCallbackMatcher</code>
            </h3>
            <p className="text-[#a1a1a1] mb-4">
              Hook configuration with optional matcher.
            </p>
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
              <pre className="p-4 text-sm font-mono overflow-x-auto">
                <code>
                  <span className="text-[#c586c0]">interface</span>
                  <span className="text-[#4ec9b0]"> HookCallbackMatcher</span>
                  <span className="text-[#fafafa]"> {"{"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">matcher</span>
                  <span className="text-[#fafafa]">?: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">hooks</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">HookCallback</span>
                  <span className="text-[#fafafa]">[];</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"}"}</span>
                </code>
              </pre>
            </div>
          </div>

          {/* HookInput */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <code className="text-[#d4a574]">HookInput</code>
            </h3>
            <p className="text-[#a1a1a1] mb-4">
              Union type of all hook input types.
            </p>
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
              <pre className="p-4 text-sm font-mono overflow-x-auto">
                <code>
                  <span className="text-[#c586c0]">type</span>
                  <span className="text-[#4ec9b0]"> HookInput</span>
                  <span className="text-[#fafafa]"> =</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  | "}</span>
                  <span className="text-[#4ec9b0]">PreToolUseHookInput</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  | "}</span>
                  <span className="text-[#4ec9b0]">PostToolUseHookInput</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  | "}</span>
                  <span className="text-[#4ec9b0]">PostToolUseFailureHookInput</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  | "}</span>
                  <span className="text-[#4ec9b0]">NotificationHookInput</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  | "}</span>
                  <span className="text-[#4ec9b0]">UserPromptSubmitHookInput</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  | "}</span>
                  <span className="text-[#4ec9b0]">SessionStartHookInput</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  | "}</span>
                  <span className="text-[#4ec9b0]">SessionEndHookInput</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  | "}</span>
                  <span className="text-[#4ec9b0]">StopHookInput</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  | "}</span>
                  <span className="text-[#4ec9b0]">SubagentStartHookInput</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  | "}</span>
                  <span className="text-[#4ec9b0]">SubagentStopHookInput</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  | "}</span>
                  <span className="text-[#4ec9b0]">PreCompactHookInput</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  | "}</span>
                  <span className="text-[#4ec9b0]">PermissionRequestHookInput</span>
                  <span className="text-[#fafafa]">;</span>
                </code>
              </pre>
            </div>
          </div>

          {/* BaseHookInput */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <code className="text-[#d4a574]">BaseHookInput</code>
            </h3>
            <p className="text-[#a1a1a1] mb-4">
              Base interface that all hook input types extend.
            </p>
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
              <pre className="p-4 text-sm font-mono overflow-x-auto">
                <code>
                  <span className="text-[#c586c0]">type</span>
                  <span className="text-[#4ec9b0]"> BaseHookInput</span>
                  <span className="text-[#fafafa]"> = {"{"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">session_id</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">transcript_path</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">cwd</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">permission_mode</span>
                  <span className="text-[#fafafa]">?: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"}"};</span>
                </code>
              </pre>
            </div>
          </div>

          {/* Specific Hook Input Types */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <code className="text-[#d4a574]">PreToolUseHookInput</code>
            </h3>
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
              <pre className="p-4 text-sm font-mono overflow-x-auto">
                <code>
                  <span className="text-[#c586c0]">type</span>
                  <span className="text-[#4ec9b0]"> PreToolUseHookInput</span>
                  <span className="text-[#fafafa]"> = </span>
                  <span className="text-[#4ec9b0]">BaseHookInput</span>
                  <span className="text-[#fafafa]"> & {"{"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">hook_event_name</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#ce9178]">&apos;PreToolUse&apos;</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">tool_name</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">tool_input</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">unknown</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"}"};</span>
                </code>
              </pre>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <code className="text-[#d4a574]">PostToolUseHookInput</code>
            </h3>
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
              <pre className="p-4 text-sm font-mono overflow-x-auto">
                <code>
                  <span className="text-[#c586c0]">type</span>
                  <span className="text-[#4ec9b0]"> PostToolUseHookInput</span>
                  <span className="text-[#fafafa]"> = </span>
                  <span className="text-[#4ec9b0]">BaseHookInput</span>
                  <span className="text-[#fafafa]"> & {"{"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">hook_event_name</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#ce9178]">&apos;PostToolUse&apos;</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">tool_name</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">tool_input</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">unknown</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">tool_response</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">unknown</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"}"};</span>
                </code>
              </pre>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <code className="text-[#d4a574]">PostToolUseFailureHookInput</code>
            </h3>
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
              <pre className="p-4 text-sm font-mono overflow-x-auto">
                <code>
                  <span className="text-[#c586c0]">type</span>
                  <span className="text-[#4ec9b0]"> PostToolUseFailureHookInput</span>
                  <span className="text-[#fafafa]"> = </span>
                  <span className="text-[#4ec9b0]">BaseHookInput</span>
                  <span className="text-[#fafafa]"> & {"{"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">hook_event_name</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#ce9178]">&apos;PostToolUseFailure&apos;</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">tool_name</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">tool_input</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">unknown</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">error</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">is_interrupt</span>
                  <span className="text-[#fafafa]">?: </span>
                  <span className="text-[#4ec9b0]">boolean</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"}"};</span>
                </code>
              </pre>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <code className="text-[#d4a574]">NotificationHookInput</code>
            </h3>
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
              <pre className="p-4 text-sm font-mono overflow-x-auto">
                <code>
                  <span className="text-[#c586c0]">type</span>
                  <span className="text-[#4ec9b0]"> NotificationHookInput</span>
                  <span className="text-[#fafafa]"> = </span>
                  <span className="text-[#4ec9b0]">BaseHookInput</span>
                  <span className="text-[#fafafa]"> & {"{"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">hook_event_name</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#ce9178]">&apos;Notification&apos;</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">message</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">title</span>
                  <span className="text-[#fafafa]">?: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"}"};</span>
                </code>
              </pre>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <code className="text-[#d4a574]">UserPromptSubmitHookInput</code>
            </h3>
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
              <pre className="p-4 text-sm font-mono overflow-x-auto">
                <code>
                  <span className="text-[#c586c0]">type</span>
                  <span className="text-[#4ec9b0]"> UserPromptSubmitHookInput</span>
                  <span className="text-[#fafafa]"> = </span>
                  <span className="text-[#4ec9b0]">BaseHookInput</span>
                  <span className="text-[#fafafa]"> & {"{"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">hook_event_name</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#ce9178]">&apos;UserPromptSubmit&apos;</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">prompt</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"}"};</span>
                </code>
              </pre>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <code className="text-[#d4a574]">SessionStartHookInput</code>
            </h3>
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
              <pre className="p-4 text-sm font-mono overflow-x-auto">
                <code>
                  <span className="text-[#c586c0]">type</span>
                  <span className="text-[#4ec9b0]"> SessionStartHookInput</span>
                  <span className="text-[#fafafa]"> = </span>
                  <span className="text-[#4ec9b0]">BaseHookInput</span>
                  <span className="text-[#fafafa]"> & {"{"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">hook_event_name</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#ce9178]">&apos;SessionStart&apos;</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">source</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#ce9178]">&apos;startup&apos;</span>
                  <span className="text-[#fafafa]"> | </span>
                  <span className="text-[#ce9178]">&apos;resume&apos;</span>
                  <span className="text-[#fafafa]"> | </span>
                  <span className="text-[#ce9178]">&apos;clear&apos;</span>
                  <span className="text-[#fafafa]"> | </span>
                  <span className="text-[#ce9178]">&apos;compact&apos;</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"}"};</span>
                </code>
              </pre>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <code className="text-[#d4a574]">SessionEndHookInput</code>
            </h3>
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
              <pre className="p-4 text-sm font-mono overflow-x-auto">
                <code>
                  <span className="text-[#c586c0]">type</span>
                  <span className="text-[#4ec9b0]"> SessionEndHookInput</span>
                  <span className="text-[#fafafa]"> = </span>
                  <span className="text-[#4ec9b0]">BaseHookInput</span>
                  <span className="text-[#fafafa]"> & {"{"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">hook_event_name</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#ce9178]">&apos;SessionEnd&apos;</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">reason</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">ExitReason</span>
                  <span className="text-[#fafafa]">; </span>
                  <span className="text-[#6a9955]">// String from EXIT_REASONS array</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"}"};</span>
                </code>
              </pre>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <code className="text-[#d4a574]">StopHookInput</code>
            </h3>
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
              <pre className="p-4 text-sm font-mono overflow-x-auto">
                <code>
                  <span className="text-[#c586c0]">type</span>
                  <span className="text-[#4ec9b0]"> StopHookInput</span>
                  <span className="text-[#fafafa]"> = </span>
                  <span className="text-[#4ec9b0]">BaseHookInput</span>
                  <span className="text-[#fafafa]"> & {"{"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">hook_event_name</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#ce9178]">&apos;Stop&apos;</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">stop_hook_active</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">boolean</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"}"};</span>
                </code>
              </pre>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <code className="text-[#d4a574]">SubagentStartHookInput</code>
            </h3>
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
              <pre className="p-4 text-sm font-mono overflow-x-auto">
                <code>
                  <span className="text-[#c586c0]">type</span>
                  <span className="text-[#4ec9b0]"> SubagentStartHookInput</span>
                  <span className="text-[#fafafa]"> = </span>
                  <span className="text-[#4ec9b0]">BaseHookInput</span>
                  <span className="text-[#fafafa]"> & {"{"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">hook_event_name</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#ce9178]">&apos;SubagentStart&apos;</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">agent_id</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">agent_type</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"}"};</span>
                </code>
              </pre>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <code className="text-[#d4a574]">SubagentStopHookInput</code>
            </h3>
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
              <pre className="p-4 text-sm font-mono overflow-x-auto">
                <code>
                  <span className="text-[#c586c0]">type</span>
                  <span className="text-[#4ec9b0]"> SubagentStopHookInput</span>
                  <span className="text-[#fafafa]"> = </span>
                  <span className="text-[#4ec9b0]">BaseHookInput</span>
                  <span className="text-[#fafafa]"> & {"{"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">hook_event_name</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#ce9178]">&apos;SubagentStop&apos;</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">stop_hook_active</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">boolean</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"}"};</span>
                </code>
              </pre>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <code className="text-[#d4a574]">PreCompactHookInput</code>
            </h3>
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
              <pre className="p-4 text-sm font-mono overflow-x-auto">
                <code>
                  <span className="text-[#c586c0]">type</span>
                  <span className="text-[#4ec9b0]"> PreCompactHookInput</span>
                  <span className="text-[#fafafa]"> = </span>
                  <span className="text-[#4ec9b0]">BaseHookInput</span>
                  <span className="text-[#fafafa]"> & {"{"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">hook_event_name</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#ce9178]">&apos;PreCompact&apos;</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">trigger</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#ce9178]">&apos;manual&apos;</span>
                  <span className="text-[#fafafa]"> | </span>
                  <span className="text-[#ce9178]">&apos;auto&apos;</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">custom_instructions</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]"> | </span>
                  <span className="text-[#4ec9b0]">null</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"}"};</span>
                </code>
              </pre>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <code className="text-[#d4a574]">PermissionRequestHookInput</code>
            </h3>
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
              <pre className="p-4 text-sm font-mono overflow-x-auto">
                <code>
                  <span className="text-[#c586c0]">type</span>
                  <span className="text-[#4ec9b0]"> PermissionRequestHookInput</span>
                  <span className="text-[#fafafa]"> = </span>
                  <span className="text-[#4ec9b0]">BaseHookInput</span>
                  <span className="text-[#fafafa]"> & {"{"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">hook_event_name</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#ce9178]">&apos;PermissionRequest&apos;</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">tool_name</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">tool_input</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">unknown</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">permission_suggestions</span>
                  <span className="text-[#fafafa]">?: </span>
                  <span className="text-[#4ec9b0]">PermissionUpdate</span>
                  <span className="text-[#fafafa]">[];</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"}"};</span>
                </code>
              </pre>
            </div>
          </div>

          {/* HookJSONOutput */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <code className="text-[#d4a574]">HookJSONOutput</code>
            </h3>
            <p className="text-[#a1a1a1] mb-4">
              Hook return value.
            </p>
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
              <pre className="p-4 text-sm font-mono overflow-x-auto">
                <code>
                  <span className="text-[#c586c0]">type</span>
                  <span className="text-[#4ec9b0]"> HookJSONOutput</span>
                  <span className="text-[#fafafa]"> = </span>
                  <span className="text-[#4ec9b0]">AsyncHookJSONOutput</span>
                  <span className="text-[#fafafa]"> | </span>
                  <span className="text-[#4ec9b0]">SyncHookJSONOutput</span>
                  <span className="text-[#fafafa]">;</span>
                </code>
              </pre>
            </div>
          </div>

          {/* AsyncHookJSONOutput */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <code className="text-[#d4a574]">AsyncHookJSONOutput</code>
            </h3>
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
              <pre className="p-4 text-sm font-mono overflow-x-auto">
                <code>
                  <span className="text-[#c586c0]">type</span>
                  <span className="text-[#4ec9b0]"> AsyncHookJSONOutput</span>
                  <span className="text-[#fafafa]"> = {"{"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">async</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#4ec9b0]">true</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">asyncTimeout</span>
                  <span className="text-[#fafafa]">?: </span>
                  <span className="text-[#4ec9b0]">number</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"}"};</span>
                </code>
              </pre>
            </div>
          </div>

          {/* SyncHookJSONOutput */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <code className="text-[#d4a574]">SyncHookJSONOutput</code>
            </h3>
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
              <pre className="p-4 text-sm font-mono overflow-x-auto">
                <code>
                  <span className="text-[#c586c0]">type</span>
                  <span className="text-[#4ec9b0]"> SyncHookJSONOutput</span>
                  <span className="text-[#fafafa]"> = {"{"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">continue</span>
                  <span className="text-[#fafafa]">?: </span>
                  <span className="text-[#4ec9b0]">boolean</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">suppressOutput</span>
                  <span className="text-[#fafafa]">?: </span>
                  <span className="text-[#4ec9b0]">boolean</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">stopReason</span>
                  <span className="text-[#fafafa]">?: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">decision</span>
                  <span className="text-[#fafafa]">?: </span>
                  <span className="text-[#ce9178]">&apos;approve&apos;</span>
                  <span className="text-[#fafafa]"> | </span>
                  <span className="text-[#ce9178]">&apos;block&apos;</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">systemMessage</span>
                  <span className="text-[#fafafa]">?: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">reason</span>
                  <span className="text-[#fafafa]">?: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"  "}</span>
                  <span className="text-[#9cdcfe]">hookSpecificOutput</span>
                  <span className="text-[#fafafa]">?:</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"    | {"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"        "}</span>
                  <span className="text-[#9cdcfe]">hookEventName</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#ce9178]">&apos;PreToolUse&apos;</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"        "}</span>
                  <span className="text-[#9cdcfe]">permissionDecision</span>
                  <span className="text-[#fafafa]">?: </span>
                  <span className="text-[#ce9178]">&apos;allow&apos;</span>
                  <span className="text-[#fafafa]"> | </span>
                  <span className="text-[#ce9178]">&apos;deny&apos;</span>
                  <span className="text-[#fafafa]"> | </span>
                  <span className="text-[#ce9178]">&apos;ask&apos;</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"        "}</span>
                  <span className="text-[#9cdcfe]">permissionDecisionReason</span>
                  <span className="text-[#fafafa]">?: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"        "}</span>
                  <span className="text-[#9cdcfe]">updatedInput</span>
                  <span className="text-[#fafafa]">?: </span>
                  <span className="text-[#4ec9b0]">Record</span>
                  <span className="text-[#fafafa]">&lt;</span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">, </span>
                  <span className="text-[#4ec9b0]">unknown</span>
                  <span className="text-[#fafafa]">&gt;;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"      }"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"    | {"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"        "}</span>
                  <span className="text-[#9cdcfe]">hookEventName</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#ce9178]">&apos;UserPromptSubmit&apos;</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"        "}</span>
                  <span className="text-[#9cdcfe]">additionalContext</span>
                  <span className="text-[#fafafa]">?: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"      }"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"    | {"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"        "}</span>
                  <span className="text-[#9cdcfe]">hookEventName</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#ce9178]">&apos;SessionStart&apos;</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"        "}</span>
                  <span className="text-[#9cdcfe]">additionalContext</span>
                  <span className="text-[#fafafa]">?: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"      }"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"    | {"}</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"        "}</span>
                  <span className="text-[#9cdcfe]">hookEventName</span>
                  <span className="text-[#fafafa]">: </span>
                  <span className="text-[#ce9178]">&apos;PostToolUse&apos;</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"        "}</span>
                  <span className="text-[#9cdcfe]">additionalContext</span>
                  <span className="text-[#fafafa]">?: </span>
                  <span className="text-[#4ec9b0]">string</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"      }"}</span>
                  <span className="text-[#fafafa]">;</span>
                  {"\n"}
                  <span className="text-[#fafafa]">{"}"};</span>
                </code>
              </pre>
            </div>
          </div>
        </section>
      </div>

      <ChapterNavigation currentChapterId="types" />
    </LearnLayout>
  );
}
