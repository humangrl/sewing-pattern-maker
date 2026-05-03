"use client";

import { useRef } from "react";

interface GuideOutputProps {
  html: string;
  onReset: () => void;
}

export default function GuideOutput({ html, onReset }: GuideOutputProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  function handleDownload() {
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sewing-pattern-guide.html";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handlePrint() {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) return;
    iframe.contentWindow.print();
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-95 animate-fade-in">
      {/* Toolbar */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-90 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <button
              onClick={onReset}
              className="btn-secondary text-sm py-2 px-4"
            >
              ← New Pattern
            </button>
            <div className="hidden sm:block">
              <p className="font-semibold text-primary-10 text-sm leading-none">
                PatternMaker
              </p>
              <p className="text-xs text-neutral-50">Your guide is ready</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="btn-secondary text-sm py-2 px-4 flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              Print
            </button>
            <button
              onClick={handleDownload}
              className="btn-primary text-sm py-2 px-4 flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download HTML
            </button>
          </div>
        </div>
      </div>

      {/* Guide iframe */}
      <div className="flex-1 flex flex-col">
        <iframe
          ref={iframeRef}
          srcDoc={html}
          title="Sewing Pattern Guide"
          className="flex-1 w-full border-0"
          style={{ minHeight: "calc(100vh - 64px)" }}
          sandbox="allow-same-origin allow-scripts"
        />
      </div>
    </div>
  );
}
