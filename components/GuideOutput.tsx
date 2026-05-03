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
    <div
      className="min-h-screen flex flex-col animate-fade-in"
      style={{ background: "var(--bg-sun)" }}
    >
      {/* Sticky toolbar — window chrome bar */}
      <div
        className="sticky top-0 z-50"
        style={{
          background: "var(--blue)",
          borderBottom: "1.5px solid var(--blue-dk)",
          boxShadow: "3px 3px 0 var(--shad)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-0 flex items-center justify-between gap-3 flex-wrap">
          {/* Left side */}
          <div
            className="flex items-center gap-3 py-[5px]"
            style={{
              fontFamily: "'VT323', monospace",
              fontSize: "1rem",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "var(--surface)",
            }}
          >
            <span>PATTERN_GUIDE.HTML</span>
            <span
              style={{
                color: "var(--lime)",
                fontSize: "1.1rem",
                cursor: "default",
              }}
              aria-hidden="true"
            >
              ⊠
            </span>
          </div>

          {/* Right side — action buttons */}
          <div className="flex items-center gap-2 py-[5px]">
            <button
              onClick={onReset}
              className="btn-secondary"
              style={{
                padding: "3px 14px 2px",
                fontSize: "0.95rem",
                background: "var(--surface)",
                color: "var(--blue)",
              }}
            >
              ← New Pattern
            </button>
            <button
              onClick={handlePrint}
              className="btn-secondary"
              style={{
                padding: "3px 14px 2px",
                fontSize: "0.95rem",
                background: "var(--surface)",
                color: "var(--blue)",
              }}
            >
              Print
            </button>
            <button
              onClick={handleDownload}
              className="btn-primary"
              style={{
                padding: "3px 14px 2px",
                fontSize: "0.95rem",
                background: "var(--lime)",
                color: "var(--blue-dk)",
                borderColor: "var(--lime-dk)",
              }}
            >
              Download.html
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
          style={{ minHeight: "calc(100vh - 44px)" }}
          sandbox="allow-same-origin allow-scripts"
        />
      </div>
    </div>
  );
}
