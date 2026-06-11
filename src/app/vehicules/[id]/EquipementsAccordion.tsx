"use client";

import { useState } from "react";
import { C } from "@/lib/vehicle-theme";

type Category = { label: string; items: string[] };

export default function EquipementsAccordion({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState<Set<string>>(
    () => new Set(categories[0] ? [categories[0].label] : []),
  );

  const toggle = (label: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });

  return (
    <div className="flex flex-col" style={{ border: `1px solid ${C.border(0.12)}` }}>
      {categories.map((cat, catIdx) => {
        const isOpen = open.has(cat.label);
        return (
          <div key={cat.label} style={{ borderTop: catIdx > 0 ? `1px solid ${C.border(0.1)}` : "none" }}>
            <button
              onClick={() => toggle(cat.label)}
              className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors duration-150"
              style={{
                backgroundColor: isOpen ? C.accentSoft(0.1) : "transparent",
                borderLeft: `3px solid ${isOpen ? C.accent : C.border(0.18)}`,
              }}
            >
              <div className="flex items-center gap-4">
                <span
                  className="text-sm font-semibold uppercase tracking-[0.35em]"
                  style={{ color: isOpen ? C.accent : C.textSoft(0.82) }}
                >
                  {cat.label}
                </span>
                <span
                  className="px-2.5 py-1 text-[10px] font-bold tabular-nums"
                  style={{
                    backgroundColor: isOpen ? C.accent : C.surface(0.07),
                    color: isOpen ? "#fff" : C.textSoft(0.7),
                    border: `1px solid ${isOpen ? C.accent : C.border(0.15)}`,
                    borderRadius: "3px",
                  }}
                >
                  {cat.items.length}
                </span>
              </div>
              <span
                className="flex-shrink-0 text-xl leading-none transition-transform duration-200"
                style={{
                  color: isOpen ? C.accent : C.accentSoft(0.45),
                  display: "inline-block",
                  transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                }}
              >
                ›
              </span>
            </button>

            {isOpen && (
              <div style={{ borderTop: `1px solid ${C.border(0.1)}` }}>
                {Array.from({ length: Math.ceil(cat.items.length / 2) }, (_, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-1 sm:grid-cols-2"
                    style={{
                      borderTop: i > 0 ? `1px solid ${C.border(0.08)}` : "none",
                      backgroundColor: C.surface(0.035),
                    }}
                  >
                    {[0, 1].map((j) => {
                      const item = cat.items[i * 2 + j];
                      if (!item) return <div key={j} />;
                      return (
                        <div
                          key={j}
                          className="flex items-start gap-3 px-6 py-5"
                          style={{ borderLeft: j === 1 ? `1px solid ${C.border(0.08)}` : "none" }}
                        >
                          <span
                            className="mt-1.5 flex-shrink-0 rounded-full"
                            style={{ width: "5px", height: "5px", minWidth: "5px", backgroundColor: C.accent }}
                          />
                          <span className="text-base leading-snug" style={{ color: C.textSoft(0.92), fontWeight: 400 }}>
                            {item}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
