"use client";

import { useState, useEffect } from "react";

interface FinancialEntry {
  id: string;
  type: "revenue" | "expense" | "invoice";
  description: string;
  amount: number;
  date: string;
  status: "paid" | "pending" | "overdue";
}

const TYPE_CONFIG = {
  revenue: { label: "Revenue", color: "text-[#6B8F71]", bg: "bg-[#6B8F71]/10", sign: "+" },
  expense: { label: "Expense", color: "text-red-500", bg: "bg-red-50", sign: "-" },
  invoice: { label: "Invoice", color: "text-blue-600", bg: "bg-blue-50", sign: "" },
};

const STATUS_STYLES = {
  paid: "bg-[#6B8F71]/10 text-[#6B8F71]",
  pending: "bg-amber-50 text-amber-600",
  overdue: "bg-red-50 text-red-500",
};

interface Step8FinancialsProps {
  onComplete: () => void;
  isComplete: boolean;
}

const STORAGE_KEY = "lighten-financials";

function loadEntries(): FinancialEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveEntries(entries: FinancialEntry[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export default function Step8Financials({ onComplete, isComplete }: Step8FinancialsProps) {
  const [entries, setEntries] = useState<FinancialEntry[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newType, setNewType] = useState<"revenue" | "expense" | "invoice">("revenue");
  const [newDescription, setNewDescription] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newStatus, setNewStatus] = useState<"paid" | "pending" | "overdue">("paid");

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  const updateEntries = (next: FinancialEntry[]) => {
    setEntries(next);
    saveEntries(next);
  };

  const addEntry = () => {
    if (!newDescription.trim() || !newAmount) return;
    const entry: FinancialEntry = {
      id: Date.now().toString(),
      type: newType,
      description: newDescription.trim(),
      amount: parseFloat(newAmount),
      date: new Date().toISOString().split("T")[0],
      status: newType === "invoice" ? newStatus : "paid",
    };
    updateEntries([entry, ...entries]);
    setNewDescription("");
    setNewAmount("");
    setNewStatus("paid");
    setShowAddForm(false);
  };

  const updateStatus = (id: string, status: "paid" | "pending" | "overdue") => {
    updateEntries(entries.map((e) => (e.id === id ? { ...e, status } : e)));
  };

  const removeEntry = (id: string) => {
    updateEntries(entries.filter((e) => e.id !== id));
  };

  // Calculate summary
  const thisMonth = new Date().toISOString().slice(0, 7); // "2026-02"
  const monthEntries = entries.filter((e) => e.date.startsWith(thisMonth));
  const monthRevenue = monthEntries.filter((e) => e.type === "revenue").reduce((s, e) => s + e.amount, 0);
  const monthExpenses = monthEntries.filter((e) => e.type === "expense").reduce((s, e) => s + e.amount, 0);
  const pendingInvoices = entries.filter((e) => e.type === "invoice" && e.status !== "paid");
  const pendingTotal = pendingInvoices.reduce((s, e) => s + e.amount, 0);
  const overdueInvoices = entries.filter((e) => e.type === "invoice" && e.status === "overdue");

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(amount);

  return (
    <div>
      <p className="text-sm text-[#666] mb-4 leading-relaxed">
        Quick financial pulse for the month.
        {overdueInvoices.length > 0 && (
          <span className="text-red-500 font-medium">
            {" "}{overdueInvoices.length} overdue invoice{overdueInvoices.length > 1 ? "s" : ""}.
          </span>
        )}
      </p>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-[#6B8F71]/10 rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-[#6B8F71]">{formatCurrency(monthRevenue)}</p>
          <p className="text-[10px] font-medium text-[#666] uppercase tracking-wider">Revenue</p>
        </div>
        <div className="bg-red-50 rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-red-500">{formatCurrency(monthExpenses)}</p>
          <p className="text-[10px] font-medium text-[#666] uppercase tracking-wider">Expenses</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-blue-600">{formatCurrency(pendingTotal)}</p>
          <p className="text-[10px] font-medium text-[#666] uppercase tracking-wider">Outstanding</p>
        </div>
      </div>

      {/* Net this month */}
      <div className="mb-4 px-3 py-2 rounded-lg bg-[#FAFAF8] border border-[#E8E6E1] flex items-center justify-between">
        <span className="text-xs font-medium text-[#666]">Net this month</span>
        <span className={`text-sm font-bold ${monthRevenue - monthExpenses >= 0 ? "text-[#6B8F71]" : "text-red-500"}`}>
          {formatCurrency(monthRevenue - monthExpenses)}
        </span>
      </div>

      {/* Add entry */}
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-semibold text-[#6B8F71] uppercase tracking-wider">
          Entries ({entries.length})
        </h4>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-xs text-[#6B8F71] hover:text-[#5A7D60] transition-colors flex items-center gap-1"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d={showAddForm ? "M6 18L18 6M6 6l12 12" : "M12 4.5v15m7.5-7.5h-15"} />
          </svg>
          {showAddForm ? "Cancel" : "Add entry"}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-3 p-3 rounded-lg bg-[#FAFAF8] border border-[#E8E6E1]">
          <div className="flex gap-1.5 mb-2">
            {(["revenue", "expense", "invoice"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setNewType(t)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  newType === t
                    ? `${TYPE_CONFIG[t].bg} ${TYPE_CONFIG[t].color}`
                    : "bg-white border border-[#E8E6E1] text-[#999] hover:text-[#555]"
                }`}
              >
                {TYPE_CONFIG[t].label}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Description (e.g. Client retainer, Hosting)"
            className="w-full bg-white border border-[#E8E6E1] rounded-lg px-3 py-2 text-sm text-[#1C1C1C] placeholder-[#999] focus:outline-none focus:border-[#6B8F71] mb-2"
            onKeyDown={(e) => { if (e.key === "Enter") addEntry(); }}
          />
          <div className="flex gap-2 mb-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#999]">$</span>
              <input
                type="number"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                placeholder="0"
                className="w-full bg-white border border-[#E8E6E1] rounded-lg pl-7 pr-3 py-2 text-sm text-[#1C1C1C] placeholder-[#999] focus:outline-none focus:border-[#6B8F71]"
              />
            </div>
            {newType === "invoice" && (
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as "paid" | "pending" | "overdue")}
                className="bg-white border border-[#E8E6E1] rounded-lg px-3 py-2 text-sm text-[#1C1C1C] focus:outline-none focus:border-[#6B8F71]"
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
            )}
          </div>
          <button
            onClick={addEntry}
            disabled={!newDescription.trim() || !newAmount}
            className="px-4 py-1.5 rounded-lg bg-[#6B8F71] text-white text-xs font-medium hover:bg-[#5A7D60] transition-colors disabled:opacity-50"
          >
            Add entry
          </button>
        </div>
      )}

      {/* Entries list */}
      {entries.length === 0 ? (
        <p className="text-xs text-[#999] py-2">No entries yet. Log revenue, expenses, and invoices as they come in.</p>
      ) : (
        <div className="space-y-1.5">
          {entries.slice(0, 10).map((entry) => {
            const config = TYPE_CONFIG[entry.type];
            return (
              <div key={entry.id} className="px-3 py-2 rounded-lg border border-[#E8E6E1] bg-white flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${config.bg} ${config.color} shrink-0`}>
                  {config.label}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#1C1C1C] truncate">{entry.description}</p>
                  <p className="text-[10px] text-[#999]">{entry.date}</p>
                </div>
                <span className={`text-sm font-semibold ${config.color} shrink-0`}>
                  {config.sign}{formatCurrency(entry.amount)}
                </span>
                {entry.type === "invoice" && (
                  <button
                    onClick={() => updateStatus(entry.id, entry.status === "paid" ? "pending" : "paid")}
                    className={`px-2 py-0.5 rounded text-[10px] font-medium shrink-0 transition-colors ${STATUS_STYLES[entry.status]}`}
                  >
                    {entry.status}
                  </button>
                )}
                <button
                  onClick={() => removeEntry(entry.id)}
                  className="text-[#CCC] hover:text-red-400 shrink-0 transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            );
          })}
          {entries.length > 10 && (
            <p className="text-xs text-[#999] text-center py-1">+{entries.length - 10} more entries</p>
          )}
        </div>
      )}

      {/* Complete button */}
      {!isComplete ? (
        <button
          onClick={onComplete}
          className="mt-4 w-full px-4 py-2.5 rounded-lg bg-[#6B8F71] text-white text-sm font-medium hover:bg-[#5A7D60] transition-colors duration-200"
        >
          Mark Financials Reviewed
        </button>
      ) : (
        <button
          onClick={onComplete}
          className="mt-4 w-full py-2.5 text-center rounded-lg bg-[#6B8F71]/5 hover:bg-[#6B8F71]/10 transition-colors"
        >
          <p className="text-sm text-[#6B8F71] font-medium">Financials reviewed! (click to undo)</p>
        </button>
      )}
    </div>
  );
}
