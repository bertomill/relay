"use client";

import { useState } from "react";
import { AnimateIn } from "./AnimateIn";

const FAQS = [
  {
    question: "What is Lighten AI?",
    answer:
      "Lighten AI is your fractional AI officer. We audit your operations, identify where AI can save time and money, and build custom AI agents that run your content, sales, support, and admin workflows — so your team can focus on what matters.",
  },
  {
    question: "Who is Lighten AI built for?",
    answer:
      "We work with small to mid-size businesses and teams that are growing fast but don't have the bandwidth to hire for every gap. If you're a founder, ops lead, or marketing director feeling stretched thin, we're built for you.",
  },
  {
    question: "How does it work?",
    answer:
      "We start with a content and operations audit to find where you're losing time and money. Then we build custom AI agents trained on your brand voice and workflows. You approve, they execute — from content creation to lead follow-up.",
  },
  {
    question: "Is there a free consultation?",
    answer:
      "Yes. We offer a free 30-minute strategy call where we walk through your current workflows, identify the biggest opportunities for AI, and show you exactly what the ROI would look like. No commitment required.",
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "We don't just build and disappear. Every engagement includes ongoing monitoring, quality checks, and monthly optimization. We treat your AI agents like living systems — they get better over time as we refine them alongside your business.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {FAQS.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <AnimateIn key={i} animation="fade-up" delay={i * 80}>
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-colors duration-200 hover:bg-white/[0.07]">
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between px-7 py-6 text-left cursor-pointer"
              >
                <span className="text-lg font-semibold pr-4">{faq.question}</span>
                <span className="flex-shrink-0 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-transform duration-300">
                  <svg
                    className={`w-5 h-5 text-white/70 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-7 pb-6 text-white/60 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          </AnimateIn>
        );
      })}
    </div>
  );
}
