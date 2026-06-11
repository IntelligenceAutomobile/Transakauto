"use client";

import { useState, useEffect, useCallback } from "react";
import { C } from "@/lib/vehicle-theme";

export default function GalleryLightbox({ images, alt }: { images: string[]; alt: string }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () => setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null)),
    [images.length],
  );
  const next = useCallback(
    () => setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null)),
    [images.length],
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, prev, next, close]);

  return (
    <>
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(13,12,16,0.96)" }}
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute right-6 top-5 text-2xl leading-none"
            style={{ color: C.textSoft(0.8) }}
            aria-label="Fermer"
          >
            ✕
          </button>
          <div
            className="absolute left-1/2 top-5 -translate-x-1/2 text-[9px] uppercase tracking-[0.35em]"
            style={{ color: C.textSoft(0.8) }}
          >
            {lightboxIndex + 1} / {images.length}
          </div>

          <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={prev}
              className="flex flex-shrink-0 items-center justify-center"
              style={{ width: "44px", height: "44px", borderRadius: "50%", backgroundColor: C.card, border: `1px solid ${C.border(0.15)}`, color: C.text, fontSize: "1.5rem", cursor: "pointer", lineHeight: 1 }}
              aria-label="Précédente"
            >
              ‹
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[lightboxIndex]}
              alt={`${alt} — ${lightboxIndex + 1}`}
              className="object-contain"
              style={{ maxHeight: "88vh", maxWidth: "calc(90vw - 120px)" }}
            />
            <button
              onClick={next}
              className="flex flex-shrink-0 items-center justify-center"
              style={{ width: "44px", height: "44px", borderRadius: "50%", backgroundColor: C.card, border: `1px solid ${C.border(0.15)}`, color: C.text, fontSize: "1.5rem", cursor: "pointer", lineHeight: 1 }}
              aria-label="Suivante"
            >
              ›
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-px md:grid-cols-3" style={{ backgroundColor: C.border(0.1) }}>
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setLightboxIndex(i)}
            className="group relative overflow-hidden"
            style={{ aspectRatio: "16/10", backgroundColor: C.bg }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img}
              alt={`${alt} — photo ${i + 1}`}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              style={{ backgroundColor: C.accentSoft(0.12) }}
            >
              <span className="text-[9px] uppercase tracking-[0.3em]" style={{ color: C.text }}>
                Agrandir
              </span>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
