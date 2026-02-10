"use client";

import { useState } from "react";

const CATEGORIES = [
  { value: "improvement", label: "Improvement" },
  { value: "bug", label: "Bug" },
  { value: "feature", label: "Feature Request" },
  { value: "other", label: "Other" },
];

export default function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("improvement");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorDetail, setErrorDetail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus("sending");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message.trim(),
          category,
          email: email || null,
          page_url: window.location.href,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(
          body ? JSON.stringify(body) : `HTTP ${res.status}`
        );
      }

      setStatus("success");
      setMessage("");
      setEmail("");
      setCategory("improvement");
      setTimeout(() => {
        setIsOpen(false);
        setStatus("idle");
      }, 2000);
    } catch (err) {
      setErrorDetail(err instanceof Error ? err.message : "Unknown error");
      setStatus("error");
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 z-50 w-11 h-11 rounded-full bg-[#6B8F71] text-white shadow-lg shadow-[#6B8F71]/25 hover:bg-[#5A7D60] transition-all duration-200 flex items-center justify-center"
        aria-label="Send feedback"
      >
        {isOpen ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        )}
      </button>

      {/* Form panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 z-50 w-80 bg-white border border-[#E8E6E1] rounded-xl shadow-xl overflow-hidden animate-in slide-in-from-bottom-2 duration-200">
          <div className="px-4 py-3 border-b border-[#E8E6E1]">
            <h3 className="text-sm font-semibold text-[#1C1C1C]">Send Feedback</h3>
            <p className="text-xs text-[#999] mt-0.5">Help us improve the website</p>
          </div>

          {status === "success" ? (
            <div className="px-4 py-8 text-center">
              <div className="w-10 h-10 rounded-full bg-[#6B8F71]/10 flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-[#6B8F71]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm font-medium text-[#1C1C1C]">Thanks for your feedback!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              {/* Category */}
              <div>
                <label className="text-xs font-medium text-[#666] mb-1 block">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#E8E6E1] text-sm text-[#1C1C1C] bg-white focus:outline-none focus:border-[#6B8F71] transition-colors"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="text-xs font-medium text-[#666] mb-1 block">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What could we do better?"
                  rows={3}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-[#E8E6E1] text-sm text-[#1C1C1C] placeholder:text-[#CCC] resize-none focus:outline-none focus:border-[#6B8F71] transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-xs font-medium text-[#666] mb-1 block">
                  Email <span className="text-[#CCC]">(optional)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3 py-1.5 rounded-lg border border-[#E8E6E1] text-sm text-[#1C1C1C] placeholder:text-[#CCC] focus:outline-none focus:border-[#6B8F71] transition-colors"
                />
              </div>

              {status === "error" && (
                <div className="text-xs text-red-500 space-y-1">
                  <p>Something went wrong. Please try again.</p>
                  {errorDetail && (
                    <pre className="bg-red-50 rounded p-2 overflow-x-auto whitespace-pre-wrap break-all text-[10px] text-red-600 max-h-24 overflow-y-auto">
                      {errorDetail}
                    </pre>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={!message.trim() || status === "sending"}
                className="w-full px-4 py-2 rounded-lg bg-[#6B8F71] text-white text-sm font-medium hover:bg-[#5A7D60] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {status === "sending" ? "Sending..." : "Submit Feedback"}
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
