"use client";

import { LearnLayout, ChapterNavigation } from "../components";

export default function ToolOutputs() {
  return (
    <LearnLayout>
      <div className="mb-12">
        <p className="text-sm text-[#d4a574] font-medium mb-2">Chapter 9</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Tool Outputs & Permissions
        </h1>
        <p className="text-lg text-[#a1a1a1] max-w-2xl">
          Returns formatted search results from the web. Complete reference for tool output interfaces and permission types.
        </p>
      </div>

      <div className="space-y-12">
        {/* TodoWriteOutput */}
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">TodoWriteOutput</code>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Returns confirmation with current task statistics.
          </p>

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
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">message</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Success message</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">stats</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">object</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Current todo statistics</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 p-4 bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl">
            <p className="text-xs text-[#737373] mb-3">Stats structure:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1f1f1f]">
                    <th className="text-left py-2 px-3 text-[#525252] font-medium text-xs">Property</th>
                    <th className="text-left py-2 px-3 text-[#525252] font-medium text-xs">Type</th>
                    <th className="text-left py-2 px-3 text-[#525252] font-medium text-xs">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f1f]/30">
                  <tr>
                    <td className="py-2 px-3"><code className="text-[#d4a574] text-xs">total</code></td>
                    <td className="py-2 px-3 text-[#737373] font-mono text-xs">number</td>
                    <td className="py-2 px-3 text-[#737373] text-xs">Total number of tasks</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3"><code className="text-[#d4a574] text-xs">pending</code></td>
                    <td className="py-2 px-3 text-[#737373] font-mono text-xs">number</td>
                    <td className="py-2 px-3 text-[#737373] text-xs">Number of pending tasks</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3"><code className="text-[#d4a574] text-xs">in_progress</code></td>
                    <td className="py-2 px-3 text-[#737373] font-mono text-xs">number</td>
                    <td className="py-2 px-3 text-[#737373] text-xs">Number of in-progress tasks</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3"><code className="text-[#d4a574] text-xs">completed</code></td>
                    <td className="py-2 px-3 text-[#737373] font-mono text-xs">number</td>
                    <td className="py-2 px-3 text-[#737373] text-xs">Number of completed tasks</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ExitPlanModeOutput */}
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">ExitPlanModeOutput</code>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Returns confirmation after exiting plan mode.
          </p>

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
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">message</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Confirmation message</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">approved</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">boolean?</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Whether user approved the plan</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ListMcpResourcesOutput */}
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">ListMcpResourcesOutput</code>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Returns list of available MCP resources.
          </p>

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
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">resources</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">Resource[]</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Available resources</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">total</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">number</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Total number of resources</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 p-4 bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl">
            <p className="text-xs text-[#737373] mb-3">Resource structure:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1f1f1f]">
                    <th className="text-left py-2 px-3 text-[#525252] font-medium text-xs">Property</th>
                    <th className="text-left py-2 px-3 text-[#525252] font-medium text-xs">Type</th>
                    <th className="text-left py-2 px-3 text-[#525252] font-medium text-xs">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f1f]/30">
                  <tr>
                    <td className="py-2 px-3"><code className="text-[#d4a574] text-xs">uri</code></td>
                    <td className="py-2 px-3 text-[#737373] font-mono text-xs">string</td>
                    <td className="py-2 px-3 text-[#737373] text-xs">Resource URI</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3"><code className="text-[#d4a574] text-xs">name</code></td>
                    <td className="py-2 px-3 text-[#737373] font-mono text-xs">string</td>
                    <td className="py-2 px-3 text-[#737373] text-xs">Resource name</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3"><code className="text-[#d4a574] text-xs">description</code></td>
                    <td className="py-2 px-3 text-[#737373] font-mono text-xs">string?</td>
                    <td className="py-2 px-3 text-[#737373] text-xs">Optional description</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3"><code className="text-[#d4a574] text-xs">mimeType</code></td>
                    <td className="py-2 px-3 text-[#737373] font-mono text-xs">string?</td>
                    <td className="py-2 px-3 text-[#737373] text-xs">Optional MIME type</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3"><code className="text-[#d4a574] text-xs">server</code></td>
                    <td className="py-2 px-3 text-[#737373] font-mono text-xs">string</td>
                    <td className="py-2 px-3 text-[#737373] text-xs">Server providing the resource</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ReadMcpResourceOutput */}
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">ReadMcpResourceOutput</code>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Returns the contents of the requested MCP resource.
          </p>

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
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">contents</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">Content[]</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Resource contents</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">server</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Server that provided the resource</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 p-4 bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl">
            <p className="text-xs text-[#737373] mb-3">Content structure:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1f1f1f]">
                    <th className="text-left py-2 px-3 text-[#525252] font-medium text-xs">Property</th>
                    <th className="text-left py-2 px-3 text-[#525252] font-medium text-xs">Type</th>
                    <th className="text-left py-2 px-3 text-[#525252] font-medium text-xs">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f1f]/30">
                  <tr>
                    <td className="py-2 px-3"><code className="text-[#d4a574] text-xs">uri</code></td>
                    <td className="py-2 px-3 text-[#737373] font-mono text-xs">string</td>
                    <td className="py-2 px-3 text-[#737373] text-xs">Content URI</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3"><code className="text-[#d4a574] text-xs">mimeType</code></td>
                    <td className="py-2 px-3 text-[#737373] font-mono text-xs">string?</td>
                    <td className="py-2 px-3 text-[#737373] text-xs">Optional MIME type</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3"><code className="text-[#d4a574] text-xs">text</code></td>
                    <td className="py-2 px-3 text-[#737373] font-mono text-xs">string?</td>
                    <td className="py-2 px-3 text-[#737373] text-xs">Text content</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3"><code className="text-[#d4a574] text-xs">blob</code></td>
                    <td className="py-2 px-3 text-[#737373] font-mono text-xs">string?</td>
                    <td className="py-2 px-3 text-[#737373] text-xs">Binary content (base64)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      {/* Permission Types Section */}
      <div className="mt-16 pt-12 border-t border-[#1f1f1f]">
        <div className="mb-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4">
            Permission Types
          </h2>
          <p className="text-[#a1a1a1] max-w-2xl">
            Types for managing tool permissions and access control.
          </p>
        </div>

        <div className="space-y-12">
          {/* PermissionUpdate */}
          <section>
            <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
              <code className="text-[#d4a574]">PermissionUpdate</code>
              <span className="text-xs text-[#525252] font-normal">Union Type</span>
            </h3>
            <p className="text-[#a1a1a1] mb-6">
              Operations for updating permissions.
            </p>

            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4">
              <pre className="text-sm font-mono text-[#a1a1a1] overflow-x-auto">
{`type PermissionUpdate =
  | {
      type: 'addRules';
      rules: PermissionRuleValue[];
      behavior: PermissionBehavior;
      destination: PermissionUpdateDestination;
    }
  | {
      type: 'replaceRules';
      rules: PermissionRuleValue[];
      behavior: PermissionBehavior;
      destination: PermissionUpdateDestination;
    }
  | {
      type: 'removeRules';
      rules: PermissionRuleValue[];
      behavior: PermissionBehavior;
      destination: PermissionUpdateDestination;
    }
  | {
      type: 'setMode';
      mode: PermissionMode;
      destination: PermissionUpdateDestination;
    }
  | {
      type: 'addDirectories';
      directories: string[];
      destination: PermissionUpdateDestination;
    }
  | {
      type: 'removeDirectories';
      directories: string[];
      destination: PermissionUpdateDestination;
    }`}
              </pre>
            </div>
          </section>

          {/* PermissionBehavior */}
          <section>
            <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
              <code className="text-[#d4a574]">PermissionBehavior</code>
              <span className="text-xs text-[#525252] font-normal">Type Alias</span>
            </h3>
            <p className="text-[#a1a1a1] mb-6">
              Defines the behavior for a permission rule.
            </p>

            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4">
              <pre className="text-sm font-mono text-[#a1a1a1] overflow-x-auto">
{`type PermissionBehavior = 'allow' | 'deny' | 'ask';`}
              </pre>
            </div>

            <div className="mt-4 bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden">
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
                      <td className="py-3 px-4">
                        <code className="text-[#28c840]">&apos;allow&apos;</code>
                      </td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Automatically allow the action</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">
                        <code className="text-[#ff5f57]">&apos;deny&apos;</code>
                      </td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Automatically deny the action</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">
                        <code className="text-[#febc2e]">&apos;ask&apos;</code>
                      </td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Prompt the user for permission</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* PermissionUpdateDestination */}
          <section>
            <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
              <code className="text-[#d4a574]">PermissionUpdateDestination</code>
              <span className="text-xs text-[#525252] font-normal">Type Alias</span>
            </h3>
            <p className="text-[#a1a1a1] mb-6">
              Specifies where permission settings are stored.
            </p>

            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4">
              <pre className="text-sm font-mono text-[#a1a1a1] overflow-x-auto">
{`type PermissionUpdateDestination =
  | 'userSettings'     // Global user settings
  | 'projectSettings'  // Per-directory project settings
  | 'localSettings'    // Gitignored local settings
  | 'session'          // Current session only`}
              </pre>
            </div>

            <div className="mt-4 bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden">
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
                      <td className="py-3 px-4">
                        <code className="text-[#d4a574]">&apos;userSettings&apos;</code>
                      </td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Global user settings that apply across all projects</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">
                        <code className="text-[#d4a574]">&apos;projectSettings&apos;</code>
                      </td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Per-directory project settings (committed to repo)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">
                        <code className="text-[#d4a574]">&apos;localSettings&apos;</code>
                      </td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Gitignored local settings for personal preferences</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">
                        <code className="text-[#d4a574]">&apos;session&apos;</code>
                      </td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Current session only (not persisted)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* PermissionRuleValue */}
          <section>
            <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
              <code className="text-[#d4a574]">PermissionRuleValue</code>
              <span className="text-xs text-[#525252] font-normal">Interface</span>
            </h3>
            <p className="text-[#a1a1a1] mb-6">
              Defines a permission rule for a specific tool.
            </p>

            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4 mb-4">
              <pre className="text-sm font-mono text-[#a1a1a1] overflow-x-auto">
{`type PermissionRuleValue = {
  toolName: string;
  ruleContent?: string;
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
                      <th className="text-left py-3 px-4 text-[#737373] font-medium whitespace-nowrap">Required</th>
                      <th className="text-left py-3 px-4 text-[#737373] font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1f1f1f]/50">
                    <tr>
                      <td className="py-3 px-4">
                        <code className="text-[#d4a574]">toolName</code>
                      </td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                      <td className="py-3 px-4 text-[#28c840] text-xs">Yes</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">The name of the tool this rule applies to</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">
                        <code className="text-[#d4a574]">ruleContent</code>
                      </td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                      <td className="py-3 px-4 text-[#525252] text-xs">No</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Optional rule content or pattern for matching</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>

      <ChapterNavigation currentChapterId="tool-outputs" />
    </LearnLayout>
  );
}
