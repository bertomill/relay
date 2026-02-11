"use client";

interface MorningProgressProps {
  stepsComplete: boolean[];
  completedCount: number;
}

const STEP_LABELS = ["Review", "Create", "Learn", "Improve", "Pipeline", "Clients", "Finance", "Analytics"];
const TIME_ESTIMATES = [5, 25, 15, 10, 10, 10, 5, 5]; // minutes per step

export default function MorningProgress({ stepsComplete, completedCount }: MorningProgressProps) {
  const totalSteps = stepsComplete.length;
  const remainingMinutes = TIME_ESTIMATES.reduce(
    (sum, mins, i) => sum + (stepsComplete[i] ? 0 : mins),
    0
  );

  return (
    <div className="mb-8">
      {/* Progress circles — two rows of 4 for clean layout */}
      <div className="flex flex-col items-center gap-2 mb-3">
        {[0, 4].map((rowStart) => (
          <div key={rowStart} className="flex items-center justify-center gap-0">
            {stepsComplete.slice(rowStart, rowStart + 4).map((complete, i) => {
              const idx = rowStart + i;
              return (
                <div key={idx} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-500 ${
                      complete
                        ? "bg-[#6B8F71] text-white shadow-sm shadow-[#6B8F71]/25"
                        : "border-2 border-[#E8E6E1] text-[#999] bg-white"
                    }`}
                  >
                    {complete ? (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      idx + 1
                    )}
                  </div>
                  {i < 3 && (
                    <div
                      className={`w-8 h-0.5 transition-colors duration-500 ${
                        complete ? "bg-[#6B8F71]" : "bg-[#E8E6E1]"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Labels — two rows of 4 */}
      <div className="flex flex-col items-center gap-1 mb-3">
        {[0, 4].map((rowStart) => (
          <div key={rowStart} className="flex items-center justify-center gap-0">
            {STEP_LABELS.slice(rowStart, rowStart + 4).map((label, i) => {
              const idx = rowStart + i;
              return (
                <div key={idx} className="flex items-center">
                  <span
                    className={`text-[10px] font-medium w-8 text-center ${
                      stepsComplete[idx] ? "text-[#6B8F71]" : "text-[#999]"
                    }`}
                  >
                    {label}
                  </span>
                  {i < 3 && <div className="w-8" />}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Status text */}
      <p className="text-center text-sm text-[#666]">
        {completedCount === totalSteps ? (
          <span className="text-[#6B8F71] font-medium">All done for today!</span>
        ) : (
          <>
            <span className="font-medium text-[#1C1C1C]">{completedCount} of {totalSteps}</span>
            {" complete"}
            {remainingMinutes > 0 && (
              <span className="text-[#999]"> &middot; ~{remainingMinutes} min remaining</span>
            )}
          </>
        )}
      </p>
    </div>
  );
}
