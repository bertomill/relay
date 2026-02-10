"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import dynamic from "next/dynamic";

const AgentChat = dynamic(() => import("@/app/components/agents/AgentChat"), {
  ssr: false,
});

const CONTENT_ICON = "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10";

interface Platform {
  id: string;
  label: string;
  icon: string; // SVG path
  promptTemplate: (idea: string, context?: string, audience?: string) => string;
}

const PLATFORMS: Platform[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    promptTemplate: (idea, context, audience) => {
      let prompt = `Help me write a LinkedIn post about: ${idea}.`;
      if (context) prompt += ` Context: ${context}.`;
      if (audience) prompt += ` Target audience: ${audience}.`;
      return prompt;
    },
  },
  {
    id: "x",
    label: "X (Twitter)",
    icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    promptTemplate: (idea, context, audience) => {
      let prompt = `Help me write a tweet thread about: ${idea}.`;
      if (context) prompt += ` Context: ${context}.`;
      if (audience) prompt += ` Target audience: ${audience}.`;
      prompt += ` Keep tweets concise (under 280 chars each). Use a punchy, direct tone.`;
      return prompt;
    },
  },
];

const AUDIENCE_PRESETS = [
  "Shopify merchants",
  "Small business owners",
  "E-commerce founders",
];

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
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [draftedPlatforms, setDraftedPlatforms] = useState<Set<string>>(new Set());
  const [targetAudience, setTargetAudience] = useState("");
  const [autoSendPrompt, setAutoSendPrompt] = useState<string | undefined>();
  const prevIdeaId = useRef<string | null>(null);
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
    // Reset drafted platforms when switching ideas
    if (idea.id !== prevIdeaId.current) {
      setDraftedPlatforms(new Set());
      prevIdeaId.current = idea.id;
    }
  };

  const openPlatformChat = (platformId: string) => {
    const audience = targetAudience.trim() || undefined;
    const platform = PLATFORMS.find((p) => p.id === platformId);
    if (platform && selectedIdea) {
      setAutoSendPrompt(platform.promptTemplate(selectedIdea.title, selectedIdea.description || undefined, audience));
    }
    setSelectedPlatform(platformId);
    setShowChat(true);
  };

  const openAllPlatformsChat = () => {
    const audience = targetAudience.trim() || undefined;
    if (selectedIdea) {
      const combined = PLATFORMS.map(
        (p) => p.promptTemplate(selectedIdea.title, selectedIdea.description || undefined, audience)
      ).join("\n\nThen also: ");
      setAutoSendPrompt(combined);
    }
    setSelectedPlatform("all");
    setShowChat(true);
  };

  const handleCloseChat = () => {
    // Mark the platform as drafted when closing
    if (selectedPlatform && selectedPlatform !== "all") {
      setDraftedPlatforms((prev) => new Set(prev).add(selectedPlatform));
    } else if (selectedPlatform === "all") {
      setDraftedPlatforms(new Set(PLATFORMS.map((p) => p.id)));
    }
    setShowChat(false);
    setSelectedPlatform(null);
    setAutoSendPrompt(undefined);
  };

  const buildStarterPrompts = (): string[] => {
    const audience = targetAudience.trim() || undefined;
    if (selectedIdea && selectedPlatform) {
      if (selectedPlatform === "all") {
        const combined = PLATFORMS.map(
          (p) => p.promptTemplate(selectedIdea.title, selectedIdea.description || undefined, audience)
        ).join("\n\nThen also: ");
        return [combined];
      }
      const platform = PLATFORMS.find((p) => p.id === selectedPlatform);
      if (platform) {
        return [platform.promptTemplate(selectedIdea.title, selectedIdea.description || undefined, audience)];
      }
    }
    return [
      "Draft a LinkedIn post about AI agents for small businesses",
      "Help me write a thought leadership post about automation",
      "Create a post sharing a lesson I learned this week",
    ];
  };

  const getChatStorageKey = (): string => {
    if (selectedPlatform === "all") return "morning-content-all-platforms";
    if (selectedPlatform) return `morning-content-${selectedPlatform}`;
    return "morning-content-sessions";
  };

  const getChatTitle = (): string => {
    if (selectedPlatform === "all") {
      return selectedIdea ? `All Platforms — ${selectedIdea.title}` : "Content Creator";
    }
    const platform = PLATFORMS.find((p) => p.id === selectedPlatform);
    const platformLabel = platform?.label || "Content Creator";
    return selectedIdea ? `${platformLabel} — ${selectedIdea.title}` : platformLabel;
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

        {/* Selected idea detail + platform cards */}
        {selectedIdea && (
          <div className="mt-2 p-3 rounded-lg bg-[#6B8F71]/5 border border-[#6B8F71]/20">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-start gap-2 min-w-0">
                <svg className="w-4 h-4 text-[#6B8F71] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#1C1C1C]">{selectedIdea.title}</p>
                  {selectedIdea.description && (
                    <p className="text-xs text-[#666] mt-0.5">{selectedIdea.description}</p>
                  )}
                </div>
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

            {/* Target audience */}
            <div className="mb-3">
              <p className="text-[10px] font-semibold text-[#6B8F71] uppercase tracking-wider mb-1.5">Target audience</p>
              <div className="flex flex-wrap gap-1.5 mb-1.5">
                {AUDIENCE_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setTargetAudience(targetAudience === preset ? "" : preset)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                      targetAudience === preset
                        ? "bg-[#6B8F71] text-white"
                        : "bg-white border border-[#E8E6E1] text-[#555] hover:border-[#6B8F71]/50 hover:text-[#1C1C1C]"
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
              {!AUDIENCE_PRESETS.includes(targetAudience) && (
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="Or type a custom audience..."
                  className="w-full bg-white border border-[#E8E6E1] rounded-lg px-2.5 py-1.5 text-xs text-[#1C1C1C] placeholder-[#999] focus:outline-none focus:border-[#6B8F71]"
                />
              )}
            </div>

            {/* Platform cards */}
            <p className="text-[10px] font-semibold text-[#6B8F71] uppercase tracking-wider mb-2">Draft for</p>
            <div className="grid grid-cols-2 gap-2">
              {PLATFORMS.map((platform) => {
                const isDrafted = draftedPlatforms.has(platform.id);
                return (
                  <button
                    key={platform.id}
                    onClick={() => openPlatformChat(platform.id)}
                    className={`relative flex items-center gap-2.5 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                      isDrafted
                        ? "bg-[#6B8F71]/10 border-[#6B8F71]/40 text-[#1C1C1C]"
                        : "bg-white border-[#E8E6E1] text-[#555] hover:border-[#6B8F71]/50 hover:text-[#1C1C1C] hover:bg-[#6B8F71]/5"
                    }`}
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d={platform.icon} />
                    </svg>
                    <span>{platform.label}</span>
                    {isDrafted && (
                      <svg className="w-4 h-4 text-[#6B8F71] ml-auto shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={openAllPlatformsChat}
              className="mt-2 w-full text-center text-xs text-[#6B8F71] hover:text-[#5A7D60] transition-colors py-1"
            >
              Or draft for all platforms at once
            </button>
          </div>
        )}
      </div>

      {/* Open Content Creator button — only when no idea selected */}
      {!selectedIdea && (
        <button
          onClick={() => { setSelectedPlatform(null); setAutoSendPrompt(undefined); setShowChat(true); }}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#6B8F71]/30 bg-[#6B8F71]/5 text-[#6B8F71] text-sm font-medium hover:bg-[#6B8F71]/10 hover:border-[#6B8F71]/50 transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d={CONTENT_ICON} />
          </svg>
          Open Content Creator
        </button>
      )}

      {/* Full-screen agent chat overlay */}
      {showChat && (
        <div className="fixed inset-0 z-50 bg-[#FAFAF8] flex flex-col">
          {/* Header bar */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[#E8E6E1] bg-white shrink-0">
            <button
              onClick={handleCloseChat}
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
                  {getChatTitle()}
                </span>
              </div>
            </div>
          </div>

          {/* Chat area — fills remaining height */}
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden px-4">
            <AgentChat
              agentId="content-creator"
              apiEndpoint="/api/agents/content-creator"
              storageKey={getChatStorageKey()}
              placeholder={selectedPlatform === "x" ? "Describe your tweet idea..." : "Describe your content idea..."}
              emptyStateTitle={selectedIdea ? `Draft: ${selectedIdea.title}` : "Create content"}
              emptyStateDescription={
                selectedIdea
                  ? (selectedIdea.description || "Click the prompt below to start drafting.")
                  : "Pick an idea above or describe a new one. I'll help with writing and formatting."
              }
              loadingText="Drafting..."
              agentIcon={CONTENT_ICON}
              agentName="Content Creator"
              variant="full"
              initialPrompt={autoSendPrompt}
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
