"use client";

import { useState, FormEvent } from "react";
import StepIndicator from "./StepIndicator";
import ImageUpload from "./ImageUpload";

interface ImageData {
  base64: string;
  mimeType: string;
  previewUrl: string;
}

interface PatternMakerFormProps {
  onGenerating: () => void;
  onComplete: (html: string) => void;
  onError: () => void;
  isGenerating: boolean;
}

const TOTAL_STEPS = 6;

const EXPERIENCE_LEVELS = [
  {
    value: "beginner",
    label: "Beginner",
    desc: "New to sewing, comfortable with basic straight seams",
    icon: "🌱",
  },
  {
    value: "intermediate",
    label: "Intermediate",
    desc: "Confident with patterns, zippers, and set-in sleeves",
    icon: "✂️",
  },
  {
    value: "advanced",
    label: "Advanced",
    desc: "Experienced with tailoring, couture techniques, and drafting",
    icon: "🎓",
  },
];

const MEASUREMENT_SOURCES = [
  {
    value: "body",
    label: "Body measurements",
    desc: "I will measure my own body",
    icon: "📏",
  },
  {
    value: "reference",
    label: "Reference garment",
    desc: "I have a well-fitting garment to measure",
    icon: "👔",
  },
];

const MEASUREMENT_HINTS = `Example format:
Bust: 36 in (91.5 cm)
Waist: 28 in (71 cm)
Hip: 38 in (96.5 cm)
Shoulder width: 15 in (38 cm)
Back length (nape to waist): 16 in (40.5 cm)
Front length (shoulder to hem): 38 in (96.5 cm)
Sleeve length: 24 in (61 cm)
Inseam: 30 in (76 cm)
Thigh: 22 in (56 cm)
Preferred ease: comfortable / fitted / loose`;

