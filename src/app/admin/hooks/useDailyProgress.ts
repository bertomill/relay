"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

interface DailyProgressState {
  date: string;
  inquiriesReviewed: boolean;
  contentCreated: boolean;
  learningCompleted: boolean;
  newsRead: boolean;
  agentCreated: boolean;
  websiteImproved: boolean;
  visualsGenerated: boolean;
}

const LOCAL_STORAGE_KEY = "lighten-morning-dashboard";

function getTodayString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDefaultState(date: string): DailyProgressState {
  return {
    date,
    inquiriesReviewed: false,
    contentCreated: false,
    learningCompleted: false,
    newsRead: false,
    agentCreated: false,
    websiteImproved: false,
    visualsGenerated: false,
  };
}

function isValidState(parsed: Record<string, unknown>): boolean {
  return typeof parsed.inquiriesReviewed === "boolean" &&
    typeof parsed.contentCreated === "boolean" &&
    typeof parsed.learningCompleted === "boolean" &&
    typeof parsed.websiteImproved === "boolean";
  // Note: agentCreated may be missing from older saved states — handled via defaults
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
          const raw = data.progress as Record<string, unknown>;
          const loaded: DailyProgressState = {
            ...getDefaultState(selectedDate),
            ...(raw as Partial<DailyProgressState>),
            date: selectedDate,
          };
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

  const markContentCreated = useCallback(() => {
    update((prev) => ({ ...prev, contentCreated: !prev.contentCreated }));
  }, [update]);

  const markLearningCompleted = useCallback(() => {
    update((prev) => ({ ...prev, learningCompleted: !prev.learningCompleted }));
  }, [update]);

  const markAgentCreated = useCallback(() => {
    update((prev) => ({ ...prev, agentCreated: !prev.agentCreated }));
  }, [update]);

  const markWebsiteImproved = useCallback(() => {
    update((prev) => ({ ...prev, websiteImproved: !prev.websiteImproved }));
  }, [update]);

  const markVisualsGenerated = useCallback(() => {
    update((prev) => ({ ...prev, visualsGenerated: !prev.visualsGenerated }));
  }, [update]);

  const markNewsRead = useCallback(() => {
    update((prev) => ({ ...prev, newsRead: !prev.newsRead }));
  }, [update]);

  // Order: Learn, News, Create Agent, Create Content, Review Leads, Improve Website, Generate Visuals
  const stepsComplete = [
    progress.learningCompleted,
    progress.newsRead ?? false,
    progress.agentCreated ?? false,
    progress.contentCreated,
    progress.inquiriesReviewed,
    progress.websiteImproved,
    progress.visualsGenerated ?? false,
  ];

  const completedCount = stepsComplete.filter(Boolean).length;

  return {
    progress,
    stepsComplete,
    completedCount,
    totalSteps: 7,
    isToday,
    isLoadingProgress,
    markInquiriesReviewed,
    markContentCreated,
    markLearningCompleted,
    markNewsRead,
    markAgentCreated,
    markWebsiteImproved,
    markVisualsGenerated,
  };
}

export { getTodayString };
export type { DailyProgressState };

// Types used by Step2Outreach
export type OutreachType = "warm" | "cold" | "referral" | "";
export type OutreachCategory = "notification" | "feed" | "search" | "inquiry" | "reengage";

export interface OutreachSlot {
  done: boolean;
  name: string;
  type: OutreachType;
  category: OutreachCategory;
  linkedinUrl: string;
  notes: string;
}

export interface EngagementSlot {
  done: boolean;
  targetName: string;
}
