"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa] relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#d4a574] opacity-[0.07] blur-[120px] rounded-full" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#b8845f] opacity-[0.05] blur-[100px] rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#141414"/>
              <circle cx="10.5" cy="11" r="3.5" fill="#d4a574"/>
              <circle cx="21.5" cy="21" r="3.5" fill="#d4a574"/>
              <path d="M13 13.5L19 18.5" stroke="#d4a574" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="21.5" cy="11" r="2" fill="#d4a574" fillOpacity="0.4"/>
              <circle cx="10.5" cy="21" r="2" fill="#d4a574" fillOpacity="0.4"/>
            </svg>
            <span className="text-xl font-semibold tracking-tight">Relay</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/learn"
              className="text-[#a1a1a1] hover:text-[#d4a574] transition-colors"
            >
              Learn
            </Link>
            <Link
              href="/agents"
              className="text-[#a1a1a1] hover:text-[#d4a574] transition-colors"
            >
              Agents
            </Link>
            <span className="flex items-center gap-2 text-[#737373]">
              <span className="w-2 h-2 bg-[#d4a574] rounded-full animate-pulse" />
              Claude Agents SDK
            </span>
          </div>
        </header>

        {/* Main content - Hero + Form side by side */}
        <main className="flex-1 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left - Hero */}
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1]">
              Build intelligent
              <br />
              agents with{" "}
              <span className="bg-gradient-to-r from-[#d4a574] via-[#c9956c] to-[#b8845f] bg-clip-text text-transparent">
                Claude
              </span>
            </h1>
            <p className="text-lg text-[#a1a1a1] max-w-md">
              We consult on agentic AI projects, helping teams design and ship
              production-ready agents with the Claude Agents SDK.
            </p>

            {/* What we do */}
            <div className="pt-6 space-y-4 max-w-md">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#d4a574]/20 to-[#b8845f]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[#d4a574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611l-.573.095a9.045 9.045 0 01-7.124 0l-.573-.095c-1.717-.293-2.299-2.379-1.067-3.611L5 14.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#fafafa]">Architecture & Design</h3>
                  <p className="text-sm text-[#737373]">Plan your agent system from tools to workflows</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#d4a574]/20 to-[#b8845f]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[#d4a574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#fafafa]">Development & Integration</h3>
                  <p className="text-sm text-[#737373]">Build and connect agents to your systems</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#d4a574]/20 to-[#b8845f]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[#d4a574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#fafafa]">Launch & Scale</h3>
                  <p className="text-sm text-[#737373]">Deploy with confidence, optimize as you grow</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Inquiry Form */}
          <div className="w-full lg:w-[420px] shrink-0">
            <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/50">
              {!submitted ? (
                <>
                  <h2 className="text-xl font-semibold mb-1">Get in touch</h2>
                  <p className="text-sm text-[#737373] mb-6">
                    Tell us what you&apos;re building.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#262626] rounded-lg text-[#fafafa] placeholder-[#525252] focus:outline-none focus:border-[#d4a574] transition-colors text-sm"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <textarea
                        required
                        rows={3}
                        placeholder="What do you want to build?"
                        className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#262626] rounded-lg text-[#fafafa] placeholder-[#525252] focus:outline-none focus:border-[#d4a574] transition-colors resize-none text-sm"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                      />
                    </div>
                    {error && (
                      <p className="text-sm text-red-400 text-center">{error}</p>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-gradient-to-r from-[#d4a574] to-[#b8845f] text-[#0a0a0a] font-semibold rounded-lg hover:opacity-90 transition-all hover:shadow-lg hover:shadow-[#d4a574]/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : "Send Inquiry"}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#d4a574] to-[#b8845f] flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-[#0a0a0a]"
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
                  <h3 className="text-lg font-semibold mb-1">
                    We&apos;ll be in touch
                  </h3>
                  <p className="text-sm text-[#737373]">
                    Thanks for reaching out.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="pt-8 text-[#404040] text-xs">
          <p>&copy; 2025 Relay</p>
        </footer>
      </div>
    </div>
  );
}
