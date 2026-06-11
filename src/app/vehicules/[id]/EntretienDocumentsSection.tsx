"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { C } from "@/lib/vehicle-theme";

type MaintenanceEntry = {
  date: string;
  km: string;
  operation: string;
  amount?: string;
  linkedDoc?: string;
};

type Doc = { src: string; label: string };

const VISIBLE_COUNT = 5;
const DOC_PASSWORD = "transak2026";

export default function EntretienDocumentsSection({
  maintenance,
  documents,
}: {
  maintenance: MaintenanceEntry[];
  documents: Doc[];
}) {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [pendingDoc, setPendingDoc] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  const collapsible = maintenance.length > VISIBLE_COUNT + 1;
  const visibleEntries = collapsible && !expanded ? maintenance.slice(0, VISIBLE_COUNT) : maintenance;
  const hiddenEntries = maintenance.slice(VISIBLE_COUNT);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === DOC_PASSWORD) {
      setUnlocked(true);
      setError(false);
      if (pendingDoc) {
        const idx = documents.findIndex((d) => d.src.endsWith("/" + pendingDoc));
        if (idx >= 0) setLightboxIndex(idx);
        setPendingDoc(null);
      }
    } else {
      setError(true);
      setPassword("");
    }
  }

  function handleLinkedEntryClick(linkedDoc: string) {
    if (unlocked) {
      const idx = documents.findIndex((d) => d.src.endsWith("/" + linkedDoc));
      if (idx >= 0) setLightboxIndex(idx);
    } else {
      setPendingDoc(linkedDoc);
      setTimeout(() => {
        passwordRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        passwordRef.current?.focus();
      }, 50);
    }
  }

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + documents.length) % documents.length : null));
  }, [documents.length]);
  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % documents.length : null));
  }, [documents.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "Escape") closeLightbox();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, goPrev, goNext, closeLightbox]);

  const currentDoc = lightboxIndex !== null ? documents[lightboxIndex] : null;

  return (
    <>
      {/* Lightbox documents */}
      {lightboxIndex !== null && currentDoc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(13,12,16,0.96)" }}
          onClick={closeLightbox}
        >
          <button onClick={closeLightbox} className="absolute right-6 top-5 text-2xl leading-none" style={{ color: C.textSoft(0.8) }} aria-label="Fermer">
            ✕
          </button>
          <div className="absolute left-1/2 top-5 -translate-x-1/2 text-[9px] uppercase tracking-[0.35em]" style={{ color: C.textSoft(0.8) }}>
            {currentDoc.label}
            <span className="ml-4 opacity-50">{lightboxIndex + 1} / {documents.length}</span>
          </div>
          <button onClick={(e) => { e.stopPropagation(); goPrev(); }} className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border" style={{ borderColor: C.border(0.15), color: C.text, backgroundColor: C.card }} aria-label="Précédent">
            ←
          </button>
          <div className="mx-20 flex max-h-[85vh] w-full max-w-3xl items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={currentDoc.src} alt={currentDoc.label} className="max-h-[85vh] max-w-full object-contain" />
          </div>
          <button onClick={(e) => { e.stopPropagation(); goNext(); }} className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border" style={{ borderColor: C.border(0.15), color: C.text, backgroundColor: C.card }} aria-label="Suivant">
            →
          </button>
        </div>
      )}

      {/* Entretien */}
      <div className="mb-10">
        <div className="mb-5 flex items-center justify-end">
          {maintenance.length > 0 && (
            <span
              className="px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.15em]"
              style={{ backgroundColor: C.accentSoft(0.15), border: `1px solid ${C.accentSoft(0.3)}`, color: C.accent, borderRadius: "4px" }}
            >
              {maintenance.length} interventions
            </span>
          )}
        </div>

        {maintenance.length > 0 ? (
          <div style={{ border: `1px solid ${C.border(0.12)}` }}>
            {visibleEntries.map((entry, i) => {
              const isLinked = Boolean(entry.linkedDoc && documents.length > 0);
              const isCT = /contrôle technique|ct favorable/i.test(entry.operation);
              return (
                <div
                  key={i}
                  className={isLinked ? "group cursor-pointer" : ""}
                  onClick={isLinked ? () => handleLinkedEntryClick(entry.linkedDoc!) : undefined}
                  style={{
                    borderTop: i > 0 ? `1px solid ${C.border(0.08)}` : "none",
                    backgroundColor: i % 2 === 0 ? C.surface(0.04) : "transparent",
                  }}
                >
                  <div className="px-5 py-6">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-4">
                      <span
                        className="inline-block text-[12px] font-bold uppercase tracking-[0.1em]"
                        style={{
                          color: isCT ? C.green : C.accent,
                          backgroundColor: isCT ? C.greenSoft(0.1) : C.accentSoft(0.1),
                          border: isCT ? `1px solid ${C.greenSoft(0.3)}` : `1px solid ${C.accentSoft(0.25)}`,
                          borderRadius: "5px",
                          padding: "0.4rem 0.6rem",
                        }}
                      >
                        {entry.date}
                      </span>
                      <div className="flex flex-shrink-0 items-center gap-3">
                        {entry.amount && entry.amount !== "—" && (
                          <span className="text-[15px] font-semibold tabular-nums" style={{ color: C.textSoft(0.8) }}>
                            {entry.amount}
                          </span>
                        )}
                        {isLinked && (
                          <span
                            className="flex flex-shrink-0 items-center justify-center"
                            style={{ color: C.accent, fontSize: "12px", width: "1.75rem", height: "1.75rem", backgroundColor: C.accentSoft(0.12), borderRadius: "50%" }}
                            title="Voir la facture"
                          >
                            📄
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-[15px] leading-snug" style={{ color: C.textSoft(0.88) }}>
                      {entry.operation}
                    </p>
                    {entry.km && entry.km !== "—" && (
                      <p className="mt-1.5 text-[13px]" style={{ color: C.accentSoft(0.7) }}>
                        {entry.km}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
            {collapsible && (
              <button
                onClick={() => setExpanded((e) => !e)}
                className="flex w-full items-center justify-center gap-2.5 px-5 py-4 text-[12px] font-bold uppercase tracking-[0.15em] transition-colors"
                style={{ borderTop: `1px solid ${C.accentSoft(0.15)}`, backgroundColor: C.accentSoft(0.08), color: C.accent }}
              >
                <span style={{ fontSize: "10px" }}>{expanded ? "▲" : "▼"}</span>
                {expanded ? "Voir moins" : `Voir les ${hiddenEntries.length} interventions précédentes`}
              </button>
            )}
          </div>
        ) : (
          <p className="text-xs" style={{ color: C.textSoft(0.45) }}>
            Historique d&apos;entretien non renseigné pour ce véhicule.
          </p>
        )}
      </div>

      {/* Factures & documents */}
      {documents.length > 0 && (
        <div>
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.25em]" style={{ color: C.text }}>
            Factures &amp; Documents
          </p>

          {!unlocked ? (
            <div>
              {pendingDoc && (
                <p className="mb-4 text-xs" style={{ color: C.accent }}>
                  Entrez le mot de passe pour accéder à la facture associée.
                </p>
              )}
              <div
                className="mb-6 flex items-center gap-3 px-4 py-3"
                style={{ backgroundColor: C.accentSoft(0.05), border: `1px solid ${C.accentSoft(0.15)}`, borderRadius: "6px" }}
              >
                <span style={{ color: C.accent, fontSize: "15px" }}>🔒</span>
                <p className="text-[14px]" style={{ color: C.textSoft(0.85) }}>
                  Les documents de ce véhicule sont protégés. Contactez-nous pour obtenir le code d&apos;accès.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="flex max-w-sm gap-3">
                <input
                  ref={passwordRef}
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(false); }}
                  placeholder="Mot de passe"
                  className="flex-1 border px-4 py-3 text-sm outline-none"
                  style={{ backgroundColor: C.cardLight, borderColor: error ? C.error : pendingDoc ? C.accent : C.border(0.15), color: C.text }}
                />
                <button
                  type="submit"
                  className="px-6 py-3 text-xs font-semibold uppercase tracking-widest"
                  style={{ backgroundColor: C.accent, color: "#fff" }}
                >
                  Accéder
                </button>
              </form>
              {error && (
                <p className="mt-3 text-xs" style={{ color: C.error }}>
                  Mot de passe incorrect
                </p>
              )}
              <p className="mt-3 text-[11px]" style={{ color: C.textSoft(0.4) }}>
                Démo : <span style={{ color: C.textSoft(0.65) }}>{DOC_PASSWORD}</span>
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {documents.map((doc, i) => (
                <div key={doc.src} style={{ backgroundColor: C.card, cursor: "pointer" }} onClick={() => setLightboxIndex(i)}>
                  <p className="px-4 py-3 text-[10px] uppercase tracking-[0.25em]" style={{ color: C.textSoft(0.75), borderBottom: `1px solid ${C.border(0.1)}` }}>
                    {doc.label}
                  </p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={doc.src} alt={doc.label} className="h-auto w-full transition-opacity hover:opacity-80" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
