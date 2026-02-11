"use client";

import { useState, useEffect } from "react";

interface MetricEntry {
  id: string;
  metric: string;
  value: string;
  previousValue: string;
  date: string;
}

interface Insight {
  id: string;
  text: string;
  date: string;
  actionable: boolean;
}

interface Step9AnalyticsProps {
  onComplete: () => void;
  isComplete: boolean;
}

const STORAGE_KEY_METRICS = "lighten-analytics-metrics";
const STORAGE_KEY_INSIGHTS = "lighten-analytics-insights";

const DEFAULT_METRICS = [
  { id: "website-visits", metric: "Website Visits", value: "", previousValue: "" },
  { id: "leads-generated", metric: "Leads Generated", value: "", previousValue: "" },
  { id: "conversion-rate", metric: "Conversion Rate", value: "", previousValue: "" },
  { id: "linkedin-impressions", metric: "LinkedIn Impressions", value: "", previousValue: "" },
  { id: "email-subscribers", metric: "Email Subscribers", value: "", previousValue: "" },
];

function loadMetrics(): MetricEntry[] {
  if (typeof window === "undefined") return DEFAULT_METRICS.map((m) => ({ ...m, date: "" }));
  try {
    const raw = localStorage.getItem(STORAGE_KEY_METRICS);
    return raw ? JSON.parse(raw) : DEFAULT_METRICS.map((m) => ({ ...m, date: "" }));
  } catch {
    return DEFAULT_METRICS.map((m) => ({ ...m, date: "" }));
  }
}

function saveMetrics(metrics: MetricEntry[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_METRICS, JSON.stringify(metrics));
}

