"use client";

import { LearnLayout, ChapterNavigation, CodeBlock } from "../components";

export default function ClaudeCodeFeatures() {
  return (
    <LearnLayout>
      <div className="mb-12">
        <p className="text-sm text-[#d4a574] font-medium mb-2">Chapter 6</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Claude Code Features
        </h1>
        <p className="text-lg text-[#a1a1a1] max-w-2xl">
          The SDK also supports Claude Code&apos;s filesystem-based configuration. To use these features, enable project settings:
        </p>
      </div>

      {/* Enable code block */}
      <div className="mb-10">
        <CodeBlock filename="enable-features.ts">
          <span className="text-[#c586c0]">const</span>
          <span className="text-[#9cdcfe]"> options</span>
          <span className="text-[#fafafa]"> = {"{ "}</span>
          <span className="text-[#9cdcfe]">settingSources</span>
          <span className="text-[#fafafa]">: [</span>
          <span className="text-[#ce9178]">&apos;project&apos;</span>
          <span className="text-[#fafafa]">] {"}"};</span>
        </CodeBlock>
      </div>

      {/* Features grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Skills */}
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4a574]/20 to-[#b8845f]/10 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-[#d4a574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Skills</h3>
              <p className="text-sm text-[#a1a1a1] mb-3">
                Specialized capabilities defined in Markdown. Teach your agent domain-specific workflows.
              </p>
              <code className="text-xs text-[#d4a574] bg-[#d4a574]/10 px-2 py-1 rounded">
                .claude/skills/SKILL.md
              </code>
            </div>
          </div>
        </div>

        {/* Slash Commands */}
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4a574]/20 to-[#b8845f]/10 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-[#d4a574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Slash Commands</h3>
              <p className="text-sm text-[#a1a1a1] mb-3">
                Custom commands for common tasks. Define reusable prompts your team can invoke.
              </p>
              <code className="text-xs text-[#d4a574] bg-[#d4a574]/10 px-2 py-1 rounded">
                .claude/commands/*.md
              </code>
            </div>
          </div>
        </div>

        {/* Memory */}
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4a574]/20 to-[#b8845f]/10 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-[#d4a574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Memory</h3>
              <p className="text-sm text-[#a1a1a1] mb-3">
                Project context and instructions. Give your agent persistent knowledge about your codebase.
              </p>
              <code className="text-xs text-[#d4a574] bg-[#d4a574]/10 px-2 py-1 rounded">
                CLAUDE.md
              </code>
              <span className="text-xs text-[#525252] mx-2">or</span>
              <code className="text-xs text-[#d4a574] bg-[#d4a574]/10 px-2 py-1 rounded">
                .claude/CLAUDE.md
              </code>
            </div>
          </div>
        </div>

        {/* Plugins */}
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4a574]/20 to-[#b8845f]/10 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-[#d4a574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.959.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Plugins</h3>
              <p className="text-sm text-[#a1a1a1] mb-3">
                Extend with custom commands, agents, and MCP servers. Full programmatic control.
              </p>
              <code className="text-xs text-[#d4a574] bg-[#d4a574]/10 px-2 py-1 rounded">
                plugins option
              </code>
            </div>
          </div>
        </div>
      </div>

      <ChapterNavigation currentChapterId="claude-code-features" />
    </LearnLayout>
  );
}
