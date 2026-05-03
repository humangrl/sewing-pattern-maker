"use client";

import { useState } from "react";
import PatternMakerForm from "@/components/PatternMakerForm";
import GuideOutput from "@/components/GuideOutput";

export default function Home() {
  const [guideHtml, setGuideHtml] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  function handleReset() {
    setGuideHtml(null);
    setIsGenerating(false);
  }

  if (guideHtml) {
    return (
      <GuideOutput html={guideHtml} onReset={handleReset} />
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <header className="bg-hero-gradient py-14 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-primary-80 rounded-full px-4 py-1.5 mb-6 text-sm font-medium text-primary-40">
            <span className="w-2 h-2 rounded-full bg-primary-40 inline-block" />
            Powered by Claude AI
          </div>
          <h1 className="font-serif text-5xl font-semibold text-primary-10 mb-4 leading-tight">
            PatternMaker
          </h1>
          <p className="text-lg text-secondary-40 max-w-xl mx-auto leading-relaxed">
            Upload a photo of any garment and receive a comprehensive,
            custom-fitted sewing pattern with step-by-step instructions.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              "Visual Garment Analysis",
              "Custom Measurements",
              "Material Recommendations",
              "Step-by-Step Assembly",
            ].map((f) => (
              <span
                key={f}
                className="bg-white/80 border border-primary-80 text-primary-30 text-sm font-medium px-4 py-1.5 rounded-full shadow-sm"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Form */}
      <section className="max-w-2xl mx-auto px-4 py-12">
        <PatternMakerForm
          onGenerating={() => setIsGenerating(true)}
          onComplete={(html) => {
            setIsGenerating(false);
            setGuideHtml(html);
          }}
          onError={() => setIsGenerating(false)}
          isGenerating={isGenerating}
        />
      </section>

      {/* Footer */}
      <footer className="text-center pb-10 text-neutral-50 text-sm">
        Built with{" "}
        <a
          href="https://www.anthropic.com"
          className="text-primary-40 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Claude AI
        </a>{" "}
        · Open source on{" "}
        <a
          href="https://github.com/humangrl/sewing-pattern-maker"
          className="text-primary-40 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </footer>
    </main>
  );
}
