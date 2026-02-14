"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import dynamic from "next/dynamic";

const AgentChat = dynamic(() => import("@/app/components/agents/AgentChat"), {
  ssr: false,
});

const DocumentEditor = dynamic(() => import("@/app/components/agents/DocumentEditor"), {
  ssr: false,
});

const AGENT_ICON = "M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5";

const INFO_ICON = "M11.25 11.25l.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z";

const ABOUT_SECTIONS = [
  {
    title: "What it does",
    content:
      "Origin is a dedicated agent builder that helps you design, spec out, and iterate on AI agents. Chat on the left to discuss ideas, and build the Agent Spec document on the right — a structured blueprint for your agent's system prompt, tools, architecture, and guardrails.",
  },
  {
    title: "How a session works",
    items: [
      "Describe the agent you want to build — its purpose, target audience, and key behaviors.",
      "Origin asks clarifying questions, then writes an initial Agent Spec to the document panel.",
      "Iterate together — edit the spec directly or ask Origin to refine sections through chat.",
      "Origin researches SDK patterns, reviews your codebase, and suggests best practices.",
      "The spec is saved to Supabase automatically — pick up where you left off anytime.",
    ],
  },
  {
    title: "What you can build",
    items: [
      "Customer support agents with FAQ handling and escalation logic",
      "Lead qualification agents that ask the right questions",
      "Content creation agents tuned to your brand voice",
      "Internal workflow agents for onboarding, reporting, or data lookup",
      "Specialized agents with custom tool access and guardrails",
    ],
  },
  {
    title: "Agent architecture",
    subsections: [
      {
        label: "Runtime",
        detail: "Each request runs in an ephemeral E2B sandbox — fully isolated, no persistent server state. The sandbox spins up, executes, and tears down automatically.",
      },
      {
        label: "Streaming",
        detail: "Responses stream in real time via Server-Sent Events (SSE). You see output as it's generated, including status updates for tool usage.",
      },
      {
        label: "Document Sync",
        detail: "When Origin writes to draft.md, the Agent Spec panel updates in real time. You can also edit it directly — Origin sees your changes on the next message.",
      },
    ],
  },
  {
    title: "Core tools",
    subsections: [
      {
        label: "Write",
        detail: "Writes the Agent Spec document (draft.md). Every update replaces the full document so the spec stays in sync.",
      },
      {
        label: "Read / Glob / Grep",
        detail: "Reads files, finds files by pattern, and searches code — reviews your existing agents and codebase for context.",
      },
      {
        label: "WebSearch / WebFetch",
        detail: "Searches the web for SDK documentation, agent patterns, and market research.",
      },
      {
        label: "AskUserQuestion",
        detail: "Asks structured clarifying questions with multiple-choice options to nail down requirements before building.",
      },
    ],
  },
  {
    title: "Specialist subagents",
    subsections: [
      {
        label: "SDK Researcher",
        detail: "Deep dives into Claude Agents SDK documentation to find the right patterns, tools, and configurations for your agent.",
      },
      {
        label: "Architect",
        detail: "Reviews agent designs for scalability, tool selection, security, and SDK fit. Catches issues before you build.",
      },
      {
        label: "Market Researcher",
        detail: "Researches demand signals across Reddit, X, Product Hunt, and Hacker News to validate agent ideas.",
      },
    ],
  },
  {
    title: "Tech stack",
    items: [
      "API route: Next.js App Router (POST /api/agents/origin)",
      "LLM: Claude via Anthropic API",
      "Execution: E2B ephemeral sandbox",
      "Agent SDK: @anthropic-ai/claude-agent-sdk",
      "Frontend: React with dynamic import, SSE streaming",
      "Chat UI: AgentChat + DocumentEditor with Supabase persistence",
    ],
  },
];

interface StepCreateAgentProps {
  onComplete: () => void;
  isComplete: boolean;
}

interface AgentInfo {
  id: string;
  name: string;
  status: string;
}

const MARKET_RESEARCH_PROMPT =
  "Research market demand for AI agents across Reddit, X, Product Hunt, and Hacker News. Find real pain points people are expressing, then suggest 3-5 agent ideas I could build with the Claude Agents SDK — ranked by demand evidence and revenue potential.";

