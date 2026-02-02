"use client";

import { LearnLayout, ChapterNavigation, CodeBlock } from "../components";

export default function Permissions() {
  return (
    <LearnLayout>
      <div className="mb-12">
        <p className="text-sm text-[#d4a574] font-medium mb-2">Chapter 12</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Configure Permissions
        </h1>
        <p className="text-lg text-[#a1a1a1] max-w-2xl">
          Control how your agent uses tools with permission modes, hooks, and declarative allow/deny rules.
        </p>
      </div>

      <div className="space-y-12">
        {/* Intro */}
        <section>
          <p className="text-[#a1a1a1] mb-4">
            The Claude Agent SDK provides permission controls to manage how Claude uses tools. Use permission modes and rules to define what&apos;s allowed automatically, and the <code className="text-[#d4a574]">canUseTool</code> callback to handle everything else at runtime.
          </p>
          <div className="p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl">
            <p className="text-sm text-[#a1a1a1]">
              <span className="text-[#d4a574] font-medium">Note:</span> This page covers permission modes and rules. To build interactive approval flows where users approve or deny tool requests at runtime, see the User Input chapter.
            </p>
          </div>
        </section>

        {/* How permissions are evaluated */}
        <section>
          <h2 className="text-2xl font-bold mb-6">How permissions are evaluated</h2>
          <p className="text-[#a1a1a1] mb-6">
            When Claude requests a tool, the SDK checks permissions in this order:
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-[#d4a574] text-[#0a0a0a] flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <div>
                <p className="font-semibold text-[#fafafa]">Hooks</p>
                <p className="text-sm text-[#a1a1a1]">Run hooks first, which can allow, deny, or continue to the next step</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-[#d4a574] text-[#0a0a0a] flex items-center justify-center text-sm font-bold shrink-0">2</span>
              <div>
                <p className="font-semibold text-[#fafafa]">Permission rules</p>
                <p className="text-sm text-[#a1a1a1]">Check rules defined in <code className="text-[#d4a574]">settings.json</code>: <code className="text-[#737373]">deny</code> rules first (block regardless of other rules), then <code className="text-[#737373]">allow</code> rules (permit if matched), then <code className="text-[#737373]">ask</code> rules (prompt for approval)</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-[#d4a574] text-[#0a0a0a] flex items-center justify-center text-sm font-bold shrink-0">3</span>
              <div>
                <p className="font-semibold text-[#fafafa]">Permission mode</p>
                <p className="text-sm text-[#a1a1a1]">Apply the active permission mode (<code className="text-[#737373]">bypassPermissions</code>, <code className="text-[#737373]">acceptEdits</code>, <code className="text-[#737373]">dontAsk</code>, etc.)</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-[#d4a574] text-[#0a0a0a] flex items-center justify-center text-sm font-bold shrink-0">4</span>
              <div>
                <p className="font-semibold text-[#fafafa]">canUseTool callback</p>
                <p className="text-sm text-[#a1a1a1]">If not resolved by rules or modes, call your <code className="text-[#d4a574]">canUseTool</code> callback for a decision</p>
              </div>
            </div>
          </div>
        </section>

        {/* Permission modes */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Permission modes</h2>
          <p className="text-[#a1a1a1] mb-6">
            Permission modes provide global control over how Claude uses tools. You can set the permission mode when calling <code className="text-[#d4a574]">query()</code> or change it dynamically during streaming sessions.
          </p>

          <h3 className="text-xl font-semibold mb-4">Available modes</h3>

          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1f1f1f] bg-[#0d0d0d]">
                    <th className="text-left py-3 px-4 text-[#737373] font-medium whitespace-nowrap">Mode</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium">Description</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium">Tool behavior</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f1f]/50">
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">default</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Standard permission behavior</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">No auto-approvals; unmatched tools trigger your <code className="text-[#d4a574]">canUseTool</code> callback</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">acceptEdits</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Auto-accept file edits</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">File edits and filesystem operations (<code className="text-[#737373]">mkdir</code>, <code className="text-[#737373]">rm</code>, <code className="text-[#737373]">mv</code>, etc.) are automatically approved</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">bypassPermissions</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Bypass all permission checks</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">All tools run without permission prompts (use with caution)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">plan</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Planning mode</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">No tool execution; Claude plans without making changes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Warning about subagent inheritance */}
          <div className="p-4 bg-[#2a1a1a] border border-[#4a2a2a] rounded-xl mb-8">
            <p className="text-sm text-[#ffa0a0] font-medium mb-2">Subagent inheritance</p>
            <p className="text-sm text-[#a1a1a1]">
              When using <code className="text-[#d4a574]">bypassPermissions</code>, all subagents inherit this mode and it cannot be overridden. Subagents may have different system prompts and less constrained behavior than your main agent. Enabling <code className="text-[#d4a574]">bypassPermissions</code> grants them full, autonomous system access without any approval prompts.
            </p>
          </div>
        </section>

        {/* Set permission mode */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Set permission mode</h3>
          <p className="text-[#a1a1a1] mb-6">
            You can set the permission mode once when starting a query, or change it dynamically while the session is active.
          </p>

          {/* At query time */}
          <div className="mb-8">
            <h4 className="text-lg font-medium mb-3 text-[#fafafa]">At query time</h4>
            <p className="text-sm text-[#a1a1a1] mb-4">
              Pass <code className="text-[#d4a574]">permission_mode</code> (Python) or <code className="text-[#d4a574]">permissionMode</code> (TypeScript) when creating a query. This mode applies for the entire session unless changed dynamically.
            </p>
            <CodeBlock filename="set-permission-mode.ts">
              <span className="text-[#c586c0]">import</span>
              <span className="text-[#fafafa]"> {"{ "}</span>
              <span className="text-[#9cdcfe]">query</span>
              <span className="text-[#fafafa]">{" }"} </span>
              <span className="text-[#c586c0]">from</span>
              <span className="text-[#ce9178]"> &quot;@anthropic-ai/claude-agent-sdk&quot;</span>
              <span className="text-[#fafafa]">;</span>
              {"\n\n"}
              <span className="text-[#c586c0]">async function</span>
              <span className="text-[#dcdcaa]"> main</span>
              <span className="text-[#fafafa]">() {"{"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  "}</span>
              <span className="text-[#c586c0]">for await</span>
              <span className="text-[#fafafa]"> (</span>
              <span className="text-[#c586c0]">const</span>
              <span className="text-[#9cdcfe]"> message</span>
              <span className="text-[#c586c0]"> of</span>
              <span className="text-[#dcdcaa]"> query</span>
              <span className="text-[#fafafa]">({"{"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"    "}</span>
              <span className="text-[#9cdcfe]">prompt</span>
              <span className="text-[#fafafa]">: </span>
              <span className="text-[#ce9178]">&quot;Help me refactor this code&quot;</span>
              <span className="text-[#fafafa]">,</span>
              {"\n"}
              <span className="text-[#fafafa]">{"    "}</span>
              <span className="text-[#9cdcfe]">options</span>
              <span className="text-[#fafafa]">: {"{"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"      "}</span>
              <span className="text-[#9cdcfe]">permissionMode</span>
              <span className="text-[#fafafa]">: </span>
              <span className="text-[#ce9178]">&quot;default&quot;</span>
              <span className="text-[#fafafa]">,</span>
              <span className="text-[#6a9955]">  // Set the mode here</span>
              {"\n"}
              <span className="text-[#fafafa]">{"    }"}</span>
              <span className="text-[#fafafa]">,</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  "}{"}"}))</span>
              <span className="text-[#fafafa]"> {"{"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"    "}</span>
              <span className="text-[#c586c0]">if</span>
              <span className="text-[#fafafa]"> (</span>
              <span className="text-[#ce9178]">&quot;result&quot;</span>
              <span className="text-[#c586c0]"> in</span>
              <span className="text-[#9cdcfe]"> message</span>
              <span className="text-[#fafafa]">) {"{"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"      "}</span>
              <span className="text-[#9cdcfe]">console</span>
              <span className="text-[#fafafa]">.</span>
              <span className="text-[#dcdcaa]">log</span>
              <span className="text-[#fafafa]">(</span>
              <span className="text-[#9cdcfe]">message</span>
              <span className="text-[#fafafa]">.</span>
              <span className="text-[#9cdcfe]">result</span>
              <span className="text-[#fafafa]">);</span>
              {"\n"}
              <span className="text-[#fafafa]">{"    }"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  }"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"}"}</span>
              {"\n\n"}
              <span className="text-[#dcdcaa]">main</span>
              <span className="text-[#fafafa]">();</span>
            </CodeBlock>
          </div>

          {/* During streaming */}
          <div className="mb-8">
            <h4 className="text-lg font-medium mb-3 text-[#fafafa]">During streaming</h4>
            <p className="text-sm text-[#a1a1a1] mb-4">
              Call <code className="text-[#d4a574]">set_permission_mode()</code> (Python) or <code className="text-[#d4a574]">setPermissionMode()</code> (TypeScript) to change the mode mid-session. The new mode takes effect immediately for all subsequent tool requests.
            </p>
            <CodeBlock filename="dynamic-permission-mode.ts">
              <span className="text-[#c586c0]">import</span>
              <span className="text-[#fafafa]"> {"{ "}</span>
              <span className="text-[#9cdcfe]">query</span>
              <span className="text-[#fafafa]">{" }"} </span>
              <span className="text-[#c586c0]">from</span>
              <span className="text-[#ce9178]"> &quot;@anthropic-ai/claude-agent-sdk&quot;</span>
              <span className="text-[#fafafa]">;</span>
              {"\n\n"}
              <span className="text-[#c586c0]">async function</span>
              <span className="text-[#dcdcaa]"> main</span>
              <span className="text-[#fafafa]">() {"{"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  "}</span>
              <span className="text-[#c586c0]">const</span>
              <span className="text-[#9cdcfe]"> q</span>
              <span className="text-[#fafafa]"> = </span>
              <span className="text-[#dcdcaa]">query</span>
              <span className="text-[#fafafa]">({"{"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"    "}</span>
              <span className="text-[#9cdcfe]">prompt</span>
              <span className="text-[#fafafa]">: </span>
              <span className="text-[#ce9178]">&quot;Help me refactor this code&quot;</span>
              <span className="text-[#fafafa]">,</span>
              {"\n"}
              <span className="text-[#fafafa]">{"    "}</span>
              <span className="text-[#9cdcfe]">options</span>
              <span className="text-[#fafafa]">: {"{"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"      "}</span>
              <span className="text-[#9cdcfe]">permissionMode</span>
              <span className="text-[#fafafa]">: </span>
              <span className="text-[#ce9178]">&quot;default&quot;</span>
              <span className="text-[#fafafa]">,</span>
              <span className="text-[#6a9955]">  // Start in default mode</span>
              {"\n"}
              <span className="text-[#fafafa]">{"    }"}</span>
              <span className="text-[#fafafa]">,</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  });"}</span>
              {"\n\n"}
              <span className="text-[#fafafa]">{"  "}</span>
              <span className="text-[#6a9955]">// Change mode dynamically mid-session</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  "}</span>
              <span className="text-[#c586c0]">await</span>
              <span className="text-[#9cdcfe]"> q</span>
              <span className="text-[#fafafa]">.</span>
              <span className="text-[#dcdcaa]">setPermissionMode</span>
              <span className="text-[#fafafa]">(</span>
              <span className="text-[#ce9178]">&quot;acceptEdits&quot;</span>
              <span className="text-[#fafafa]">);</span>
              {"\n\n"}
              <span className="text-[#fafafa]">{"  "}</span>
              <span className="text-[#6a9955]">// Process messages with the new permission mode</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  "}</span>
              <span className="text-[#c586c0]">for await</span>
              <span className="text-[#fafafa]"> (</span>
              <span className="text-[#c586c0]">const</span>
              <span className="text-[#9cdcfe]"> message</span>
              <span className="text-[#c586c0]"> of</span>
              <span className="text-[#9cdcfe]"> q</span>
              <span className="text-[#fafafa]">) {"{"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"    "}</span>
              <span className="text-[#c586c0]">if</span>
              <span className="text-[#fafafa]"> (</span>
              <span className="text-[#ce9178]">&quot;result&quot;</span>
              <span className="text-[#c586c0]"> in</span>
              <span className="text-[#9cdcfe]"> message</span>
              <span className="text-[#fafafa]">) {"{"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"      "}</span>
              <span className="text-[#9cdcfe]">console</span>
              <span className="text-[#fafafa]">.</span>
              <span className="text-[#dcdcaa]">log</span>
              <span className="text-[#fafafa]">(</span>
              <span className="text-[#9cdcfe]">message</span>
              <span className="text-[#fafafa]">.</span>
              <span className="text-[#9cdcfe]">result</span>
              <span className="text-[#fafafa]">);</span>
              {"\n"}
              <span className="text-[#fafafa]">{"    }"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  }"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"}"}</span>
              {"\n\n"}
              <span className="text-[#dcdcaa]">main</span>
              <span className="text-[#fafafa]">();</span>
            </CodeBlock>
          </div>
        </section>

        {/* Mode details */}
        <section>
          <h3 className="text-xl font-semibold mb-6">Mode details</h3>

          {/* acceptEdits */}
          <div className="mb-8">
            <h4 className="text-lg font-medium mb-3 flex items-center gap-3">
              Accept edits mode
              <code className="text-[#d4a574] text-sm">acceptEdits</code>
            </h4>
            <p className="text-[#a1a1a1] mb-4">
              Auto-approves file operations so Claude can edit code without prompting. Other tools (like Bash commands that aren&apos;t filesystem operations) still require normal permissions.
            </p>
            <div className="p-4 bg-[#111111] border border-[#1f1f1f] rounded-xl mb-4">
              <p className="text-sm font-medium text-[#fafafa] mb-2">Auto-approved operations:</p>
              <ul className="text-sm text-[#a1a1a1] space-y-1 ml-4 list-disc">
                <li>File edits (Edit, Write tools)</li>
                <li>Filesystem commands: <code className="text-[#737373]">mkdir</code>, <code className="text-[#737373]">touch</code>, <code className="text-[#737373]">rm</code>, <code className="text-[#737373]">mv</code>, <code className="text-[#737373]">cp</code></li>
              </ul>
            </div>
            <p className="text-sm text-[#737373]">
              <span className="text-[#a1a1a1]">Use when:</span> you trust Claude&apos;s edits and want faster iteration, such as during prototyping or when working in an isolated directory.
            </p>
          </div>

          {/* bypassPermissions */}
          <div className="mb-8">
            <h4 className="text-lg font-medium mb-3 flex items-center gap-3">
              Bypass permissions mode
              <code className="text-[#d4a574] text-sm">bypassPermissions</code>
            </h4>
            <p className="text-[#a1a1a1] mb-4">
              Auto-approves all tool uses without prompts. Hooks still execute and can block operations if needed.
            </p>
            <div className="p-4 bg-[#2a1a1a] border border-[#4a2a2a] rounded-xl">
              <p className="text-sm text-[#ffa0a0] font-medium mb-2">Warning</p>
              <p className="text-sm text-[#a1a1a1]">
                Use with extreme caution. Claude has full system access in this mode. Only use in controlled environments where you trust all possible operations.
              </p>
            </div>
          </div>

          {/* plan */}
          <div className="mb-8">
            <h4 className="text-lg font-medium mb-3 flex items-center gap-3">
              Plan mode
              <code className="text-[#d4a574] text-sm">plan</code>
            </h4>
            <p className="text-[#a1a1a1] mb-4">
              Prevents tool execution entirely. Claude can analyze code and create plans but cannot make changes. Claude may use <code className="text-[#d4a574]">AskUserQuestion</code> to clarify requirements before finalizing the plan.
            </p>
            <p className="text-sm text-[#737373]">
              <span className="text-[#a1a1a1]">Use when:</span> you want Claude to propose changes without executing them, such as during code review or when you need to approve changes before they&apos;re made.
            </p>
          </div>
        </section>

        {/* Related resources */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Related resources</h2>
          <p className="text-[#a1a1a1] mb-4">
            For the other steps in the permission evaluation flow:
          </p>
          <ul className="text-[#a1a1a1] space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-[#d4a574]">-</span>
              <span><span className="text-[#fafafa]">Handle approvals and user input:</span> interactive approval prompts and clarifying questions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#d4a574]">-</span>
              <span><span className="text-[#fafafa]">Hooks guide:</span> run custom code at key points in the agent lifecycle</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#d4a574]">-</span>
              <span><span className="text-[#fafafa]">Permission rules:</span> declarative allow/deny rules in <code className="text-[#d4a574]">settings.json</code></span>
            </li>
          </ul>
        </section>
      </div>

      <ChapterNavigation currentChapterId="permissions" />
    </LearnLayout>
  );
}
