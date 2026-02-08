"use client";

import dynamic from "next/dynamic";

const AgentChat = dynamic(() => import("@/app/components/agents/AgentChat"), {
  ssr: false,
});

interface Step3ContentProps {
  onComplete: () => void;
  isComplete: boolean;
}

export default function Step3Content({ onComplete, isComplete }: Step3ContentProps) {
  return (
    <div>
      <div className="rounded-lg border border-[#E8E6E1] overflow-hidden" style={{ height: "500px" }}>
        <AgentChat
          agentId="content-creator"
          apiEndpoint="/api/agents/content-creator"
          storageKey="morning-linkedin-sessions"
          placeholder="Describe your LinkedIn post idea..."
          emptyStateTitle="Create today's LinkedIn post"
          emptyStateDescription="Draft one piece of LinkedIn content this morning. I'll help with ideas, writing, and formatting."
          loadingText="Drafting..."
          agentIcon="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          agentName="Content Creator"
          variant="embedded"
          starterPrompts={[
            "Draft a LinkedIn post about AI agents for small businesses",
            "Help me write a thought leadership post about automation",
            "Create a LinkedIn post sharing a lesson I learned this week",
          ]}
          fileUpload={{
            accept: "audio/*,video/*,image/*",
            maxSizeMB: 100,
            endpoint: "/api/upload",
          }}
        />
      </div>

      {!isComplete && (
        <button
          onClick={onComplete}
          className="mt-3 w-full px-4 py-2.5 rounded-lg bg-[#6B8F71] text-white text-sm font-medium hover:bg-[#5A7D60] transition-colors duration-200"
        >
          Mark Content as Done
        </button>
      )}

      {isComplete && (
        <div className="mt-3 py-2.5 text-center rounded-lg bg-[#6B8F71]/5">
          <p className="text-sm text-[#6B8F71] font-medium">Content created!</p>
        </div>
      )}
    </div>
  );
}