interface AgentIdea {
  id: string;
  text: string;
  created_at: string;
}

export default function StepCreateAgent({ onComplete, isComplete }: StepCreateAgentProps) {
  const [showChat, setShowChat] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [autoStartPrompt, setAutoStartPrompt] = useState<string | undefined>(undefined);
  const headerPortalRef = useRef<HTMLDivElement | null>(null);
  const [documentContent, setDocumentContent] = useState("");
  const [showDocument, setShowDocument] = useState(false);
  const [isAgentWriting, setIsAgentWriting] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [agents, setAgents] = useState<AgentInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [ideas, setIdeas] = useState<AgentIdea[]>([]);
  const [newIdea, setNewIdea] = useState("");
  const [showIdeas, setShowIdeas] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    loadAgents();
    loadIdeas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadIdeas = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("agent_ideas")
        .select("id, text, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (data) setIdeas(data);
    } catch {
      // table may not exist yet
    }
  };

  const addIdea = async () => {
    const text = newIdea.trim();
    if (!text) return;
    setNewIdea("");
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("agent_ideas")
        .insert({ user_id: user.id, text })
        .select("id, text, created_at")
        .single();
      if (data) setIdeas((prev) => [data, ...prev]);
    } catch {
      // handle silently
    }
  };

  const removeIdea = async (id: string) => {
    setIdeas((prev) => prev.filter((i) => i.id !== id));
    try {
      await supabase.from("agent_ideas").delete().eq("id", id);
    } catch {
      // handle silently
    }
  };

  const loadAgents = async () => {
    try {
      const { data } = await supabase
        .from("agents")
        .select("id, name, status")
        .order("created_at", { ascending: false })
        .limit(5);
      setAgents(data || []);
    } catch {
      // Table may not exist yet — that's fine
    } finally {
      setLoading(false);
    }
  };

  // Load document from Supabase when session changes
  const loadDocument = useCallback(async (sessionId: string) => {
    try {
      const { data } = await supabase
        .from("agent_documents")
        .select("content")
        .eq("session_id", sessionId)
        .single();
      if (data) {
        setDocumentContent(data.content || "");
        if (data.content) setShowDocument(true);
      } else {
        setDocumentContent("");
      }
    } catch {
      setDocumentContent("");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debounced save to Supabase
  const saveDocument = useCallback(async (sessionId: string, content: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      await supabase
        .from("agent_documents")
        .upsert(
          { user_id: user.id, session_id: sessionId, agent_id: "origin", content, updated_at: new Date().toISOString() },
          { onConflict: "user_id,session_id" }
        );
    } catch {
      // Silent fail
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When session changes, load its document
  const handleSessionChange = useCallback((sessionId: string | null) => {
    setCurrentSessionId(sessionId);
    if (sessionId) {
      loadDocument(sessionId);
    } else {
      setDocumentContent("");
    }
  }, [loadDocument]);

  // Auto-save document on changes (debounced 1s)
  useEffect(() => {
    if (!currentSessionId || !documentContent) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      saveDocument(currentSessionId, documentContent);
    }, 1000);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [documentContent, currentSessionId, saveDocument]);

  return (
    <div>
      {/* Description */}
      <p className="text-sm text-[#666] mb-4 leading-relaxed">
        Don&apos;t guess what to build — let Ray research real market demand across Reddit, X, and
        Product Hunt, then suggest agent ideas backed by evidence. All agents are built with the Claude Agents SDK.
      </p>

      {/* Ideas backlog */}
      <div className="mb-4">
        <button
          onClick={() => setShowIdeas(!showIdeas)}
          className="flex items-center gap-2 text-xs font-semibold text-[#6B8F71] uppercase tracking-wider mb-2 hover:text-[#5A7D60] transition-colors"
        >
          <svg className={`w-3 h-3 transition-transform ${showIdeas ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          Ideas Backlog{ideas.length > 0 && ` (${ideas.length})`}
        </button>

        {showIdeas && (
          <div className="space-y-2">
            {/* Add idea input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newIdea}
                onChange={(e) => setNewIdea(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addIdea()}
                placeholder="Quick agent idea..."
                className="flex-1 px-3 py-2 rounded-lg border border-[#E8E6E1] bg-white text-sm text-[#1C1C1C] placeholder:text-[#999] focus:outline-none focus:border-[#6B8F71]/50 focus:ring-1 focus:ring-[#6B8F71]/20"
              />
              <button
                onClick={addIdea}
                disabled={!newIdea.trim()}
                className="px-3 py-2 rounded-lg bg-[#6B8F71] text-white text-sm font-medium hover:bg-[#5A7D60] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>

            {/* Ideas list */}
            {ideas.length === 0 && (
              <p className="text-xs text-[#999] py-2">No ideas yet — jot one down above.</p>
            )}
            {ideas.map((idea) => (
              <div
                key={idea.id}
                className="group flex items-start gap-2 px-3 py-2 rounded-lg bg-[#FAFAF8] border border-[#E8E6E1] hover:border-[#6B8F71]/30 transition-colors"
              >
                <svg className="w-3 h-3 text-[#6B8F71] shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#1C1C1C] leading-snug">{idea.text}</p>
                  <p className="text-[10px] text-[#999] mt-0.5">{new Date(idea.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                </div>
                <button
                  onClick={() => removeIdea(idea.id)}
                  className="opacity-0 group-hover:opacity-100 shrink-0 p-0.5 text-[#999] hover:text-red-500 transition-all"
                  title="Remove idea"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent agents */}
      {!loading && agents.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-semibold text-[#6B8F71] uppercase tracking-wider mb-2">
            Recent Agents
          </p>
          <div className="flex flex-wrap gap-2">
            {agents.map((agent) => (
              <span
                key={agent.id}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAFAF8] border border-[#E8E6E1] text-xs text-[#555]"
              >
                <svg className="w-3 h-3 text-[#6B8F71]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={AGENT_ICON} />
                </svg>
                {agent.name}
                <span className={`w-1.5 h-1.5 rounded-full ${agent.status === "active" ? "bg-[#6B8F71]" : "bg-[#999]"}`} />
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Open Agent Builder button */}
      <button
        onClick={() => {
          setAutoStartPrompt(undefined);
          setShowChat(true);
        }}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#6B8F71]/30 bg-[#6B8F71]/5 text-[#6B8F71] text-sm font-medium hover:bg-[#6B8F71]/10 hover:border-[#6B8F71]/50 transition-colors duration-200"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d={AGENT_ICON} />
        </svg>
        Open Agent Builder
      </button>

      {/* Full-screen agent chat overlay */}
      {showChat && (
        <div className="fixed inset-0 z-50 bg-[#FAFAF8] flex flex-col">
          {/* Header bar */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[#E8E6E1] bg-white shrink-0">
            <button
              onClick={() => { setShowChat(false); setAutoStartPrompt(undefined); }}
              className="flex items-center gap-1.5 text-sm text-[#666] hover:text-[#1C1C1C] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <div className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-[#6B8F71] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={AGENT_ICON} />
              </svg>
              <span className="text-sm font-medium text-[#1C1C1C] truncate">
                Origin — Agent Builder
              </span>
            </div>
            {/* Portal target for AgentChat header controls */}
            <div ref={headerPortalRef} className="ml-auto" />
            {/* Document toggle */}
            <button
              onClick={() => setShowDocument(!showDocument)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                showDocument
                  ? "bg-[#6B8F71] text-white"
                  : "bg-[#F5F4F0] text-[#666] hover:bg-[#ECEAE5] hover:text-[#1C1C1C]"
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              Agent Spec
              {documentContent && (
                <span className={`w-1.5 h-1.5 rounded-full ${isAgentWriting ? "bg-white animate-pulse" : "bg-white/60"}`} />
              )}
            </button>
            {/* About toggle */}
            <button
              onClick={() => setShowAbout(!showAbout)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                showAbout
                  ? "bg-[#6B8F71] text-white"
                  : "bg-[#F5F4F0] text-[#666] hover:bg-[#ECEAE5] hover:text-[#1C1C1C]"
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={INFO_ICON} />
              </svg>
              About
            </button>
          </div>

          {/* Main content area — chat + optional shelf */}
          <div className="flex-1 flex min-h-0 overflow-hidden">
            {/* Chat area */}
            <div className={`flex flex-col min-h-0 min-w-0 overflow-hidden px-4 ${showDocument ? "w-1/2" : "flex-1"}`}>
              <AgentChat
                agentId="origin"
                apiEndpoint="/api/agents/origin"
                storageKey="origin-builder-sessions"
                placeholder="Describe the agent you want to build..."
                emptyStateTitle="Origin — Agent Builder"
                emptyStateDescription="I'll help you design and spec out AI agents. We'll build the spec together in the document panel. Start with an idea or let me research what to build."
                loadingText="Thinking..."
                agentIcon={AGENT_ICON}
                agentName="Origin"
                variant="full"
                headerPortalRef={headerPortalRef}
                initialPrompt={autoStartPrompt}
                starterPrompts={[
                  "Interview me — help me figure out the best agent to build for my business",
                  "I already have an idea — help me design and spec it out",
                  "Research market demand for AI agents and suggest what to build",
                ]}
                documentContent={documentContent}
                onDocumentUpdate={(content) => {
                  setDocumentContent(content);
                  setIsAgentWriting(true);
                  if (!showDocument) setShowDocument(true);
                  setTimeout(() => setIsAgentWriting(false), 1500);
                }}
                onSessionChange={handleSessionChange}
              />
            </div>

            {/* Document editor panel */}
            {showDocument && (
              <div className="w-1/2 flex flex-col min-h-0 min-w-0 overflow-hidden pr-4 py-4">
                <DocumentEditor
                  content={documentContent}
                  onChange={setDocumentContent}
                  isAgentWriting={isAgentWriting}
                />
              </div>
            )}

            {/* About shelf — slides in from right */}
            <div
              className={`shrink-0 border-l border-[#E8E6E1] bg-white overflow-y-auto transition-all duration-300 ease-in-out ${
                showAbout ? "w-[380px] opacity-100" : "w-0 opacity-0 border-l-0"
              }`}
            >
              <div className="w-[380px] p-5">
                {/* Shelf header */}
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#E8E6E1]">
                  <div className="w-10 h-10 rounded-xl bg-[#6B8F71]/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#6B8F71]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={AGENT_ICON} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#1C1C1C]">Origin</h3>
                    <p className="text-[11px] text-[#999]">Agent Builder</p>
                  </div>
                </div>

                {/* Sections */}
                <div className="space-y-5">
                  {ABOUT_SECTIONS.map((section) => (
                    <div key={section.title}>
                      <h4 className="text-[10px] font-semibold text-[#6B8F71] uppercase tracking-[0.15em] mb-2">
                        {section.title}
                      </h4>

                      {/* Plain text content */}
                      {section.content && (
                        <p className="text-[13px] text-[#555] leading-relaxed">
                          {section.content}
                        </p>
                      )}

                      {/* Bulleted items */}
                      {section.items && (
                        <ul className="space-y-1.5">
                          {section.items.map((item, i) => (
                            <li key={i} className="flex gap-2 text-[13px] text-[#555] leading-relaxed">
                              <span className="text-[#6B8F71] shrink-0 mt-1.5">
                                <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 8 8">
                                  <circle cx="4" cy="4" r="3" />
                                </svg>
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Labeled subsections (tools, architecture) */}
                      {section.subsections && (
                        <div className="space-y-2.5">
                          {section.subsections.map((sub) => (
                            <div key={sub.label} className="p-2.5 rounded-lg bg-[#FAFAF8] border border-[#E8E6E1]">
                              <span className="text-xs font-semibold text-[#1C1C1C]">{sub.label}</span>
                              <p className="text-[12px] text-[#666] leading-relaxed mt-0.5">{sub.detail}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mark complete / undo */}
      {!isComplete && (
        <button
          onClick={onComplete}
          className="mt-3 w-full px-4 py-2.5 rounded-lg bg-[#6B8F71] text-white text-sm font-medium hover:bg-[#5A7D60] transition-colors duration-200"
        >
          Mark Agent Work Complete
        </button>
      )}

      {isComplete && (
        <button
          onClick={onComplete}
          className="mt-3 w-full py-2.5 text-center rounded-lg bg-[#6B8F71]/5 hover:bg-[#6B8F71]/10 transition-colors"
        >
          <p className="text-sm text-[#6B8F71] font-medium">Agent work complete! (click to undo)</p>
        </button>
      )}
    </div>
  );
}
