"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const AgentChat = dynamic(() => import("@/app/components/agents/AgentChat"), {
  ssr: false,
});

const LEARN_ICON = "M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5";

interface Step4LearnProps {
  onComplete: () => void;
  isComplete: boolean;
}

export default function Step4Learn({ onComplete, isComplete }: Step4LearnProps) {
  const [showChat, setShowChat] = useState(false);

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
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#6B8F71] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={LEARN_ICON} />
                </svg>
                <span className="text-sm font-medium text-[#1C1C1C] truncate">
                  SDK Tutor
                </span>
              </div>
            </div>
          </div>

          {/* Chat area */}
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden px-4">
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
              starterPrompts={[
                "Start today's quiz",
                "Quiz me on advanced topics",
                "What's new in the SDK?",
              ]}
            />
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
