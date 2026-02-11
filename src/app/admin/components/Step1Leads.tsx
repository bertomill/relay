"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import WebsiteInquiriesTab from "./WebsiteInquiriesTab";
import SocialPlatformTab from "./SocialPlatformTab";

const TABS = [
  { key: "website", label: "Website" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "x", label: "X" },
  { key: "medium", label: "Medium" },
  { key: "youtube", label: "YouTube" },
  { key: "instagram", label: "Instagram" },
  { key: "tiktok", label: "TikTok" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

interface Step1LeadsProps {
  onComplete: () => void;
  isComplete: boolean;
  onNewCount?: (count: number) => void;
}

export default function Step1Leads({ onComplete, isComplete, onNewCount }: Step1LeadsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("website");
  const [counts, setCounts] = useState<Record<string, number>>({});

  const onNewCountRef = useRef(onNewCount);
  onNewCountRef.current = onNewCount;

  const handleCountChange = useCallback((tab: string, count: number) => {
    setCounts((prev) => ({ ...prev, [tab]: count }));
  }, []);

  // Report total count to parent
  useEffect(() => {
    const total = Object.values(counts).reduce((sum, c) => sum + c, 0);
    onNewCountRef.current?.(total);
  }, [counts]);

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 overflow-x-auto pb-3 mb-4 -mx-1 px-1 scrollbar-hide">
        {TABS.map((tab) => {
          const count = counts[tab.key] || 0;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors shrink-0 ${
                isActive
                  ? "bg-[#6B8F71] text-white"
                  : "bg-[#F5F4F0] text-[#666] hover:bg-[#ECEAE5] hover:text-[#1C1C1C]"
              }`}
            >
              {tab.label}
              {count > 0 && (
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold leading-none ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-[#6B8F71]/10 text-[#6B8F71]"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {activeTab === "website" ? (
        <WebsiteInquiriesTab
          onCountChange={(c) => handleCountChange("website", c)}
        />
      ) : (
        <SocialPlatformTab
          key={activeTab}
          platform={activeTab}
          onCountChange={(c) => handleCountChange(activeTab, c)}
        />
      )}

      {/* Mark Reviewed */}
      {!isComplete && (
        <button
          onClick={onComplete}
          className="mt-4 w-full px-4 py-2.5 rounded-lg bg-[#6B8F71] text-white text-sm font-medium hover:bg-[#5A7D60] transition-colors duration-200"
        >
          Mark Reviewed
        </button>
      )}
    </div>
  );
}
