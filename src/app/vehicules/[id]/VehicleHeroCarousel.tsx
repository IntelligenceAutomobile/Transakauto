"use client";

import { useState } from "react";
import { C } from "@/lib/vehicle-theme";

interface Props {
  images: string[];
  alt: string;
  imgOpacity?: number;
  children?: React.ReactNode;
}

export default function VehicleHeroCarousel({ images, alt, imgOpacity = 1, children }: Props) {
  const [idx, setIdx] = useState(0);
  const total = images.length;
  const src = images[idx] ?? null;

  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  return (
    <div className="relative w-full" style={{ height: "72vh", minHeight: "460px" }}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={`${alt} — ${idx + 1}/${total}`}
          className="absolute inset-0 h-full w-full object-cover object-center"
          style={{ opacity: imgOpacity }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: C.card }}>
          <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.textSoft(0.4) }}>
            Photos à venir
          </span>
        </div>
      )}

      {/* Dégradés */}
      <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(13,12,16,0.55) 0%, transparent 38%, ${C.bg} 100%)` }} />
      <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.bg} 0%, transparent 26%)` }} />

      {total > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center lg:left-10"
            style={{
              width: "44px", height: "44px", borderRadius: "50%",
              backgroundColor: "rgba(13,12,16,0.6)",
              backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
              border: `1px solid ${C.border(0.2)}`, color: C.text, cursor: "pointer", fontSize: "1.35rem",
            }}
            aria-label="Photo précédente"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center lg:right-10"
            style={{
              width: "44px", height: "44px", borderRadius: "50%",
              backgroundColor: "rgba(13,12,16,0.6)",
              backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
              border: `1px solid ${C.border(0.2)}`, color: C.text, cursor: "pointer", fontSize: "1.35rem",
            }}
            aria-label="Photo suivante"
          >
            ›
          </button>

          <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
            <span className="text-[9px] uppercase tracking-[0.25em]" style={{ color: C.textSoft(0.6) }}>
              {idx + 1} / {total}
            </span>
            <div className="flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  style={{
                    width: i === idx ? "22px" : "6px",
                    height: "6px",
                    borderRadius: "3px",
                    backgroundColor: i === idx ? C.accent : C.accentSoft(0.3),
                    border: "none", cursor: "pointer", padding: 0,
                    transition: "width 0.2s ease, background-color 0.2s ease",
                  }}
                  aria-label={`Photo ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {children}
    </div>
  );
}
