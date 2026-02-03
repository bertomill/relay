"use client";

import Link from "next/link";

const agents = [
  {
    id: "ray",
    name: "Ray",
    description: "Your first agent - a helpful assistant ready to tackle various tasks",
    status: "active",
  },
];

export default function Agents() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa] relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#d4a574] opacity-[0.07] blur-[120px] rounded-full" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#b8845f] opacity-[0.05] blur-[100px] rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="#141414"/>
                <circle cx="10.5" cy="11" r="3.5" fill="#d4a574"/>
                <circle cx="21.5" cy="21" r="3.5" fill="#d4a574"/>
                <path d="M13 13.5L19 18.5" stroke="#d4a574" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="21.5" cy="11" r="2" fill="#d4a574" fillOpacity="0.4"/>
                <circle cx="10.5" cy="21" r="2" fill="#d4a574" fillOpacity="0.4"/>
              </svg>
              <span className="text-xl font-semibold tracking-tight">HeadRoom AI</span>
            </Link>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/learn"
              className="text-[#a1a1a1] hover:text-[#d4a574] transition-colors"
            >
              Learn
            </Link>
            <Link
              href="/agents"
              className="text-[#d4a574] transition-colors"
            >
              Agents
            </Link>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Agents
            </h1>
            <p className="text-[#a1a1a1] max-w-2xl">
              Explore and interact with AI agents built on the Claude Agents SDK.
            </p>
          </div>

          {/* Agent cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {agents.map((agent) => (
              <Link
                key={agent.id}
                href={`/agents/${agent.id}`}
                className="group bg-[#111111] border border-[#1f1f1f] rounded-xl p-6 hover:border-[#d4a574]/50 transition-all hover:shadow-lg hover:shadow-[#d4a574]/5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4a574]/20 to-[#b8845f]/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#d4a574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                    </svg>
                  </div>
                  {agent.status === "active" && (
                    <span className="flex items-center gap-1.5 text-xs text-[#737373]">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                      Active
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-[#d4a574] transition-colors">
                  {agent.name}
                </h3>
                <p className="text-sm text-[#737373]">
                  {agent.description}
                </p>
              </Link>
            ))}

            {/* Add new agent card */}
            <div className="bg-[#0d0d0d] border border-dashed border-[#262626] rounded-xl p-6 flex flex-col items-center justify-center text-center min-h-[180px] hover:border-[#404040] transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-[#525252]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
              <p className="text-sm text-[#525252]">Add new agent</p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="pt-12 text-[#404040] text-xs">
          <p>&copy; 2025 HeadRoom AI</p>
        </footer>
      </div>
    </div>
  );
}
