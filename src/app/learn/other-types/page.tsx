"use client";

import { LearnLayout, ChapterNavigation } from "../components";

export default function OtherTypes() {
  return (
    <LearnLayout>
      <div className="mb-12">
        <p className="text-sm text-[#d4a574] font-medium mb-2">Chapter 10</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Other Types
        </h1>
        <p className="text-lg text-[#a1a1a1] max-w-2xl">
          Additional type definitions for API keys, models, MCP servers, configuration, and sandbox settings.
        </p>
      </div>

      <div className="space-y-12">
        {/* ApiKeySource */}
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">ApiKeySource</code>
            <span className="text-xs text-[#525252] font-normal">Type Alias</span>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Indicates the source of the API key being used.
          </p>

          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4 mb-4">
            <pre className="text-sm font-mono text-[#a1a1a1] overflow-x-auto">
{`type ApiKeySource = 'user' | 'project' | 'org' | 'temporary';`}
            </pre>
          </div>

          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1f1f1f] bg-[#0d0d0d]">
                    <th className="text-left py-3 px-4 text-[#737373] font-medium whitespace-nowrap">Value</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f1f]/50">
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">&apos;user&apos;</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1]">API key from user settings</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">&apos;project&apos;</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1]">API key from project configuration</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">&apos;org&apos;</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1]">API key from organization</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">&apos;temporary&apos;</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Temporary API key for current session</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SdkBeta */}
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">SdkBeta</code>
            <span className="text-xs text-[#525252] font-normal">Type Alias</span>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Available beta features that can be enabled via the <code className="text-[#d4a574]">betas</code> option. See Beta headers for more information.
          </p>

          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4 mb-4">
            <pre className="text-sm font-mono text-[#a1a1a1] overflow-x-auto">
{`type SdkBeta = 'context-1m-2025-08-07';`}
            </pre>
          </div>

          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1f1f1f] bg-[#0d0d0d]">
                    <th className="text-left py-3 px-4 text-[#737373] font-medium whitespace-nowrap">Value</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium">Description</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium whitespace-nowrap">Compatible Models</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f1f]/50">
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574] text-xs">&apos;context-1m-2025-08-07&apos;</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Enables 1 million token context window</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Claude Sonnet 4, Claude Sonnet 4.5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SlashCommand */}
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">SlashCommand</code>
            <span className="text-xs text-[#525252] font-normal">Type</span>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Information about an available slash command.
          </p>

          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4 mb-4">
            <pre className="text-sm font-mono text-[#a1a1a1] overflow-x-auto">
{`type SlashCommand = {
  name: string;
  description: string;
  argumentHint: string;
}`}
            </pre>
          </div>

          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1f1f1f] bg-[#0d0d0d]">
                    <th className="text-left py-3 px-4 text-[#737373] font-medium whitespace-nowrap">Property</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium whitespace-nowrap">Type</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f1f]/50">
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">name</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">The command name (without slash)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">description</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Description of what the command does</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">argumentHint</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Hint for expected arguments</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ModelInfo */}
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">ModelInfo</code>
            <span className="text-xs text-[#525252] font-normal">Type</span>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Information about an available model.
          </p>

          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4 mb-4">
            <pre className="text-sm font-mono text-[#a1a1a1] overflow-x-auto">
{`type ModelInfo = {
  value: string;
  displayName: string;
  description: string;
}`}
            </pre>
          </div>

          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1f1f1f] bg-[#0d0d0d]">
                    <th className="text-left py-3 px-4 text-[#737373] font-medium whitespace-nowrap">Property</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium whitespace-nowrap">Type</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f1f]/50">
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">value</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">The model identifier</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">displayName</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Human-readable name for display</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">description</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Description of the model capabilities</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* McpServerStatus */}
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">McpServerStatus</code>
            <span className="text-xs text-[#525252] font-normal">Type</span>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Status of a connected MCP server.
          </p>

          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4 mb-4">
            <pre className="text-sm font-mono text-[#a1a1a1] overflow-x-auto">
{`type McpServerStatus = {
  name: string;
  status: 'connected' | 'failed' | 'needs-auth' | 'pending';
  serverInfo?: {
    name: string;
    version: string;
  };
}`}
            </pre>
          </div>

          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1f1f1f] bg-[#0d0d0d]">
                    <th className="text-left py-3 px-4 text-[#737373] font-medium whitespace-nowrap">Property</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium whitespace-nowrap">Type</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f1f]/50">
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">name</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">The MCP server name</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">status</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">&apos;connected&apos; | &apos;failed&apos; | &apos;needs-auth&apos; | &apos;pending&apos;</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Current connection status</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">serverInfo</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">object?</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Optional server metadata (name, version)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#1f1f1f] bg-[#0d0d0d]">
              <p className="text-xs text-[#737373]">Status values:</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-[#1f1f1f]/50">
                  <tr>
                    <td className="py-3 px-4 w-40"><code className="text-[#28c840]">&apos;connected&apos;</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Successfully connected</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#ff5f57]">&apos;failed&apos;</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Connection failed</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#febc2e]">&apos;needs-auth&apos;</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Requires authentication</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#a1a1a1]">&apos;pending&apos;</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Connection in progress</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* AccountInfo */}
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">AccountInfo</code>
            <span className="text-xs text-[#525252] font-normal">Type</span>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Account information for the authenticated user.
          </p>

          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4 mb-4">
            <pre className="text-sm font-mono text-[#a1a1a1] overflow-x-auto">
{`type AccountInfo = {
  email?: string;
  organization?: string;
  subscriptionType?: string;
  tokenSource?: string;
  apiKeySource?: string;
}`}
            </pre>
          </div>

          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1f1f1f] bg-[#0d0d0d]">
                    <th className="text-left py-3 px-4 text-[#737373] font-medium whitespace-nowrap">Property</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium whitespace-nowrap">Type</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f1f]/50">
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">email</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string?</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">User&apos;s email address</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">organization</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string?</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Organization name</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">subscriptionType</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string?</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Type of subscription</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">tokenSource</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string?</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Source of the authentication token</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">apiKeySource</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string?</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Source of the API key</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ModelUsage */}
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">ModelUsage</code>
            <span className="text-xs text-[#525252] font-normal">Type</span>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Per-model usage statistics returned in result messages.
          </p>

          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4 mb-4">
            <pre className="text-sm font-mono text-[#a1a1a1] overflow-x-auto">
{`type ModelUsage = {
  inputTokens: number;
  outputTokens: number;
  cacheReadInputTokens: number;
  cacheCreationInputTokens: number;
  webSearchRequests: number;
  costUSD: number;
  contextWindow: number;
}`}
            </pre>
          </div>

          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1f1f1f] bg-[#0d0d0d]">
                    <th className="text-left py-3 px-4 text-[#737373] font-medium whitespace-nowrap">Property</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium whitespace-nowrap">Type</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f1f]/50">
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">inputTokens</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">number</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Number of input tokens used</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">outputTokens</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">number</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Number of output tokens generated</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">cacheReadInputTokens</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">number</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Tokens read from cache</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">cacheCreationInputTokens</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">number</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Tokens used to create cache</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">webSearchRequests</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">number</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Number of web search requests</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">costUSD</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">number</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Total cost in USD</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">contextWindow</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">number</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Context window size used</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ConfigScope */}
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">ConfigScope</code>
            <span className="text-xs text-[#525252] font-normal">Type Alias</span>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Specifies the scope of configuration settings.
          </p>

          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4 mb-4">
            <pre className="text-sm font-mono text-[#a1a1a1] overflow-x-auto">
{`type ConfigScope = 'local' | 'user' | 'project';`}
            </pre>
          </div>

          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1f1f1f] bg-[#0d0d0d]">
                    <th className="text-left py-3 px-4 text-[#737373] font-medium whitespace-nowrap">Value</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f1f]/50">
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">&apos;local&apos;</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Local (gitignored) settings</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">&apos;user&apos;</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Global user settings</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">&apos;project&apos;</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Project-specific settings</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Usage Types */}
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">Usage</code>
            <span className="text-xs text-[#525252] font-normal">Type</span>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Token usage statistics (from <code className="text-[#d4a574]">@anthropic-ai/sdk</code>).
          </p>

          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4 mb-4">
            <pre className="text-sm font-mono text-[#a1a1a1] overflow-x-auto">
{`type Usage = {
  input_tokens: number | null;
  output_tokens: number | null;
  cache_creation_input_tokens?: number | null;
  cache_read_input_tokens?: number | null;
}`}
            </pre>
          </div>

          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1f1f1f] bg-[#0d0d0d]">
                    <th className="text-left py-3 px-4 text-[#737373] font-medium whitespace-nowrap">Property</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium whitespace-nowrap">Type</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f1f]/50">
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">input_tokens</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">number | null</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Number of input tokens</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">output_tokens</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">number | null</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Number of output tokens</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">cache_creation_input_tokens</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">number | null?</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Tokens used to create cache</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">cache_read_input_tokens</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">number | null?</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Tokens read from cache</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-3">
              <code className="text-[#d4a574]">NonNullableUsage</code>
              <span className="text-xs text-[#525252] font-normal">Type</span>
            </h3>
            <p className="text-[#a1a1a1] mb-4">
              A version of Usage with all nullable fields made non-nullable.
            </p>

            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4">
              <pre className="text-sm font-mono text-[#a1a1a1] overflow-x-auto">
{`type NonNullableUsage = {
  [K in keyof Usage]: NonNullable<Usage[K]>;
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* CallToolResult */}
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">CallToolResult</code>
            <span className="text-xs text-[#525252] font-normal">Type</span>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            MCP tool result type (from <code className="text-[#d4a574]">@modelcontextprotocol/sdk/types.js</code>).
          </p>

          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4 mb-4">
            <pre className="text-sm font-mono text-[#a1a1a1] overflow-x-auto">
{`type CallToolResult = {
  content: Array<{
    type: 'text' | 'image' | 'resource';
    // Additional fields vary by type
  }>;
  isError?: boolean;
}`}
            </pre>
          </div>

          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1f1f1f] bg-[#0d0d0d]">
                    <th className="text-left py-3 px-4 text-[#737373] font-medium whitespace-nowrap">Property</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium whitespace-nowrap">Type</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f1f]/50">
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">content</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">Array</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Array of content items (text, image, or resource)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">isError</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">boolean?</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Whether the result represents an error</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* AbortError */}
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">AbortError</code>
            <span className="text-xs text-[#525252] font-normal">Class</span>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Custom error class for abort operations.
          </p>

          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4">
            <pre className="text-sm font-mono text-[#a1a1a1] overflow-x-auto">
{`class AbortError extends Error {}`}
            </pre>
          </div>
        </section>
      </div>

      {/* Sandbox Configuration Section */}
      <div className="mt-16 pt-12 border-t border-[#1f1f1f]">
        <div className="mb-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4">
            Sandbox Configuration
          </h2>
          <p className="text-[#a1a1a1] max-w-2xl">
            Configuration for sandbox behavior. Use this to enable command sandboxing and configure network restrictions programmatically.
          </p>
        </div>

        <div className="space-y-12">
          {/* SandboxSettings */}
          <section>
            <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
              <code className="text-[#d4a574]">SandboxSettings</code>
              <span className="text-xs text-[#525252] font-normal">Type</span>
            </h3>
            <p className="text-[#a1a1a1] mb-6">
              Configuration for sandbox behavior.
            </p>

            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4 mb-4">
              <pre className="text-sm font-mono text-[#a1a1a1] overflow-x-auto">
{`type SandboxSettings = {
  enabled?: boolean;
  autoAllowBashIfSandboxed?: boolean;
  excludedCommands?: string[];
  allowUnsandboxedCommands?: boolean;
  network?: NetworkSandboxSettings;
  ignoreViolations?: SandboxIgnoreViolations;
  enableWeakerNestedSandbox?: boolean;
}`}
              </pre>
            </div>

            <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#1f1f1f] bg-[#0d0d0d]">
                      <th className="text-left py-3 px-4 text-[#737373] font-medium whitespace-nowrap">Property</th>
                      <th className="text-left py-3 px-4 text-[#737373] font-medium whitespace-nowrap">Type</th>
                      <th className="text-left py-3 px-4 text-[#737373] font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1f1f1f]/50">
                    <tr>
                      <td className="py-3 px-4"><code className="text-[#d4a574]">enabled</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">boolean?</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Enable sandbox mode</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><code className="text-[#d4a574]">autoAllowBashIfSandboxed</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">boolean?</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Auto-allow bash commands when sandboxed</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><code className="text-[#d4a574]">excludedCommands</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string[]?</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Commands excluded from sandbox</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><code className="text-[#d4a574]">allowUnsandboxedCommands</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">boolean?</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Allow commands to run outside sandbox</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><code className="text-[#d4a574]">network</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">NetworkSandboxSettings?</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Network restriction settings</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><code className="text-[#d4a574]">ignoreViolations</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">SandboxIgnoreViolations?</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Which violations to ignore</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><code className="text-[#d4a574]">enableWeakerNestedSandbox</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">boolean?</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Enable weaker nested sandbox mode</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>

      <ChapterNavigation currentChapterId="other-types" />
    </LearnLayout>
  );
}
