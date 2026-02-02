"use client";

import { LearnLayout, ChapterNavigation } from "../components";

export default function Tools() {
  return (
    <LearnLayout>
      <div className="mb-12">
        <p className="text-sm text-[#d4a574] font-medium mb-2">Chapter 8</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Tools
        </h1>
        <p className="text-lg text-[#a1a1a1] max-w-2xl">
          Complete reference for built-in tool interfaces. Use these when configuring tool permissions or building custom integrations.
        </p>
      </div>

      <div className="space-y-12">
        {/* Bash Tool */}
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">Bash</code>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Executes bash commands in a persistent shell session with optional timeout and background execution.
          </p>

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
                      <code className="text-[#d4a574]">command</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#28c840] text-xs">Yes</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">The command to execute</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">timeout</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">number</td>
                    <td className="py-3 px-4 text-[#525252] text-xs">No</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Optional timeout in milliseconds (max 600000)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">description</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#525252] text-xs">No</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Clear, concise description of what this command does in 5-10 words</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">run_in_background</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">boolean</td>
                    <td className="py-3 px-4 text-[#525252] text-xs">No</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Set to true to run this command in the background</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* BashOutput Tool */}
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">BashOutput</code>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Retrieves output from a running or completed background bash shell.
          </p>

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
                      <code className="text-[#d4a574]">bash_id</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#28c840] text-xs">Yes</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">The ID of the background shell to retrieve output from</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">filter</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#525252] text-xs">No</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Optional regex to filter output lines</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Edit Tool */}
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">Edit</code>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Performs exact string replacements in files.
          </p>

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
                      <code className="text-[#d4a574]">file_path</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#28c840] text-xs">Yes</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">The absolute path to the file to modify</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">old_string</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#28c840] text-xs">Yes</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">The text to replace</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">new_string</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#28c840] text-xs">Yes</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">The text to replace it with (must be different from old_string)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">replace_all</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">boolean</td>
                    <td className="py-3 px-4 text-[#525252] text-xs">No</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Replace all occurrences of old_string (default false)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Read Tool */}
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">Read</code>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Reads files from the local filesystem, including text, images, PDFs, and Jupyter notebooks.
          </p>

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
                      <code className="text-[#d4a574]">file_path</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#28c840] text-xs">Yes</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">The absolute path to the file to read</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">offset</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">number</td>
                    <td className="py-3 px-4 text-[#525252] text-xs">No</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">The line number to start reading from</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">limit</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">number</td>
                    <td className="py-3 px-4 text-[#525252] text-xs">No</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">The number of lines to read</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Write Tool */}
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">Write</code>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Writes a file to the local filesystem, overwriting if it exists.
          </p>

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
                      <code className="text-[#d4a574]">file_path</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#28c840] text-xs">Yes</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">The absolute path to the file to write</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">content</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#28c840] text-xs">Yes</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">The content to write to the file</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Glob Tool */}
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">Glob</code>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Fast file pattern matching that works with any codebase size.
          </p>

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
                      <code className="text-[#d4a574]">pattern</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#28c840] text-xs">Yes</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">The glob pattern to match files against</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">path</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#525252] text-xs">No</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">The directory to search in (defaults to cwd)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Grep Tool */}
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">Grep</code>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Powerful search tool built on ripgrep with regex support.
          </p>

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
                      <code className="text-[#d4a574]">pattern</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#28c840] text-xs">Yes</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">The regular expression pattern to search for</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">path</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#525252] text-xs">No</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">File or directory to search in (defaults to cwd)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">glob</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#525252] text-xs">No</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Glob pattern to filter files (e.g. &quot;*.js&quot;)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">type</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#525252] text-xs">No</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">File type to search (e.g. &quot;js&quot;, &quot;py&quot;, &quot;rust&quot;)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">output_mode</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">&apos;content&apos; | &apos;files_with_matches&apos; | &apos;count&apos;</td>
                    <td className="py-3 px-4 text-[#525252] text-xs">No</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Output mode: &quot;content&quot;, &quot;files_with_matches&quot;, or &quot;count&quot;</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">-i</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">boolean</td>
                    <td className="py-3 px-4 text-[#525252] text-xs">No</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Case insensitive search</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">-n</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">boolean</td>
                    <td className="py-3 px-4 text-[#525252] text-xs">No</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Show line numbers (for content mode)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">-B</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">number</td>
                    <td className="py-3 px-4 text-[#525252] text-xs">No</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Lines to show before each match</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">-A</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">number</td>
                    <td className="py-3 px-4 text-[#525252] text-xs">No</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Lines to show after each match</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">-C</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">number</td>
                    <td className="py-3 px-4 text-[#525252] text-xs">No</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Lines to show before and after each match</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">head_limit</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">number</td>
                    <td className="py-3 px-4 text-[#525252] text-xs">No</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Limit output to first N lines/entries</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">multiline</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">boolean</td>
                    <td className="py-3 px-4 text-[#525252] text-xs">No</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Enable multiline mode</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* KillBash Tool */}
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">KillBash</code>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Kills a running background bash shell by its ID.
          </p>

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
                      <code className="text-[#d4a574]">shell_id</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#28c840] text-xs">Yes</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">The ID of the background shell to kill</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* NotebookEdit Tool */}
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">NotebookEdit</code>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Edits cells in Jupyter notebook files.
          </p>

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
                      <code className="text-[#d4a574]">notebook_path</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#28c840] text-xs">Yes</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">The absolute path to the Jupyter notebook file</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">new_source</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#28c840] text-xs">Yes</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">The new source for the cell</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">cell_id</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#525252] text-xs">No</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">The ID of the cell to edit</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">cell_type</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">&apos;code&apos; | &apos;markdown&apos;</td>
                    <td className="py-3 px-4 text-[#525252] text-xs">No</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">The type of the cell (code or markdown)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">edit_mode</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">&apos;replace&apos; | &apos;insert&apos; | &apos;delete&apos;</td>
                    <td className="py-3 px-4 text-[#525252] text-xs">No</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">The type of edit (replace, insert, delete)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* WebFetch Tool */}
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">WebFetch</code>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Fetches content from a URL and processes it with an AI model.
          </p>

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
                      <code className="text-[#d4a574]">url</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#28c840] text-xs">Yes</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">The URL to fetch content from</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">prompt</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#28c840] text-xs">Yes</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">The prompt to run on the fetched content</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* WebSearch Tool */}
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">WebSearch</code>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Searches the web and returns formatted results.
          </p>

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
                      <code className="text-[#d4a574]">query</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#28c840] text-xs">Yes</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">The search query to use</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">allowed_domains</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string[]</td>
                    <td className="py-3 px-4 text-[#525252] text-xs">No</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Only include results from these domains</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">blocked_domains</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string[]</td>
                    <td className="py-3 px-4 text-[#525252] text-xs">No</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Never include results from these domains</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* TodoWrite Tool */}
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">TodoWrite</code>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Creates and manages a structured task list for tracking progress.
          </p>

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
                      <code className="text-[#d4a574]">todos</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">TodoItem[]</td>
                    <td className="py-3 px-4 text-[#28c840] text-xs">Yes</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">The updated todo list</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 p-4 bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl">
            <p className="text-xs text-[#737373] mb-3">TodoItem structure:</p>
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
                    <td className="py-2 px-3"><code className="text-[#d4a574] text-xs">content</code></td>
                    <td className="py-2 px-3 text-[#737373] font-mono text-xs">string</td>
                    <td className="py-2 px-3 text-[#737373] text-xs">The task description</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3"><code className="text-[#d4a574] text-xs">status</code></td>
                    <td className="py-2 px-3 text-[#737373] font-mono text-xs">&apos;pending&apos; | &apos;in_progress&apos; | &apos;completed&apos;</td>
                    <td className="py-2 px-3 text-[#737373] text-xs">The task status</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3"><code className="text-[#d4a574] text-xs">activeForm</code></td>
                    <td className="py-2 px-3 text-[#737373] font-mono text-xs">string</td>
                    <td className="py-2 px-3 text-[#737373] text-xs">Active form of the task description</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ExitPlanMode Tool */}
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">ExitPlanMode</code>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Exits planning mode and prompts the user to approve the plan.
          </p>

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
                      <code className="text-[#d4a574]">plan</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#28c840] text-xs">Yes</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">The plan to run by the user for approval</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ListMcpResources Tool */}
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">ListMcpResources</code>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Lists available MCP resources from connected servers.
          </p>

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
                      <code className="text-[#d4a574]">server</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#525252] text-xs">No</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">Optional server name to filter resources by</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ReadMcpResource Tool */}
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">ReadMcpResource</code>
          </h2>
          <p className="text-[#a1a1a1] mb-6">
            Reads a specific MCP resource from a server.
          </p>

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
                      <code className="text-[#d4a574]">server</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#28c840] text-xs">Yes</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">The MCP server name</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <code className="text-[#d4a574]">uri</code>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">string</td>
                    <td className="py-3 px-4 text-[#28c840] text-xs">Yes</td>
                    <td className="py-3 px-4 text-[#a1a1a1]">The resource URI to read</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      {/* Tool Output Types Section */}
      <div className="mt-16 pt-12 border-t border-[#1f1f1f]">
        <div className="mb-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4">
            Tool Output Types
          </h2>
          <p className="text-[#a1a1a1] max-w-2xl">
            Documentation of output schemas for all built-in Claude Code tools. These types represent the actual response data returned by each tool.
          </p>
        </div>

        {/* ToolOutput Union Type */}
        <div className="mb-12 p-6 bg-[#0d0d0d] border border-[#1f1f1f] rounded-2xl">
          <h3 className="text-lg font-bold mb-2 flex items-center gap-3">
            <code className="text-[#d4a574]">ToolOutput</code>
            <span className="text-xs text-[#525252] font-normal">Union Type</span>
          </h3>
          <p className="text-sm text-[#737373] mb-4">
            This is a documentation-only type for clarity. It represents the union of all tool output types.
          </p>
          <pre className="text-sm font-mono text-[#a1a1a1] overflow-x-auto">
{`type ToolOutput =
  | TaskOutput
  | AskUserQuestionOutput
  | BashOutput
  | BashOutputToolOutput
  | EditOutput
  | ReadOutput
  | WriteOutput
  | GlobOutput
  | GrepOutput
  | KillBashOutput
  | NotebookEditOutput
  | WebFetchOutput
  | WebSearchOutput
  | TodoWriteOutput
  | ExitPlanModeOutput
  | ListMcpResourcesOutput
  | ReadMcpResourceOutput;`}
          </pre>
        </div>

        <div className="space-y-12">
          {/* TaskOutput */}
          <section>
            <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
              <code className="text-[#d4a574]">TaskOutput</code>
            </h3>
            <p className="text-[#a1a1a1] mb-6">
              Returns the final result from the subagent after completing the delegated task.
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
                      <td className="py-3 px-4"><code className="text-[#d4a574]">result</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Final result message from the subagent</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><code className="text-[#d4a574]">usage</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">UsageStats?</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Token usage statistics (input_tokens, output_tokens, cache tokens)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><code className="text-[#d4a574]">total_cost_usd</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">number?</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Total cost in USD</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><code className="text-[#d4a574]">duration_ms</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">number?</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Execution duration in milliseconds</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* AskUserQuestionOutput */}
          <section>
            <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
              <code className="text-[#d4a574]">AskUserQuestionOutput</code>
            </h3>
            <p className="text-[#a1a1a1] mb-6">
              Returns the questions asked and the user&apos;s answers.
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
                      <td className="py-3 px-4"><code className="text-[#d4a574]">questions</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">Question[]</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">The questions that were asked</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><code className="text-[#d4a574]">answers</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">Record&lt;string, string&gt;</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Maps question text to answer string. Multi-select answers are comma-separated.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* BashOutput */}
          <section>
            <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
              <code className="text-[#d4a574]">BashOutput</code>
            </h3>
            <p className="text-[#a1a1a1] mb-6">
              Returns command output with exit status. Background commands return immediately with a shellId.
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
                      <td className="py-3 px-4"><code className="text-[#d4a574]">output</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Combined stdout and stderr output</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><code className="text-[#d4a574]">exitCode</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">number</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Exit code of the command</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><code className="text-[#d4a574]">killed</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">boolean?</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Whether the command was killed due to timeout</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><code className="text-[#d4a574]">shellId</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string?</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Shell ID for background processes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* BashOutputToolOutput */}
          <section>
            <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
              <code className="text-[#d4a574]">BashOutputToolOutput</code>
            </h3>
            <p className="text-[#a1a1a1] mb-6">
              Returns incremental output from background shells.
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
                      <td className="py-3 px-4"><code className="text-[#d4a574]">output</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">New output since last check</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><code className="text-[#d4a574]">status</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">&apos;running&apos; | &apos;completed&apos; | &apos;failed&apos;</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Current shell status</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><code className="text-[#d4a574]">exitCode</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">number?</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Exit code (when completed)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* EditOutput */}
          <section>
            <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
              <code className="text-[#d4a574]">EditOutput</code>
            </h3>
            <p className="text-[#a1a1a1] mb-6">
              Returns confirmation of successful edits with replacement count.
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
                      <td className="py-3 px-4"><code className="text-[#d4a574]">message</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Confirmation message</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><code className="text-[#d4a574]">replacements</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">number</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Number of replacements made</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><code className="text-[#d4a574]">file_path</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">File path that was edited</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ReadOutput */}
          <section>
            <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
              <code className="text-[#d4a574]">ReadOutput</code>
            </h3>
            <p className="text-[#a1a1a1] mb-6">
              Returns file contents in format appropriate to file type.
            </p>

            <div className="mb-4 p-4 bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl">
              <p className="text-xs text-[#737373] mb-3">Union type based on file type:</p>
              <pre className="text-sm font-mono text-[#a1a1a1] overflow-x-auto">
{`type ReadOutput =
  | TextFileOutput
  | ImageFileOutput
  | PDFFileOutput
  | NotebookFileOutput;`}
              </pre>
            </div>

            {/* TextFileOutput */}
            <div className="mb-4">
              <p className="text-sm font-medium text-[#fafafa] mb-3">TextFileOutput</p>
              <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#1f1f1f] bg-[#0d0d0d]">
                        <th className="text-left py-2 px-4 text-[#525252] font-medium text-xs">Property</th>
                        <th className="text-left py-2 px-4 text-[#525252] font-medium text-xs">Type</th>
                        <th className="text-left py-2 px-4 text-[#525252] font-medium text-xs">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1f1f1f]/30">
                      <tr>
                        <td className="py-2 px-4"><code className="text-[#d4a574] text-xs">content</code></td>
                        <td className="py-2 px-4 text-[#737373] font-mono text-xs">string</td>
                        <td className="py-2 px-4 text-[#737373] text-xs">File contents with line numbers</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4"><code className="text-[#d4a574] text-xs">total_lines</code></td>
                        <td className="py-2 px-4 text-[#737373] font-mono text-xs">number</td>
                        <td className="py-2 px-4 text-[#737373] text-xs">Total number of lines in file</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4"><code className="text-[#d4a574] text-xs">lines_returned</code></td>
                        <td className="py-2 px-4 text-[#737373] font-mono text-xs">number</td>
                        <td className="py-2 px-4 text-[#737373] text-xs">Lines actually returned</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* ImageFileOutput */}
            <div className="mb-4">
              <p className="text-sm font-medium text-[#fafafa] mb-3">ImageFileOutput</p>
              <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#1f1f1f] bg-[#0d0d0d]">
                        <th className="text-left py-2 px-4 text-[#525252] font-medium text-xs">Property</th>
                        <th className="text-left py-2 px-4 text-[#525252] font-medium text-xs">Type</th>
                        <th className="text-left py-2 px-4 text-[#525252] font-medium text-xs">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1f1f1f]/30">
                      <tr>
                        <td className="py-2 px-4"><code className="text-[#d4a574] text-xs">image</code></td>
                        <td className="py-2 px-4 text-[#737373] font-mono text-xs">string</td>
                        <td className="py-2 px-4 text-[#737373] text-xs">Base64 encoded image data</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4"><code className="text-[#d4a574] text-xs">mime_type</code></td>
                        <td className="py-2 px-4 text-[#737373] font-mono text-xs">string</td>
                        <td className="py-2 px-4 text-[#737373] text-xs">Image MIME type</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4"><code className="text-[#d4a574] text-xs">file_size</code></td>
                        <td className="py-2 px-4 text-[#737373] font-mono text-xs">number</td>
                        <td className="py-2 px-4 text-[#737373] text-xs">File size in bytes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* PDFFileOutput */}
            <div className="mb-4">
              <p className="text-sm font-medium text-[#fafafa] mb-3">PDFFileOutput</p>
              <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#1f1f1f] bg-[#0d0d0d]">
                        <th className="text-left py-2 px-4 text-[#525252] font-medium text-xs">Property</th>
                        <th className="text-left py-2 px-4 text-[#525252] font-medium text-xs">Type</th>
                        <th className="text-left py-2 px-4 text-[#525252] font-medium text-xs">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1f1f1f]/30">
                      <tr>
                        <td className="py-2 px-4"><code className="text-[#d4a574] text-xs">pages</code></td>
                        <td className="py-2 px-4 text-[#737373] font-mono text-xs">PageContent[]</td>
                        <td className="py-2 px-4 text-[#737373] text-xs">Array of page contents (page_number, text, images)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4"><code className="text-[#d4a574] text-xs">total_pages</code></td>
                        <td className="py-2 px-4 text-[#737373] font-mono text-xs">number</td>
                        <td className="py-2 px-4 text-[#737373] text-xs">Total number of pages</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* NotebookFileOutput */}
            <div>
              <p className="text-sm font-medium text-[#fafafa] mb-3">NotebookFileOutput</p>
              <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#1f1f1f] bg-[#0d0d0d]">
                        <th className="text-left py-2 px-4 text-[#525252] font-medium text-xs">Property</th>
                        <th className="text-left py-2 px-4 text-[#525252] font-medium text-xs">Type</th>
                        <th className="text-left py-2 px-4 text-[#525252] font-medium text-xs">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1f1f1f]/30">
                      <tr>
                        <td className="py-2 px-4"><code className="text-[#d4a574] text-xs">cells</code></td>
                        <td className="py-2 px-4 text-[#737373] font-mono text-xs">Cell[]</td>
                        <td className="py-2 px-4 text-[#737373] text-xs">Jupyter notebook cells (cell_type, source, outputs, execution_count)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4"><code className="text-[#d4a574] text-xs">metadata</code></td>
                        <td className="py-2 px-4 text-[#737373] font-mono text-xs">Record?</td>
                        <td className="py-2 px-4 text-[#737373] text-xs">Notebook metadata</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* WriteOutput */}
          <section>
            <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
              <code className="text-[#d4a574]">WriteOutput</code>
            </h3>
            <p className="text-[#a1a1a1] mb-6">
              Returns confirmation after successfully writing the file.
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
                      <td className="py-3 px-4"><code className="text-[#d4a574]">message</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Success message</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><code className="text-[#d4a574]">bytes_written</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">number</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Number of bytes written</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><code className="text-[#d4a574]">file_path</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">File path that was written</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* GlobOutput */}
          <section>
            <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
              <code className="text-[#d4a574]">GlobOutput</code>
            </h3>
            <p className="text-[#a1a1a1] mb-6">
              Returns file paths matching the glob pattern, sorted by modification time.
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
                      <td className="py-3 px-4"><code className="text-[#d4a574]">matches</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string[]</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Array of matching file paths</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><code className="text-[#d4a574]">count</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">number</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Number of matches found</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><code className="text-[#d4a574]">search_path</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Search directory used</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* GrepOutput */}
          <section>
            <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
              <code className="text-[#d4a574]">GrepOutput</code>
            </h3>
            <p className="text-[#a1a1a1] mb-6">
              Returns search results in the format specified by output_mode.
            </p>

            <div className="mb-4 p-4 bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl">
              <p className="text-xs text-[#737373] mb-3">Union type based on output_mode:</p>
              <pre className="text-sm font-mono text-[#a1a1a1] overflow-x-auto">
{`type GrepOutput =
  | GrepContentOutput
  | GrepFilesOutput
  | GrepCountOutput;`}
              </pre>
            </div>

            {/* GrepContentOutput */}
            <div className="mb-4">
              <p className="text-sm font-medium text-[#fafafa] mb-3">GrepContentOutput <span className="text-xs text-[#525252] font-normal">(output_mode: &quot;content&quot;)</span></p>
              <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#1f1f1f] bg-[#0d0d0d]">
                        <th className="text-left py-2 px-4 text-[#525252] font-medium text-xs">Property</th>
                        <th className="text-left py-2 px-4 text-[#525252] font-medium text-xs">Type</th>
                        <th className="text-left py-2 px-4 text-[#525252] font-medium text-xs">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1f1f1f]/30">
                      <tr>
                        <td className="py-2 px-4"><code className="text-[#d4a574] text-xs">matches</code></td>
                        <td className="py-2 px-4 text-[#737373] font-mono text-xs">Match[]</td>
                        <td className="py-2 px-4 text-[#737373] text-xs">Matching lines with context (file, line_number, line, before/after_context)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4"><code className="text-[#d4a574] text-xs">total_matches</code></td>
                        <td className="py-2 px-4 text-[#737373] font-mono text-xs">number</td>
                        <td className="py-2 px-4 text-[#737373] text-xs">Total number of matches</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* GrepFilesOutput */}
            <div className="mb-4">
              <p className="text-sm font-medium text-[#fafafa] mb-3">GrepFilesOutput <span className="text-xs text-[#525252] font-normal">(output_mode: &quot;files_with_matches&quot;)</span></p>
              <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#1f1f1f] bg-[#0d0d0d]">
                        <th className="text-left py-2 px-4 text-[#525252] font-medium text-xs">Property</th>
                        <th className="text-left py-2 px-4 text-[#525252] font-medium text-xs">Type</th>
                        <th className="text-left py-2 px-4 text-[#525252] font-medium text-xs">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1f1f1f]/30">
                      <tr>
                        <td className="py-2 px-4"><code className="text-[#d4a574] text-xs">files</code></td>
                        <td className="py-2 px-4 text-[#737373] font-mono text-xs">string[]</td>
                        <td className="py-2 px-4 text-[#737373] text-xs">Files containing matches</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4"><code className="text-[#d4a574] text-xs">count</code></td>
                        <td className="py-2 px-4 text-[#737373] font-mono text-xs">number</td>
                        <td className="py-2 px-4 text-[#737373] text-xs">Number of files with matches</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* GrepCountOutput */}
            <div>
              <p className="text-sm font-medium text-[#fafafa] mb-3">GrepCountOutput <span className="text-xs text-[#525252] font-normal">(output_mode: &quot;count&quot;)</span></p>
              <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#1f1f1f] bg-[#0d0d0d]">
                        <th className="text-left py-2 px-4 text-[#525252] font-medium text-xs">Property</th>
                        <th className="text-left py-2 px-4 text-[#525252] font-medium text-xs">Type</th>
                        <th className="text-left py-2 px-4 text-[#525252] font-medium text-xs">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1f1f1f]/30">
                      <tr>
                        <td className="py-2 px-4"><code className="text-[#d4a574] text-xs">counts</code></td>
                        <td className="py-2 px-4 text-[#737373] font-mono text-xs">FileCount[]</td>
                        <td className="py-2 px-4 text-[#737373] text-xs">Match counts per file (file, count)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4"><code className="text-[#d4a574] text-xs">total</code></td>
                        <td className="py-2 px-4 text-[#737373] font-mono text-xs">number</td>
                        <td className="py-2 px-4 text-[#737373] text-xs">Total matches across all files</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* KillBashOutput */}
          <section>
            <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
              <code className="text-[#d4a574]">KillBashOutput</code>
            </h3>
            <p className="text-[#a1a1a1] mb-6">
              Returns confirmation after terminating the background shell.
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
                      <td className="py-3 px-4"><code className="text-[#d4a574]">message</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Success message</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><code className="text-[#d4a574]">shell_id</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">ID of the killed shell</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* NotebookEditOutput */}
          <section>
            <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
              <code className="text-[#d4a574]">NotebookEditOutput</code>
            </h3>
            <p className="text-[#a1a1a1] mb-6">
              Returns confirmation after modifying the Jupyter notebook.
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
                      <td className="py-3 px-4"><code className="text-[#d4a574]">message</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Success message</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><code className="text-[#d4a574]">edit_type</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs whitespace-nowrap">&apos;replaced&apos; | &apos;inserted&apos; | &apos;deleted&apos;</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Type of edit performed</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><code className="text-[#d4a574]">cell_id</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string?</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Cell ID that was affected</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><code className="text-[#d4a574]">total_cells</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">number</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Total cells in notebook after edit</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* WebFetchOutput */}
          <section>
            <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
              <code className="text-[#d4a574]">WebFetchOutput</code>
            </h3>
            <p className="text-[#a1a1a1] mb-6">
              Returns the AI&apos;s analysis of the fetched web content.
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
                      <td className="py-3 px-4"><code className="text-[#d4a574]">response</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">AI model&apos;s response to the prompt</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><code className="text-[#d4a574]">url</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">URL that was fetched</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><code className="text-[#d4a574]">final_url</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string?</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Final URL after redirects</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><code className="text-[#d4a574]">status_code</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">number?</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">HTTP status code</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* WebSearchOutput */}
          <section>
            <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
              <code className="text-[#d4a574]">WebSearchOutput</code>
            </h3>
            <p className="text-[#a1a1a1] mb-6">
              Returns web search results with titles, URLs, and snippets.
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
                      <td className="py-3 px-4"><code className="text-[#d4a574]">results</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">SearchResult[]</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Search results (title, url, snippet, metadata)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><code className="text-[#d4a574]">total_results</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">number</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">Total number of results</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><code className="text-[#d4a574]">query</code></td>
                      <td className="py-3 px-4 text-[#a1a1a1] font-mono text-xs">string</td>
                      <td className="py-3 px-4 text-[#a1a1a1]">The query that was searched</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>

      <ChapterNavigation currentChapterId="tools" />
    </LearnLayout>
  );
}
