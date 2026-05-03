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
      // Strip the data URL prefix to get raw base64
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
      <div className="relative group rounded-2xl overflow-hidden border-2 border-primary-80 shadow-md animate-fade-in">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={value.previewUrl}
          alt="Garment reference"
          className="w-full max-h-96 object-contain bg-neutral-95"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button
            onClick={handleRemove}
            className="bg-white text-red-600 font-semibold px-4 py-2 rounded-xl shadow-lg hover:bg-red-50 transition-colors"
          >
            Remove image
          </button>
        </div>
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-primary-40 text-xs font-semibold px-3 py-1 rounded-full border border-primary-80">
          ✓ Image uploaded
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
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? "border-primary-40 bg-primary-95 scale-[1.01]"
            : "border-neutral-90 hover:border-primary-70 hover:bg-primary-99 bg-white"
        }`}
      >
        <div className="text-5xl mb-4">📷</div>
        <p className="font-semibold text-neutral-10 mb-1">
          Drop your garment photo here
        </p>
        <p className="text-sm text-neutral-50 mb-4">
          or click to browse · JPEG, PNG, WebP · up to {MAX_SIZE_MB}MB
        </p>
        <span className="btn-primary text-sm px-4 py-2 pointer-events-none inline-block">
          Choose Image
        </span>
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
        <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>
      )}

      <p className="mt-3 text-xs text-neutral-50">
        Tip: A clear, well-lit photo from the front gives the best results.
        Multiple angles are helpful too.
      </p>
    </div>
  );
}
