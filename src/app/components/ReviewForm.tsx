"use client";

import { useState } from "react";

export function ReviewForm() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !message.trim()) return;

    setStatus("sending");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, rating, message }),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex items-center gap-2 mt-6">
        <div className="w-5 h-5 rounded-full bg-[#6B8F71] flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="text-sm text-[#1C1C1C] font-medium">Thanks for your review!</span>
      </div>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="mt-6 inline-flex items-center gap-2 text-sm text-[#666] hover:text-[#1C1C1C] transition-colors cursor-pointer"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
        Leave a review
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 bg-white border border-[#E8E6E1] rounded-2xl p-5 max-w-sm space-y-3">
      {/* Star rating */}
      <div>
        <p className="text-xs font-semibold text-[#999] uppercase tracking-[0.15em] mb-2">Rating</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="cursor-pointer"
            >
              <svg
                className={`w-6 h-6 transition-colors ${star <= rating ? "text-[#6B8F71] fill-[#6B8F71]" : "text-[#d5d3cd]"}`}
                fill={star <= rating ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name (optional)"
        className="w-full py-2.5 px-4 bg-[#F5F4F1] text-sm text-[#1C1C1C] placeholder-[#aaa] rounded-full border border-[#E8E6E1] focus:outline-none focus:border-[#6B8F71]"
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email (optional)"
        className="w-full py-2.5 px-4 bg-[#F5F4F1] text-sm text-[#1C1C1C] placeholder-[#aaa] rounded-full border border-[#E8E6E1] focus:outline-none focus:border-[#6B8F71]"
      />

      <textarea
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Tell us about your experience"
        rows={3}
        className="w-full py-2.5 px-4 bg-[#F5F4F1] text-sm text-[#1C1C1C] placeholder-[#aaa] rounded-xl border border-[#E8E6E1] focus:outline-none focus:border-[#6B8F71] resize-none"
      />

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={status === "sending" || !rating || !message.trim()}
          className="px-6 py-2.5 bg-[#1C1C1C] text-white text-xs font-semibold uppercase tracking-[0.1em] rounded-full hover:bg-[#333] disabled:opacity-40 transition-all duration-200 cursor-pointer"
        >
          {status === "sending" ? "Submitting..." : "Submit Review"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-xs text-[#999] hover:text-[#666] transition-colors cursor-pointer"
        >
          Cancel
        </button>
        {status === "error" && (
          <span className="text-xs text-red-500">Something went wrong. Try again.</span>
        )}
      </div>
    </form>
  );
}