export default function PatternMakerForm({
  onGenerating,
  onComplete,
  onError,
  isGenerating,
}: PatternMakerFormProps) {
  const [step, setStep] = useState(1);
  const [image, setImage] = useState<ImageData | null>(null);
  const [intendedUse, setIntendedUse] = useState("");
  const [experience, setExperience] = useState("");
  const [measurementSource, setMeasurementSource] = useState("");
  const [measurements, setMeasurements] = useState("");
  const [material, setMaterial] = useState("");
  const [letAiChoose, setLetAiChoose] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function canAdvance(): boolean {
    switch (step) {
      case 1:
        return image !== null;
      case 2:
        return intendedUse.trim().length > 0;
      case 3:
        return experience !== "";
      case 4:
        return measurementSource !== "";
      case 5:
        return measurements.trim().length > 0;
      case 6:
        return letAiChoose || material.trim().length > 0;
      default:
        return false;
    }
  }

  function handleNext() {
    if (step < TOTAL_STEPS) setStep((s) => s + 1);
  }

  function handleBack() {
    if (step > 1) setStep((s) => s - 1);
    setErrorMsg(null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    onGenerating();

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: image!.base64,
          imageMimeType: image!.mimeType,
          intendedUse,
          sewingExperience: experience,
          measurementSource,
          bodyMeasurements: measurements,
          materialChoice: letAiChoose ? "" : material,
          letAiChooseMaterial: letAiChoose,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(
          (err as { error?: string }).error || "Generation failed. Please try again."
        );
      }

      // Read the streaming response
      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body.");

      const decoder = new TextDecoder();
      let html = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        html += decoder.decode(value, { stream: true });
      }

      // Strip markdown fences if Claude wrapped the HTML
      const cleaned = html
        .replace(/^```html\s*/i, "")
        .replace(/```\s*$/, "")
        .trim();

      onComplete(cleaned);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMsg(msg);
      onError();
    }
  }

  return (
    <div>
      <StepIndicator currentStep={step} totalSteps={TOTAL_STEPS} />

      <form onSubmit={handleSubmit}>
        {/* Step 1: Garment Image */}
        {step === 1 && (
          <div className="step-card">
            <h2 className="font-serif text-2xl font-semibold text-primary-10 mb-2">
              Upload Your Garment Reference
            </h2>
            <p className="text-neutral-50 text-sm mb-6">
              Share a photo of the garment you want to recreate. A clear,
              front-facing photo works best.
            </p>
            <ImageUpload value={image} onChange={setImage} />
          </div>
        )}

        {/* Step 2: Intended Use */}
        {step === 2 && (
          <div className="step-card">
            <h2 className="font-serif text-2xl font-semibold text-primary-10 mb-2">
              How Will You Wear This?
            </h2>
            <p className="text-neutral-50 text-sm mb-6">
              Knowing the intended use helps tailor the construction method,
              fabric weight, and finishing details.
            </p>
            <label className="label-text" htmlFor="intended-use">
              Intended Use
            </label>
            <textarea
              id="intended-use"
              value={intendedUse}
              onChange={(e) => setIntendedUse(e.target.value)}
              className="input-field min-h-[120px] resize-y"
              placeholder="e.g. Everyday casual wear, summer wedding guest outfit, workwear for an office environment, theatrical costume..."
              autoFocus
            />
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Everyday casual",
                "Formal / special occasion",
                "Workwear",
                "Activewear",
                "Costume / theatrical",
                "Seasonal (summer/winter)",
              ].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setIntendedUse(s)}
                  className="text-xs px-3 py-1.5 rounded-full border border-primary-80 text-primary-40 hover:bg-primary-95 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Experience Level */}
        {step === 3 && (
          <div className="step-card">
            <h2 className="font-serif text-2xl font-semibold text-primary-10 mb-2">
              What&apos;s Your Sewing Experience?
            </h2>
            <p className="text-neutral-50 text-sm mb-6">
              The guide will be tailored to your skill level, offering
              simplified or advanced construction options.
            </p>
            <div className="space-y-3">
              {EXPERIENCE_LEVELS.map((lvl) => (
                <button
                  key={lvl.value}
                  type="button"
                  onClick={() => setExperience(lvl.value)}
                  className={`w-full text-left flex items-start gap-4 p-4 rounded-xl border-2 transition-all duration-200 ${
                    experience === lvl.value
                      ? "border-primary-40 bg-primary-95 shadow-md"
                      : "border-neutral-90 bg-white hover:border-primary-70 hover:bg-primary-99"
                  }`}
                >
                  <span className="text-2xl mt-0.5">{lvl.icon}</span>
                  <div>
                    <p
                      className={`font-semibold ${
                        experience === lvl.value
                          ? "text-primary-30"
                          : "text-neutral-10"
                      }`}
                    >
                      {lvl.label}
                    </p>
                    <p className="text-sm text-neutral-50">{lvl.desc}</p>
                  </div>
                  {experience === lvl.value && (
                    <span className="ml-auto text-primary-40 text-lg self-center">
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Measurement Source */}
        {step === 4 && (
          <div className="step-card">
            <h2 className="font-serif text-2xl font-semibold text-primary-10 mb-2">
              Where Will Your Measurements Come From?
            </h2>
            <p className="text-neutral-50 text-sm mb-6">
              Body measurements give the most accurate custom fit. A reference
              garment can also work if it fits you well.
            </p>
            <div className="space-y-3">
              {MEASUREMENT_SOURCES.map((src) => (
                <button
                  key={src.value}
                  type="button"
                  onClick={() => setMeasurementSource(src.value)}
                  className={`w-full text-left flex items-start gap-4 p-4 rounded-xl border-2 transition-all duration-200 ${
                    measurementSource === src.value
                      ? "border-primary-40 bg-primary-95 shadow-md"
                      : "border-neutral-90 bg-white hover:border-primary-70 hover:bg-primary-99"
                  }`}
                >
                  <span className="text-2xl mt-0.5">{src.icon}</span>
                  <div>
                    <p
                      className={`font-semibold ${
                        measurementSource === src.value
                          ? "text-primary-30"
                          : "text-neutral-10"
                      }`}
                    >
                      {src.label}
                    </p>
                    <p className="text-sm text-neutral-50">{src.desc}</p>
                  </div>
                  {measurementSource === src.value && (
                    <span className="ml-auto text-primary-40 text-lg self-center">
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Body Measurements */}
        {step === 5 && (
          <div className="step-card">
            <h2 className="font-serif text-2xl font-semibold text-primary-10 mb-2">
              Enter Your Measurements
            </h2>
            <p className="text-neutral-50 text-sm mb-6">
              Include all relevant measurements. Both imperial and metric are
              accepted. The more detail, the more accurate your pattern.
            </p>

            {/* Quick reference */}
            <details className="mb-4 bg-primary-99 border border-primary-90 rounded-xl overflow-hidden">
              <summary className="px-4 py-3 cursor-pointer text-sm font-semibold text-primary-40 list-none flex items-center justify-between">
                <span>📏 Measurement guide &amp; landmarks</span>
                <span className="text-neutral-50 font-normal">tap to expand</span>
              </summary>
              <div className="px-4 pb-4 pt-2 text-xs text-neutral-50 space-y-1 border-t border-primary-90">
                <p><strong className="text-neutral-10">Bust:</strong> fullest part of the chest, arms relaxed</p>
                <p><strong className="text-neutral-10">Waist:</strong> natural waist, narrowest point of the torso</p>
                <p><strong className="text-neutral-10">Hip:</strong> fullest part of the hips, ~7–9 in below waist</p>
                <p><strong className="text-neutral-10">Shoulder width:</strong> across the back from shoulder point to shoulder point</p>
                <p><strong className="text-neutral-10">Back length:</strong> nape of neck down to natural waist</p>
                <p><strong className="text-neutral-10">Sleeve length:</strong> shoulder point to wrist bone, arm slightly bent</p>
                <p><strong className="text-neutral-10">Inseam:</strong> crotch to floor or desired hem length</p>
              </div>
            </details>

            <label className="label-text" htmlFor="measurements">
              Your Measurements
            </label>
            <textarea
              id="measurements"
              value={measurements}
              onChange={(e) => setMeasurements(e.target.value)}
              className="input-field min-h-[220px] resize-y font-mono text-sm"
              placeholder={MEASUREMENT_HINTS}
              autoFocus
            />
          </div>
        )}

        {/* Step 6: Material Choice */}
        {step === 6 && (
          <div className="step-card">
            <h2 className="font-serif text-2xl font-semibold text-primary-10 mb-2">
              Choose Your Fabric
            </h2>
            <p className="text-neutral-50 text-sm mb-6">
              Specify a fabric if you have one in mind, or let the AI analyze
              your garment image and recommend the best choice.
            </p>

            {/* Let AI decide toggle */}
            <label className="flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer mb-4 transition-all duration-200 border-primary-40 bg-primary-95">
              <input
                type="checkbox"
                checked={letAiChoose}
                onChange={(e) => setLetAiChoose(e.target.checked)}
                className="mt-0.5 w-5 h-5 accent-primary-40"
              />
              <div>
                <p className="font-semibold text-primary-30">
                  Let the AI recommend the best material 🧵
                </p>
                <p className="text-sm text-neutral-50 mt-0.5">
                  Claude will analyze the garment image and suggest the ideal
                  fabric(s) with full rationale.
                </p>
              </div>
            </label>

            {!letAiChoose && (
              <div className="animate-slide-up">
                <label className="label-text" htmlFor="material">
                  Fabric / Material
                </label>
                <input
                  id="material"
                  type="text"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="input-field"
                  placeholder="e.g. Cotton poplin, linen, silk charmeuse, ponte knit..."
                  autoFocus={!letAiChoose}
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    "Cotton poplin",
                    "Linen",
                    "Jersey knit",
                    "Denim",
                    "Silk charmeuse",
                    "Ponte knit",
                    "Wool crepe",
                    "Chiffon",
                  ].map((fab) => (
                    <button
                      key={fab}
                      type="button"
                      onClick={() => setMaterial(fab)}
                      className="text-xs px-3 py-1.5 rounded-full border border-primary-80 text-primary-40 hover:bg-primary-95 transition-colors"
                    >
                      {fab}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Error message */}
        {errorMsg && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 animate-fade-in">
            <strong>Error:</strong> {errorMsg}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1 || isGenerating}
            className="btn-secondary disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ← Back
          </button>

          {step < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canAdvance()}
              className="btn-primary disabled:opacity-50"
            >
              Next →
            </button>
          ) : (
            <button
              type="submit"
              disabled={!canAdvance() || isGenerating}
              className="btn-primary disabled:opacity-50 flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Generating Pattern…
                </>
              ) : (
                <>✨ Generate My Pattern</>
              )}
            </button>
          )}
        </div>

        {/* Progress hint on last step */}
        {step === TOTAL_STEPS && !isGenerating && (
          <p className="text-center text-xs text-neutral-50 mt-3">
            Generation typically takes 20–60 seconds depending on garment complexity.
          </p>
        )}

        {isGenerating && (
          <div className="mt-6 p-6 bg-primary-99 border border-primary-90 rounded-2xl text-center animate-fade-in">
            <div className="text-3xl mb-3">🧵</div>
            <p className="font-semibold text-primary-30 mb-1">
              Analyzing garment &amp; drafting your pattern…
            </p>
            <p className="text-sm text-neutral-50">
              Claude is examining the design details, calculating pattern pieces,
              and writing your custom sewing guide. This usually takes 20–60
              seconds.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
