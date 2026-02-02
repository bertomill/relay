"use client";

import { LearnLayout, ChapterNavigation, CodeBlock } from "../components";

export default function AgentSDK() {
  return (
    <LearnLayout>
      <div className="mb-12">
        <p className="text-sm text-[#d4a574] font-medium mb-2">Chapter 3</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          The Agent SDK
        </h1>
        <p className="text-lg text-[#a1a1a1] max-w-2xl">
          Deep dive into the core concepts and architecture of the Claude Agent SDK.
        </p>
      </div>

      {/* Functions Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-2">Functions</h2>
        <p className="text-[#a1a1a1]">Core functions for building agents with the SDK.</p>
      </div>

      <div className="space-y-8">
        {/* query() Function */}
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">query()</code>
          </h3>
          <p className="text-[#a1a1a1] mb-6">
            The primary function for interacting with Claude Code. Creates an async generator that streams messages as they arrive.
          </p>

          {/* Function signature */}
          <CodeBlock filename="query-signature.ts">
            <span className="text-[#c586c0]">function</span>
            <span className="text-[#dcdcaa]"> query</span>
            <span className="text-[#fafafa]">({"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">prompt</span>
            <span className="text-[#fafafa]">,</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">options</span>
            {"\n"}
            <span className="text-[#fafafa]">{"}: {"}</span>
            <span className="text-[#fafafa]">{"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">prompt</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#4ec9b0]">string</span>
            <span className="text-[#fafafa]"> | </span>
            <span className="text-[#4ec9b0]">AsyncIterable</span>
            <span className="text-[#fafafa]">&lt;</span>
            <span className="text-[#4ec9b0]">SDKUserMessage</span>
            <span className="text-[#fafafa]">&gt;;</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">options</span>
            <span className="text-[#fafafa]">?: </span>
            <span className="text-[#4ec9b0]">Options</span>
            <span className="text-[#fafafa]">;</span>
            {"\n"}
            <span className="text-[#fafafa]">{"}): "}</span>
            <span className="text-[#4ec9b0]">Query</span>
          </CodeBlock>

          {/* Parameters table */}
          <div className="mt-6">
            <p className="text-sm font-medium text-[#737373] mb-3">Parameters</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1f1f1f]">
                    <th className="text-left py-3 pr-4 text-[#737373] font-medium">Parameter</th>
                    <th className="text-left py-3 pr-4 text-[#737373] font-medium">Type</th>
                    <th className="text-left py-3 text-[#737373] font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#1f1f1f]/50">
                    <td className="py-3 pr-4">
                      <code className="text-[#d4a574]">prompt</code>
                    </td>
                    <td className="py-3 pr-4 text-[#a1a1a1] font-mono text-xs">
                      string | AsyncIterable&lt;SDKUserMessage&gt;
                    </td>
                    <td className="py-3 text-[#a1a1a1]">The input prompt as a string or async iterable for streaming mode</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">
                      <code className="text-[#d4a574]">options</code>
                    </td>
                    <td className="py-3 pr-4 text-[#a1a1a1] font-mono text-xs">
                      Options
                    </td>
                    <td className="py-3 text-[#a1a1a1]">Optional configuration object (see Options type below)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Returns */}
          <div className="mt-6 bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4">
            <p className="text-sm font-medium text-[#737373] mb-2">Returns</p>
            <p className="text-sm text-[#a1a1a1]">
              Returns a <code className="text-[#d4a574] bg-[#d4a574]/10 px-1.5 py-0.5 rounded">Query</code> object that extends <code className="text-[#d4a574] bg-[#d4a574]/10 px-1.5 py-0.5 rounded">AsyncGenerator&lt;SDKMessage, void&gt;</code> with additional methods.
            </p>
          </div>
        </div>

        {/* tool() Function */}
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">tool()</code>
          </h3>
          <p className="text-[#a1a1a1] mb-6">
            Creates a type-safe MCP tool definition for use with SDK MCP servers.
          </p>

          {/* Function signature */}
          <CodeBlock filename="tool-signature.ts">
            <span className="text-[#c586c0]">function</span>
            <span className="text-[#dcdcaa]"> tool</span>
            <span className="text-[#fafafa]">&lt;</span>
            <span className="text-[#4ec9b0]">Schema</span>
            <span className="text-[#c586c0]"> extends</span>
            <span className="text-[#4ec9b0]"> ZodRawShape</span>
            <span className="text-[#fafafa]">&gt;(</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">name</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#4ec9b0]">string</span>
            <span className="text-[#fafafa]">,</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">description</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#4ec9b0]">string</span>
            <span className="text-[#fafafa]">,</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">inputSchema</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#4ec9b0]">Schema</span>
            <span className="text-[#fafafa]">,</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">handler</span>
            <span className="text-[#fafafa]">: (</span>
            <span className="text-[#9cdcfe]">args</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#4ec9b0]">z.infer</span>
            <span className="text-[#fafafa]">&lt;</span>
            <span className="text-[#4ec9b0]">ZodObject</span>
            <span className="text-[#fafafa]">&lt;</span>
            <span className="text-[#4ec9b0]">Schema</span>
            <span className="text-[#fafafa]">&gt;&gt;, </span>
            <span className="text-[#9cdcfe]">extra</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#4ec9b0]">unknown</span>
            <span className="text-[#fafafa]">) =&gt; </span>
            <span className="text-[#4ec9b0]">Promise</span>
            <span className="text-[#fafafa]">&lt;</span>
            <span className="text-[#4ec9b0]">CallToolResult</span>
            <span className="text-[#fafafa]">&gt;</span>
            {"\n"}
            <span className="text-[#fafafa]">): </span>
            <span className="text-[#4ec9b0]">SdkMcpToolDefinition</span>
            <span className="text-[#fafafa]">&lt;</span>
            <span className="text-[#4ec9b0]">Schema</span>
            <span className="text-[#fafafa]">&gt;</span>
          </CodeBlock>

          {/* Parameters table */}
          <div className="mt-6">
            <p className="text-sm font-medium text-[#737373] mb-3">Parameters</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1f1f1f]">
                    <th className="text-left py-3 pr-4 text-[#737373] font-medium">Parameter</th>
                    <th className="text-left py-3 pr-4 text-[#737373] font-medium">Type</th>
                    <th className="text-left py-3 text-[#737373] font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#1f1f1f]/50">
                    <td className="py-3 pr-4">
                      <code className="text-[#d4a574]">name</code>
                    </td>
                    <td className="py-3 pr-4 text-[#a1a1a1] font-mono text-xs">string</td>
                    <td className="py-3 text-[#a1a1a1]">The name of the tool</td>
                  </tr>
                  <tr className="border-b border-[#1f1f1f]/50">
                    <td className="py-3 pr-4">
                      <code className="text-[#d4a574]">description</code>
                    </td>
                    <td className="py-3 pr-4 text-[#a1a1a1] font-mono text-xs">string</td>
                    <td className="py-3 text-[#a1a1a1]">A description of what the tool does</td>
                  </tr>
                  <tr className="border-b border-[#1f1f1f]/50">
                    <td className="py-3 pr-4">
                      <code className="text-[#d4a574]">inputSchema</code>
                    </td>
                    <td className="py-3 pr-4 text-[#a1a1a1] font-mono text-xs">Schema extends ZodRawShape</td>
                    <td className="py-3 text-[#a1a1a1]">Zod schema defining the tool&apos;s input parameters</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">
                      <code className="text-[#d4a574]">handler</code>
                    </td>
                    <td className="py-3 pr-4 text-[#a1a1a1] font-mono text-xs">(args, extra) =&gt; Promise&lt;CallToolResult&gt;</td>
                    <td className="py-3 text-[#a1a1a1]">Async function that executes the tool logic</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* createSdkMcpServer() Function */}
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">createSdkMcpServer()</code>
          </h3>
          <p className="text-[#a1a1a1] mb-6">
            Creates an MCP server instance that runs in the same process as your application.
          </p>

          {/* Function signature */}
          <CodeBlock filename="createSdkMcpServer-signature.ts">
            <span className="text-[#c586c0]">function</span>
            <span className="text-[#dcdcaa]"> createSdkMcpServer</span>
            <span className="text-[#fafafa]">(</span>
            <span className="text-[#9cdcfe]">options</span>
            <span className="text-[#fafafa]">: {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">name</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#4ec9b0]">string</span>
            <span className="text-[#fafafa]">;</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">version</span>
            <span className="text-[#fafafa]">?: </span>
            <span className="text-[#4ec9b0]">string</span>
            <span className="text-[#fafafa]">;</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">tools</span>
            <span className="text-[#fafafa]">?: </span>
            <span className="text-[#4ec9b0]">Array</span>
            <span className="text-[#fafafa]">&lt;</span>
            <span className="text-[#4ec9b0]">SdkMcpToolDefinition</span>
            <span className="text-[#fafafa]">&lt;</span>
            <span className="text-[#4ec9b0]">any</span>
            <span className="text-[#fafafa]">&gt;&gt;;</span>
            {"\n"}
            <span className="text-[#fafafa]">{"}): "}</span>
            <span className="text-[#4ec9b0]">McpSdkServerConfigWithInstance</span>
          </CodeBlock>

          {/* Parameters table */}
          <div className="mt-6">
            <p className="text-sm font-medium text-[#737373] mb-3">Parameters</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1f1f1f]">
                    <th className="text-left py-3 pr-4 text-[#737373] font-medium">Parameter</th>
                    <th className="text-left py-3 pr-4 text-[#737373] font-medium">Type</th>
                    <th className="text-left py-3 text-[#737373] font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#1f1f1f]/50">
                    <td className="py-3 pr-4">
                      <code className="text-[#d4a574]">options.name</code>
                    </td>
                    <td className="py-3 pr-4 text-[#a1a1a1] font-mono text-xs">string</td>
                    <td className="py-3 text-[#a1a1a1]">The name of the MCP server</td>
                  </tr>
                  <tr className="border-b border-[#1f1f1f]/50">
                    <td className="py-3 pr-4">
                      <code className="text-[#d4a574]">options.version</code>
                    </td>
                    <td className="py-3 pr-4 text-[#a1a1a1] font-mono text-xs">string</td>
                    <td className="py-3 text-[#a1a1a1]">Optional version string</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">
                      <code className="text-[#d4a574]">options.tools</code>
                    </td>
                    <td className="py-3 pr-4 text-[#a1a1a1] font-mono text-xs">Array&lt;SdkMcpToolDefinition&gt;</td>
                    <td className="py-3 text-[#a1a1a1]">Array of tool definitions created with <code className="text-[#d4a574]">tool()</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Example */}
          <div className="mt-6">
            <p className="text-sm font-medium text-[#737373] mb-3">Example Usage</p>
            <CodeBlock filename="mcp-server-example.ts">
              <span className="text-[#c586c0]">import</span>
              <span className="text-[#fafafa]">{" { "}</span>
              <span className="text-[#9cdcfe]">tool</span>
              <span className="text-[#fafafa]">, </span>
              <span className="text-[#9cdcfe]">createSdkMcpServer</span>
              <span className="text-[#fafafa]">, </span>
              <span className="text-[#9cdcfe]">query</span>
              <span className="text-[#fafafa]">{" } "}</span>
              <span className="text-[#c586c0]">from</span>
              <span className="text-[#ce9178]">{" \"@anthropic-ai/claude-agent-sdk\""}</span>
              <span className="text-[#fafafa]">;</span>
              {"\n"}
              <span className="text-[#c586c0]">import</span>
              <span className="text-[#fafafa]">{" { "}</span>
              <span className="text-[#9cdcfe]">z</span>
              <span className="text-[#fafafa]">{" } "}</span>
              <span className="text-[#c586c0]">from</span>
              <span className="text-[#ce9178]">{" \"zod\""}</span>
              <span className="text-[#fafafa]">;</span>
              {"\n\n"}
              <span className="text-[#6a9955]">{"// Define a custom tool"}</span>
              {"\n"}
              <span className="text-[#c586c0]">const</span>
              <span className="text-[#9cdcfe]"> weatherTool</span>
              <span className="text-[#fafafa]"> = </span>
              <span className="text-[#dcdcaa]">tool</span>
              <span className="text-[#fafafa]">(</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  "}</span>
              <span className="text-[#ce9178]">&quot;get_weather&quot;</span>
              <span className="text-[#fafafa]">,</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  "}</span>
              <span className="text-[#ce9178]">&quot;Get current weather for a city&quot;</span>
              <span className="text-[#fafafa]">,</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  "}</span>
              <span className="text-[#fafafa]">{"{ "}</span>
              <span className="text-[#9cdcfe]">city</span>
              <span className="text-[#fafafa]">: </span>
              <span className="text-[#9cdcfe]">z</span>
              <span className="text-[#fafafa]">.</span>
              <span className="text-[#dcdcaa]">string</span>
              <span className="text-[#fafafa]">() {"}"},</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  "}</span>
              <span className="text-[#c586c0]">async</span>
              <span className="text-[#fafafa]"> ({"{ "}</span>
              <span className="text-[#9cdcfe]">city</span>
              <span className="text-[#fafafa]">{" }"}) =&gt; ({"{ "}</span>
              <span className="text-[#9cdcfe]">content</span>
              <span className="text-[#fafafa]">: [{"{ "}</span>
              <span className="text-[#9cdcfe]">type</span>
              <span className="text-[#fafafa]">: </span>
              <span className="text-[#ce9178]">&quot;text&quot;</span>
              <span className="text-[#fafafa]">, </span>
              <span className="text-[#9cdcfe]">text</span>
              <span className="text-[#fafafa]">: </span>
              <span className="text-[#ce9178]">{"`72°F in ${city}`"}</span>
              <span className="text-[#fafafa]">{" }]"} {"}"})</span>
              {"\n"}
              <span className="text-[#fafafa]">);</span>
              {"\n\n"}
              <span className="text-[#6a9955]">{"// Create an in-process MCP server"}</span>
              {"\n"}
              <span className="text-[#c586c0]">const</span>
              <span className="text-[#9cdcfe]"> server</span>
              <span className="text-[#fafafa]"> = </span>
              <span className="text-[#dcdcaa]">createSdkMcpServer</span>
              <span className="text-[#fafafa]">({"{"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  "}</span>
              <span className="text-[#9cdcfe]">name</span>
              <span className="text-[#fafafa]">: </span>
              <span className="text-[#ce9178]">&quot;weather-server&quot;</span>
              <span className="text-[#fafafa]">,</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  "}</span>
              <span className="text-[#9cdcfe]">tools</span>
              <span className="text-[#fafafa]">: [</span>
              <span className="text-[#9cdcfe]">weatherTool</span>
              <span className="text-[#fafafa]">]</span>
              {"\n"}
              <span className="text-[#fafafa]">{"}"});</span>
              {"\n\n"}
              <span className="text-[#6a9955]">{"// Use with query()"}</span>
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
              <span className="text-[#ce9178]">&quot;What&apos;s the weather in Tokyo?&quot;</span>
              <span className="text-[#fafafa]">,</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  "}</span>
              <span className="text-[#9cdcfe]">options</span>
              <span className="text-[#fafafa]">: {"{ "}</span>
              <span className="text-[#9cdcfe]">mcpServers</span>
              <span className="text-[#fafafa]">: {"{ "}</span>
              <span className="text-[#9cdcfe]">weather</span>
              <span className="text-[#fafafa]">: </span>
              <span className="text-[#9cdcfe]">server</span>
              <span className="text-[#fafafa]">{" } }"}</span>
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
        </div>
      </div>

      <ChapterNavigation currentChapterId="agent-sdk" />
    </LearnLayout>
  );
}
