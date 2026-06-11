"use client";

import { useState } from "react";
import { C } from "@/lib/vehicle-theme";

function renderDesc(text: string) {
  const parts = text.split(/([\d][\d\s,]*(?:ch système|ch|km\/h|km|L\/100\s*km|%|rapports))/g);
  return parts.map((part, i) =>
    /^\d/.test(part) ? (
      <span key={i} style={{ color: C.accent, fontWeight: 600 }}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export default function DescriptionBlock({ paragraphs }: { paragraphs: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? paragraphs : paragraphs.slice(0, 2);

  return (
    <div className="flex flex-col gap-4">
      {visible.map((p, i) => (
        <p key={i} className="text-[15px] leading-loose" style={{ color: C.textSoft(0.85), fontWeight: 400 }}>
          {renderDesc(p)}
        </p>
      ))}
      {paragraphs.length > 2 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-1 self-start text-[11px] font-semibold uppercase tracking-wide transition-opacity hover:opacity-80"
          style={{ color: C.accent }}
        >
          {expanded ? "Lire moins" : "Lire la suite"}
        </button>
      )}
    </div>
  );
}
