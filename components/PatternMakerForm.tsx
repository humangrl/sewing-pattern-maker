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

const STEP_TITLES = [
  "GARMENT_REF.JPG",
  "USE_CASE.TXT",
  "SKILL_LEVEL.CFG",
  "MEASURE_SRC.DAT",
  "MEASUREMENTS.TXT",
  "MATERIAL.DAT",
];

const EXPERIENCE_LEVELS = [
  {
    value: "beginner",
    label: "Beginner",
    desc:  "New to sewing, comfortable with basic straight seams",
  },
  {
    value: "intermediate",
    label: "Intermediate",
    desc:  "Confident with patterns, zippers, and set-in sleeves",
  },
  {
    value: "advanced",
    label: "Advanced",
    desc:  "Experienced with tailoring, couture techniques, and drafting",
  },
];

const MEASUREMENT_SOURCES = [
  {
    value: "body",
    label: "Body measurements",
    desc:  "I will measure my own body",
  },
  {
    value: "reference",
    label: "Reference garment",
    desc:  "I have a well-fitting garment to measure",
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
  const [step, setStep]                         = useState(1);
  const [image, setImage]                       = useState<ImageData | null>(null);
  const [intendedUse, setIntendedUse]           = useState("");
  const [experience, setExperience]             = useState("");
  const [measurementSource, setMeasurementSource] = useState("");
  const [measurements, setMeasurements]         = useState("");
  const [material, setMaterial]                 = useState("");
  const [letAiChoose, setLetAiChoose]           = useState(false);
  const [errorMsg, setErrorMsg]                 = useState<string | null>(null);

  function canAdvance(): boolean {
    switch (step) {
      case 1: return image !== null;
      case 2: return intendedUse.trim().length > 0;
      case 3: return experience !== "";
      case 4: return measurementSource !== "";
      case 5: return measurements.trim().length > 0;
      case 6: return letAiChoose || material.trim().length > 0;
      default: return false;
    }
  }

  function handleNext() { if (step < TOTAL_STEPS) setStep((s) => s + 1); }
  function handleBack() { if (step > 1) { setStep((s) => s - 1); setErrorMsg(null); } }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    onGenerating();

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64:        image!.base64,
          imageMimeType:      image!.mimeType,
          intendedUse,
          sewingExperience:   experience,
          measurementSource,
          bodyMeasurements:   measurements,
          materialChoice:     letAiChoose ? "" : material,
          letAiChooseMaterial: letAiChoose,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(
          (err as { error?: string }).error || "Generation failed. Please try again."
        );
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body.");

      const decoder = new TextDecoder();
      let html = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        html += decoder.decode(value, { stream: true });
      }

      const cleaned = html
        .replace(/^```html\s*/i, "")
        .replace(/```\s*$/, "")
        .trim();

      onComplete(cleaned);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMsg(msg);
      onError();
    }
  }

  return (
    <div>
      {/* Folder tab step indicator */}
      <StepIndicator currentStep={step} totalSteps={TOTAL_STEPS} />

      <form onSubmit={handleSubmit}>
        {/* Window card — tabs connect visually to the blue chrome bar */}
        <div className="win">
          <div className="win-chrome">
            <span className="truncate">{STEP_TITLES[step - 1]}</span>
            <span className="win-chrome-close" aria-hidden="true">⊠</span>
          </div>

          <div className="win-body step-card">

            {/* ── Step 1: Garment Image ─────────────── */}
            {step === 1 && (
              <div>
                <h2 className="wordmark text-xl mb-1">Upload Garment Reference</h2>
                <p className="text-sm text-hg-text-2 mb-5 font-body">
                  Share a photo of the garment you want to recreate. A clear,
                  front-facing photo works best.
                </p>
                <ImageUpload value={image} onChange={setImage} />
              </div>
            )}

            {/* ── Step 2: Intended Use ──────────────── */}
            {step === 2 && (
              <div>
                <h2 className="wordmark text-xl mb-1">How Will You Wear This?</h2>
                <p className="text-sm text-hg-text-2 mb-5 font-body">
                  Knowing the intended use helps tailor construction method,
                  fabric weight, and finishing details.
                </p>
                <label className="label-text" htmlFor="intended-use">
                  Intended Use
                </label>
                <textarea
                  id="intended-use"
                  value={intendedUse}
                  onChange={(e) => setIntendedUse(e.target.value)}
                  className="input-field min-h-[100px]"
                  placeholder="e.g. Everyday casual wear, summer wedding guest outfit, theatrical costume…"
                  autoFocus
                />
                <div className="mt-3 flex flex-wrap gap-2">
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
                      className={`tag-btn ${intendedUse === s ? "tag-btn--active" : ""}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── Step 3: Experience Level ──────────── */}
            {step === 3 && (
              <div>
                <h2 className="wordmark text-xl mb-1">Sewing Experience?</h2>
                <p className="text-sm text-hg-text-2 mb-5 font-body">
                  The guide will be tailored to your skill level — simplified or
                  advanced construction as needed.
                </p>
                <div className="space-y-2">
                  {EXPERIENCE_LEVELS.map((lvl) => (
                    <button
                      key={lvl.value}
                      type="button"
                      onClick={() => setExperience(lvl.value)}
                      className={`door-btn ${experience === lvl.value ? "door-btn--active" : ""}`}
                    >
                      <span className="door-btn__badge" aria-hidden="true">→</span>
                      <span className="door-btn__body">
                        <span className="door-btn__label">{lvl.label}</span>
                        <span className="door-btn__desc">{lvl.desc}</span>
                      </span>
                      {experience === lvl.value && (
                        <span className="door-btn__check" aria-hidden="true">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── Step 4: Measurement Source ────────── */}
            {step === 4 && (
              <div>
                <h2 className="wordmark text-xl mb-1">Measurement Source?</h2>
                <p className="text-sm text-hg-text-2 mb-5 font-body">
                  Body measurements give the most accurate custom fit. A reference
                  garment works too if it fits you well.
                </p>
                <div className="space-y-2">
                  {MEASUREMENT_SOURCES.map((src) => (
                    <button
                      key={src.value}
                      type="button"
                      onClick={() => setMeasurementSource(src.value)}
                      className={`door-btn ${measurementSource === src.value ? "door-btn--active" : ""}`}
                    >
                      <span className="door-btn__badge" aria-hidden="true">→</span>
                      <span className="door-btn__body">
                        <span className="door-btn__label">{src.label}</span>
                        <span className="door-btn__desc">{src.desc}</span>
                      </span>
                      {measurementSource === src.value && (
                        <span className="door-btn__check" aria-hidden="true">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── Step 5: Body Measurements ─────────── */}
            {step === 5 && (
              <div>
                <h2 className="wordmark text-xl mb-1">Enter Your Measurements</h2>
                <p className="text-sm text-hg-text-2 mb-4 font-body">
                  Include all relevant measurements. Both imperial and metric are
                  accepted. More detail = more accurate pattern.
                </p>

                {/* Reference guide — inner window */}
                <details className="win-inner mb-4">
                  <summary className="win-inner-chrome cursor-pointer list-none select-none">
                    <span>MEASURE_GUIDE.TXT</span>
                    <span aria-hidden="true" className="opacity-60">▾</span>
                  </summary>
                  <div className="win-inner-body text-xs text-hg-text-2 space-y-1 font-body">
                    <p><strong className="text-hg-text">Bust:</strong> fullest part of the chest, arms relaxed</p>
                    <p><strong className="text-hg-text">Waist:</strong> natural waist, narrowest point of the torso</p>
                    <p><strong className="text-hg-text">Hip:</strong> fullest part of hips, ~7–9 in below waist</p>
                    <p><strong className="text-hg-text">Shoulder width:</strong> back, point to point</p>
                    <p><strong className="text-hg-text">Back length:</strong> nape of neck to natural waist</p>
                    <p><strong className="text-hg-text">Sleeve length:</strong> shoulder to wrist, arm slightly bent</p>
                    <p><strong className="text-hg-text">Inseam:</strong> crotch to floor or desired hem</p>
                  </div>
                </details>

                <label className="label-text" htmlFor="measurements">
                  Your Measurements
                </label>
                <textarea
                  id="measurements"
                  value={measurements}
                  onChange={(e) => setMeasurements(e.target.value)}
                  className="input-field min-h-[200px] font-mono text-sm"
                  placeholder={MEASUREMENT_HINTS}
                  autoFocus
                />
              </div>
            )}

            {/* ── Step 6: Material Choice ───────────── */}
            {step === 6 && (
              <div>
                <h2 className="wordmark text-xl mb-1">Choose Your Fabric</h2>
                <p className="text-sm text-hg-text-2 mb-5 font-body">
                  Specify a fabric if you have one in mind, or let the AI analyze
                  your garment image and recommend the best choice.
                </p>

                {/* AI toggle — styled as a door button with checkbox */}
                <label
                  className={`door-btn mb-4 ${letAiChoose ? "door-btn--active" : ""}`}
                  style={{ cursor: "pointer" }}
                >
                  <span
                    className="door-btn__badge"
                    aria-hidden="true"
                    style={{ background: letAiChoose ? "var(--lime-dk)" : "var(--blue)" }}
                  >
                    {letAiChoose ? "✓" : "AI"}
                  </span>
                  <span className="door-btn__body">
                    <span className="door-btn__label">Let AI recommend material</span>
                    <span className="door-btn__desc">
                      Claude will analyse the garment image and suggest the ideal
                      fabric(s) with full rationale.
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={letAiChoose}
                    onChange={(e) => setLetAiChoose(e.target.checked)}
                    className="sr-only"
                  />
                </label>

                {!letAiChoose && (
                  <div className="animate-fade-in">
                    <label className="label-text" htmlFor="material">
                      Fabric / Material
                    </label>
                    <input
                      id="material"
                      type="text"
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      className="input-field"
                      placeholder="e.g. Cotton poplin, linen, silk charmeuse, ponte knit…"
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
                          className={`tag-btn ${material === fab ? "tag-btn--active" : ""}`}
                        >
                          {fab}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Error */}
            {errorMsg && (
              <div className="error-box mt-4">
                <strong>Error:</strong> {errorMsg}
              </div>
            )}

          </div>{/* /win-body */}
        </div>{/* /win */}

        {/* ── Generating window ──────────────────── */}
        {isGenerating && (
          <div className="win mt-4 animate-fade-in">
            <div className="win-chrome">
              <span>ANALYZING.EXE</span>
              <span className="win-chrome-close" aria-hidden="true">⊠</span>
            </div>
            <div className="win-body text-center py-6">
              <div
                className="text-hg-blue-dk mb-2 uppercase tracking-wide"
                style={{ fontFamily: "'VT323', monospace", fontSize: "1.1rem" }}
              >
                Drafting your pattern
                <span className="blink-cursor">&nbsp;_</span>
              </div>
              <p className="text-sm text-hg-text-2 font-body max-w-sm mx-auto leading-relaxed">
                Claude is examining design details, calculating pattern pieces,
                and writing your custom sewing guide. Usually 20–60 seconds.
              </p>
            </div>
          </div>
        )}

        {/* ── Navigation buttons ─────────────────── */}
        <div className="flex items-center justify-between mt-4">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1 || isGenerating}
            className="btn-secondary"
          >
            ← Back
          </button>

          {step < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canAdvance()}
              className="btn-primary"
            >
              Next →
            </button>
          ) : (
            <button
              type="submit"
              disabled={!canAdvance() || isGenerating}
              className="btn-primary"
            >
              {isGenerating ? (
                <>
                  <svg
                    className="animate-spin-slow h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12" cy="12" r="10"
                      stroke="currentColor" strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Generating…
                </>
              ) : (
                "Generate Pattern →"
              )}
            </button>
          )}
        </div>

        {step === TOTAL_STEPS && !isGenerating && (
          <p
            className="text-center mt-3 text-hg-muted"
            style={{ fontFamily: "'VT323', monospace", fontSize: "0.9rem" }}
          >
            Generation typically takes 20–60 seconds.
          </p>
        )}
      </form>
    </div>
  );
}
