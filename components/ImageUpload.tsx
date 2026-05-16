"use client";

import { useRef, useState, DragEvent, ChangeEvent } from "react";

interface ImageUploadProps {
  value: { base64: string; mimeType: string; previewUrl: string } | null;
  onChange: (
    data: { base64: string; mimeType: string; previewUrl: string } | null
  ) => void;
}

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_MB = 5;

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function processFile(file: File) {
    setError(null);
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Please upload a JPEG, PNG, WebP, or GIF image.");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Image must be smaller than ${MAX_SIZE_MB}MB.`);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const base64 = dataUrl.split(",")[1];
      onChange({ base64, mimeType: file.type, previewUrl: dataUrl });
    };
    reader.readAsDataURL(file);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }

  function handleRemove() {
    onChange(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  if (value) {
    return (
      <div className="win-inner animate-fade-in">
        <div className="win-inner-chrome">
          <span>GARMENT_REF.JPG</span>
          <button
            onClick={handleRemove}
            className="text-hg-blue-dk hover:text-red-700 transition-colors"
            aria-label="Remove image"
            style={{ fontFamily: "'VT323', monospace", fontSize: "0.85rem" }}
          >
            REMOVE ×
          </button>
        </div>
        <div className="win-inner-body p-0 relative group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value.previewUrl}
            alt="Garment reference"
            className="w-full max-h-72 object-contain"
            style={{ background: "var(--bg-sun)" }}
          />
          <div className="absolute bottom-2 left-2">
            <span
              className="tag-btn tag-btn--active"
              style={{ fontSize: "0.8rem", padding: "1px 8px", cursor: "default" }}
            >
              ✓ uploaded
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        className="win-inner"
        style={{
          borderStyle: isDragging ? "solid" : "dashed",
          borderColor: isDragging ? "var(--blue)" : "var(--blue-lt)",
          transition: "border-color 0.12s ease",
          cursor: "pointer",
        }}
      >
        <div
          className="win-inner-chrome"
          style={{ background: isDragging ? "var(--blue)" : undefined }}
        >
          <span style={{ color: isDragging ? "var(--surface)" : undefined }}>
            UPLOAD_IMAGE.DAT
          </span>
          <span aria-hidden="true" style={{ color: isDragging ? "var(--lime)" : undefined }}>⊠</span>
        </div>
        <div className="win-inner-body text-center py-8">
          <div
            className="text-hg-blue-dk mb-3"
            style={{
              fontFamily: "'VT323', monospace",
              fontSize: "1.4rem",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {isDragging ? "Drop to upload" : "Drop photo here"}
          </div>
          <p className="text-sm text-hg-text-2 font-body mb-4">
            or click to browse · JPEG, PNG, WebP · up to {MAX_SIZE_MB}MB
          </p>
          <span className="btn-primary" style={{ pointerEvents: "none" }}>
            Choose Image
          </span>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        onChange={handleChange}
        className="hidden"
        aria-label="Upload garment image"
      />

      {error && (
        <p
          className="mt-2 text-red-700"
          style={{ fontFamily: "'VT323', monospace", fontSize: "0.95rem" }}
        >
          {error}
        </p>
      )}

      <p className="mt-3 text-xs text-hg-muted font-body">
        Tip: A clear, well-lit photo from the front gives the best results.
      </p>
    </div>
  );
}
