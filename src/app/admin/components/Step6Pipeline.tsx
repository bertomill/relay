"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface Deal {
  id: string;
  name: string;
  stage: DealStage;
  value: string;
  nextAction: string;
  lastContact: string;
  notes: string;
}

type DealStage = "contacted" | "proposal" | "negotiating" | "closing";

const STAGE_CONFIG: Record<DealStage, { label: string; color: string; bg: string }> = {
  contacted: { label: "Contacted", color: "text-blue-600", bg: "bg-blue-50" },
  proposal: { label: "Proposal Sent", color: "text-purple-600", bg: "bg-purple-50" },
  negotiating: { label: "Negotiating", color: "text-amber-600", bg: "bg-amber-50" },
  closing: { label: "Closing", color: "text-[#6B8F71]", bg: "bg-[#6B8F71]/10" },
};

const STAGES: DealStage[] = ["contacted", "proposal", "negotiating", "closing"];

interface Step6PipelineProps {
  onComplete: () => void;
  isComplete: boolean;
}

const STORAGE_KEY = "lighten-pipeline-deals";

function loadDeals(): Deal[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveDeals(deals: Deal[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(deals));
}

export default function Step6Pipeline({ onComplete, isComplete }: Step6PipelineProps) {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newStage, setNewStage] = useState<DealStage>("contacted");
  const [newValue, setNewValue] = useState("");
  const [newNextAction, setNewNextAction] = useState("");
  const [expandedDeal, setExpandedDeal] = useState<string | null>(null);

  useEffect(() => {
    setDeals(loadDeals());
  }, []);

  const updateDeals = (next: Deal[]) => {
    setDeals(next);
    saveDeals(next);
  };

  const addDeal = () => {
    if (!newName.trim()) return;
    const deal: Deal = {
      id: Date.now().toString(),
      name: newName.trim(),
      stage: newStage,
      value: newValue.trim(),
      nextAction: newNextAction.trim(),
      lastContact: new Date().toISOString().split("T")[0],
      notes: "",
    };
    updateDeals([deal, ...deals]);
    setNewName("");
    setNewValue("");
    setNewNextAction("");
    setNewStage("contacted");
    setShowAddForm(false);
  };

  const updateStage = (id: string, stage: DealStage) => {
    updateDeals(deals.map((d) => (d.id === id ? { ...d, stage } : d)));
  };

  const removeDeal = (id: string) => {
    updateDeals(deals.filter((d) => d.id !== id));
    if (expandedDeal === id) setExpandedDeal(null);
  };

  const updateNotes = (id: string, notes: string) => {
    updateDeals(deals.map((d) => (d.id === id ? { ...d, notes } : d)));
  };

  const updateNextAction = (id: string, nextAction: string) => {
    updateDeals(deals.map((d) => (d.id === id ? { ...d, nextAction } : d)));
  };

  const dealsByStage = STAGES.map((stage) => ({
    stage,
    ...STAGE_CONFIG[stage],
    deals: deals.filter((d) => d.stage === stage),
  }));

  const needsFollowUp = deals.filter((d) => {
    const daysSince = Math.floor(
      (Date.now() - new Date(d.lastContact).getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysSince >= 3;
  });

  return (
    <div>
      <p className="text-sm text-[#666] mb-4 leading-relaxed">
        Track your active deals and follow up on warm prospects.
        {needsFollowUp.length > 0 && (
          <span className="text-amber-600 font-medium">
            {" "}{needsFollowUp.length} deal{needsFollowUp.length > 1 ? "s" : ""} need follow-up.
          </span>
        )}
      </p>

      {/* Pipeline summary */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {dealsByStage.map(({ stage, label, color, bg, deals: stagDeals }) => (
          <div key={stage} className={`${bg} rounded-lg p-2.5 text-center`}>
            <p className={`text-lg font-bold ${color}`}>{stagDeals.length}</p>
            <p className="text-[10px] font-medium text-[#666] uppercase tracking-wider">{label}</p>
          </div>
        ))}
      </div>

      {/* Add deal */}
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-semibold text-[#6B8F71] uppercase tracking-wider">
          Deals ({deals.length})
        </h4>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-xs text-[#6B8F71] hover:text-[#5A7D60] transition-colors flex items-center gap-1"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d={showAddForm ? "M6 18L18 6M6 6l12 12" : "M12 4.5v15m7.5-7.5h-15"} />
          </svg>
          {showAddForm ? "Cancel" : "Add deal"}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-3 p-3 rounded-lg bg-[#FAFAF8] border border-[#E8E6E1]">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Company or contact name"
            className="w-full bg-white border border-[#E8E6E1] rounded-lg px-3 py-2 text-sm text-[#1C1C1C] placeholder-[#999] focus:outline-none focus:border-[#6B8F71] mb-2"
            onKeyDown={(e) => { if (e.key === "Enter") addDeal(); }}
          />
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder="Deal value (e.g. $5k)"
              className="flex-1 bg-white border border-[#E8E6E1] rounded-lg px-3 py-2 text-sm text-[#1C1C1C] placeholder-[#999] focus:outline-none focus:border-[#6B8F71]"
            />
            <select
              value={newStage}
              onChange={(e) => setNewStage(e.target.value as DealStage)}
              className="bg-white border border-[#E8E6E1] rounded-lg px-3 py-2 text-sm text-[#1C1C1C] focus:outline-none focus:border-[#6B8F71]"
            >
              {STAGES.map((s) => (
                <option key={s} value={s}>{STAGE_CONFIG[s].label}</option>
              ))}
            </select>
          </div>
          <input
            type="text"
            value={newNextAction}
            onChange={(e) => setNewNextAction(e.target.value)}
            placeholder="Next action (e.g. Send proposal by Friday)"
            className="w-full bg-white border border-[#E8E6E1] rounded-lg px-3 py-2 text-sm text-[#1C1C1C] placeholder-[#999] focus:outline-none focus:border-[#6B8F71] mb-2"
          />
          <button
            onClick={addDeal}
            disabled={!newName.trim()}
            className="px-4 py-1.5 rounded-lg bg-[#6B8F71] text-white text-xs font-medium hover:bg-[#5A7D60] transition-colors disabled:opacity-50"
          >
            Add deal
          </button>
        </div>
      )}

      {/* Deals list */}
      {deals.length === 0 ? (
        <p className="text-xs text-[#999] py-2">No active deals. Add prospects as they come in from outreach.</p>
      ) : (
        <div className="space-y-2">
          {deals.map((deal) => {
            const stageConfig = STAGE_CONFIG[deal.stage];
            const daysSince = Math.floor(
              (Date.now() - new Date(deal.lastContact).getTime()) / (1000 * 60 * 60 * 24)
            );
            const isOverdue = daysSince >= 3;
            const isExpanded = expandedDeal === deal.id;

            return (
              <div key={deal.id} className="rounded-lg border border-[#E8E6E1] bg-white overflow-hidden">
                <button
                  onClick={() => setExpandedDeal(isExpanded ? null : deal.id)}
                  className="w-full px-3 py-2.5 flex items-center gap-3 hover:bg-[#F5F4F1]/30 transition-colors"
                >
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#1C1C1C] truncate">{deal.name}</span>
                      {deal.value && (
                        <span className="text-xs text-[#666] shrink-0">{deal.value}</span>
                      )}
                    </div>
                    {deal.nextAction && (
                      <p className="text-xs text-[#999] mt-0.5 truncate">{deal.nextAction}</p>
                    )}
                  </div>

                  {isOverdue && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-600 shrink-0">
                      {daysSince}d ago
                    </span>
                  )}

                  <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${stageConfig.bg} ${stageConfig.color} shrink-0`}>
                    {stageConfig.label}
                  </span>

                  <svg
                    className={`w-3.5 h-3.5 text-[#999] shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isExpanded && (
                  <div className="px-3 pb-3 border-t border-[#E8E6E1] pt-2.5">
                    {/* Stage selector */}
                    <p className="text-[10px] font-semibold text-[#6B8F71] uppercase tracking-wider mb-1.5">Move to</p>
                    <div className="flex gap-1.5 mb-3">
                      {STAGES.map((s) => (
                        <button
                          key={s}
                          onClick={() => updateStage(deal.id, s)}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                            deal.stage === s
                              ? `${STAGE_CONFIG[s].bg} ${STAGE_CONFIG[s].color}`
                              : "bg-white border border-[#E8E6E1] text-[#999] hover:border-[#6B8F71]/50 hover:text-[#555]"
                          }`}
                        >
                          {STAGE_CONFIG[s].label}
                        </button>
                      ))}
                    </div>

                    {/* Next action */}
                    <p className="text-[10px] font-semibold text-[#6B8F71] uppercase tracking-wider mb-1">Next action</p>
                    <input
                      type="text"
                      value={deal.nextAction}
                      onChange={(e) => updateNextAction(deal.id, e.target.value)}
                      placeholder="What's the next step?"
                      className="w-full bg-[#FAFAF8] border border-[#E8E6E1] rounded-lg px-2.5 py-1.5 text-xs text-[#1C1C1C] placeholder-[#999] focus:outline-none focus:border-[#6B8F71] mb-3"
                    />

                    {/* Notes */}
                    <p className="text-[10px] font-semibold text-[#6B8F71] uppercase tracking-wider mb-1">Notes</p>
                    <textarea
                      value={deal.notes}
                      onChange={(e) => updateNotes(deal.id, e.target.value)}
                      placeholder="Any notes..."
                      rows={2}
                      className="w-full bg-[#FAFAF8] border border-[#E8E6E1] rounded-lg px-2.5 py-1.5 text-xs text-[#1C1C1C] placeholder-[#999] focus:outline-none focus:border-[#6B8F71] resize-none mb-3"
                    />

                    {/* Remove */}
                    <button
                      onClick={() => removeDeal(deal.id)}
                      className="text-xs text-[#999] hover:text-red-500 transition-colors"
                    >
                      Remove deal
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Complete button */}
      {!isComplete ? (
        <button
          onClick={onComplete}
          className="mt-4 w-full px-4 py-2.5 rounded-lg bg-[#6B8F71] text-white text-sm font-medium hover:bg-[#5A7D60] transition-colors duration-200"
        >
          Mark Pipeline Reviewed
        </button>
      ) : (
        <button
          onClick={onComplete}
          className="mt-4 w-full py-2.5 text-center rounded-lg bg-[#6B8F71]/5 hover:bg-[#6B8F71]/10 transition-colors"
        >
          <p className="text-sm text-[#6B8F71] font-medium">Pipeline reviewed! (click to undo)</p>
        </button>
      )}
    </div>
  );
}
