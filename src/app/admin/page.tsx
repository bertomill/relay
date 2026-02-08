"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useDailyProgress, getTodayString } from "./hooks/useDailyProgress";
import MorningProgress from "./components/MorningProgress";
import StepCard from "./components/StepCard";
import Step1Inquiries from "./components/Step1Inquiries";
import Step2Outreach from "./components/Step2Outreach";
import Step3Content from "./components/Step3Content";
import Step4Learn from "./components/Step4Learn";
import Step5Improve from "./components/Step5Improve";

interface SuggestedContact {
  name: string;
  email: string;
}

function formatDateDisplay(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function shiftDate(dateStr: string, days: number): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [newInquiryCount, setNewInquiryCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [suggestedContacts, setSuggestedContacts] = useState<SuggestedContact[]>([]);
  const [selectedDate, setSelectedDate] = useState(getTodayString);
  const supabase = createClient();

  const {
    progress,
    stepsComplete,
    completedCount,
    totalSteps,
    outreachDoneCount,
    engagementDoneCount,
    isToday,
    markInquiriesReviewed,
    updateOutreachSlot,
    updateEngagementSlot,
    markContentCreated,
    markLearningCompleted,
    markWebsiteImproved,
  } = useDailyProgress(selectedDate);

  const goToPreviousDay = useCallback(() => {
    setSelectedDate((prev) => shiftDate(prev, -1));
  }, []);

  const goToNextDay = useCallback(() => {
    setSelectedDate((prev) => {
      const next = shiftDate(prev, 1);
      const today = getTodayString();
      return next > today ? prev : next;
    });
  }, []);

  const goToToday = useCallback(() => {
    setSelectedDate(getTodayString());
  }, []);

  // Auto-expand first incomplete step (only for today)
  useEffect(() => {
    if (!isLoading && isToday) {
      const firstIncomplete = stepsComplete.findIndex((s) => !s);
      setExpandedStep(firstIncomplete === -1 ? null : firstIncomplete);
    } else if (!isToday) {
      setExpandedStep(null);
    }
  }, [isLoading, stepsComplete, isToday]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // Fetch recent inquiries for suggested contacts
          const { data } = await supabase
            .from("inquiries")
            .select("email, first_name, last_name")
            .order("created_at", { ascending: false })
            .limit(5);

          if (data) {
            setSuggestedContacts(
              data.map((d) => ({
                name: [d.first_name, d.last_name].filter(Boolean).join(" "),
                email: d.email,
              }))
            );
          }

          // Fetch unaddressed feedback count
          const { count: fbCount } = await supabase
            .from("feedback")
            .select("id", { count: "exact", head: true })
            .eq("addressed", false);
          setFeedbackCount(fbCount ?? 0);
        }
      } catch (error) {
        console.error("Data fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleStep = useCallback((step: number) => {
    setExpandedStep((prev) => (prev === step ? null : step));
  }, []);

  const advanceToNext = useCallback((currentStep: number) => {
    const next = currentStep + 1;
    if (next < 5) {
      setExpandedStep(next);
    } else {
      setExpandedStep(null);
    }
  }, []);

  const handleInquiriesComplete = useCallback(() => {
    markInquiriesReviewed();
    advanceToNext(0);
  }, [markInquiriesReviewed, advanceToNext]);

  const handleContentComplete = useCallback(() => {
    markContentCreated();
    advanceToNext(2);
  }, [markContentCreated, advanceToNext]);

  const handleLearningComplete = useCallback(() => {
    markLearningCompleted();
    advanceToNext(3);
  }, [markLearningCompleted, advanceToNext]);

  const handleImproveComplete = useCallback(() => {
    markWebsiteImproved();
    advanceToNext(4);
  }, [markWebsiteImproved, advanceToNext]);

  // Greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#6B8F71] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 bg-[#6B8F71] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 bg-[#6B8F71] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Greeting + Date Navigation */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1C1C1C]">
          {isToday ? `${getGreeting()}, Robert.` : "Looking back"}
        </h1>

        <div className="flex items-center gap-3 mt-1">
          <button
            onClick={goToPreviousDay}
            className="p-1 text-[#999] hover:text-[#6B8F71] transition-colors rounded-lg hover:bg-[#6B8F71]/5"
            title="Previous day"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToToday}
            className={`text-sm transition-colors ${
              isToday ? "text-[#999]" : "text-[#6B8F71] hover:text-[#5A7D60] underline underline-offset-2"
            }`}
            disabled={isToday}
          >
            {formatDateDisplay(selectedDate)}
          </button>

          <button
            onClick={goToNextDay}
            disabled={isToday}
            className={`p-1 rounded-lg transition-colors ${
              isToday
                ? "text-[#E8E6E1] cursor-not-allowed"
                : "text-[#999] hover:text-[#6B8F71] hover:bg-[#6B8F71]/5"
            }`}
            title="Next day"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Past date banner */}
      {!isToday && (
        <div className="mb-6 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
          <p className="text-sm text-amber-700">
            Viewing {formatDateDisplay(selectedDate)}
          </p>
          <button
            onClick={goToToday}
            className="text-xs font-medium text-amber-700 hover:text-amber-900 underline underline-offset-2 transition-colors"
          >
            Back to today
          </button>
        </div>
      )}

      {/* Progress */}
      <MorningProgress stepsComplete={stepsComplete} completedCount={completedCount} />

      {/* All done celebration */}
      {completedCount === totalSteps && (
        <div className="mb-8 p-6 rounded-xl bg-[#6B8F71]/5 border border-[#6B8F71]/20 text-center">
          <div className="w-12 h-12 rounded-full bg-[#6B8F71] flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-[#1C1C1C] mb-1">
            {isToday ? "Morning routine complete!" : "This day was completed!"}
          </h2>
          <p className="text-sm text-[#666]">
            {isToday ? "Great start to your day. Everything's handled." : `All 5 steps were completed on ${formatDateDisplay(selectedDate)}.`}
          </p>
        </div>
      )}

      {/* Steps */}
      <div className="space-y-5">
        {/* Step 1: Check Inquiries */}
        <StepCard
          stepNumber={1}
          label="Review"
          title="Check Inquiries"
          timeEstimate="~5 min"
          isComplete={stepsComplete[0]}
          isExpanded={expandedStep === 0}
          onToggle={() => toggleStep(0)}
          badge={
            newInquiryCount > 0 && !stepsComplete[0] && isToday ? (
              <span className="px-2 py-0.5 rounded-full bg-[#6B8F71] text-white text-xs font-medium">
                {newInquiryCount} new
              </span>
            ) : undefined
          }
        >
          <Step1Inquiries
            onComplete={handleInquiriesComplete}
            isComplete={stepsComplete[0]}
            onNewCount={setNewInquiryCount}
          />
        </StepCard>

        {/* Step 2: Outreach */}
        <StepCard
          stepNumber={2}
          label="Outreach"
          title="Daily LinkedIn Playbook"
          timeEstimate="~20 min"
          isComplete={stepsComplete[1]}
          isExpanded={expandedStep === 1}
          onToggle={() => toggleStep(1)}
          badge={
            !stepsComplete[1] ? (
              <span className="text-xs text-[#999]">
                {outreachDoneCount}/5 outreach · {engagementDoneCount}/3 engaged
              </span>
            ) : (
              <span className="text-xs text-[#999]">
                {outreachDoneCount}/5 · {engagementDoneCount}/3
              </span>
            )
          }
        >
          <Step2Outreach
            slots={progress.outreachSlots}
            onUpdateSlot={updateOutreachSlot}
            engagementSlots={progress.engagementSlots}
            onUpdateEngagement={updateEngagementSlot}
            suggestedContacts={suggestedContacts}
          />
        </StepCard>

        {/* Step 3: Content */}
        <StepCard
          stepNumber={3}
          label="Create"
          title="Build LinkedIn Content"
          timeEstimate="~25 min"
          isComplete={stepsComplete[2]}
          isExpanded={expandedStep === 2}
          onToggle={() => toggleStep(2)}
        >
          <Step3Content
            onComplete={handleContentComplete}
            isComplete={stepsComplete[2]}
          />
        </StepCard>

        {/* Step 4: Learn */}
        <StepCard
          stepNumber={4}
          label="Learn"
          title="Learn & Build Agents"
          timeEstimate="~15 min"
          isComplete={stepsComplete[3]}
          isExpanded={expandedStep === 3}
          onToggle={() => toggleStep(3)}
        >
          <Step4Learn
            onComplete={handleLearningComplete}
            isComplete={stepsComplete[3]}
          />
        </StepCard>

        {/* Step 5: Improve */}
        <StepCard
          stepNumber={5}
          label="Improve"
          title="Improve the Website"
          timeEstimate="~10 min"
          isComplete={stepsComplete[4]}
          isExpanded={expandedStep === 4}
          onToggle={() => toggleStep(4)}
          badge={
            feedbackCount > 0 && !stepsComplete[4] && isToday ? (
              <span className="px-2 py-0.5 rounded-full bg-[#6B8F71] text-white text-xs font-medium">
                {feedbackCount} open
              </span>
            ) : undefined
          }
        >
          <Step5Improve
            onComplete={handleImproveComplete}
            isComplete={stepsComplete[4]}
          />
        </StepCard>
      </div>
    </div>
  );
}
