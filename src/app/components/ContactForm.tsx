"use client";

import { useState } from "react";

const QUICK_OPTIONS = [
  "Data entry",
  "Compliance docs",
  "Client follow-ups",
  "Document processing",
  "Reporting",
  "Email management",
] as const;

export function ContactForm() {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.message.trim()) {
      setError("Please select at least one option or tell us what's slowing you down.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit inquiry");
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Submit error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOptionToggle = (option: string) => {
    const isSelected = formData.message.includes(option);
    if (isSelected) {
      const newMessage = formData.message
        .split(", ")
        .filter((item) => item !== option)
        .join(", ");
      setFormData((prev) => ({ ...prev, message: newMessage }));
    } else {
      const newMessage = formData.message
        ? `${formData.message}, ${option}`
        : option;
      setFormData((prev) => ({ ...prev, message: newMessage }));
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-6">
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#6B8F71]/10 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-[#6B8F71]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-[#1C1C1C]">
          You&apos;re all set
        </h3>
        <p className="text-[#888]">
          We&apos;ll be in touch soon to discuss how we can help.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-[#6B8F71]/10 flex items-center justify-center">
          <svg className="w-5 h-5 text-[#6B8F71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-[#1C1C1C]">Let&apos;s lighten the load</h2>
        </div>
      </div>
      <p className="text-[#888] mb-6 text-sm">
        Tell us what&apos;s weighing on your team. We&apos;ll show you how to lift it.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#555] mb-2">
            Quick select (click all that apply)
          </label>
          <div className="flex flex-wrap gap-2">
            {QUICK_OPTIONS.map((option) => {
              const isSelected = formData.message.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleOptionToggle(option)}
                  className={`px-3 py-1.5 text-sm rounded-full border transition-all duration-200 ${
                    isSelected
                      ? "bg-[#6B8F71] text-white border-[#6B8F71]"
                      : "bg-white text-[#555] border-[#E8E6E1] hover:border-[#6B8F71]/50"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#555] mb-1.5">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="you@yourfirm.com"
            className="w-full px-4 py-3 bg-[#FAFAF8] border border-[#E8E6E1] rounded-xl text-[#1C1C1C] placeholder-[#aaa] focus:outline-none focus:border-[#6B8F71] focus:ring-2 focus:ring-[#6B8F71]/20 transition-all duration-200"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-[#555] mb-1.5">
            Anything else? (optional)
          </label>
          <textarea
            id="message"
            rows={3}
            placeholder="Tell us more about your specific challenges..."
            className="w-full px-4 py-3 bg-[#FAFAF8] border border-[#E8E6E1] rounded-xl text-[#1C1C1C] placeholder-[#aaa] focus:outline-none focus:border-[#6B8F71] focus:ring-2 focus:ring-[#6B8F71]/20 transition-all duration-200 resize-none"
            value={formData.message}
            onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
          />
        </div>
        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2">{error}</p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 bg-[#D97757] text-white font-semibold rounded-xl hover:bg-[#C9684A] transition-all duration-200 hover:shadow-lg hover:shadow-[#D97757]/25 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Sending...
            </span>
          ) : (
            "Start the Conversation"
          )}
        </button>
      </form>
      <p className="text-xs text-[#aaa] text-center mt-4">
        No spam, ever. We&apos;ll reach out within 24 hours.
      </p>
    </>
  );
}
