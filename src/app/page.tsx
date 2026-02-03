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
    <div className="min-h-screen bg-[#FAFAF8] text-[#1C1C1C] relative overflow-hidden">
      {/* Soft background gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#6B8F71] opacity-[0.06] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#D4E5D7] opacity-[0.15] blur-[120px] rounded-full pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-50 border-b border-[#E8E6E1]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* Feather Logo */}
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21 3C17 3 13 7 10 12C7 17 6 21 6 25L8 23C9 20 11 16 14 12C17 8 20 6 23 6L21 3Z"
                fill="#6B8F71"
              />
              <path
                d="M6 25C6 25 8 24 11 21C14 18 17 14 19 10C21 6 21 3 21 3"
                stroke="#6B8F71"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M6 25L14 17"
                stroke="#6B8F71"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-xl font-semibold tracking-tight text-[#1C1C1C]">Lighten AI</span>
          </div>
          <div className="flex items-center gap-8">
            <Link
              href="/learn"
              className="text-sm text-[#666] hover:text-[#6B8F71] transition-colors duration-200 cursor-pointer"
            >
              Learn
            </Link>
            <Link
              href="/agents"
              className="text-sm text-[#666] hover:text-[#6B8F71] transition-colors duration-200 cursor-pointer"
            >
              Agents
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 min-h-screen flex flex-col">
        {/* Hero Section with Form */}
        <section className="py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Headline */}
            <div>
              <h1 className="text-4xl md:text-5xl xl:text-[3.5rem] font-bold tracking-tight leading-[1.1] mb-6 text-[#1C1C1C]">
                Work should feel{" "}
                <span className="text-[#6B8F71]">lighter.</span>
              </h1>
              <p className="text-lg md:text-xl text-[#555] leading-relaxed mb-8">
                We build AI agents that carry the load — so you can move faster, think bigger, and do more of what matters.
              </p>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[#777]">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#6B8F71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                  <span>Custom-built for your firm</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#6B8F71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Hours back, every week</span>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:pl-8">
              <div className="bg-white rounded-3xl p-8 shadow-xl shadow-[#6B8F71]/8 border border-[#E8E6E1]">
                {!submitted ? (
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
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-[#555] mb-1.5">
                          What&apos;s slowing your team down?
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={3}
                          placeholder="Data entry, compliance docs, client follow-ups..."
                          className="w-full px-4 py-3 bg-[#FAFAF8] border border-[#E8E6E1] rounded-xl text-[#1C1C1C] placeholder-[#aaa] focus:outline-none focus:border-[#6B8F71] focus:ring-2 focus:ring-[#6B8F71]/20 transition-all duration-200 resize-none"
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
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
                ) : (
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
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="flex-1">
          {/* The Result - Cards first for impact */}
          <section className="py-16">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="group bg-white border border-[#E8E6E1] hover:border-[#6B8F71]/40 rounded-2xl p-8 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-[#6B8F71]/8">
                <div className="w-12 h-12 rounded-xl bg-[#6B8F71]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-[#6B8F71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#1C1C1C]">Partners move faster</h3>
                <p className="text-[#666] leading-relaxed">More time for strategy, clients, and the work that actually grows your firm.</p>
              </div>

              {/* Card 2 */}
              <div className="group bg-white border border-[#E8E6E1] hover:border-[#6B8F71]/40 rounded-2xl p-8 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-[#6B8F71]/8">
                <div className="w-12 h-12 rounded-xl bg-[#6B8F71]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-[#6B8F71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#1C1C1C]">Managers breathe easier</h3>
                <p className="text-[#666] leading-relaxed">Scale output without scaling stress. Your team does more, not more hours.</p>
              </div>

              {/* Card 3 */}
              <div className="group bg-white border border-[#E8E6E1] hover:border-[#6B8F71]/40 rounded-2xl p-8 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-[#6B8F71]/8">
                <div className="w-12 h-12 rounded-xl bg-[#6B8F71]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-[#6B8F71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#1C1C1C]">Staff do meaningful work</h3>
                <p className="text-[#666] leading-relaxed">Less busywork, more growth. The kind of work people actually want to do.</p>
              </div>
            </div>

            <p className="text-lg text-[#555] mt-10 max-w-2xl">
              A lighter firm is a better firm — more responsive, more profitable, and somewhere people actually want to be.
            </p>
          </section>

          {/* The problem & solution */}
          <section className="py-16 border-t border-[#E8E6E1]">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Problem */}
              <div className="bg-[#F5F4F1] rounded-2xl p-8 lg:p-10">
                <span className="inline-block text-xs font-semibold text-[#999] uppercase tracking-[0.15em] mb-4">The Problem</span>
                <h3 className="text-2xl font-bold mb-4 text-[#1C1C1C]">Every hour on repetitive work is weight that slows everything down.</h3>
                <p className="text-[#666] leading-relaxed mb-4">
                  Compliance, manual data entry, routine client requests — it&apos;s all weight you&apos;re carrying that keeps you from the work that matters.
                </p>
                <p className="text-[#1C1C1C] font-semibold">You didn&apos;t build your practice to grind. You built it to grow.</p>
              </div>

              {/* Solution */}
              <div className="bg-white border border-[#E8E6E1] rounded-2xl p-8 lg:p-10">
                <span className="inline-block text-xs font-semibold text-[#6B8F71] uppercase tracking-[0.15em] mb-4">What We Do</span>
                <h3 className="text-2xl font-bold mb-4 text-[#1C1C1C]">Custom agents for how your team actually works.</h3>
                <p className="text-[#666] leading-relaxed mb-4">
                  Lighten AI designs and deploys AI agents tailored to your firm&apos;s workflows — document intake, client correspondence, first-pass analysis.
                </p>
                <p className="text-[#1C1C1C] font-semibold">Not generic chatbots. Custom agents trained on how your team actually works.</p>
              </div>
            </div>
          </section>

          {/* Who we serve */}
          <section className="py-16 border-t border-[#E8E6E1]">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block text-xs font-semibold text-[#6B8F71] uppercase tracking-[0.15em] mb-4">Who We Serve</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1C1C]">
                Businesses ready to punch above their weight.
              </h2>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-16 border-t border-[#E8E6E1]">
            <div className="bg-[#6B8F71] rounded-3xl p-10 lg:p-14 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to feel lighter?</h2>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                Let&apos;s talk about what&apos;s weighing your team down — and how to lift it.
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-8 py-4 bg-white text-[#6B8F71] font-semibold rounded-xl hover:bg-white/90 transition-all duration-200 cursor-pointer active:scale-[0.98]"
              >
                Get in touch
              </button>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="pt-12 pb-6 border-t border-[#E8E6E1]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              {/* Feather Logo Small */}
              <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21 3C17 3 13 7 10 12C7 17 6 21 6 25L8 23C9 20 11 16 14 12C17 8 20 6 23 6L21 3Z"
                  fill="#6B8F71"
                />
                <path
                  d="M6 25C6 25 8 24 11 21C14 18 17 14 19 10C21 6 21 3 21 3"
                  stroke="#6B8F71"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M6 25L14 17"
                  stroke="#6B8F71"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-sm text-[#888]">&copy; 2025 Lighten AI</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-[#999]">
              <span className="hover:text-[#666] transition-colors cursor-pointer">Privacy</span>
              <span className="hover:text-[#666] transition-colors cursor-pointer">Terms</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
