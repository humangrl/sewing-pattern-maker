"use client";

import { useState } from "react";
import PatternMakerForm from "@/components/PatternMakerForm";
import GuideOutput from "@/components/GuideOutput";

const SPARKLES = [
  { char: "✦", top: "12%",  right: "6%",  delay: "0s",    size: "1.4rem" },
  { char: "+",  top: "38%",  right: "3%",  delay: "1.2s",  size: "1rem"   },
  { char: "✦", bottom: "28%", left: "2%", delay: "2.1s",  size: "1.1rem" },
  { char: "✦", bottom: "42%", right: "8%", delay: "0.6s", size: "0.9rem" },
  { char: "+",  top: "60%",  left: "4%",  delay: "1.7s",  size: "0.85rem"},
];

export default function Home() {
  const [guideHtml, setGuideHtml] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  function handleReset() {
    setGuideHtml(null);
    setIsGenerating(false);
  }

  if (guideHtml) {
    return <GuideOutput html={guideHtml} onReset={handleReset} />;
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">

      {/* ── Scrapbook decoration layer ─────────── */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Concentric circle badge — rotates slowly */}
        <svg
          className="absolute -top-10 -left-10 opacity-40"
          style={{ animation: "gentleSpin 20s linear infinite" }}
          width="220" height="220" viewBox="0 0 220 220"
        >
          <g fill="none" stroke="#6f9ddb" strokeWidth="1.5">
            {[100, 80, 61, 44, 29, 15].map((r, i) => (
              <circle key={i} cx="110" cy="110" r={r} opacity={0.9 - i * 0.1} />
            ))}
          </g>
        </svg>

        {/* Sparkle glyphs */}
        {SPARKLES.map((bit, i) => (
          <span
            key={i}
            className="sparkle-bit scrapbook__bit"
            style={{
              top:    (bit as { top?: string }).top,
              right:  (bit as { right?: string }).right,
              bottom: (bit as { bottom?: string }).bottom,
              left:   (bit as { left?: string }).left,
              fontSize: bit.size,
              animationDelay: bit.delay,
            }}
          >
            {bit.char}
          </span>
        ))}

        {/* Star polygon — bottom right, very faint */}
        <svg
          className="absolute bottom-10 right-10 opacity-[0.12]"
          width="72" height="72" viewBox="0 0 100 100"
          style={{ animation: "gentleSpin 25s linear infinite reverse" }}
        >
          <polygon
            points="50,4 61,35 95,35 67,57 79,91 50,69 21,91 33,57 5,35 39,35"
            fill="none" stroke="#2c5fb3" strokeWidth="2"
          />
        </svg>
      </div>

      {/* ── Page content ──────────────────────── */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 pt-10 pb-16">

        {/* Header */}
        <header className="mb-5">
          <h1 className="wordmark text-3xl sm:text-[2.2rem] leading-tight mb-1.5">
            PatternMaker
          </h1>
          <p
            className="uppercase tracking-wider text-hg-text-2"
            style={{ fontFamily: "'VT323', monospace", fontSize: "0.95rem" }}
          >
            Custom sewing patterns from garment images
          </p>
        </header>

        {/* Status bar */}
        <div className="status-bar mb-7" role="status" aria-live="polite">
          <span>&gt;&gt;&nbsp;</span>
          {isGenerating
            ? "ANALYZING GARMENT. DRAFTING PATTERN. PLEASE STAND BY."
            : "UPLOAD A GARMENT PHOTO TO BEGIN. STEP 1 OF 6."}
          <span className="blink-cursor">&nbsp;*</span>
        </div>

        {/* Feature chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            "Visual analysis",
            "Custom fit",
            "Material rec.",
            "Step-by-step",
          ].map((f) => (
            <span
              key={f}
              className="tag-btn"
              style={{ cursor: "default" }}
            >
              {f}
            </span>
          ))}
        </div>

        {/* Form */}
        <PatternMakerForm
          onGenerating={() => setIsGenerating(true)}
          onComplete={(html) => {
            setIsGenerating(false);
            setGuideHtml(html);
          }}
          onError={() => setIsGenerating(false)}
          isGenerating={isGenerating}
        />

        {/* Footer */}
        <footer className="mt-14 text-center">
          <p
            className="uppercase tracking-wide text-hg-muted"
            style={{ fontFamily: "'VT323', monospace", fontSize: "0.9rem" }}
          >
            Built with{" "}
            <a
              href="https://www.anthropic.com"
              className="text-hg-blue hover:text-hg-blue-dk underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Claude AI
            </a>
            {" "}·{" "}
            <a
              href="https://github.com/humangrl/sewing-pattern-maker"
              className="text-hg-blue hover:text-hg-blue-dk underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
