"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import dynamic from "next/dynamic";

const AgentChat = dynamic(() => import("@/app/components/agents/AgentChat"), {
  ssr: false,
});

const CONTENT_ICON = "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10";

interface ContentIdea {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: string;
}

interface Step3ContentProps {
  onComplete: () => void;
  isComplete: boolean;
}

export default function Step3Content({ onComplete, isComplete }: Step3ContentProps) {
  const [ideas, setIdeas] = useState<ContentIdea[]>([]);
  const [isLoadingIdeas, setIsLoadingIdeas] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [selectedIdea, setSelectedIdea] = useState<ContentIdea | null>(null);
  const [showChat, setShowChat] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    loadIdeas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadIdeas = async () => {
    const { data } = await supabase
      .from("content_ideas")
      .select("*")
      .eq("completed", false)
      .order("created_at", { ascending: false });
    setIdeas(data || []);
    setIsLoadingIdeas(false);
  };

  const addIdea = async () => {
    if (!newTitle.trim()) return;
    const { data } = await supabase
      .from("content_ideas")
      .insert({ title: newTitle.trim(), description: newDescription.trim() || null })
      .select()
      .single();
    if (data) {
      setIdeas((prev) => [data, ...prev]);
      setNewTitle("");
      setNewDescription("");
      setShowAddForm(false);
    }
  };

  const markIdeaUsed = async (id: string) => {
    await supabase.from("content_ideas").update({ completed: true }).eq("id", id);
    setIdeas((prev) => prev.filter((i) => i.id !== id));
  };

  const deleteIdea = async (id: string) => {
    await supabase.from("content_ideas").delete().eq("id", id);
    setIdeas((prev) => prev.filter((i) => i.id !== id));
  };

  const handleSelectIdea = (idea: ContentIdea) => {
    setSelectedIdea(idea);
  };

  const buildStarterPrompts = (): string[] => {
    if (selectedIdea) {
      const prompt = selectedIdea.description
        ? `Help me write a LinkedIn post about: ${selectedIdea.title}. Context: ${selectedIdea.description}`
        : `Help me write a LinkedIn post about: ${selectedIdea.title}`;
      return [prompt];
    }
    return [
      "Draft a LinkedIn post about AI agents for small businesses",
      "Help me write a thought leadership post about automation",
      "Create a LinkedIn post sharing a lesson I learned this week",
    ];
  };

  return (
    <div>
      {/* Ideas section */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-semibold text-[#6B8F71] uppercase tracking-wider">
            Your Ideas ({ideas.length})
          </h4>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="text-xs text-[#6B8F71] hover:text-[#5A7D60] transition-colors flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={showAddForm ? "M6 18L18 6M6 6l12 12" : "M12 4.5v15m7.5-7.5h-15"} />
            </svg>
            {showAddForm ? "Cancel" : "Add idea"}
          </button>
        </div>

        {/* Add idea form */}
        {showAddForm && (
          <div className="mb-3 p-3 rounded-lg bg-[#FAFAF8] border border-[#E8E6E1]">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's the idea?"
              className="w-full bg-white border border-[#E8E6E1] rounded-lg px-3 py-2 text-sm text-[#1C1C1C] placeholder-[#999] focus:outline-none focus:border-[#6B8F71] mb-2"
              onKeyDown={(e) => { if (e.key === "Enter") addIdea(); }}
            />
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Any extra context? (optional)"
              rows={2}
              className="w-full bg-white border border-[#E8E6E1] rounded-lg px-3 py-2 text-sm text-[#1C1C1C] placeholder-[#999] focus:outline-none focus:border-[#6B8F71] resize-none mb-2"
            />
            <button
              onClick={addIdea}
              disabled={!newTitle.trim()}
              className="px-4 py-1.5 rounded-lg bg-[#6B8F71] text-white text-xs font-medium hover:bg-[#5A7D60] transition-colors disabled:opacity-50"
            >
              Save idea
            </button>
          </div>
        )}

        {/* Ideas list */}
        {isLoadingIdeas ? (
          <div className="text-xs text-[#999] py-2">Loading ideas...</div>
        ) : ideas.length === 0 ? (
          <p className="text-xs text-[#999] py-1">No ideas saved yet. Add one above or jot them down anytime.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {ideas.map((idea) => (
              <div
                key={idea.id}
                className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm cursor-pointer transition-all ${
                  selectedIdea?.id === idea.id
                    ? "bg-[#6B8F71]/10 border-[#6B8F71] text-[#1C1C1C]"
                    : "bg-white border-[#E8E6E1] text-[#555] hover:border-[#6B8F71]/50 hover:text-[#1C1C1C]"
                }`}
                onClick={() => handleSelectIdea(idea)}
                title={idea.description || idea.title}
              >
                <svg className="w-3.5 h-3.5 text-[#6B8F71] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
                <span className="truncate max-w-[200px]">{idea.title}</span>

                {/* Actions on hover */}
                <span className="hidden group-hover:flex items-center gap-0.5 ml-1">
                  <button
                    onClick={(e) => { e.stopPropagation(); markIdeaUsed(idea.id); }}
                    className="p-0.5 text-[#6B8F71] hover:text-[#5A7D60]"
                    title="Mark as used"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteIdea(idea.id); }}
                    className="p-0.5 text-[#999] hover:text-red-500"
                    title="Delete"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Selected idea detail */}
        {selectedIdea && (
          <div className="mt-2 p-2.5 rounded-lg bg-[#6B8F71]/5 border border-[#6B8F71]/20">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-[#1C1C1C]">{selectedIdea.title}</p>
                {selectedIdea.description && (
                  <p className="text-xs text-[#666] mt-0.5">{selectedIdea.description}</p>
                )}
              </div>
              <button
                onClick={() => setSelectedIdea(null)}
                className="text-[#999] hover:text-[#666] shrink-0"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-[#6B8F71] mt-1.5">Click the prompt below to start drafting this idea</p>
          </div>
        )}
      </div>

      {/* Open Content Creator button */}
      <button
        onClick={() => setShowChat(true)}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#6B8F71]/30 bg-[#6B8F71]/5 text-[#6B8F71] text-sm font-medium hover:bg-[#6B8F71]/10 hover:border-[#6B8F71]/50 transition-colors duration-200"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d={CONTENT_ICON} />
        </svg>
        {selectedIdea ? `Draft: ${selectedIdea.title}` : "Open Content Creator"}
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
                  <path strokeLinecap="round" strokeLinejoin="round" d={CONTENT_ICON} />
                </svg>
                <span className="text-sm font-medium text-[#1C1C1C] truncate">
                  {selectedIdea ? selectedIdea.title : "LinkedIn Content Creator"}
                </span>
              </div>
            </div>
          </div>

          {/* Chat area — fills remaining height */}
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden px-4">
            <AgentChat
              agentId="content-creator"
              apiEndpoint="/api/agents/content-creator"
              storageKey="morning-linkedin-sessions"
              placeholder="Describe your LinkedIn post idea..."
              emptyStateTitle={selectedIdea ? `Draft: ${selectedIdea.title}` : "Create today's LinkedIn post"}
              emptyStateDescription={
                selectedIdea
                  ? (selectedIdea.description || "Click the prompt below to start writing this post.")
                  : "Pick an idea above or describe a new one. I'll help with writing and formatting."
              }
              loadingText="Drafting..."
              agentIcon={CONTENT_ICON}
              agentName="Content Creator"
              variant="full"
              starterPrompts={buildStarterPrompts()}
              fileUpload={{
                accept: "audio/*,video/*,image/*",
                maxSizeMB: 100,
                endpoint: "/api/upload",
              }}
            />
          </div>
        </div>
      )}

      {!isComplete && (
        <button
          onClick={() => {
            if (selectedIdea) markIdeaUsed(selectedIdea.id);
            onComplete();
          }}
          className="mt-3 w-full px-4 py-2.5 rounded-lg bg-[#6B8F71] text-white text-sm font-medium hover:bg-[#5A7D60] transition-colors duration-200"
        >
          Mark Content as Done
        </button>
      )}

      {isComplete && (
        <button
          onClick={onComplete}
          className="mt-3 w-full py-2.5 text-center rounded-lg bg-[#6B8F71]/5 hover:bg-[#6B8F71]/10 transition-colors"
        >
          <p className="text-sm text-[#6B8F71] font-medium">Content created! (click to undo)</p>
        </button>
      )}
    </div>
  );
}
