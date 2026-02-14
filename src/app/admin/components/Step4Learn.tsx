"use client";

import { useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";

const AgentChat = dynamic(() => import("@/app/components/agents/AgentChat"), {
  ssr: false,
});

const LEARN_ICON = "M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5";

const INFO_ICON = "M11.25 11.25l.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z";

const ABOUT_SECTIONS = [
  {
    title: "What it does",
    content:
      "The SDK Tutor is an AI-powered quiz agent that tests your knowledge of the Claude Agents SDK. Each session, it researches the latest official documentation in real time, then delivers 5 interactive multiple-choice questions with instant feedback after every answer.",
  },
  {
    title: "How a session works",
    items: [
      "You click \"Start today's quiz\" and the agent begins by searching the web for the latest Claude Agents SDK docs.",
      "It reads the relevant documentation pages to build an up-to-date question bank.",
      "Questions are delivered one at a time — each with 4 options (A, B, C, D).",
      "After each answer you get immediate feedback: whether you were right, a brief explanation, and a practical tip.",
      "After question 5, you receive your final score and a summary of what to review.",
    ],
  },
  {
    title: "Question design",
    items: [
      "5 questions per session, delivered sequentially",
      "Difficulty mix: 2 easy, 2 medium, 1 hard",
      "Topics: tools, streaming, sessions, permissions, system prompts, error handling, subagents",
      "Each question includes a short teaching context before the options",
    ],
  },
  {
    title: "Agent architecture",
    subsections: [
      {
        label: "Runtime",
        detail: "Runs in a Vercel ephemeral sandbox — each request is isolated with no persistent server state.",
      },
      {
        label: "Streaming",
        detail: "Responses are delivered via Server-Sent Events (SSE) so you see output in real time.",
      },
      {
        label: "Memory",
        detail: "Conversation history is passed in full with each request. The agent picks up exactly where you left off without re-researching.",
      },
    ],
  },
  {
    title: "Tools",
    subsections: [
      {
        label: "WebSearch",
        detail: "Searches the web for the latest Claude Agents SDK documentation and release notes.",
      },
      {
        label: "WebFetch",
        detail: "Fetches and reads full documentation pages to extract accurate, up-to-date content for questions.",
      },
      {
        label: "AskUserQuestion",
        detail: "Delivers each quiz question as an interactive multiple-choice prompt with structured options.",
      },
    ],
  },
  {
    title: "Tech stack",
    items: [
      "API route: Next.js App Router (POST /api/agents/sdk-tutor)",
      "LLM: Claude via Anthropic API",
      "Execution: Vercel Sandbox (runAgentInSandbox)",
      "Frontend: React with dynamic import (no SSR)",
      "Chat UI: AgentChat component with SSE streaming",
    ],
  },
];

interface Step4LearnProps {
  onComplete: () => void;
  isComplete: boolean;
}

const MIN_SHELF_WIDTH = 240;
const MAX_SHELF_WIDTH = 600;
const DEFAULT_SHELF_WIDTH = 380;

export default function Step4Learn({ onComplete, isComplete }: Step4LearnProps) {
  const [showChat, setShowChat] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [shelfWidth, setShelfWidth] = useState(DEFAULT_SHELF_WIDTH);
  const isDragging = useRef(false);
  const headerPortalRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    const startX = e.clientX;
    const startWidth = shelfWidth;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      // Dragging left increases width, dragging right decreases
      const delta = startX - e.clientX;
      const newWidth = Math.min(MAX_SHELF_WIDTH, Math.max(MIN_SHELF_WIDTH, startWidth + delta));
      setShelfWidth(newWidth);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, [shelfWidth]);

  return (
    <div>
      {/* Description */}
      <p className="text-sm text-[#666] mb-4 leading-relaxed">
        Test your knowledge of the Claude Agents SDK with an AI-powered quiz. The tutor
        researches the latest docs, then asks 5 interactive questions — with instant
        feedback and practical tips after each answer.
      </p>

      {/* Start Quiz button */}
      <button
        onClick={() => setShowChat(true)}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#6B8F71]/30 bg-[#6B8F71]/5 text-[#6B8F71] text-sm font-medium hover:bg-[#6B8F71]/10 hover:border-[#6B8F71]/50 transition-colors duration-200"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d={LEARN_ICON} />
        </svg>
        Start SDK Quiz
      </button>

      {/* Full-screen agent chat overlay */}
      {showChat && (
        <div className="fixed inset-0 z-50 bg-[#FAFAF8] flex flex-col">
          {/* Header bar */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[#E8E6E1] bg-white shrink-0">
            <button
              onClick={() => setShowChat(false)}
              className="flex items-center gap-1.5 text-sm text-[#666] hover:text-[#1C1C1C] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <div className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-[#6B8F71] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={LEARN_ICON} />
              </svg>
              <span className="text-sm font-medium text-[#1C1C1C] truncate">
                SDK Tutor
              </span>
            </div>
            {/* Portal target for AgentChat header controls */}
            <div ref={headerPortalRef} className="ml-auto" />
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
            <div className="flex-1 flex flex-col min-h-0 min-w-0 overflow-hidden px-4">
              <AgentChat
                agentId="sdk-tutor"
                apiEndpoint="/api/agents/sdk-tutor"
                storageKey="sdk-tutor-sessions"
                placeholder="Ask about the Claude Agents SDK..."
                emptyStateTitle="Claude Agents SDK Quiz"
                emptyStateDescription="I'll research the latest SDK docs, then quiz you with 5 interactive questions. Ready?"
                loadingText="Researching..."
                agentIcon={LEARN_ICON}
                agentName="SDK Tutor"
                variant="full"
                headerPortalRef={headerPortalRef}
                starterPrompts={[
                  "Start today's quiz",
                  "Quiz me on advanced topics",
                  "What's new in the SDK?",
                ]}
              />
            </div>

            {/* About shelf — slides in from right, draggable */}
            <div
              className={`shrink-0 bg-white overflow-hidden transition-all duration-300 ease-in-out ${
                showAbout ? "opacity-100" : "opacity-0 border-l-0"
              }`}
              style={{ width: showAbout ? shelfWidth : 0 }}
            >
              <div className="relative h-full flex">
                {/* Drag handle */}
                <div
                  onMouseDown={handleMouseDown}
                  className="absolute left-0 top-0 bottom-0 w-1 cursor-col-resize z-10 group"
                >
                  <div className="absolute inset-y-0 -left-1 w-3" />
                  <div className="h-full w-px bg-[#E8E6E1] group-hover:bg-[#6B8F71] group-active:bg-[#6B8F71] transition-colors" />
                </div>
              <div className="flex-1 overflow-y-auto p-5 pl-3">
                {/* Shelf header */}
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#E8E6E1]">
                  <div className="w-10 h-10 rounded-xl bg-[#6B8F71]/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#6B8F71]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={LEARN_ICON} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#1C1C1C]">SDK Tutor</h3>
                    <p className="text-[11px] text-[#999]">Interactive quiz agent</p>
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
        </div>
      )}

      {/* Mark complete / undo */}
      {!isComplete && (
        <button
          onClick={onComplete}
          className="mt-3 w-full px-4 py-2.5 rounded-lg bg-[#6B8F71] text-white text-sm font-medium hover:bg-[#5A7D60] transition-colors duration-200"
        >
          Mark Learning Complete
        </button>
      )}

      {isComplete && (
        <button
          onClick={onComplete}
          className="mt-3 w-full py-2.5 text-center rounded-lg bg-[#6B8F71]/5 hover:bg-[#6B8F71]/10 transition-colors"
        >
          <p className="text-sm text-[#6B8F71] font-medium">Learning complete! (click to undo)</p>
        </button>
      )}
    </div>
  );
}
