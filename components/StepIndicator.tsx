"use client";

interface Step {
  label: string;
  icon: string;
}

const STEPS: Step[] = [
  { label: "Garment", icon: "👗" },
  { label: "Use", icon: "🎯" },
  { label: "Skill", icon: "✂️" },
  { label: "Measure", icon: "📏" },
  { label: "Body", icon: "📐" },
  { label: "Material", icon: "🧵" },
];

interface StepIndicatorProps {
  currentStep: number; // 1-based
  totalSteps: number;
}

export default function StepIndicator({
  currentStep,
  totalSteps,
}: StepIndicatorProps) {
  return (
    <div className="mb-8">
      {/* Step pills */}
      <div className="flex items-center justify-between relative">
        {/* Connector line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-neutral-90 -z-0" />
        <div
          className="absolute top-5 left-0 h-0.5 bg-primary-40 transition-all duration-500 -z-0"
          style={{
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
          }}
        />

        {STEPS.slice(0, totalSteps).map((step, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;

          return (
            <div
              key={step.label}
              className="flex flex-col items-center gap-2 z-10"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 border-2 ${
                  isCompleted
                    ? "bg-primary-40 border-primary-40 text-white shadow-md"
                    : isActive
                    ? "bg-white border-primary-40 text-primary-40 shadow-lg ring-4 ring-primary-90"
                    : "bg-white border-neutral-90 text-neutral-50"
                }`}
              >
                {isCompleted ? "✓" : step.icon}
              </div>
              <span
                className={`text-xs font-medium hidden sm:block ${
                  isActive
                    ? "text-primary-40"
                    : isCompleted
                    ? "text-primary-50"
                    : "text-neutral-50"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step count */}
      <p className="text-center text-sm text-neutral-50 mt-4">
        Step{" "}
        <span className="font-semibold text-primary-40">{currentStep}</span> of{" "}
        {totalSteps}
      </p>
    </div>
  );
}
