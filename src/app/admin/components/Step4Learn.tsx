"use client";

import { useState } from "react";
import { getTodayLesson, type QuizQuestion } from "../data/lessons";
import Link from "next/link";

interface Step4LearnProps {
  onComplete: () => void;
  isComplete: boolean;
}

export default function Step4Learn({ onComplete, isComplete }: Step4LearnProps) {
  const lesson = getTodayLesson();
  const [answers, setAnswers] = useState<(number | null)[]>(
    lesson.quiz.map(() => null)
  );
  const [submitted, setSubmitted] = useState(false);

  const allCorrect = submitted && lesson.quiz.every((q, i) => answers[i] === q.correctIndex);
  const allAnswered = answers.every((a) => a !== null);

  const handleSelect = (questionIndex: number, optionIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[questionIndex] = optionIndex;
      return next;
    });
  };

  const handleSubmit = () => {
    if (!allAnswered) return;
    setSubmitted(true);
  };

  const handleRetry = () => {
    setAnswers(lesson.quiz.map(() => null));
    setSubmitted(false);
  };

  return (
    <div>
      {/* Concept badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="px-2.5 py-1 rounded-md bg-[#6B8F71]/10 text-xs font-medium text-[#6B8F71]">
          {lesson.concept}
        </span>
        <h4 className="text-sm font-semibold text-[#1C1C1C]">{lesson.title}</h4>
      </div>

      {/* Reading section */}
      <div className="mb-6 text-sm text-[#444] leading-relaxed space-y-3">
        {lesson.reading.split("\n\n").map((paragraph, i) => (
          <p key={i}>
            {paragraph.split(/(\*\*[^*]+\*\*|`[^`]+`)/).map((part, j) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return <strong key={j} className="font-semibold text-[#1C1C1C]">{part.slice(2, -2)}</strong>;
              }
              if (part.startsWith("`") && part.endsWith("`")) {
                return <code key={j} className="px-1.5 py-0.5 rounded bg-[#F0EFEC] text-[#1C1C1C] text-xs font-mono">{part.slice(1, -1)}</code>;
              }
              return part;
            })}
          </p>
        ))}
      </div>

      {/* Quiz */}
      <div className="border-t border-[#F0EFEC] pt-5">
        <p className="text-xs font-semibold text-[#6B8F71] uppercase tracking-[0.15em] mb-4">
          Quick Quiz
        </p>

        <div className="space-y-5">
          {lesson.quiz.map((q: QuizQuestion, qi: number) => (
            <QuizQuestionCard
              key={qi}
              question={q}
              questionIndex={qi}
              selectedAnswer={answers[qi]}
              submitted={submitted}
              onSelect={handleSelect}
            />
          ))}
        </div>

        {!submitted && (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="mt-5 w-full px-4 py-2.5 rounded-lg bg-[#6B8F71] text-white text-sm font-medium hover:bg-[#5A7D60] disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Check Answers
          </button>
        )}

        {submitted && !allCorrect && (
          <div className="mt-5">
            <p className="text-sm text-[#999] mb-2">
              {lesson.quiz.filter((q, i) => answers[i] === q.correctIndex).length} of {lesson.quiz.length} correct. Review the explanations and try again!
            </p>
            <button
              onClick={handleRetry}
              className="w-full px-4 py-2.5 rounded-lg border border-[#E8E6E1] text-sm font-medium text-[#666] hover:border-[#6B8F71] hover:text-[#6B8F71] transition-colors duration-200"
            >
              Retry Quiz
            </button>
          </div>
        )}

        {allCorrect && (
          <div className="mt-5">
            <div className="py-3 text-center rounded-lg bg-[#6B8F71]/5 mb-4">
              <p className="text-sm text-[#6B8F71] font-medium">All correct! Nice work.</p>
            </div>

            {/* Build challenge */}
            <div className="p-4 rounded-lg border border-[#E8E6E1] bg-[#FAFAF8]">
              <p className="text-xs font-semibold text-[#6B8F71] uppercase tracking-[0.15em] mb-2">
                Build Challenge
              </p>
              <p className="text-sm text-[#666] mb-3">{lesson.buildChallenge}</p>
              <Link
                href={`/agents/ray/chat`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6B8F71] text-white text-xs font-medium hover:bg-[#5A7D60] transition-colors duration-200"
              >
                Open Ray to Build
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            {!isComplete && (
              <button
                onClick={onComplete}
                className="mt-4 w-full px-4 py-2.5 rounded-lg bg-[#6B8F71] text-white text-sm font-medium hover:bg-[#5A7D60] transition-colors duration-200"
              >
                Mark Learning Complete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function QuizQuestionCard({
  question,
  questionIndex,
  selectedAnswer,
  submitted,
  onSelect,
}: {
  question: QuizQuestion;
  questionIndex: number;
  selectedAnswer: number | null;
  submitted: boolean;
  onSelect: (qi: number, oi: number) => void;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-[#1C1C1C] mb-2">
        {questionIndex + 1}. {question.question}
      </p>
      <div className="space-y-1.5">
        {question.options.map((option, oi) => {
          const isSelected = selectedAnswer === oi;
          const isCorrect = oi === question.correctIndex;
          let style = "border-[#E8E6E1] hover:border-[#6B8F71]/40";

          if (isSelected && !submitted) {
            style = "border-[#6B8F71] bg-[#6B8F71]/5";
          } else if (submitted && isCorrect) {
            style = "border-[#6B8F71] bg-[#6B8F71]/5";
          } else if (submitted && isSelected && !isCorrect) {
            style = "border-red-300 bg-red-50";
          }

          return (
            <button
              key={oi}
              onClick={() => onSelect(questionIndex, oi)}
              disabled={submitted}
              className={`w-full text-left px-3 py-2 rounded-lg border text-sm transition-colors duration-200 ${style} ${
                submitted ? "cursor-default" : "cursor-pointer"
              }`}
            >
              <span className={submitted && isCorrect ? "text-[#6B8F71] font-medium" : "text-[#444]"}>
                {option}
              </span>
            </button>
          );
        })}
      </div>
      {submitted && selectedAnswer !== null && (
        <p className={`text-xs mt-1.5 ${selectedAnswer === question.correctIndex ? "text-[#6B8F71]" : "text-red-500"}`}>
          {question.explanation}
        </p>
      )}
    </div>
  );
}
