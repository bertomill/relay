"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

type OutreachType = "warm" | "cold" | "referral" | "";
type OutreachCategory = "notification" | "feed" | "search" | "inquiry" | "reengage";

interface OutreachSlot {
  name: string;
  done: boolean;
  type: OutreachType;
  linkedinUrl: string;
  notes: string;
  category: OutreachCategory;
}

interface EngagementSlot {
  targetName: string;
  done: boolean;
}

interface DailyProgressState {
  date: string;
  inquiriesReviewed: boolean;
  outreachSlots: [OutreachSlot, OutreachSlot, OutreachSlot, OutreachSlot, OutreachSlot];
  engagementSlots: [EngagementSlot, EngagementSlot, EngagementSlot];
  contentCreated: boolean;
  learningCompleted: boolean;
  websiteImproved: boolean;
}

const LOCAL_STORAGE_KEY = "lighten-morning-dashboard";

function getTodayString(): string {
  return new Date().toISOString().split("T")[0];
}

function getDefaultState(date: string): DailyProgressState {
  return {
    date,
    inquiriesReviewed: false,
    outreachSlots: [
      { name: "", done: false, type: "warm", linkedinUrl: "", notes: "", category: "notification" },
      { name: "", done: false, type: "", linkedinUrl: "", notes: "", category: "feed" },
      { name: "", done: false, type: "cold", linkedinUrl: "", notes: "", category: "search" },
      { name: "", done: false, type: "warm", linkedinUrl: "", notes: "", category: "inquiry" },
      { name: "", done: false, type: "", linkedinUrl: "", notes: "", category: "reengage" },
    ],
    engagementSlots: [
      { targetName: "", done: false },
      { targetName: "", done: false },
      { targetName: "", done: false },
    ],
    contentCreated: false,
    learningCompleted: false,
    websiteImproved: false,
  };
}

function isValidState(parsed: Record<string, unknown>): boolean {
  if (!parsed.outreachSlots || !Array.isArray(parsed.outreachSlots)) return false;
  if (parsed.outreachSlots.length !== 5) return false;
  if (!parsed.outreachSlots.every((s: Record<string, unknown>) => "category" in s)) return false;
  if (!parsed.engagementSlots || !Array.isArray(parsed.engagementSlots)) return false;
  if (parsed.engagementSlots.length !== 3) return false;
  return true;
}

function loadFromLocalStorage(date: string): DailyProgressState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.date !== date) return null;
    if (!isValidState(parsed)) return null;
    return parsed as DailyProgressState;
  } catch {
    return null;
  }
}

function saveToLocalStorage(state: DailyProgressState) {
  if (typeof window === "undefined") return;
  // Only cache today in localStorage
  if (state.date === getTodayString()) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }
}

export function useDailyProgress(selectedDate: string = getTodayString()) {
  const [progress, setProgress] = useState<DailyProgressState>(() => getDefaultState(selectedDate));
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);
  const supabase = createClient();
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isToday = selectedDate === getTodayString();

  // Load progress when date changes
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoadingProgress(true);

      // For today, try localStorage first for instant load
      if (isToday) {
        const cached = loadFromLocalStorage(selectedDate);
        if (cached && !cancelled) {
          setProgress(cached);
        }
      }

      // Then load from Supabase (authoritative)
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user || cancelled) {
          setIsLoadingProgress(false);
          return;
        }

        const { data } = await supabase
          .from("daily_progress")
          .select("progress")
          .eq("user_id", user.id)
          .eq("date", selectedDate)
          .single();

        if (cancelled) return;

        if (data?.progress && isValidState(data.progress as Record<string, unknown>)) {
          const loaded = { ...(data.progress as DailyProgressState), date: selectedDate };
          setProgress(loaded);
          if (isToday) saveToLocalStorage(loaded);
        } else {
          // No Supabase data for this date
          setProgress(getDefaultState(selectedDate));
        }
      } catch {
        // Supabase fetch failed, keep what we have
        if (cancelled) return;
        if (!isToday) {
          setProgress(getDefaultState(selectedDate));
        }
      } finally {
        if (!cancelled) setIsLoadingProgress(false);
      }
    }

    load();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, isToday]);

  // Debounced save to Supabase
  const saveToSupabase = useCallback(
    (state: DailyProgressState) => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(async () => {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) return;

          await supabase
            .from("daily_progress")
            .upsert(
              {
                user_id: user.id,
                date: state.date,
                progress: state,
                updated_at: new Date().toISOString(),
              },
              { onConflict: "user_id,date" }
            );
        } catch (err) {
          console.error("Failed to save daily progress:", err);
        }
      }, 500);
    },
    [supabase]
  );

  const update = useCallback(
    (updater: (prev: DailyProgressState) => DailyProgressState) => {
      setProgress((prev) => {
        const next = updater(prev);
        saveToLocalStorage(next);
        saveToSupabase(next);
        return next;
      });
    },
    [saveToSupabase]
  );

  const markInquiriesReviewed = useCallback(() => {
    update((prev) => ({ ...prev, inquiriesReviewed: !prev.inquiriesReviewed }));
  }, [update]);

  const updateOutreachSlot = useCallback(
    (index: 0 | 1 | 2 | 3 | 4, slot: Partial<OutreachSlot>) => {
      update((prev) => {
        const slots = [...prev.outreachSlots] as DailyProgressState["outreachSlots"];
        slots[index] = { ...slots[index], ...slot };
        return { ...prev, outreachSlots: slots };
      });
    },
    [update]
  );

  const updateEngagementSlot = useCallback(
    (index: 0 | 1 | 2, slot: Partial<EngagementSlot>) => {
      update((prev) => {
        const slots = [...prev.engagementSlots] as DailyProgressState["engagementSlots"];
        slots[index] = { ...slots[index], ...slot };
        return { ...prev, engagementSlots: slots };
      });
    },
    [update]
  );

  const markContentCreated = useCallback(() => {
    update((prev) => ({ ...prev, contentCreated: !prev.contentCreated }));
  }, [update]);

  const markLearningCompleted = useCallback(() => {
    update((prev) => ({ ...prev, learningCompleted: !prev.learningCompleted }));
  }, [update]);

  const markWebsiteImproved = useCallback(() => {
    update((prev) => ({ ...prev, websiteImproved: !prev.websiteImproved }));
  }, [update]);

  // Outreach step is complete when 3+ of 5 slots are done
  const outreachDoneCount = progress.outreachSlots.filter((s) => s.done).length;
  const outreachComplete = outreachDoneCount >= 3;
  const engagementDoneCount = progress.engagementSlots.filter((s) => s.done).length;

  const completedCount = [
    progress.inquiriesReviewed,
    outreachComplete,
    progress.contentCreated,
    progress.learningCompleted,
    progress.websiteImproved,
  ].filter(Boolean).length;

  const stepsComplete = [
    progress.inquiriesReviewed,
    outreachComplete,
    progress.contentCreated,
    progress.learningCompleted,
    progress.websiteImproved,
  ];

  return {
    progress,
    stepsComplete,
    completedCount,
    totalSteps: 5,
    outreachDoneCount,
    engagementDoneCount,
    isToday,
    isLoadingProgress,
    markInquiriesReviewed,
    updateOutreachSlot,
    updateEngagementSlot,
    markContentCreated,
    markLearningCompleted,
    markWebsiteImproved,
  };
}

export { getTodayString };
export type { OutreachSlot, OutreachType, OutreachCategory, EngagementSlot, DailyProgressState };