function loadInsights(): Insight[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_INSIGHTS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveInsights(insights: Insight[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_INSIGHTS, JSON.stringify(insights));
}

function getTrend(current: string, previous: string): { direction: "up" | "down" | "flat"; color: string } {
  const curr = parseFloat(current.replace(/[^0-9.-]/g, ""));
  const prev = parseFloat(previous.replace(/[^0-9.-]/g, ""));
  if (isNaN(curr) || isNaN(prev) || curr === prev) return { direction: "flat", color: "text-[#999]" };
  return curr > prev
    ? { direction: "up", color: "text-[#6B8F71]" }
    : { direction: "down", color: "text-red-500" };
}

export default function Step9Analytics({ onComplete, isComplete }: Step9AnalyticsProps) {
  const [metrics, setMetrics] = useState<MetricEntry[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [showAddMetric, setShowAddMetric] = useState(false);
  const [newMetricName, setNewMetricName] = useState("");
  const [newInsight, setNewInsight] = useState("");
  const [editingMetric, setEditingMetric] = useState<string | null>(null);

  useEffect(() => {
    setMetrics(loadMetrics());
    setInsights(loadInsights());
  }, []);

  const updateMetrics = (next: MetricEntry[]) => {
    setMetrics(next);
    saveMetrics(next);
  };

  const updateInsights = (next: Insight[]) => {
    setInsights(next);
    saveInsights(next);
  };

  const updateMetricValue = (id: string, value: string) => {
    const today = new Date().toISOString().split("T")[0];
    updateMetrics(
      metrics.map((m) => {
        if (m.id !== id) return m;
        // If updating on a new day, shift current to previous
        if (m.date !== today && m.value) {
          return { ...m, previousValue: m.value, value, date: today };
        }
        return { ...m, value, date: today };
      })
    );
  };

  const addMetric = () => {
    if (!newMetricName.trim()) return;
    const metric: MetricEntry = {
      id: Date.now().toString(),
      metric: newMetricName.trim(),
      value: "",
      previousValue: "",
      date: "",
    };
    updateMetrics([...metrics, metric]);
    setNewMetricName("");
    setShowAddMetric(false);
  };

  const removeMetric = (id: string) => {
    updateMetrics(metrics.filter((m) => m.id !== id));
  };

  const addInsight = () => {
    if (!newInsight.trim()) return;
    const insight: Insight = {
      id: Date.now().toString(),
      text: newInsight.trim(),
      date: new Date().toISOString().split("T")[0],
      actionable: true,
    };
    updateInsights([insight, ...insights]);
    setNewInsight("");
  };

  const toggleInsightActionable = (id: string) => {
    updateInsights(insights.map((i) => (i.id === id ? { ...i, actionable: !i.actionable } : i)));
  };

  const removeInsight = (id: string) => {
    updateInsights(insights.filter((i) => i.id !== id));
  };

  return (
    <div>
      <p className="text-sm text-[#666] mb-4 leading-relaxed">
        Review your key metrics and log what&apos;s working.
      </p>

      {/* Metrics grid */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-semibold text-[#6B8F71] uppercase tracking-wider">
            Key Metrics
          </h4>
          <button
            onClick={() => setShowAddMetric(!showAddMetric)}
            className="text-xs text-[#6B8F71] hover:text-[#5A7D60] transition-colors flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={showAddMetric ? "M6 18L18 6M6 6l12 12" : "M12 4.5v15m7.5-7.5h-15"} />
            </svg>
            {showAddMetric ? "Cancel" : "Add metric"}
          </button>
        </div>

        {showAddMetric && (
          <div className="mb-3 p-3 rounded-lg bg-[#FAFAF8] border border-[#E8E6E1] flex gap-2">
            <input
              type="text"
              value={newMetricName}
              onChange={(e) => setNewMetricName(e.target.value)}
              placeholder="Metric name (e.g. MRR, CAC)"
              className="flex-1 bg-white border border-[#E8E6E1] rounded-lg px-3 py-2 text-sm text-[#1C1C1C] placeholder-[#999] focus:outline-none focus:border-[#6B8F71]"
              onKeyDown={(e) => { if (e.key === "Enter") addMetric(); }}
            />
            <button
              onClick={addMetric}
              disabled={!newMetricName.trim()}
              className="px-4 py-1.5 rounded-lg bg-[#6B8F71] text-white text-xs font-medium hover:bg-[#5A7D60] transition-colors disabled:opacity-50"
            >
              Add
            </button>
          </div>
        )}

        <div className="space-y-1.5">
          {metrics.map((m) => {
            const trend = getTrend(m.value, m.previousValue);
            const isEditing = editingMetric === m.id;

            return (
              <div key={m.id} className="px-3 py-2.5 rounded-lg border border-[#E8E6E1] bg-white flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#666]">{m.metric}</p>
                </div>

                {isEditing ? (
                  <input
                    type="text"
                    value={m.value}
                    onChange={(e) => updateMetricValue(m.id, e.target.value)}
                    onBlur={() => setEditingMetric(null)}
                    onKeyDown={(e) => { if (e.key === "Enter") setEditingMetric(null); }}
                    placeholder="Enter value"
                    autoFocus
                    className="w-24 bg-[#FAFAF8] border border-[#6B8F71] rounded px-2 py-1 text-sm text-right text-[#1C1C1C] focus:outline-none"
                  />
                ) : (
                  <button
                    onClick={() => setEditingMetric(m.id)}
                    className="flex items-center gap-1.5 group"
                  >
                    {m.value ? (
                      <>
                        <span className="text-sm font-semibold text-[#1C1C1C]">{m.value}</span>
                        {m.previousValue && (
                          <>
                            <span className={`text-xs ${trend.color}`}>
                              {trend.direction === "up" && (
                                <svg className="w-3 h-3 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                                </svg>
                              )}
                              {trend.direction === "down" && (
                                <svg className="w-3 h-3 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                              )}
                            </span>
                            <span className="text-[10px] text-[#999]">was {m.previousValue}</span>
                          </>
                        )}
                      </>
                    ) : (
                      <span className="text-xs text-[#999] group-hover:text-[#6B8F71] transition-colors">
                        Click to log
                      </span>
                    )}
                  </button>
                )}

                {!DEFAULT_METRICS.find((d) => d.id === m.id) && (
                  <button
                    onClick={() => removeMetric(m.id)}
                    className="text-[#CCC] hover:text-red-400 shrink-0 transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Insights / Observations */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-[#6B8F71] uppercase tracking-wider mb-2">
          Insights & Observations
        </h4>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newInsight}
            onChange={(e) => setNewInsight(e.target.value)}
            placeholder="What's working? What needs attention?"
            className="flex-1 bg-white border border-[#E8E6E1] rounded-lg px-3 py-2 text-sm text-[#1C1C1C] placeholder-[#999] focus:outline-none focus:border-[#6B8F71]"
            onKeyDown={(e) => { if (e.key === "Enter") addInsight(); }}
          />
          <button
            onClick={addInsight}
            disabled={!newInsight.trim()}
            className="px-3 py-2 rounded-lg bg-[#6B8F71] text-white text-xs font-medium hover:bg-[#5A7D60] transition-colors disabled:opacity-50 shrink-0"
          >
            Add
          </button>
        </div>

        {insights.length > 0 && (
          <div className="space-y-1.5">
            {insights.slice(0, 5).map((insight) => (
              <div key={insight.id} className="px-3 py-2 rounded-lg border border-[#E8E6E1] bg-[#FAFAF8] flex items-start gap-2">
                <button
                  onClick={() => toggleInsightActionable(insight.id)}
                  className={`w-4 h-4 mt-0.5 rounded flex items-center justify-center shrink-0 transition-colors ${
                    !insight.actionable
                      ? "bg-[#6B8F71] text-white"
                      : "border border-[#E8E6E1] hover:border-[#6B8F71]"
                  }`}
                >
                  {!insight.actionable && (
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <p className={`text-xs flex-1 leading-relaxed ${!insight.actionable ? "text-[#999] line-through" : "text-[#1C1C1C]"}`}>
                  {insight.text}
                </p>
                <span className="text-[10px] text-[#CCC] shrink-0">{insight.date}</span>
                <button
                  onClick={() => removeInsight(insight.id)}
                  className="text-[#CCC] hover:text-red-400 shrink-0 transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            {insights.length > 5 && (
              <p className="text-xs text-[#999] text-center py-1">+{insights.length - 5} more insights</p>
            )}
          </div>
        )}
      </div>

      {/* Complete button */}
      {!isComplete ? (
        <button
          onClick={onComplete}
          className="mt-2 w-full px-4 py-2.5 rounded-lg bg-[#6B8F71] text-white text-sm font-medium hover:bg-[#5A7D60] transition-colors duration-200"
        >
          Mark Analytics Reviewed
        </button>
      ) : (
        <button
          onClick={onComplete}
          className="mt-2 w-full py-2.5 text-center rounded-lg bg-[#6B8F71]/5 hover:bg-[#6B8F71]/10 transition-colors"
        >
          <p className="text-sm text-[#6B8F71] font-medium">Analytics reviewed! (click to undo)</p>
        </button>
      )}
    </div>
  );
}
