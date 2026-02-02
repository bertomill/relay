"use client";

import { LearnLayout, ChapterNavigation, CodeBlock } from "../components";

export default function UserInput() {
  return (
    <LearnLayout>
      <div className="mb-12">
        <p className="text-sm text-[#d4a574] font-medium mb-2">Chapter 13</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Handle Approvals and User Input
        </h1>
        <p className="text-lg text-[#a1a1a1] max-w-2xl">
          Surface Claude&apos;s approval requests and clarifying questions to users, then return their decisions to the SDK.
        </p>
      </div>

      <div className="space-y-12">
        {/* Intro */}
        <section>
          <p className="text-[#a1a1a1] mb-4">
            While working on a task, Claude sometimes needs to check in with users. It might need permission before deleting files, or need to ask which database to use for a new project. Your application needs to surface these requests to users so Claude can continue with their input.
          </p>
          <p className="text-[#a1a1a1] mb-4">
            Claude requests user input in two situations: when it needs <span className="text-[#fafafa]">permission to use a tool</span> (like deleting files or running commands), and when it has <span className="text-[#fafafa]">clarifying questions</span> (via the <code className="text-[#d4a574]">AskUserQuestion</code> tool). Both trigger your <code className="text-[#d4a574]">canUseTool</code> callback, which pauses execution until you return a response.
          </p>
          <p className="text-[#a1a1a1]">
            For clarifying questions, Claude generates the questions and options. Your role is to present them to users and return their selections. You can&apos;t add your own questions to this flow; if you need to ask users something yourself, do that separately in your application logic.
          </p>
        </section>

        {/* Detect when Claude needs input */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Detect when Claude needs input</h2>
          <p className="text-[#a1a1a1] mb-6">
            Pass a <code className="text-[#d4a574]">canUseTool</code> callback in your query options. The callback fires whenever Claude needs user input, receiving the tool name and input as arguments:
          </p>

          <CodeBlock filename="detect-input.ts">
            <span className="text-[#c586c0]">async function</span>
            <span className="text-[#dcdcaa]"> handleToolRequest</span>
            <span className="text-[#fafafa]">(</span>
            <span className="text-[#9cdcfe]">toolName</span>
            <span className="text-[#fafafa]">, </span>
            <span className="text-[#9cdcfe]">input</span>
            <span className="text-[#fafafa]">) {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#6a9955]">// Prompt user and return allow or deny</span>
            {"\n"}
            <span className="text-[#fafafa]">{"}"}</span>
            {"\n\n"}
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> options</span>
            <span className="text-[#fafafa]"> = {"{"} </span>
            <span className="text-[#9cdcfe]">canUseTool</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#9cdcfe]">handleToolRequest</span>
            <span className="text-[#fafafa]"> {"}"}</span>
          </CodeBlock>

          <p className="text-[#a1a1a1] mt-6 mb-4">The callback fires in two cases:</p>
          <ol className="text-[#a1a1a1] space-y-2 ml-4 list-decimal">
            <li><span className="text-[#fafafa]">Tool needs approval:</span> Claude wants to use a tool that isn&apos;t auto-approved by permission rules or modes. Check <code className="text-[#d4a574]">toolName</code> for the tool (e.g., <code className="text-[#737373]">&quot;Bash&quot;</code>, <code className="text-[#737373]">&quot;Write&quot;</code>).</li>
            <li><span className="text-[#fafafa]">Claude asks a question:</span> Claude calls the <code className="text-[#d4a574]">AskUserQuestion</code> tool. Check if <code className="text-[#d4a574]">toolName == &quot;AskUserQuestion&quot;</code> to handle it differently.</li>
          </ol>

          <div className="mt-6 p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl">
            <p className="text-sm text-[#a1a1a1]">
              Your callback must return within <span className="text-[#fafafa]">60 seconds</span> or Claude will assume the request was denied and try a different approach.
            </p>
          </div>
        </section>

        {/* Handle tool approval requests */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Handle tool approval requests</h2>
          <p className="text-[#a1a1a1] mb-6">
            Once you&apos;ve passed a <code className="text-[#d4a574]">canUseTool</code> callback, it fires when Claude wants to use a tool that isn&apos;t auto-approved. Your callback receives:
          </p>

          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1f1f1f] bg-[#0d0d0d]">
                    <th className="text-left py-3 px-4 text-[#737373] font-medium">Argument</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f1f]/50">
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">toolName</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1]">The name of the tool Claude wants to use (e.g., <code className="text-[#737373]">&quot;Bash&quot;</code>, <code className="text-[#737373]">&quot;Write&quot;</code>, <code className="text-[#737373]">&quot;Edit&quot;</code>)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">input</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1]">The parameters Claude is passing to the tool. Contents vary by tool.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-[#a1a1a1] mb-4">Common input fields by tool:</p>
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1f1f1f] bg-[#0d0d0d]">
                    <th className="text-left py-3 px-4 text-[#737373] font-medium">Tool</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium">Input fields</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f1f]/50">
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">Bash</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1]"><code className="text-[#737373]">command</code>, <code className="text-[#737373]">description</code>, <code className="text-[#737373]">timeout</code></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">Write</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1]"><code className="text-[#737373]">file_path</code>, <code className="text-[#737373]">content</code></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">Edit</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1]"><code className="text-[#737373]">file_path</code>, <code className="text-[#737373]">old_string</code>, <code className="text-[#737373]">new_string</code></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">Read</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1]"><code className="text-[#737373]">file_path</code>, <code className="text-[#737373]">offset</code>, <code className="text-[#737373]">limit</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <CodeBlock filename="tool-approval-example.ts">
            <span className="text-[#c586c0]">import</span>
            <span className="text-[#fafafa]"> {"{ "}</span>
            <span className="text-[#9cdcfe]">query</span>
            <span className="text-[#fafafa]">{" }"} </span>
            <span className="text-[#c586c0]">from</span>
            <span className="text-[#ce9178]"> &quot;@anthropic-ai/claude-agent-sdk&quot;</span>
            <span className="text-[#fafafa]">;</span>
            {"\n\n"}
            <span className="text-[#c586c0]">for await</span>
            <span className="text-[#fafafa]"> (</span>
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> message</span>
            <span className="text-[#c586c0]"> of</span>
            <span className="text-[#dcdcaa]"> query</span>
            <span className="text-[#fafafa]">({"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">prompt</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&quot;Create a test file in /tmp and then delete it&quot;</span>
            <span className="text-[#fafafa]">,</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">options</span>
            <span className="text-[#fafafa]">: {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">canUseTool</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#c586c0]">async</span>
            <span className="text-[#fafafa]"> (</span>
            <span className="text-[#9cdcfe]">toolName</span>
            <span className="text-[#fafafa]">, </span>
            <span className="text-[#9cdcfe]">input</span>
            <span className="text-[#fafafa]">) =&gt; {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      "}</span>
            <span className="text-[#6a9955]">// Display the tool request</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      "}</span>
            <span className="text-[#9cdcfe]">console</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#dcdcaa]">log</span>
            <span className="text-[#fafafa]">(</span>
            <span className="text-[#ce9178]">`Tool: </span>
            <span className="text-[#fafafa]">{"${"}</span>
            <span className="text-[#9cdcfe]">toolName</span>
            <span className="text-[#fafafa]">{"}"}</span>
            <span className="text-[#ce9178]">`</span>
            <span className="text-[#fafafa]">);</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      "}</span>
            <span className="text-[#c586c0]">if</span>
            <span className="text-[#fafafa]"> (</span>
            <span className="text-[#9cdcfe]">toolName</span>
            <span className="text-[#fafafa]"> === </span>
            <span className="text-[#ce9178]">&quot;Bash&quot;</span>
            <span className="text-[#fafafa]">) {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"        "}</span>
            <span className="text-[#9cdcfe]">console</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#dcdcaa]">log</span>
            <span className="text-[#fafafa]">(</span>
            <span className="text-[#ce9178]">`Command: </span>
            <span className="text-[#fafafa]">{"${"}</span>
            <span className="text-[#9cdcfe]">input</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">command</span>
            <span className="text-[#fafafa]">{"}"}</span>
            <span className="text-[#ce9178]">`</span>
            <span className="text-[#fafafa]">);</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      }"}</span>
            {"\n\n"}
            <span className="text-[#fafafa]">{"      "}</span>
            <span className="text-[#6a9955]">// Get user approval</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      "}</span>
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> response</span>
            <span className="text-[#fafafa]"> = </span>
            <span className="text-[#c586c0]">await</span>
            <span className="text-[#dcdcaa]"> prompt</span>
            <span className="text-[#fafafa]">(</span>
            <span className="text-[#ce9178]">&quot;Allow this action? (y/n): &quot;</span>
            <span className="text-[#fafafa]">);</span>
            {"\n\n"}
            <span className="text-[#fafafa]">{"      "}</span>
            <span className="text-[#c586c0]">if</span>
            <span className="text-[#fafafa]"> (</span>
            <span className="text-[#9cdcfe]">response</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#dcdcaa]">toLowerCase</span>
            <span className="text-[#fafafa]">() === </span>
            <span className="text-[#ce9178]">&quot;y&quot;</span>
            <span className="text-[#fafafa]">) {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"        "}</span>
            <span className="text-[#c586c0]">return</span>
            <span className="text-[#fafafa]"> {"{"} </span>
            <span className="text-[#9cdcfe]">behavior</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&quot;allow&quot;</span>
            <span className="text-[#fafafa]">, </span>
            <span className="text-[#9cdcfe]">updatedInput</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#9cdcfe]">input</span>
            <span className="text-[#fafafa]"> {"}"};</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      "}</span>
            <span className="text-[#c586c0]">return</span>
            <span className="text-[#fafafa]"> {"{"} </span>
            <span className="text-[#9cdcfe]">behavior</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&quot;deny&quot;</span>
            <span className="text-[#fafafa]">, </span>
            <span className="text-[#9cdcfe]">message</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&quot;User denied this action&quot;</span>
            <span className="text-[#fafafa]"> {"}"};</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"})"}) {"{"}</span>
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
        </section>

        {/* Respond to tool requests */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Respond to tool requests</h2>
          <p className="text-[#a1a1a1] mb-6">
            Your callback returns one of two response types:
          </p>

          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1f1f1f] bg-[#0d0d0d]">
                    <th className="text-left py-3 px-4 text-[#737373] font-medium">Response</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium">TypeScript</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f1f]/50">
                  <tr>
                    <td className="py-3 px-4 text-[#fafafa]">Allow</td>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">{`{ behavior: "allow", updatedInput }`}</code></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-[#fafafa]">Deny</td>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">{`{ behavior: "deny", message }`}</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-[#a1a1a1] mb-6">
            When allowing, pass the tool input (original or modified). When denying, provide a message explaining why. Claude sees this message and may adjust its approach.
          </p>

          <div className="space-y-6">
            {/* Approve */}
            <div className="p-4 bg-[#111111] border border-[#1f1f1f] rounded-xl">
              <h4 className="text-lg font-medium mb-2 text-[#fafafa]">Approve</h4>
              <p className="text-sm text-[#a1a1a1] mb-3">Let the tool execute as Claude requested.</p>
              <pre className="text-sm font-mono text-[#a1a1a1] overflow-x-auto">
{`return { behavior: "allow", updatedInput: input };`}
              </pre>
            </div>

            {/* Approve with changes */}
            <div className="p-4 bg-[#111111] border border-[#1f1f1f] rounded-xl">
              <h4 className="text-lg font-medium mb-2 text-[#fafafa]">Approve with changes</h4>
              <p className="text-sm text-[#a1a1a1] mb-3">Modify the input before execution (e.g., sanitize paths, add constraints).</p>
              <pre className="text-sm font-mono text-[#a1a1a1] overflow-x-auto">
{`const sandboxedInput = {
  ...input,
  command: input.command.replace("/tmp", "/tmp/sandbox")
};
return { behavior: "allow", updatedInput: sandboxedInput };`}
              </pre>
            </div>

            {/* Reject */}
            <div className="p-4 bg-[#111111] border border-[#1f1f1f] rounded-xl">
              <h4 className="text-lg font-medium mb-2 text-[#fafafa]">Reject</h4>
              <p className="text-sm text-[#a1a1a1] mb-3">Block the tool and tell Claude why.</p>
              <pre className="text-sm font-mono text-[#a1a1a1] overflow-x-auto">
{`return { behavior: "deny", message: "User rejected this action" };`}
              </pre>
            </div>

            {/* Suggest alternative */}
            <div className="p-4 bg-[#111111] border border-[#1f1f1f] rounded-xl">
              <h4 className="text-lg font-medium mb-2 text-[#fafafa]">Suggest alternative</h4>
              <p className="text-sm text-[#a1a1a1] mb-3">Block but guide Claude toward what the user wants instead.</p>
              <pre className="text-sm font-mono text-[#a1a1a1] overflow-x-auto">
{`return {
  behavior: "deny",
  message: "User doesn't want to delete files. " +
    "They asked if you could compress them into an archive instead."
};`}
              </pre>
            </div>
          </div>
        </section>

        {/* Handle clarifying questions */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Handle clarifying questions</h2>
          <p className="text-[#a1a1a1] mb-6">
            When Claude needs more direction on a task with multiple valid approaches, it calls the <code className="text-[#d4a574]">AskUserQuestion</code> tool. This triggers your <code className="text-[#d4a574]">canUseTool</code> callback with <code className="text-[#d4a574]">toolName</code> set to <code className="text-[#d4a574]">AskUserQuestion</code>. The input contains Claude&apos;s questions as multiple-choice options, which you display to the user and return their selections.
          </p>

          <div className="p-4 bg-[#1a2a1a] border border-[#2a4a2a] rounded-xl mb-6">
            <p className="text-sm text-[#a0ffa0] font-medium mb-2">Tip</p>
            <p className="text-sm text-[#a1a1a1]">
              Clarifying questions are especially common in <code className="text-[#d4a574]">plan</code> mode, where Claude explores the codebase and asks questions before proposing a plan. This makes plan mode ideal for interactive workflows where you want Claude to gather requirements before making changes.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-[#d4a574] text-[#0a0a0a] flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <div>
                <p className="font-semibold text-[#fafafa]">Detect AskUserQuestion</p>
                <p className="text-sm text-[#a1a1a1]">Check if <code className="text-[#d4a574]">toolName === &quot;AskUserQuestion&quot;</code> to handle it differently from other tools</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-[#d4a574] text-[#0a0a0a] flex items-center justify-center text-sm font-bold shrink-0">2</span>
              <div>
                <p className="font-semibold text-[#fafafa]">Parse the question input</p>
                <p className="text-sm text-[#a1a1a1]">The input contains a <code className="text-[#d4a574]">questions</code> array with <code className="text-[#737373]">question</code>, <code className="text-[#737373]">options</code>, and <code className="text-[#737373]">multiSelect</code> fields</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-[#d4a574] text-[#0a0a0a] flex items-center justify-center text-sm font-bold shrink-0">3</span>
              <div>
                <p className="font-semibold text-[#fafafa]">Collect answers from the user</p>
                <p className="text-sm text-[#a1a1a1]">Present the questions to your users and collect their selections</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-[#d4a574] text-[#0a0a0a] flex items-center justify-center text-sm font-bold shrink-0">4</span>
              <div>
                <p className="font-semibold text-[#fafafa]">Return answers to Claude</p>
                <p className="text-sm text-[#a1a1a1]">Build an <code className="text-[#d4a574]">answers</code> object mapping each question to the selected label</p>
              </div>
            </div>
          </div>
        </section>

        {/* Question format */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Question format</h3>
          <p className="text-[#a1a1a1] mb-4">
            The input contains Claude&apos;s generated questions in a <code className="text-[#d4a574]">questions</code> array. Each question has these fields:
          </p>

          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1f1f1f] bg-[#0d0d0d]">
                    <th className="text-left py-3 px-4 text-[#737373] font-medium">Field</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f1f]/50">
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">question</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1]">The full question text to display</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">header</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Short label for the question (max 12 characters)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">options</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Array of 2-4 choices, each with <code className="text-[#737373]">label</code> and <code className="text-[#737373]">description</code></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">multiSelect</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1]">If <code className="text-[#737373]">true</code>, users can select multiple options</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-4 p-4 bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl">
            <pre className="text-sm font-mono text-[#a1a1a1] overflow-x-auto">
{`{
  "questions": [
    {
      "question": "How should I format the output?",
      "header": "Format",
      "options": [
        { "label": "Summary", "description": "Brief overview" },
        { "label": "Detailed", "description": "Full explanation" }
      ],
      "multiSelect": false
    }
  ]
}`}
            </pre>
          </div>
        </section>

        {/* Response format */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Response format</h3>
          <p className="text-[#a1a1a1] mb-4">
            Return an <code className="text-[#d4a574]">answers</code> object mapping each question&apos;s <code className="text-[#d4a574]">question</code> field to the selected option&apos;s <code className="text-[#d4a574]">label</code>:
          </p>

          <div className="mb-4 p-4 bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl">
            <pre className="text-sm font-mono text-[#a1a1a1] overflow-x-auto">
{`return {
  behavior: "allow",
  updatedInput: {
    questions: input.questions,
    answers: {
      "How should I format the output?": "Summary",
      "Which sections should I include?": "Introduction, Conclusion"
    }
  }
};`}
            </pre>
          </div>

          <p className="text-sm text-[#737373]">
            For multi-select questions, join multiple labels with <code className="text-[#d4a574]">&quot;, &quot;</code>. For free-text input, use the user&apos;s custom text directly.
          </p>
        </section>

        {/* Complete example */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Complete example</h3>
          <p className="text-[#a1a1a1] mb-6">
            This example handles clarifying questions in a terminal application. Claude asks questions when it needs user input to proceed, such as when deciding on a tech stack for a mobile app.
          </p>

          <CodeBlock filename="clarifying-questions.ts">
            <span className="text-[#c586c0]">import</span>
            <span className="text-[#fafafa]"> {"{ "}</span>
            <span className="text-[#9cdcfe]">query</span>
            <span className="text-[#fafafa]">{" }"} </span>
            <span className="text-[#c586c0]">from</span>
            <span className="text-[#ce9178]"> &quot;@anthropic-ai/claude-agent-sdk&quot;</span>
            <span className="text-[#fafafa]">;</span>
            {"\n\n"}
            <span className="text-[#6a9955]">// Parse user input as option number(s) or free text</span>
            {"\n"}
            <span className="text-[#c586c0]">function</span>
            <span className="text-[#dcdcaa]"> parseResponse</span>
            <span className="text-[#fafafa]">(</span>
            <span className="text-[#9cdcfe]">response</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#4ec9b0]">string</span>
            <span className="text-[#fafafa]">, </span>
            <span className="text-[#9cdcfe]">options</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#4ec9b0]">any</span>
            <span className="text-[#fafafa]">[]): </span>
            <span className="text-[#4ec9b0]">string</span>
            <span className="text-[#fafafa]"> {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> indices</span>
            <span className="text-[#fafafa]"> = </span>
            <span className="text-[#9cdcfe]">response</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#dcdcaa]">split</span>
            <span className="text-[#fafafa]">(</span>
            <span className="text-[#ce9178]">&quot;,&quot;</span>
            <span className="text-[#fafafa]">).</span>
            <span className="text-[#dcdcaa]">map</span>
            <span className="text-[#fafafa]">((</span>
            <span className="text-[#9cdcfe]">s</span>
            <span className="text-[#fafafa]">) =&gt; </span>
            <span className="text-[#dcdcaa]">parseInt</span>
            <span className="text-[#fafafa]">(</span>
            <span className="text-[#9cdcfe]">s</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#dcdcaa]">trim</span>
            <span className="text-[#fafafa]">()) - </span>
            <span className="text-[#b5cea8]">1</span>
            <span className="text-[#fafafa]">);</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> labels</span>
            <span className="text-[#fafafa]"> = </span>
            <span className="text-[#9cdcfe]">indices</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}.</span>
            <span className="text-[#dcdcaa]">filter</span>
            <span className="text-[#fafafa]">((</span>
            <span className="text-[#9cdcfe]">i</span>
            <span className="text-[#fafafa]">) =&gt; !</span>
            <span className="text-[#dcdcaa]">isNaN</span>
            <span className="text-[#fafafa]">(</span>
            <span className="text-[#9cdcfe]">i</span>
            <span className="text-[#fafafa]">) && </span>
            <span className="text-[#9cdcfe]">i</span>
            <span className="text-[#fafafa]"> &gt;= </span>
            <span className="text-[#b5cea8]">0</span>
            <span className="text-[#fafafa]"> && </span>
            <span className="text-[#9cdcfe]">i</span>
            <span className="text-[#fafafa]"> &lt; </span>
            <span className="text-[#9cdcfe]">options</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">length</span>
            <span className="text-[#fafafa]">)</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}.</span>
            <span className="text-[#dcdcaa]">map</span>
            <span className="text-[#fafafa]">((</span>
            <span className="text-[#9cdcfe]">i</span>
            <span className="text-[#fafafa]">) =&gt; </span>
            <span className="text-[#9cdcfe]">options</span>
            <span className="text-[#fafafa]">[</span>
            <span className="text-[#9cdcfe]">i</span>
            <span className="text-[#fafafa]">].</span>
            <span className="text-[#9cdcfe]">label</span>
            <span className="text-[#fafafa]">);</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#c586c0]">return</span>
            <span className="text-[#9cdcfe]"> labels</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">length</span>
            <span className="text-[#fafafa]"> &gt; </span>
            <span className="text-[#b5cea8]">0</span>
            <span className="text-[#fafafa]"> ? </span>
            <span className="text-[#9cdcfe]">labels</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#dcdcaa]">join</span>
            <span className="text-[#fafafa]">(</span>
            <span className="text-[#ce9178]">&quot;, &quot;</span>
            <span className="text-[#fafafa]">) : </span>
            <span className="text-[#9cdcfe]">response</span>
            <span className="text-[#fafafa]">;</span>
            {"\n"}
            <span className="text-[#fafafa]">{"}"}</span>
            {"\n\n"}
            <span className="text-[#6a9955]">// Display questions and collect answers</span>
            {"\n"}
            <span className="text-[#c586c0]">async function</span>
            <span className="text-[#dcdcaa]"> handleAskUserQuestion</span>
            <span className="text-[#fafafa]">(</span>
            <span className="text-[#9cdcfe]">input</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#4ec9b0]">any</span>
            <span className="text-[#fafafa]">) {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> answers</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#4ec9b0]">Record</span>
            <span className="text-[#fafafa]">&lt;</span>
            <span className="text-[#4ec9b0]">string</span>
            <span className="text-[#fafafa]">, </span>
            <span className="text-[#4ec9b0]">string</span>
            <span className="text-[#fafafa]">&gt; = {"{"}{"}"}</span>
            <span className="text-[#fafafa]">;</span>
            {"\n\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#c586c0]">for</span>
            <span className="text-[#fafafa]"> (</span>
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> q</span>
            <span className="text-[#c586c0]"> of</span>
            <span className="text-[#9cdcfe]"> input</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">questions</span>
            <span className="text-[#fafafa]">) {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">console</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#dcdcaa]">log</span>
            <span className="text-[#fafafa]">(</span>
            <span className="text-[#ce9178]">`</span>
            <span className="text-[#ce9178]">{"\n"}${"{"}</span>
            <span className="text-[#9cdcfe]">q</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">header</span>
            <span className="text-[#ce9178]">{"}"}: ${"{"}</span>
            <span className="text-[#9cdcfe]">q</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">question</span>
            <span className="text-[#ce9178]">{"}"}`</span>
            <span className="text-[#fafafa]">);</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">q</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">options</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#dcdcaa]">forEach</span>
            <span className="text-[#fafafa]">((</span>
            <span className="text-[#9cdcfe]">opt</span>
            <span className="text-[#fafafa]">, </span>
            <span className="text-[#9cdcfe]">i</span>
            <span className="text-[#fafafa]">) =&gt; {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      "}</span>
            <span className="text-[#9cdcfe]">console</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#dcdcaa]">log</span>
            <span className="text-[#fafafa]">(</span>
            <span className="text-[#ce9178]">`  ${"{"}</span>
            <span className="text-[#9cdcfe]">i</span>
            <span className="text-[#fafafa]"> + </span>
            <span className="text-[#b5cea8]">1</span>
            <span className="text-[#ce9178]">{"}"}. ${"{"}</span>
            <span className="text-[#9cdcfe]">opt</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">label</span>
            <span className="text-[#ce9178]">{"}"} - ${"{"}</span>
            <span className="text-[#9cdcfe]">opt</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">description</span>
            <span className="text-[#ce9178]">{"}"}`</span>
            <span className="text-[#fafafa]">);</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    }"});</span>
            {"\n\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> response</span>
            <span className="text-[#fafafa]"> = (</span>
            <span className="text-[#c586c0]">await</span>
            <span className="text-[#dcdcaa]"> prompt</span>
            <span className="text-[#fafafa]">(</span>
            <span className="text-[#ce9178]">&quot;Your choice: &quot;</span>
            <span className="text-[#fafafa]">)).</span>
            <span className="text-[#dcdcaa]">trim</span>
            <span className="text-[#fafafa]">();</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">answers</span>
            <span className="text-[#fafafa]">[</span>
            <span className="text-[#9cdcfe]">q</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">question</span>
            <span className="text-[#fafafa]">] = </span>
            <span className="text-[#dcdcaa]">parseResponse</span>
            <span className="text-[#fafafa]">(</span>
            <span className="text-[#9cdcfe]">response</span>
            <span className="text-[#fafafa]">, </span>
            <span className="text-[#9cdcfe]">q</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">options</span>
            <span className="text-[#fafafa]">);</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  }"}</span>
            {"\n\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#c586c0]">return</span>
            <span className="text-[#fafafa]"> {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">behavior</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&quot;allow&quot;</span>
            <span className="text-[#fafafa]">,</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">updatedInput</span>
            <span className="text-[#fafafa]">: {"{"} </span>
            <span className="text-[#9cdcfe]">questions</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#9cdcfe]">input</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">questions</span>
            <span className="text-[#fafafa]">, </span>
            <span className="text-[#9cdcfe]">answers</span>
            <span className="text-[#fafafa]"> {"}"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  };"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"}"}</span>
          </CodeBlock>
        </section>

        {/* Limitations */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Limitations</h2>
          <ul className="text-[#a1a1a1] space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-[#d4a574]">-</span>
              <span><span className="text-[#fafafa]">60-second timeout:</span> <code className="text-[#d4a574]">canUseTool</code> callbacks must return within 60 seconds or Claude will retry with a different approach</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#d4a574]">-</span>
              <span><span className="text-[#fafafa]">Subagents:</span> <code className="text-[#d4a574]">AskUserQuestion</code> is not currently available in subagents spawned via the Task tool</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#d4a574]">-</span>
              <span><span className="text-[#fafafa]">Question limits:</span> each <code className="text-[#d4a574]">AskUserQuestion</code> call supports 1-4 questions with 2-4 options each</span>
            </li>
          </ul>
        </section>

        {/* Other ways to get user input */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Other ways to get user input</h2>
          <p className="text-[#a1a1a1] mb-6">
            The <code className="text-[#d4a574]">canUseTool</code> callback and <code className="text-[#d4a574]">AskUserQuestion</code> tool cover most approval and clarification scenarios, but the SDK offers other ways to get input:
          </p>

          <div className="space-y-6">
            <div className="p-4 bg-[#111111] border border-[#1f1f1f] rounded-xl">
              <h4 className="text-lg font-medium mb-2 text-[#fafafa]">Streaming input</h4>
              <p className="text-sm text-[#a1a1a1] mb-2">Use when you need to:</p>
              <ul className="text-sm text-[#737373] space-y-1 ml-4 list-disc">
                <li>Interrupt the agent mid-task</li>
                <li>Provide additional context without waiting for Claude to ask</li>
                <li>Build chat interfaces with follow-up messages</li>
              </ul>
            </div>

            <div className="p-4 bg-[#111111] border border-[#1f1f1f] rounded-xl">
              <h4 className="text-lg font-medium mb-2 text-[#fafafa]">Custom tools</h4>
              <p className="text-sm text-[#a1a1a1] mb-2">Use when you need to:</p>
              <ul className="text-sm text-[#737373] space-y-1 ml-4 list-disc">
                <li>Collect structured input beyond multiple-choice</li>
                <li>Integrate external approval systems</li>
                <li>Implement domain-specific interactions</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Related resources */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Related resources</h2>
          <ul className="text-[#a1a1a1] space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-[#d4a574]">-</span>
              <span><span className="text-[#fafafa]">Configure permissions:</span> set up permission modes and rules</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#d4a574]">-</span>
              <span><span className="text-[#fafafa]">Control execution with hooks:</span> run custom code at key points in the agent lifecycle</span>
            </li>
          </ul>
        </section>
      </div>

      <ChapterNavigation currentChapterId="user-input" />
    </LearnLayout>
  );
}
