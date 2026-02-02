"use client";

import { LearnLayout, ChapterNavigation, CodeBlock } from "../components";

export default function Checkpointing() {
  return (
    <LearnLayout>
      <div className="mb-12">
        <p className="text-sm text-[#d4a574] font-medium mb-2">Chapter 14</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Rewind File Changes with Checkpointing
        </h1>
        <p className="text-lg text-[#a1a1a1] max-w-2xl">
          Track file changes during agent sessions and restore files to any previous state.
        </p>
      </div>

      <div className="space-y-12">
        {/* Intro */}
        <section>
          <p className="text-[#a1a1a1] mb-4">
            File checkpointing tracks file modifications made through the Write, Edit, and NotebookEdit tools during an agent session, allowing you to rewind files to any previous state.
          </p>
          <p className="text-[#a1a1a1] mb-6">With checkpointing, you can:</p>
          <ul className="text-[#a1a1a1] space-y-2 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-[#d4a574]">-</span>
              <span><span className="text-[#fafafa]">Undo unwanted changes</span> by restoring files to a known good state</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#d4a574]">-</span>
              <span><span className="text-[#fafafa]">Explore alternatives</span> by restoring to a checkpoint and trying a different approach</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#d4a574]">-</span>
              <span><span className="text-[#fafafa]">Recover from errors</span> when the agent makes incorrect modifications</span>
            </li>
          </ul>

          <div className="p-4 bg-[#2a1a1a] border border-[#4a2a2a] rounded-xl">
            <p className="text-sm text-[#ffa0a0] font-medium mb-2">Warning</p>
            <p className="text-sm text-[#a1a1a1]">
              Only changes made through the Write, Edit, and NotebookEdit tools are tracked. Changes made through Bash commands (like <code className="text-[#d4a574]">echo &gt; file.txt</code> or <code className="text-[#d4a574]">sed -i</code>) are not captured by the checkpoint system.
            </p>
          </div>
        </section>

        {/* How checkpointing works */}
        <section>
          <h2 className="text-2xl font-bold mb-4">How checkpointing works</h2>
          <p className="text-[#a1a1a1] mb-6">
            When you enable file checkpointing, the SDK creates backups of files before modifying them through the Write, Edit, or NotebookEdit tools. User messages in the response stream include a checkpoint UUID that you can use as a restore point.
          </p>

          <p className="text-[#a1a1a1] mb-4">Checkpoint works with these built-in tools:</p>
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1f1f1f] bg-[#0d0d0d]">
                    <th className="text-left py-3 px-4 text-[#737373] font-medium">Tool</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f1f]/50">
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">Write</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Creates a new file or overwrites an existing file with new content</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">Edit</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Makes targeted edits to specific parts of an existing file</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="text-[#d4a574]">NotebookEdit</code></td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Modifies cells in Jupyter notebooks (<code className="text-[#737373]">.ipynb</code> files)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl mb-6">
            <p className="text-sm text-[#a1a1a1]">
              <span className="text-[#d4a574] font-medium">Note:</span> File rewinding restores files on disk to a previous state. It does not rewind the conversation itself. The conversation history and context remain intact after calling <code className="text-[#d4a574]">rewindFiles()</code>.
            </p>
          </div>

          <p className="text-[#a1a1a1] mb-4">The checkpoint system tracks:</p>
          <ul className="text-[#a1a1a1] space-y-1 mb-4">
            <li className="flex items-start gap-2">
              <span className="text-[#d4a574]">-</span>
              <span>Files created during the session</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#d4a574]">-</span>
              <span>Files modified during the session</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#d4a574]">-</span>
              <span>The original content of modified files</span>
            </li>
          </ul>
          <p className="text-[#737373]">
            When you rewind to a checkpoint, created files are deleted and modified files are restored to their content at that point.
          </p>
        </section>

        {/* Implement checkpointing */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Implement checkpointing</h2>
          <p className="text-[#a1a1a1] mb-6">
            To use file checkpointing, enable it in your options, capture checkpoint UUIDs from the response stream, then call <code className="text-[#d4a574]">rewindFiles()</code> when you need to restore.
          </p>

          <CodeBlock filename="checkpointing-example.ts">
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
            <span className="text-[#6a9955]">// Step 1: Enable checkpointing</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> opts</span>
            <span className="text-[#fafafa]"> = {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">enableFileCheckpointing</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#569cd6]">true</span>
            <span className="text-[#fafafa]">,</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">permissionMode</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&quot;acceptEdits&quot;</span>
            <span className="text-[#c586c0]"> as const</span>
            <span className="text-[#fafafa]">,</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">extraArgs</span>
            <span className="text-[#fafafa]">: {"{"} </span>
            <span className="text-[#ce9178]">&apos;replay-user-messages&apos;</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#569cd6]">null</span>
            <span className="text-[#fafafa]"> {"}"}</span>
            <span className="text-[#fafafa]">,</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">env</span>
            <span className="text-[#fafafa]">: {"{"} ...</span>
            <span className="text-[#9cdcfe]">process</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">env</span>
            <span className="text-[#fafafa]">, </span>
            <span className="text-[#9cdcfe]">CLAUDE_CODE_ENABLE_SDK_FILE_CHECKPOINTING</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&apos;1&apos;</span>
            <span className="text-[#fafafa]"> {"}"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  }{"}"};</span>
            {"\n\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> response</span>
            <span className="text-[#fafafa]"> = </span>
            <span className="text-[#dcdcaa]">query</span>
            <span className="text-[#fafafa]">({"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">prompt</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&quot;Refactor the authentication module&quot;</span>
            <span className="text-[#fafafa]">,</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">options</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#9cdcfe]">opts</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  }{"}"});</span>
            {"\n\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#c586c0]">let</span>
            <span className="text-[#9cdcfe]"> checkpointId</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#4ec9b0]">string</span>
            <span className="text-[#fafafa]"> | </span>
            <span className="text-[#4ec9b0]">undefined</span>
            <span className="text-[#fafafa]">;</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#c586c0]">let</span>
            <span className="text-[#9cdcfe]"> sessionId</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#4ec9b0]">string</span>
            <span className="text-[#fafafa]"> | </span>
            <span className="text-[#4ec9b0]">undefined</span>
            <span className="text-[#fafafa]">;</span>
            {"\n\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#6a9955]">// Step 2: Capture checkpoint UUID from user messages</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#c586c0]">for await</span>
            <span className="text-[#fafafa]"> (</span>
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> message</span>
            <span className="text-[#c586c0]"> of</span>
            <span className="text-[#9cdcfe]"> response</span>
            <span className="text-[#fafafa]">) {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#c586c0]">if</span>
            <span className="text-[#fafafa]"> (</span>
            <span className="text-[#9cdcfe]">message</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">type</span>
            <span className="text-[#fafafa]"> === </span>
            <span className="text-[#ce9178]">&apos;user&apos;</span>
            <span className="text-[#fafafa]"> && </span>
            <span className="text-[#9cdcfe]">message</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">uuid</span>
            <span className="text-[#fafafa]"> && !</span>
            <span className="text-[#9cdcfe]">checkpointId</span>
            <span className="text-[#fafafa]">) {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      "}</span>
            <span className="text-[#9cdcfe]">checkpointId</span>
            <span className="text-[#fafafa]"> = </span>
            <span className="text-[#9cdcfe]">message</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">uuid</span>
            <span className="text-[#fafafa]">;</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#c586c0]">if</span>
            <span className="text-[#fafafa]"> (</span>
            <span className="text-[#ce9178]">&apos;session_id&apos;</span>
            <span className="text-[#c586c0]"> in</span>
            <span className="text-[#9cdcfe]"> message</span>
            <span className="text-[#fafafa]"> && !</span>
            <span className="text-[#9cdcfe]">sessionId</span>
            <span className="text-[#fafafa]">) {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      "}</span>
            <span className="text-[#9cdcfe]">sessionId</span>
            <span className="text-[#fafafa]"> = </span>
            <span className="text-[#9cdcfe]">message</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">session_id</span>
            <span className="text-[#fafafa]">;</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  }"}</span>
            {"\n\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#6a9955]">// Step 3: Rewind by resuming the session</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#c586c0]">if</span>
            <span className="text-[#fafafa]"> (</span>
            <span className="text-[#9cdcfe]">checkpointId</span>
            <span className="text-[#fafafa]"> && </span>
            <span className="text-[#9cdcfe]">sessionId</span>
            <span className="text-[#fafafa]">) {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> rewindQuery</span>
            <span className="text-[#fafafa]"> = </span>
            <span className="text-[#dcdcaa]">query</span>
            <span className="text-[#fafafa]">({"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      "}</span>
            <span className="text-[#9cdcfe]">prompt</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&quot;&quot;</span>
            <span className="text-[#fafafa]">,</span>
            <span className="text-[#6a9955]">  // Empty prompt to open connection</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      "}</span>
            <span className="text-[#9cdcfe]">options</span>
            <span className="text-[#fafafa]">: {"{"} ...</span>
            <span className="text-[#9cdcfe]">opts</span>
            <span className="text-[#fafafa]">, </span>
            <span className="text-[#9cdcfe]">resume</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#9cdcfe]">sessionId</span>
            <span className="text-[#fafafa]"> {"}"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    }{"}"});</span>
            {"\n\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#c586c0]">for await</span>
            <span className="text-[#fafafa]"> (</span>
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> msg</span>
            <span className="text-[#c586c0]"> of</span>
            <span className="text-[#9cdcfe]"> rewindQuery</span>
            <span className="text-[#fafafa]">) {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      "}</span>
            <span className="text-[#c586c0]">await</span>
            <span className="text-[#9cdcfe]"> rewindQuery</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#dcdcaa]">rewindFiles</span>
            <span className="text-[#fafafa]">(</span>
            <span className="text-[#9cdcfe]">checkpointId</span>
            <span className="text-[#fafafa]">);</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      "}</span>
            <span className="text-[#c586c0]">break</span>
            <span className="text-[#fafafa]">;</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">console</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#dcdcaa]">log</span>
            <span className="text-[#fafafa]">(</span>
            <span className="text-[#ce9178]">`Rewound to checkpoint: </span>
            <span className="text-[#fafafa]">{"${"}</span>
            <span className="text-[#9cdcfe]">checkpointId</span>
            <span className="text-[#fafafa]">{"}"}</span>
            <span className="text-[#ce9178]">`</span>
            <span className="text-[#fafafa]">);</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"}"}</span>
            {"\n\n"}
            <span className="text-[#dcdcaa]">main</span>
            <span className="text-[#fafafa]">();</span>
          </CodeBlock>
        </section>

        {/* Steps */}
        <section>
          <h3 className="text-xl font-semibold mb-6">Implementation steps</h3>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-[#d4a574] text-[#0a0a0a] flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <div className="flex-1">
                <p className="font-semibold text-[#fafafa] mb-2">Set the environment variable</p>
                <p className="text-sm text-[#a1a1a1] mb-3">
                  File checkpointing requires the <code className="text-[#d4a574]">CLAUDE_CODE_ENABLE_SDK_FILE_CHECKPOINTING</code> environment variable.
                </p>
                <div className="p-3 bg-[#0d0d0d] border border-[#1f1f1f] rounded-lg">
                  <pre className="text-sm font-mono text-[#a1a1a1]">export CLAUDE_CODE_ENABLE_SDK_FILE_CHECKPOINTING=1</pre>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-[#d4a574] text-[#0a0a0a] flex items-center justify-center text-sm font-bold shrink-0">2</span>
              <div className="flex-1">
                <p className="font-semibold text-[#fafafa] mb-2">Enable checkpointing in options</p>
                <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#1f1f1f] bg-[#0d0d0d]">
                          <th className="text-left py-2 px-3 text-[#737373] font-medium">Option</th>
                          <th className="text-left py-2 px-3 text-[#737373] font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1f1f1f]/50">
                        <tr>
                          <td className="py-2 px-3"><code className="text-[#d4a574] text-xs">enableFileCheckpointing: true</code></td>
                          <td className="py-2 px-3 text-[#a1a1a1]">Tracks file changes for rewinding</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3"><code className="text-[#d4a574] text-xs">extraArgs: {`{ 'replay-user-messages': null }`}</code></td>
                          <td className="py-2 px-3 text-[#a1a1a1]">Required to receive checkpoint UUIDs</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-[#d4a574] text-[#0a0a0a] flex items-center justify-center text-sm font-bold shrink-0">3</span>
              <div className="flex-1">
                <p className="font-semibold text-[#fafafa] mb-2">Capture checkpoint UUID and session ID</p>
                <p className="text-sm text-[#a1a1a1]">
                  Each user message has a UUID that serves as a checkpoint. Capture the first one to restore all files to their original state.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-[#d4a574] text-[#0a0a0a] flex items-center justify-center text-sm font-bold shrink-0">4</span>
              <div className="flex-1">
                <p className="font-semibold text-[#fafafa] mb-2">Rewind files</p>
                <p className="text-sm text-[#a1a1a1] mb-3">
                  Resume the session with an empty prompt and call <code className="text-[#d4a574]">rewindFiles()</code> with your checkpoint UUID.
                </p>
                <p className="text-sm text-[#737373]">
                  You can also rewind from the CLI: <code className="text-[#d4a574]">claude --resume &lt;session-id&gt; --rewind-files &lt;checkpoint-uuid&gt;</code>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Common patterns */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Common patterns</h2>

          {/* Checkpoint before risky operations */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Checkpoint before risky operations</h3>
            <p className="text-[#a1a1a1] mb-4">
              Keep only the most recent checkpoint UUID, updating it before each agent turn. If something goes wrong, immediately rewind to the last safe state.
            </p>
            <CodeBlock filename="risky-operations.ts">
              <span className="text-[#c586c0]">let</span>
              <span className="text-[#9cdcfe]"> safeCheckpoint</span>
              <span className="text-[#fafafa]">: </span>
              <span className="text-[#4ec9b0]">string</span>
              <span className="text-[#fafafa]"> | </span>
              <span className="text-[#4ec9b0]">undefined</span>
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
              <span className="text-[#6a9955]">// Update checkpoint before each turn (overwrites previous)</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  "}</span>
              <span className="text-[#c586c0]">if</span>
              <span className="text-[#fafafa]"> (</span>
              <span className="text-[#9cdcfe]">message</span>
              <span className="text-[#fafafa]">.</span>
              <span className="text-[#9cdcfe]">type</span>
              <span className="text-[#fafafa]"> === </span>
              <span className="text-[#ce9178]">&apos;user&apos;</span>
              <span className="text-[#fafafa]"> && </span>
              <span className="text-[#9cdcfe]">message</span>
              <span className="text-[#fafafa]">.</span>
              <span className="text-[#9cdcfe]">uuid</span>
              <span className="text-[#fafafa]">) {"{"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"    "}</span>
              <span className="text-[#9cdcfe]">safeCheckpoint</span>
              <span className="text-[#fafafa]"> = </span>
              <span className="text-[#9cdcfe]">message</span>
              <span className="text-[#fafafa]">.</span>
              <span className="text-[#9cdcfe]">uuid</span>
              <span className="text-[#fafafa]">;</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  }"}</span>
              {"\n\n"}
              <span className="text-[#fafafa]">{"  "}</span>
              <span className="text-[#6a9955]">// Revert based on your own logic</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  "}</span>
              <span className="text-[#c586c0]">if</span>
              <span className="text-[#fafafa]"> (</span>
              <span className="text-[#9cdcfe]">yourRevertCondition</span>
              <span className="text-[#fafafa]"> && </span>
              <span className="text-[#9cdcfe]">safeCheckpoint</span>
              <span className="text-[#fafafa]">) {"{"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"    "}</span>
              <span className="text-[#c586c0]">await</span>
              <span className="text-[#9cdcfe]"> response</span>
              <span className="text-[#fafafa]">.</span>
              <span className="text-[#dcdcaa]">rewindFiles</span>
              <span className="text-[#fafafa]">(</span>
              <span className="text-[#9cdcfe]">safeCheckpoint</span>
              <span className="text-[#fafafa]">);</span>
              {"\n"}
              <span className="text-[#fafafa]">{"    "}</span>
              <span className="text-[#c586c0]">break</span>
              <span className="text-[#fafafa]">;</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  }"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"}"}</span>
            </CodeBlock>
          </div>

          {/* Multiple restore points */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Multiple restore points</h3>
            <p className="text-[#a1a1a1] mb-4">
              Store all checkpoint UUIDs in an array with metadata. After the session completes, you can rewind to any previous checkpoint.
            </p>
            <CodeBlock filename="multiple-checkpoints.ts">
              <span className="text-[#c586c0]">interface</span>
              <span className="text-[#4ec9b0]"> Checkpoint</span>
              <span className="text-[#fafafa]"> {"{"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  "}</span>
              <span className="text-[#9cdcfe]">id</span>
              <span className="text-[#fafafa]">: </span>
              <span className="text-[#4ec9b0]">string</span>
              <span className="text-[#fafafa]">;</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  "}</span>
              <span className="text-[#9cdcfe]">description</span>
              <span className="text-[#fafafa]">: </span>
              <span className="text-[#4ec9b0]">string</span>
              <span className="text-[#fafafa]">;</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  "}</span>
              <span className="text-[#9cdcfe]">timestamp</span>
              <span className="text-[#fafafa]">: </span>
              <span className="text-[#4ec9b0]">Date</span>
              <span className="text-[#fafafa]">;</span>
              {"\n"}
              <span className="text-[#fafafa]">{"}"}</span>
              {"\n\n"}
              <span className="text-[#c586c0]">const</span>
              <span className="text-[#9cdcfe]"> checkpoints</span>
              <span className="text-[#fafafa]">: </span>
              <span className="text-[#4ec9b0]">Checkpoint</span>
              <span className="text-[#fafafa]">[] = [];</span>
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
              <span className="text-[#ce9178]">&apos;user&apos;</span>
              <span className="text-[#fafafa]"> && </span>
              <span className="text-[#9cdcfe]">message</span>
              <span className="text-[#fafafa]">.</span>
              <span className="text-[#9cdcfe]">uuid</span>
              <span className="text-[#fafafa]">) {"{"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"    "}</span>
              <span className="text-[#9cdcfe]">checkpoints</span>
              <span className="text-[#fafafa]">.</span>
              <span className="text-[#dcdcaa]">push</span>
              <span className="text-[#fafafa]">({"{"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"      "}</span>
              <span className="text-[#9cdcfe]">id</span>
              <span className="text-[#fafafa]">: </span>
              <span className="text-[#9cdcfe]">message</span>
              <span className="text-[#fafafa]">.</span>
              <span className="text-[#9cdcfe]">uuid</span>
              <span className="text-[#fafafa]">,</span>
              {"\n"}
              <span className="text-[#fafafa]">{"      "}</span>
              <span className="text-[#9cdcfe]">description</span>
              <span className="text-[#fafafa]">: </span>
              <span className="text-[#ce9178]">`After turn </span>
              <span className="text-[#fafafa]">{"${"}</span>
              <span className="text-[#9cdcfe]">checkpoints</span>
              <span className="text-[#fafafa]">.</span>
              <span className="text-[#9cdcfe]">length</span>
              <span className="text-[#fafafa]"> + </span>
              <span className="text-[#b5cea8]">1</span>
              <span className="text-[#fafafa]">{"}"}</span>
              <span className="text-[#ce9178]">`</span>
              <span className="text-[#fafafa]">,</span>
              {"\n"}
              <span className="text-[#fafafa]">{"      "}</span>
              <span className="text-[#9cdcfe]">timestamp</span>
              <span className="text-[#fafafa]">: </span>
              <span className="text-[#c586c0]">new</span>
              <span className="text-[#4ec9b0]"> Date</span>
              <span className="text-[#fafafa]">()</span>
              {"\n"}
              <span className="text-[#fafafa]">{"    }{"}"});</span>
              {"\n"}
              <span className="text-[#fafafa]">{"  }"}</span>
              {"\n"}
              <span className="text-[#fafafa]">{"}"}</span>
              {"\n\n"}
              <span className="text-[#6a9955]">// Later: rewind to any checkpoint</span>
              {"\n"}
              <span className="text-[#c586c0]">const</span>
              <span className="text-[#9cdcfe]"> target</span>
              <span className="text-[#fafafa]"> = </span>
              <span className="text-[#9cdcfe]">checkpoints</span>
              <span className="text-[#fafafa]">[</span>
              <span className="text-[#b5cea8]">0</span>
              <span className="text-[#fafafa]">];</span>
              <span className="text-[#6a9955]">  // Pick any checkpoint</span>
              {"\n"}
              <span className="text-[#c586c0]">await</span>
              <span className="text-[#9cdcfe]"> rewindQuery</span>
              <span className="text-[#fafafa]">.</span>
              <span className="text-[#dcdcaa]">rewindFiles</span>
              <span className="text-[#fafafa]">(</span>
              <span className="text-[#9cdcfe]">target</span>
              <span className="text-[#fafafa]">.</span>
              <span className="text-[#9cdcfe]">id</span>
              <span className="text-[#fafafa]">);</span>
            </CodeBlock>
          </div>
        </section>

        {/* Limitations */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Limitations</h2>
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1f1f1f] bg-[#0d0d0d]">
                    <th className="text-left py-3 px-4 text-[#737373] font-medium">Limitation</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f1f]/50">
                  <tr>
                    <td className="py-3 px-4 text-[#fafafa]">Write/Edit/NotebookEdit tools only</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Changes made through Bash commands are not tracked</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-[#fafafa]">Same session</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Checkpoints are tied to the session that created them</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-[#fafafa]">File content only</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Creating, moving, or deleting directories is not undone by rewinding</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-[#fafafa]">Local files</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Remote or network files are not tracked</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Troubleshooting</h2>
          <div className="space-y-6">
            <div className="p-4 bg-[#111111] border border-[#1f1f1f] rounded-xl">
              <h4 className="text-lg font-medium mb-2 text-[#fafafa]">Checkpointing options not recognized</h4>
              <p className="text-sm text-[#a1a1a1] mb-2">
                If <code className="text-[#d4a574]">enableFileCheckpointing</code> or <code className="text-[#d4a574]">rewindFiles()</code> isn&apos;t available, update to the latest SDK version.
              </p>
              <pre className="text-sm font-mono text-[#737373]">npm install @anthropic-ai/claude-agent-sdk@latest</pre>
            </div>

            <div className="p-4 bg-[#111111] border border-[#1f1f1f] rounded-xl">
              <h4 className="text-lg font-medium mb-2 text-[#fafafa]">User messages don&apos;t have UUIDs</h4>
              <p className="text-sm text-[#a1a1a1] mb-2">
                The <code className="text-[#d4a574]">replay-user-messages</code> option isn&apos;t set.
              </p>
              <pre className="text-sm font-mono text-[#737373]">{`extraArgs: { 'replay-user-messages': null }`}</pre>
            </div>

            <div className="p-4 bg-[#111111] border border-[#1f1f1f] rounded-xl">
              <h4 className="text-lg font-medium mb-2 text-[#fafafa]">&quot;No file checkpoint found for message&quot; error</h4>
              <p className="text-sm text-[#a1a1a1]">
                The environment variable <code className="text-[#d4a574]">CLAUDE_CODE_ENABLE_SDK_FILE_CHECKPOINTING</code> isn&apos;t set, or the session wasn&apos;t properly completed before attempting to resume and rewind.
              </p>
            </div>

            <div className="p-4 bg-[#111111] border border-[#1f1f1f] rounded-xl">
              <h4 className="text-lg font-medium mb-2 text-[#fafafa]">&quot;ProcessTransport is not ready for writing&quot; error</h4>
              <p className="text-sm text-[#a1a1a1]">
                You called <code className="text-[#d4a574]">rewindFiles()</code> after iterating through the response. Resume the session with an empty prompt, then call rewind on the new query.
              </p>
            </div>
          </div>
        </section>

        {/* Next steps */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Next steps</h2>
          <ul className="text-[#a1a1a1] space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-[#d4a574]">-</span>
              <span><span className="text-[#fafafa]">Sessions:</span> learn how to resume sessions, which is required for rewinding after the stream completes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#d4a574]">-</span>
              <span><span className="text-[#fafafa]">Permissions:</span> configure which tools Claude can use and how file modifications are approved</span>
            </li>
          </ul>
        </section>
      </div>

      <ChapterNavigation currentChapterId="checkpointing" />
    </LearnLayout>
  );
}
