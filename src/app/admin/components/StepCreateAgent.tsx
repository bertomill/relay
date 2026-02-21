"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const HASH = "lead-outreach";

const AgentChat = dynamic(() => import("@/app/components/agents/AgentChat"), {
  ssr: false,
});

// People/outreach icon
const OUTREACH_ICON = "M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z";

interface StepLeadOutreachProps {
  onComplete: () => void;
  isComplete: boolean;
}

export default function StepLeadOutreach({ onComplete, isComplete }: StepLeadOutreachProps) {
  const [showChat, setShowChat] = useState(false);
  const [autoStartPrompt, setAutoStartPrompt] = useState<string | undefined>(undefined);
  const headerPortalRef = useRef<HTMLDivElement | null>(null);
  // Sync URL hash with chat overlay state
  useEffect(() => {
    if (window.location.hash.replace("#", "") === HASH) {
      setShowChat(true);
    }
  }, []);

  useEffect(() => {
    const onPopState = () => {
      if (window.location.hash.replace("#", "") !== HASH) {
        setShowChat(false);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return (
    <div>
      {/* Description */}
      <p className="text-sm text-[#666] mb-4 leading-relaxed">
        Reach out to high-conversion leads about Lighten AI&apos;s services — from coaching to co-building.
        The outreach agent researches prospects and drafts personalized LinkedIn messages.
      </p>

      {/* Open Outreach Chat button */}
      <button
        onClick={() => {
          setAutoStartPrompt(undefined);
          setShowChat(true);
          window.history.pushState(null, "", `#${HASH}`);
        }}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#6B8F71]/30 bg-[#6B8F71]/5 text-[#6B8F71] text-sm font-medium hover:bg-[#6B8F71]/10 hover:border-[#6B8F71]/50 transition-colors duration-200"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d={OUTREACH_ICON} />
        </svg>
        Open Outreach Chat
      </button>

      {/* Full-screen agent chat overlay */}
      {showChat && (
        <div className="fixed inset-0 z-50 bg-[#FAFAF8] flex flex-col">
          {/* Header bar */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[#E8E6E1] bg-white shrink-0">
            <button
              onClick={() => { setShowChat(false); setAutoStartPrompt(undefined); window.history.pushState(null, "", window.location.pathname); }}
              className="flex items-center gap-1.5 text-sm text-[#666] hover:text-[#1C1C1C] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <div className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-[#6B8F71] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={OUTREACH_ICON} />
              </svg>
              <span className="text-sm font-medium text-[#1C1C1C] truncate">
                Lead Outreach
              </span>
            </div>
            {/* Portal target for AgentChat header controls */}
            <div ref={headerPortalRef} className="ml-auto" />
          </div>

          {/* Main content area — chat */}
          <div className="flex-1 flex min-h-0 overflow-hidden">
            <div className="flex flex-col min-h-0 min-w-0 overflow-hidden px-4 flex-1">
              <AgentChat
                agentId="outreach"
                apiEndpoint="/api/agents/outreach"
                storageKey="lead-outreach-sessions"
                placeholder="Describe the lead you want to reach out to..."
                emptyStateTitle="Lead Outreach"
                emptyStateDescription="I'll help you research prospects and draft personalized outreach messages for Lighten AI's coaching and co-building services."
                loadingText="Thinking..."
                agentIcon={OUTREACH_ICON}
                agentName="Outreach"
                variant="full"
                headerPortalRef={headerPortalRef}
                initialPrompt={autoStartPrompt}
                starterPrompts={[
                  "Help me draft a message for a high-conversion lead about our services",
                  "Research this prospect and craft a personalized outreach message",
                  "Draft a follow-up for a warm lead about our coaching/co-building services",
                ]}
              />
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
          Mark Outreach Complete
        </button>
      )}

      {isComplete && (
        <button
          onClick={onComplete}
          className="mt-3 w-full py-2.5 text-center rounded-lg bg-[#6B8F71]/5 hover:bg-[#6B8F71]/10 transition-colors"
        >
          <p className="text-sm text-[#6B8F71] font-medium">Outreach complete! (click to undo)</p>
        </button>
      )}
    </div>
  );
}
