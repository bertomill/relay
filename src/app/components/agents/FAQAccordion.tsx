"use client";

import { useState } from "react";
import type { AgentFAQ } from "@/lib/agents/types";

interface FAQAccordionProps {
  items: AgentFAQ[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="bg-white border border-[#E8E6E1] rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#FAFAF8] transition-colors"
            >
              <span className="text-sm font-medium text-[#1C1C1C] pr-4">
                {item.question}
              </span>
              <svg
                className={`w-4 h-4 text-[#999] shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            {isOpen && (
              <div className="px-5 pb-4">
                <p className="text-sm text-[#555] leading-relaxed">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
