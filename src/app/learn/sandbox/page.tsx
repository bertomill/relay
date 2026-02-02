"use client";

import { LearnLayout, ChapterNavigation, CodeBlock } from "../components";

export default function Sandbox() {
  return (
    <LearnLayout>
      <div className="mb-12">
        <p className="text-sm text-[#d4a574] font-medium mb-2">Chapter 10</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Sandbox
        </h1>
        <p className="text-lg text-[#a1a1a1] max-w-2xl">
          Configure sandbox mode for secure command execution and system access control.
        </p>
      </div>

      <div className="space-y-12">
        {/* Sandbox Settings */}
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">SandboxSettings</code>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Main configuration object for sandbox mode.
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
                      <code className="text-[#d4a574]">enabled</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">boolean</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs">false</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Enable sandbox mode for command execution</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">autoAllowBashIfSandboxed</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">boolean</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs">false</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Auto-approve bash commands when sandbox is enabled</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">excludedCommands</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string[]</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs">[]</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Commands that always bypass sandbox restrictions (e.g., [&apos;docker&apos;]). These run unsandboxed automatically without model involvement</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">allowUnsandboxedCommands</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">boolean</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs">false</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Allow the model to request running commands outside the sandbox. When true, the model can set dangerouslyDisableSandbox in tool input</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">network</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">NetworkSandboxSettings</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs">undefined</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Network-specific sandbox configuration</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">ignoreViolations</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">SandboxIgnoreViolations</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs">undefined</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Configure which sandbox violations to ignore</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">enableWeakerNestedSandbox</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">boolean</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs">false</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Enable a weaker nested sandbox for compatibility</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Note about filesystem/network */}
          <div className="mt-6 p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl">
            <p className="text-sm text-[#a1a1a1] mb-3">
              <span className="text-[#d4a574] font-medium">Note:</span> Filesystem and network access restrictions are NOT configured via sandbox settings. Instead, they are derived from permission rules:
            </p>
            <ul className="text-sm text-[#737373] space-y-1 ml-4">
              <li><span className="text-[#a1a1a1]">Filesystem read restrictions:</span> Read deny rules</li>
              <li><span className="text-[#a1a1a1]">Filesystem write restrictions:</span> Edit allow/deny rules</li>
              <li><span className="text-[#a1a1a1]">Network restrictions:</span> WebFetch allow/deny rules</li>
            </ul>
            <p className="text-sm text-[#737373] mt-3">
              Use sandbox settings for command execution sandboxing, and permission rules for filesystem and network access control.
            </p>
          </div>
        </section>

        {/* Example usage */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Example Usage</h2>
          <CodeBlock filename="sandbox-example.ts">
            <span className="text-[#c586c0]">import</span>
            <span className="text-[#fafafa]"> {"{ "}</span>
            <span className="text-[#9cdcfe]">query</span>
            <span className="text-[#fafafa]">{" }"} </span>
            <span className="text-[#c586c0]">from</span>
            <span className="text-[#ce9178]"> &quot;@anthropic-ai/claude-agent-sdk&quot;</span>
            <span className="text-[#fafafa]">;</span>
            {"\n\n"}
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> result</span>
            <span className="text-[#fafafa]"> = </span>
            <span className="text-[#c586c0]">await</span>
            <span className="text-[#dcdcaa]"> query</span>
            <span className="text-[#fafafa]">({"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">prompt</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&quot;Build and test my project&quot;</span>
            <span className="text-[#fafafa]">,</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">options</span>
            <span className="text-[#fafafa]">: {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">sandbox</span>
            <span className="text-[#fafafa]">: {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      "}</span>
            <span className="text-[#9cdcfe]">enabled</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#569cd6]">true</span>
            <span className="text-[#fafafa]">,</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      "}</span>
            <span className="text-[#9cdcfe]">autoAllowBashIfSandboxed</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#569cd6]">true</span>
            <span className="text-[#fafafa]">,</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      "}</span>
            <span className="text-[#9cdcfe]">network</span>
            <span className="text-[#fafafa]">: {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"        "}</span>
            <span className="text-[#9cdcfe]">allowLocalBinding</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#569cd6]">true</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"}"});</span>
          </CodeBlock>
        </section>

        {/* Unix socket security warning */}
        <section>
          <div className="p-4 bg-[#2a1a1a] border border-[#4a2a2a] rounded-xl">
            <p className="text-sm text-[#ffa0a0] font-medium mb-2">Unix socket security</p>
            <p className="text-sm text-[#a1a1a1]">
              The <code className="text-[#d4a574]">allowUnixSockets</code> option can grant access to powerful system services.
              For example, allowing <code className="text-[#d4a574]">/var/run/docker.sock</code> effectively grants full host system access
              through the Docker API, bypassing sandbox isolation. Only allow Unix sockets that are strictly necessary and
              understand the security implications of each.
            </p>
          </div>
        </section>

        {/* NetworkSandboxSettings */}
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">NetworkSandboxSettings</code>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Network-specific configuration for sandbox mode.
          </p>

          <div className="mb-4 p-4 bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl">
            <pre className="text-sm font-mono text-[#a1a1a1] overflow-x-auto">
{`type NetworkSandboxSettings = {
  allowLocalBinding?: boolean;
  allowUnixSockets?: string[];
  allowAllUnixSockets?: boolean;
  httpProxyPort?: number;
  socksProxyPort?: number;
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
                    <th className="text-left py-3 px-4 text-[#737373] font-medium whitespace-nowrap">Default</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f1f]/50">
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">allowLocalBinding</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">boolean</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs">false</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Allow processes to bind to local ports (e.g., for dev servers)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">allowUnixSockets</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string[]</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs">[]</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Unix socket paths that processes can access (e.g., Docker socket)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">allowAllUnixSockets</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">boolean</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs">false</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Allow access to all Unix sockets</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">httpProxyPort</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">number</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs">undefined</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">HTTP proxy port for network requests</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">socksProxyPort</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">number</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs">undefined</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">SOCKS proxy port for network requests</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SandboxIgnoreViolations */}
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">SandboxIgnoreViolations</code>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Configuration for ignoring specific sandbox violations.
          </p>

          <div className="mb-4 p-4 bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl">
            <pre className="text-sm font-mono text-[#a1a1a1] overflow-x-auto">
{`type SandboxIgnoreViolations = {
  file?: string[];
  network?: string[];
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
                    <th className="text-left py-3 px-4 text-[#737373] font-medium whitespace-nowrap">Default</th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f1f]/50">
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">file</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string[]</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs">[]</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">File path patterns to ignore violations for</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">network</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string[]</td>
                    <td className="py-3 px-4 text-[#525252] font-mono text-xs">[]</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Network patterns to ignore violations for</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Permissions Fallback */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Permissions Fallback for Unsandboxed Commands</h2>
          <p className="text-[#a1a1a1] mb-6">
            When <code className="text-[#d4a574]">allowUnsandboxedCommands</code> is enabled, the model can request to run commands
            outside the sandbox by setting <code className="text-[#d4a574]">dangerouslyDisableSandbox: true</code> in the tool input.
            These requests fall back to the existing permissions system, meaning your <code className="text-[#d4a574]">canUseTool</code> handler
            will be invoked, allowing you to implement custom authorization logic.
          </p>

          {/* Comparison box */}
          <div className="mb-6 p-4 bg-[#111111] border border-[#1f1f1f] rounded-xl">
            <p className="text-sm font-medium text-[#fafafa] mb-3">excludedCommands vs allowUnsandboxedCommands:</p>
            <ul className="text-sm text-[#a1a1a1] space-y-2">
              <li>
                <code className="text-[#d4a574]">excludedCommands</code>: A static list of commands that always bypass the sandbox
                automatically (e.g., <code className="text-[#737373]">[&apos;docker&apos;]</code>). The model has no control over this.
              </li>
              <li>
                <code className="text-[#d4a574]">allowUnsandboxedCommands</code>: Lets the model decide at runtime whether to request
                unsandboxed execution by setting <code className="text-[#737373]">dangerouslyDisableSandbox: true</code> in the tool input.
              </li>
            </ul>
          </div>

          <CodeBlock filename="unsandboxed-commands-example.ts">
            <span className="text-[#c586c0]">import</span>
            <span className="text-[#fafafa]"> {"{ "}</span>
            <span className="text-[#9cdcfe]">query</span>
            <span className="text-[#fafafa]">{" }"} </span>
            <span className="text-[#c586c0]">from</span>
            <span className="text-[#ce9178]"> &quot;@anthropic-ai/claude-agent-sdk&quot;</span>
            <span className="text-[#fafafa]">;</span>
            {"\n\n"}
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> result</span>
            <span className="text-[#fafafa]"> = </span>
            <span className="text-[#c586c0]">await</span>
            <span className="text-[#dcdcaa]"> query</span>
            <span className="text-[#fafafa]">({"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">prompt</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&quot;Deploy my application&quot;</span>
            <span className="text-[#fafafa]">,</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">options</span>
            <span className="text-[#fafafa]">: {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">sandbox</span>
            <span className="text-[#fafafa]">: {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      "}</span>
            <span className="text-[#9cdcfe]">enabled</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#569cd6]">true</span>
            <span className="text-[#fafafa]">,</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      "}</span>
            <span className="text-[#9cdcfe]">allowUnsandboxedCommands</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#569cd6]">true</span>
            <span className="text-[#6a9955]">  // Model can request unsandboxed execution</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    }"}</span>
            <span className="text-[#fafafa]">,</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">permissionMode</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&quot;default&quot;</span>
            <span className="text-[#fafafa]">,</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">canUseTool</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#c586c0]">async</span>
            <span className="text-[#fafafa]"> (</span>
            <span className="text-[#9cdcfe]">tool</span>
            <span className="text-[#fafafa]">, </span>
            <span className="text-[#9cdcfe]">input</span>
            <span className="text-[#fafafa]">) =&gt; {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      "}</span>
            <span className="text-[#6a9955]">// Check if the model is requesting to bypass the sandbox</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      "}</span>
            <span className="text-[#c586c0]">if</span>
            <span className="text-[#fafafa]"> (</span>
            <span className="text-[#9cdcfe]">tool</span>
            <span className="text-[#fafafa]"> === </span>
            <span className="text-[#ce9178]">&quot;Bash&quot;</span>
            <span className="text-[#fafafa]"> && </span>
            <span className="text-[#9cdcfe]">input</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">dangerouslyDisableSandbox</span>
            <span className="text-[#fafafa]">) {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"        "}</span>
            <span className="text-[#6a9955]">// The model wants to run this command outside the sandbox</span>
            {"\n"}
            <span className="text-[#fafafa]">{"        "}</span>
            <span className="text-[#9cdcfe]">console</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#dcdcaa]">log</span>
            <span className="text-[#fafafa]">(</span>
            <span className="text-[#ce9178]">`Unsandboxed command requested: </span>
            <span className="text-[#fafafa]">{"${"}</span>
            <span className="text-[#9cdcfe]">input</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">command</span>
            <span className="text-[#fafafa]">{"}"}</span>
            <span className="text-[#ce9178]">`</span>
            <span className="text-[#fafafa]">);</span>
            {"\n\n"}
            <span className="text-[#fafafa]">{"        "}</span>
            <span className="text-[#6a9955]">// Return true to allow, false to deny</span>
            {"\n"}
            <span className="text-[#fafafa]">{"        "}</span>
            <span className="text-[#c586c0]">return</span>
            <span className="text-[#dcdcaa]"> isCommandAuthorized</span>
            <span className="text-[#fafafa]">(</span>
            <span className="text-[#9cdcfe]">input</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">command</span>
            <span className="text-[#fafafa]">);</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      "}</span>
            <span className="text-[#c586c0]">return</span>
            <span className="text-[#569cd6]"> true</span>
            <span className="text-[#fafafa]">;</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"}"});</span>
          </CodeBlock>

          <p className="mt-6 text-[#a1a1a1]">
            This pattern enables you to:
          </p>
          <ul className="mt-2 text-[#a1a1a1] list-disc list-inside space-y-1">
            <li><span className="text-[#fafafa]">Audit model requests:</span> Log when the model requests unsandboxed execution</li>
            <li><span className="text-[#fafafa]">Implement allowlists:</span> Only permit specific commands to run unsandboxed</li>
            <li><span className="text-[#fafafa]">Add approval workflows:</span> Require explicit authorization for privileged operations</li>
          </ul>

          {/* Warning box */}
          <div className="mt-6 p-4 bg-[#2a1a1a] border border-[#4a2a2a] rounded-xl">
            <p className="text-sm text-[#ffa0a0] font-medium mb-2">Security Warning</p>
            <p className="text-sm text-[#a1a1a1] mb-3">
              Commands running with <code className="text-[#d4a574]">dangerouslyDisableSandbox: true</code> have full system access.
              Ensure your <code className="text-[#d4a574]">canUseTool</code> handler validates these requests carefully.
            </p>
            <p className="text-sm text-[#a1a1a1]">
              If <code className="text-[#d4a574]">permissionMode</code> is set to <code className="text-[#d4a574]">bypassPermissions</code> and
              <code className="text-[#d4a574]"> allowUnsandboxedCommands</code> is enabled, the model can autonomously execute commands
              outside the sandbox without any approval prompts. This combination effectively allows the model to escape sandbox isolation silently.
            </p>
          </div>
        </section>
      </div>

      <ChapterNavigation currentChapterId="sandbox" />
    </LearnLayout>
  );
}
