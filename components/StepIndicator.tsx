"use client";

const STEPS = [
  { label: "Garment", short: "GAR." },
  { label: "Use",     short: "USE." },
  { label: "Skill",   short: "SKL." },
  { label: "Source",  short: "SRC." },
  { label: "Body",    short: "BDY." },
  { label: "Fabric",  short: "FAB." },
];

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({
  currentStep,
  totalSteps,
}: StepIndicatorProps) {
  return (
    <div className="step-tabs" role="tablist" aria-label="Form steps">
      {STEPS.slice(0, totalSteps).map((step, idx) => {
        const stepNum = idx + 1;
        const isCompleted = stepNum < currentStep;
        const isActive    = stepNum === currentStep;

        return (
          <div
            key={step.label}
            role="tab"
            aria-selected={isActive}
            aria-label={`Step ${stepNum}: ${step.label}${isCompleted ? " (complete)" : ""}`}
            className={[
              "step-tab",
              isActive    ? "step-tab--active" : "",
              isCompleted ? "step-tab--done"   : "",
            ].join(" ")}
          >
            {/* Checkmark for done, number for others */}
            <span aria-hidden="true">{isCompleted ? "✓" : `0${stepNum}`}</span>
            <span className="hidden sm:inline">{step.label}</span>
            <span className="sm:hidden">{step.short}</span>
          </div>
        );
      })}
    </div>
  );
}
