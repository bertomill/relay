"use client";

import { LearnLayout, ChapterNavigation, CodeBlock } from "../components";

export default function SessionManagement() {
  return (
    <LearnLayout>
      <div className="mb-12">
        <p className="text-sm text-[#d4a574] font-medium mb-2">Chapter 16</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Session Management
        </h1>
        <p className="text-lg text-[#a1a1a1] max-w-2xl">
          Understanding how the Claude Agent SDK handles sessions and session resumption.
        </p>
      </div>

      <div className="space-y-12">
        {/* Intro */}
        <section>
          <p className="text-[#a1a1a1]">
            The Claude Agent SDK provides session management capabilities for handling conversation state and resumption. Sessions allow you to continue conversations across multiple interactions while maintaining full context.
          </p>
        </section>

        {/* How Sessions Work */}
        <section>
          <h2 className="text-2xl font-bold mb-6">How Sessions Work</h2>
          <p className="text-[#a1a1a1] mb-6">
            When you start a new query, the SDK automatically creates a session and returns a session ID in the initial system message. You can capture this ID to resume the session later.
          </p>

          <h3 className="text-xl font-semibold mb-4">Getting the Session ID</h3>

          <CodeBlock filename="get-session-id.ts">
            <span className="text-[#c586c0]">import</span>
            <span className="text-[#fafafa]"> {"{ "}</span>
            <span className="text-[#9cdcfe]">query</span>
            <span className="text-[#fafafa]">{" }"} </span>
            <span className="text-[#c586c0]">from</span>
            <span className="text-[#ce9178]"> &quot;@anthropic-ai/claude-agent-sdk&quot;</span>
            <span className="text-[#fafafa]">;</span>
            {"\n\n"}
            <span className="text-[#c586c0]">let</span>
            <span className="text-[#9cdcfe]"> sessionId</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#4ec9b0]">string</span>
            <span className="text-[#fafafa]"> | </span>
            <span className="text-[#4ec9b0]">undefined</span>
            <span className="text-[#fafafa]">;</span>
            {"\n\n"}
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> response</span>
            <span className="text-[#fafafa]"> = </span>
            <span className="text-[#dcdcaa]">query</span>
            <span className="text-[#fafafa]">({"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">prompt</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&quot;Help me build a web application&quot;</span>
            <span className="text-[#fafafa]">,</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">options</span>
            <span className="text-[#fafafa]">: {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">model</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&quot;claude-sonnet-4-5&quot;</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"})"}</span>
            <span className="text-[#fafafa]">;</span>
            {"\n\n"}
            <span className="text-[#c586c0]">for await</span>
            <span className="text-[#fafafa]"> (</span>
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> message</span>
            <span className="text-[#c586c0]"> of</span>
            <span className="text-[#9cdcfe]"> response</span>
            <span className="text-[#fafafa]">) {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#6a9955]">// The first message is a system init message with the session ID</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#c586c0]">if</span>
            <span className="text-[#fafafa]"> (</span>
            <span className="text-[#9cdcfe]">message</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">type</span>
            <span className="text-[#fafafa]"> === </span>
            <span className="text-[#ce9178]">&apos;system&apos;</span>
            <span className="text-[#fafafa]"> && </span>
            <span className="text-[#9cdcfe]">message</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">subtype</span>
            <span className="text-[#fafafa]"> === </span>
            <span className="text-[#ce9178]">&apos;init&apos;</span>
            <span className="text-[#fafafa]">) {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">sessionId</span>
            <span className="text-[#fafafa]"> = </span>
            <span className="text-[#9cdcfe]">message</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">session_id</span>
            <span className="text-[#fafafa]">;</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">console</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#dcdcaa]">log</span>
            <span className="text-[#fafafa]">(</span>
            <span className="text-[#ce9178]">`Session started with ID: </span>
            <span className="text-[#fafafa]">${"{"}</span>
            <span className="text-[#9cdcfe]">sessionId</span>
            <span className="text-[#fafafa]">{"}"}</span>
            <span className="text-[#ce9178]">`</span>
            <span className="text-[#fafafa]">);</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"}"}</span>
          </CodeBlock>
        </section>

        {/* Resuming Sessions */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Resuming Sessions</h2>
          <p className="text-[#a1a1a1] mb-6">
            The SDK supports resuming sessions from previous conversation states, enabling continuous development workflows. Use the <code className="text-[#d4a574]">resume</code> option with a session ID to continue a previous conversation.
          </p>

          <CodeBlock filename="resume-session.ts">
            <span className="text-[#c586c0]">import</span>
            <span className="text-[#fafafa]"> {"{ "}</span>
            <span className="text-[#9cdcfe]">query</span>
            <span className="text-[#fafafa]">{" }"} </span>
            <span className="text-[#c586c0]">from</span>
            <span className="text-[#ce9178]"> &quot;@anthropic-ai/claude-agent-sdk&quot;</span>
            <span className="text-[#fafafa]">;</span>
            {"\n\n"}
            <span className="text-[#6a9955]">// Resume a previous session using its ID</span>
            {"\n"}
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> response</span>
            <span className="text-[#fafafa]"> = </span>
            <span className="text-[#dcdcaa]">query</span>
            <span className="text-[#fafafa]">({"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">prompt</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&quot;Continue implementing the auth system&quot;</span>
            <span className="text-[#fafafa]">,</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">options</span>
            <span className="text-[#fafafa]">: {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">resume</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&quot;session-xyz&quot;</span>
            <span className="text-[#fafafa]">,</span>
            <span className="text-[#6a9955]">  // Session ID from previous conversation</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">model</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&quot;claude-sonnet-4-5&quot;</span>
            <span className="text-[#fafafa]">,</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">allowedTools</span>
            <span className="text-[#fafafa]">: [</span>
            <span className="text-[#ce9178]">&quot;Read&quot;</span>
            <span className="text-[#fafafa]">, </span>
            <span className="text-[#ce9178]">&quot;Edit&quot;</span>
            <span className="text-[#fafafa]">, </span>
            <span className="text-[#ce9178]">&quot;Write&quot;</span>
            <span className="text-[#fafafa]">, </span>
            <span className="text-[#ce9178]">&quot;Bash&quot;</span>
            <span className="text-[#fafafa]">]</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"})"}</span>
            <span className="text-[#fafafa]">;</span>
            {"\n\n"}
            <span className="text-[#6a9955]">// The conversation continues with full context</span>
            {"\n"}
            <span className="text-[#c586c0]">for await</span>
            <span className="text-[#fafafa]"> (</span>
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> message</span>
            <span className="text-[#c586c0]"> of</span>
            <span className="text-[#9cdcfe]"> response</span>
            <span className="text-[#fafafa]">) {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">console</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#dcdcaa]">log</span>
            <span className="text-[#fafafa]">(</span>
            <span className="text-[#9cdcfe]">message</span>
            <span className="text-[#fafafa]">);</span>
            {"\n"}
            <span className="text-[#fafafa]">{"}"}</span>
          </CodeBlock>

          <div className="mt-6 p-4 bg-[#1a2a1a] border border-[#2a4a2a] rounded-xl">
            <p className="text-sm text-[#a0ffa0] font-medium mb-2">Tip</p>
            <p className="text-sm text-[#a1a1a1]">
              The SDK automatically handles loading the conversation history and context when you resume a session, allowing Claude to continue exactly where it left off.
            </p>
          </div>
        </section>

        {/* Forking Sessions */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Forking Sessions</h2>
          <p className="text-[#a1a1a1] mb-6">
            When resuming a session, you can choose to either continue the original session or fork it into a new branch. By default, resuming continues the original session. Use the <code className="text-[#d4a574]">forkSession</code> option (TypeScript) or <code className="text-[#d4a574]">fork_session</code> option (Python) to create a new session ID that starts from the resumed state.
          </p>

          <h3 className="text-xl font-semibold mb-4">When to Fork a Session</h3>
          <p className="text-[#a1a1a1] mb-4">
            Forking is useful when you want to:
          </p>
          <ul className="text-[#a1a1a1] space-y-2 mb-8 ml-4 list-disc">
            <li>Explore different approaches from the same starting point</li>
            <li>Create multiple conversation branches without modifying the original</li>
            <li>Test changes without affecting the original session history</li>
            <li>Maintain separate conversation paths for different experiments</li>
          </ul>

          <h3 className="text-xl font-semibold mb-4">Forking vs Continuing</h3>
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1f1f1f] bg-[#0d0d0d]">
                    <th className="text-left py-3 px-4 text-[#737373] font-medium">Behavior</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium"><code className="text-[#d4a574]">forkSession: false</code> (default)</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium"><code className="text-[#d4a574]">forkSession: true</code></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f1f]/50">
                  <tr>
                    <td className="py-3 px-4 text-[#fafafa]">Session ID</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Same as original</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">New session ID generated</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-[#fafafa]">History</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Appends to original session</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Creates new branch from resume point</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-[#fafafa]">Original Session</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Modified</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Preserved unchanged</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-[#fafafa]">Use Case</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Continue linear conversation</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Branch to explore alternatives</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-4">Example: Forking a Session</h3>
          <CodeBlock filename="fork-session.ts">
            <span className="text-[#c586c0]">import</span>
            <span className="text-[#fafafa]"> {"{ "}</span>
            <span className="text-[#9cdcfe]">query</span>
            <span className="text-[#fafafa]">{" }"} </span>
            <span className="text-[#c586c0]">from</span>
            <span className="text-[#ce9178]"> &quot;@anthropic-ai/claude-agent-sdk&quot;</span>
            <span className="text-[#fafafa]">;</span>
            {"\n\n"}
            <span className="text-[#6a9955]">// First, capture the session ID</span>
            {"\n"}
            <span className="text-[#c586c0]">let</span>
            <span className="text-[#9cdcfe]"> sessionId</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#4ec9b0]">string</span>
            <span className="text-[#fafafa]"> | </span>
            <span className="text-[#4ec9b0]">undefined</span>
            <span className="text-[#fafafa]">;</span>
            {"\n\n"}
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> response</span>
            <span className="text-[#fafafa]"> = </span>
            <span className="text-[#dcdcaa]">query</span>
            <span className="text-[#fafafa]">({"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">prompt</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&quot;Help me design a REST API&quot;</span>
            <span className="text-[#fafafa]">,</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">options</span>
            <span className="text-[#fafafa]">: {"{ "}</span>
            <span className="text-[#9cdcfe]">model</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&quot;claude-sonnet-4-5&quot;</span>
            <span className="text-[#fafafa]">{" }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"})"}</span>
            <span className="text-[#fafafa]">;</span>
            {"\n\n"}
            <span className="text-[#c586c0]">for await</span>
            <span className="text-[#fafafa]"> (</span>
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> message</span>
            <span className="text-[#c586c0]"> of</span>
            <span className="text-[#9cdcfe]"> response</span>
            <span className="text-[#fafafa]">) {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#c586c0]">if</span>
            <span className="text-[#fafafa]"> (</span>
            <span className="text-[#9cdcfe]">message</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">type</span>
            <span className="text-[#fafafa]"> === </span>
            <span className="text-[#ce9178]">&apos;system&apos;</span>
            <span className="text-[#fafafa]"> && </span>
            <span className="text-[#9cdcfe]">message</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">subtype</span>
            <span className="text-[#fafafa]"> === </span>
            <span className="text-[#ce9178]">&apos;init&apos;</span>
            <span className="text-[#fafafa]">) {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">sessionId</span>
            <span className="text-[#fafafa]"> = </span>
            <span className="text-[#9cdcfe]">message</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">session_id</span>
            <span className="text-[#fafafa]">;</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">console</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#dcdcaa]">log</span>
            <span className="text-[#fafafa]">(</span>
            <span className="text-[#ce9178]">`Original session: </span>
            <span className="text-[#fafafa]">${"{"}</span>
            <span className="text-[#9cdcfe]">sessionId</span>
            <span className="text-[#fafafa]">{"}"}</span>
            <span className="text-[#ce9178]">`</span>
            <span className="text-[#fafafa]">);</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"}"}</span>
            {"\n\n"}
            <span className="text-[#6a9955]">// Fork the session to try a different approach</span>
            {"\n"}
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> forkedResponse</span>
            <span className="text-[#fafafa]"> = </span>
            <span className="text-[#dcdcaa]">query</span>
            <span className="text-[#fafafa]">({"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">prompt</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&quot;Redesign this as a GraphQL API instead&quot;</span>
            <span className="text-[#fafafa]">,</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">options</span>
            <span className="text-[#fafafa]">: {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">resume</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#9cdcfe]">sessionId</span>
            <span className="text-[#fafafa]">,</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">forkSession</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#569cd6]">true</span>
            <span className="text-[#fafafa]">,</span>
            <span className="text-[#6a9955]">  // Creates a new session ID</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">model</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&quot;claude-sonnet-4-5&quot;</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"})"}</span>
            <span className="text-[#fafafa]">;</span>
            {"\n\n"}
            <span className="text-[#c586c0]">for await</span>
            <span className="text-[#fafafa]"> (</span>
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> message</span>
            <span className="text-[#c586c0]"> of</span>
            <span className="text-[#9cdcfe]"> forkedResponse</span>
            <span className="text-[#fafafa]">) {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#c586c0]">if</span>
            <span className="text-[#fafafa]"> (</span>
            <span className="text-[#9cdcfe]">message</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">type</span>
            <span className="text-[#fafafa]"> === </span>
            <span className="text-[#ce9178]">&apos;system&apos;</span>
            <span className="text-[#fafafa]"> && </span>
            <span className="text-[#9cdcfe]">message</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">subtype</span>
            <span className="text-[#fafafa]"> === </span>
            <span className="text-[#ce9178]">&apos;init&apos;</span>
            <span className="text-[#fafafa]">) {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">console</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#dcdcaa]">log</span>
            <span className="text-[#fafafa]">(</span>
            <span className="text-[#ce9178]">`Forked session: </span>
            <span className="text-[#fafafa]">${"{"}</span>
            <span className="text-[#9cdcfe]">message</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">session_id</span>
            <span className="text-[#fafafa]">{"}"}</span>
            <span className="text-[#ce9178]">`</span>
            <span className="text-[#fafafa]">);</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#6a9955]">// This will be a different session ID</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"}"}</span>
            {"\n\n"}
            <span className="text-[#6a9955]">// The original session remains unchanged and can still be resumed</span>
            {"\n"}
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> originalContinued</span>
            <span className="text-[#fafafa]"> = </span>
            <span className="text-[#dcdcaa]">query</span>
            <span className="text-[#fafafa]">({"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">prompt</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&quot;Add authentication to the REST API&quot;</span>
            <span className="text-[#fafafa]">,</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">options</span>
            <span className="text-[#fafafa]">: {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">resume</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#9cdcfe]">sessionId</span>
            <span className="text-[#fafafa]">,</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">forkSession</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#569cd6]">false</span>
            <span className="text-[#fafafa]">,</span>
            <span className="text-[#6a9955]">  // Continue original (default)</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">model</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&quot;claude-sonnet-4-5&quot;</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"})"}</span>
            <span className="text-[#fafafa]">;</span>
          </CodeBlock>
        </section>

        {/* Related resources */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Related resources</h2>
          <ul className="text-[#a1a1a1] space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-[#d4a574]">-</span>
              <span><span className="text-[#fafafa]">Configure Permissions:</span> Control how your agent uses tools</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#d4a574]">-</span>
              <span><span className="text-[#fafafa]">Handle User Input:</span> Surface approval requests and questions to users</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#d4a574]">-</span>
              <span><span className="text-[#fafafa]">Capabilities:</span> Explore hooks, subagents, and MCP integration</span>
            </li>
          </ul>
        </section>
      </div>

      <ChapterNavigation currentChapterId="session-management" />
    </LearnLayout>
  );
}
