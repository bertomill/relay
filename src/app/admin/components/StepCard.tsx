"use client";

import { useRef, useEffect, useState } from "react";

interface StepCardProps {
  stepNumber: number;
  label: string;
  title: string;
  timeEstimate: string;
  isComplete: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  badge?: React.ReactNode;
  children: React.ReactNode;
}

export default function StepCard({
  stepNumber,
  label,
  title,
  timeEstimate,
  isComplete,
  isExpanded,
  onToggle,
  badge,
  children,
}: StepCardProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isExpanded, children]);

  // Re-measure when inner content resizes (e.g. expanding a slot's details)
  useEffect(() => {
    const el = contentRef.current;
    if (!el || !isExpanded) return;

    const observer = new ResizeObserver(() => {
      setContentHeight(el.scrollHeight);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [isExpanded]);

  return (
    <div>
      <p className="text-xs font-semibold text-[#6B8F71] uppercase tracking-[0.15em] mb-2 ml-1">
        {label}
      </p>
      <div
        className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 ${
          isComplete
            ? "border-[#6B8F71]/30 border-l-4 border-l-[#6B8F71]"
            : "border-[#E8E6E1]"
        }`}
      >
        <button
          onClick={onToggle}
          className="w-full px-5 py-4 flex items-center gap-4 hover:bg-[#F5F4F1]/30 transition-colors duration-200"
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-semibold transition-colors duration-300 ${
              isComplete
                ? "bg-[#6B8F71] text-white"
                : "border-2 border-[#E8E6E1] text-[#999]"
            }`}
          >
            {isComplete ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              stepNumber
            )}
          </div>

          <div className="flex-1 text-left">
            <h3 className="text-[15px] font-semibold text-[#1C1C1C]">{title}</h3>
          </div>

          {badge && <div className="shrink-0">{badge}</div>}

          <span className="text-xs text-[#999] shrink-0">{timeEstimate}</span>

          <svg
            className={`w-4 h-4 text-[#999] shrink-0 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div
          style={{ maxHeight: isExpanded ? contentHeight : 0 }}
          className="transition-all duration-300 ease-in-out overflow-hidden"
        >
          <div ref={contentRef} className="px-5 pb-5 pt-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
