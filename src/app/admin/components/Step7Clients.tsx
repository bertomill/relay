"use client";

import { useState, useEffect } from "react";

interface Client {
  id: string;
  name: string;
  project: string;
  status: ClientStatus;
  nextDeliverable: string;
  dueDate: string;
  checkedInToday: boolean;
  notes: string;
}

type ClientStatus = "active" | "onboarding" | "paused" | "wrapping-up";

const STATUS_CONFIG: Record<ClientStatus, { label: string; color: string; bg: string }> = {
  active: { label: "Active", color: "text-[#6B8F71]", bg: "bg-[#6B8F71]/10" },
  onboarding: { label: "Onboarding", color: "text-blue-600", bg: "bg-blue-50" },
  paused: { label: "Paused", color: "text-[#999]", bg: "bg-gray-50" },
  "wrapping-up": { label: "Wrapping Up", color: "text-amber-600", bg: "bg-amber-50" },
};

const STATUSES: ClientStatus[] = ["active", "onboarding", "paused", "wrapping-up"];

interface Step7ClientsProps {
  onComplete: () => void;
  isComplete: boolean;
}

const STORAGE_KEY = "lighten-client-tracker";

function loadClients(): Client[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveClients(clients: Client[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
}

export default function Step7Clients({ onComplete, isComplete }: Step7ClientsProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newProject, setNewProject] = useState("");
  const [newDeliverable, setNewDeliverable] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [expandedClient, setExpandedClient] = useState<string | null>(null);

  useEffect(() => {
    const loaded = loadClients();
    // Reset daily check-ins if it's a new day
    const today = new Date().toISOString().split("T")[0];
    const lastReset = localStorage.getItem("lighten-client-last-reset");
    if (lastReset !== today) {
      const reset = loaded.map((c) => ({ ...c, checkedInToday: false }));
      saveClients(reset);
      setClients(reset);
      localStorage.setItem("lighten-client-last-reset", today);
    } else {
      setClients(loaded);
    }
  }, []);

  const updateClients = (next: Client[]) => {
    setClients(next);
    saveClients(next);
  };

  const addClient = () => {
    if (!newName.trim()) return;
    const client: Client = {
      id: Date.now().toString(),
      name: newName.trim(),
      project: newProject.trim(),
      status: "active",
      nextDeliverable: newDeliverable.trim(),
      dueDate: newDueDate,
      checkedInToday: false,
      notes: "",
    };
    updateClients([client, ...clients]);
    setNewName("");
    setNewProject("");
    setNewDeliverable("");
    setNewDueDate("");
    setShowAddForm(false);
  };

  const toggleCheckIn = (id: string) => {
    updateClients(clients.map((c) => (c.id === id ? { ...c, checkedInToday: !c.checkedInToday } : c)));
  };

  const updateStatus = (id: string, status: ClientStatus) => {
    updateClients(clients.map((c) => (c.id === id ? { ...c, status } : c)));
  };

  const updateNotes = (id: string, notes: string) => {
    updateClients(clients.map((c) => (c.id === id ? { ...c, notes } : c)));
  };

  const updateDeliverable = (id: string, nextDeliverable: string) => {
    updateClients(clients.map((c) => (c.id === id ? { ...c, nextDeliverable } : c)));
  };

  const updateDueDate = (id: string, dueDate: string) => {
    updateClients(clients.map((c) => (c.id === id ? { ...c, dueDate } : c)));
  };

  const removeClient = (id: string) => {
    updateClients(clients.filter((c) => c.id !== id));
    if (expandedClient === id) setExpandedClient(null);
  };

  const activeClients = clients.filter((c) => c.status !== "paused");
  const checkedIn = activeClients.filter((c) => c.checkedInToday).length;

  // Check for overdue deliverables
  const today = new Date().toISOString().split("T")[0];
  const overdueCount = clients.filter((c) => c.dueDate && c.dueDate < today && c.status === "active").length;

  return (
    <div>
      <p className="text-sm text-[#666] mb-4 leading-relaxed">
        Check in on active clients and track deliverables.
        {overdueCount > 0 && (
          <span className="text-red-500 font-medium">
            {" "}{overdueCount} overdue deliverable{overdueCount > 1 ? "s" : ""}.
          </span>
        )}
        {activeClients.length > 0 && (
          <span className="text-[#999]">
            {" "}{checkedIn}/{activeClients.length} checked in today.
          </span>
        )}
      </p>

      {/* Add client */}
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-semibold text-[#6B8F71] uppercase tracking-wider">
          Clients ({clients.length})
        </h4>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-xs text-[#6B8F71] hover:text-[#5A7D60] transition-colors flex items-center gap-1"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d={showAddForm ? "M6 18L18 6M6 6l12 12" : "M12 4.5v15m7.5-7.5h-15"} />
          </svg>
          {showAddForm ? "Cancel" : "Add client"}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-3 p-3 rounded-lg bg-[#FAFAF8] border border-[#E8E6E1]">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Client name"
            className="w-full bg-white border border-[#E8E6E1] rounded-lg px-3 py-2 text-sm text-[#1C1C1C] placeholder-[#999] focus:outline-none focus:border-[#6B8F71] mb-2"
            onKeyDown={(e) => { if (e.key === "Enter") addClient(); }}
          />
          <input
            type="text"
            value={newProject}
            onChange={(e) => setNewProject(e.target.value)}
            placeholder="Project name"
            className="w-full bg-white border border-[#E8E6E1] rounded-lg px-3 py-2 text-sm text-[#1C1C1C] placeholder-[#999] focus:outline-none focus:border-[#6B8F71] mb-2"
          />
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newDeliverable}
              onChange={(e) => setNewDeliverable(e.target.value)}
              placeholder="Next deliverable"
              className="flex-1 bg-white border border-[#E8E6E1] rounded-lg px-3 py-2 text-sm text-[#1C1C1C] placeholder-[#999] focus:outline-none focus:border-[#6B8F71]"
            />
            <input
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              className="bg-white border border-[#E8E6E1] rounded-lg px-3 py-2 text-sm text-[#1C1C1C] focus:outline-none focus:border-[#6B8F71]"
            />
          </div>
          <button
            onClick={addClient}
            disabled={!newName.trim()}
            className="px-4 py-1.5 rounded-lg bg-[#6B8F71] text-white text-xs font-medium hover:bg-[#5A7D60] transition-colors disabled:opacity-50"
          >
            Add client
          </button>
        </div>
      )}

      {/* Client list */}
      {clients.length === 0 ? (
        <p className="text-xs text-[#999] py-2">No active clients yet. Add them as deals close.</p>
      ) : (
        <div className="space-y-2">
          {clients.map((client) => {
            const statusConfig = STATUS_CONFIG[client.status];
            const isOverdue = client.dueDate && client.dueDate < today && client.status === "active";
            const isExpanded = expandedClient === client.id;

            return (
              <div key={client.id} className={`rounded-lg border overflow-hidden ${
                client.checkedInToday ? "border-[#6B8F71]/30 bg-[#6B8F71]/5" : "border-[#E8E6E1] bg-white"
              }`}>
                <div className="px-3 py-2.5 flex items-center gap-3">
                  {/* Check-in toggle */}
                  <button
                    onClick={() => toggleCheckIn(client.id)}
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      client.checkedInToday
                        ? "bg-[#6B8F71] text-white"
                        : "border-2 border-[#E8E6E1] hover:border-[#6B8F71]"
                    }`}
                  >
                    {client.checkedInToday && (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>

                  <button
                    onClick={() => setExpandedClient(isExpanded ? null : client.id)}
                    className="flex-1 text-left min-w-0 flex items-center gap-2"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[#1C1C1C] truncate">{client.name}</span>
                        {client.project && (
                          <span className="text-xs text-[#999] truncate">{client.project}</span>
                        )}
                      </div>
                      {client.nextDeliverable && (
                        <p className="text-xs text-[#666] mt-0.5 truncate">
                          {client.nextDeliverable}
                          {client.dueDate && (
                            <span className={isOverdue ? "text-red-500 font-medium ml-1" : "text-[#999] ml-1"}>
                              {isOverdue ? "(overdue)" : `(due ${client.dueDate})`}
                            </span>
                          )}
                        </p>
                      )}
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${statusConfig.bg} ${statusConfig.color} shrink-0`}>
                      {statusConfig.label}
                    </span>

                    <svg
                      className={`w-3.5 h-3.5 text-[#999] shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {isExpanded && (
                  <div className="px-3 pb-3 border-t border-[#E8E6E1] pt-2.5">
                    {/* Status selector */}
                    <p className="text-[10px] font-semibold text-[#6B8F71] uppercase tracking-wider mb-1.5">Status</p>
                    <div className="flex gap-1.5 mb-3">
                      {STATUSES.map((s) => (
                        <button
                          key={s}
                          onClick={() => updateStatus(client.id, s)}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                            client.status === s
                              ? `${STATUS_CONFIG[s].bg} ${STATUS_CONFIG[s].color}`
                              : "bg-white border border-[#E8E6E1] text-[#999] hover:border-[#6B8F71]/50 hover:text-[#555]"
                          }`}
                        >
                          {STATUS_CONFIG[s].label}
                        </button>
                      ))}
                    </div>

                    {/* Next deliverable */}
                    <p className="text-[10px] font-semibold text-[#6B8F71] uppercase tracking-wider mb-1">Next deliverable</p>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={client.nextDeliverable}
                        onChange={(e) => updateDeliverable(client.id, e.target.value)}
                        placeholder="What's next?"
                        className="flex-1 bg-[#FAFAF8] border border-[#E8E6E1] rounded-lg px-2.5 py-1.5 text-xs text-[#1C1C1C] placeholder-[#999] focus:outline-none focus:border-[#6B8F71]"
                      />
                      <input
                        type="date"
                        value={client.dueDate}
                        onChange={(e) => updateDueDate(client.id, e.target.value)}
                        className="bg-[#FAFAF8] border border-[#E8E6E1] rounded-lg px-2.5 py-1.5 text-xs text-[#1C1C1C] focus:outline-none focus:border-[#6B8F71]"
                      />
                    </div>

                    {/* Notes */}
                    <p className="text-[10px] font-semibold text-[#6B8F71] uppercase tracking-wider mb-1">Notes</p>
                    <textarea
                      value={client.notes}
                      onChange={(e) => updateNotes(client.id, e.target.value)}
                      placeholder="Any updates or blockers..."
                      rows={2}
                      className="w-full bg-[#FAFAF8] border border-[#E8E6E1] rounded-lg px-2.5 py-1.5 text-xs text-[#1C1C1C] placeholder-[#999] focus:outline-none focus:border-[#6B8F71] resize-none mb-3"
                    />

                    <button
                      onClick={() => removeClient(client.id)}
                      className="text-xs text-[#999] hover:text-red-500 transition-colors"
                    >
                      Remove client
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
          Mark Clients Checked
        </button>
      ) : (
        <button
          onClick={onComplete}
          className="mt-4 w-full py-2.5 text-center rounded-lg bg-[#6B8F71]/5 hover:bg-[#6B8F71]/10 transition-colors"
        >
          <p className="text-sm text-[#6B8F71] font-medium">Clients checked! (click to undo)</p>
        </button>
      )}
    </div>
  );
}
