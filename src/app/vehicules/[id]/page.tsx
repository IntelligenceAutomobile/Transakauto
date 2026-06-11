import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getVehicleDetail, vehicleDetails } from "@/lib/vehicle-details";
import { formatNumber } from "@/lib/format";
import { C } from "@/lib/vehicle-theme";
import VehicleHeroCarousel from "./VehicleHeroCarousel";
import DescriptionBlock from "./DescriptionBlock";
import EquipementsAccordion from "./EquipementsAccordion";
import EntretienDocumentsSection from "./EntretienDocumentsSection";
import GalleryLightbox from "./GalleryLightbox";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(vehicleDetails).map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const v = getVehicleDetail(id);
  if (!v) return { title: "Véhicule — TransakAuto" };
  return {
    title: `${v.make} ${v.model} (${v.year}) — TransakAuto`,
    description: v.description.split("\n\n")[0],
  };
}

// ── Helpers (repris de la fiche d'origine) ───────────────────────────────────
function parseTitle(make: string, model: string, power?: number | null) {
  const dispMatch = model.match(/(\d+\.\d+)/);
  if (!dispMatch) return { name: `${make} ${model}`, subtitle: null as string | null };

  const dispIdx = model.indexOf(dispMatch[0]);
  const namePart = model.slice(0, dispIdx).trim();
  const rest = model.slice(dispIdx);

  const parts = rest
    .split(/\s+(?=S\s+line\b|Competition\b|S\s*tronic\b|quattro\b|DSG\b|Ambition\b|Prestige\b)/i)
    .map((p) => p.trim())
    .filter(Boolean);

  if (power && parts.length > 0) parts[0] = `${parts[0]} ${power} ch`;

  return { name: `${make} ${namePart}`, subtitle: parts.join(" — ") };
}

const CATEGORIES: { label: string; keys: string[] }[] = [
  { label: "Motorisation", keys: ["hybride", "électrique", "chargeur", "boîte", "norme", "consommation", "phev", "e-tron", "quattro", "s tronic", "dsg"] },
  { label: "Design & S line", keys: ["pack s line", "jante", "bouclier", "bas de caisse", "feux", "led", "spoiler", "diffuseur", "échappement", "carbone", "phare", "seuils", "s line"] },
  { label: "Confort & Techno", keys: ["siège", "volant", "climat", "démarrage", "rétroviseur", "navigation", "bluetooth", "régulateur", "caméra", "keyless", "virtual", "mmi", "b&o", "bang", "éclairage", "vitres", "connectivité", "apple", "carplay", "android", "sellerie"] },
  { label: "Sécurité", keys: ["airbag", "esp", "asr", "stationnement", "isofix", "frein", "parking", "abs", "traction"] },
];

function categorize(features: string[]) {
  const used = new Set<string>();
  const result: { label: string; items: string[] }[] = [];
  for (const cat of CATEGORIES) {
    const matched = features.filter((f) => !used.has(f) && cat.keys.some((k) => f.toLowerCase().includes(k)));
    if (matched.length) {
      matched.forEach((f) => used.add(f));
      result.push({ label: cat.label, items: matched });
    }
  }
  const rest = features.filter((f) => !used.has(f));
  if (rest.length) result.push({ label: "Autres", items: rest });
  return result;
}

// ── Bloc d'en-tête de section numéroté ───────────────────────────────────────
function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <div className="mb-10 flex items-baseline gap-5">
      <span
        className="flex flex-shrink-0 items-center justify-center font-black leading-none tabular-nums"
        style={{
          fontSize: "1.1rem", color: C.accent, letterSpacing: "-0.02em",
          width: "2.75rem", height: "2.75rem",
          backgroundColor: C.accentSoft(0.1), border: `1px solid ${C.accentSoft(0.3)}`, borderRadius: "8px",
        }}
      >
        {num}
      </span>
      <p className="flex-shrink-0 text-sm font-bold uppercase tracking-[0.4em]" style={{ color: C.text }}>
        {title}
      </p>
      <div className="h-px flex-1 self-center" style={{ backgroundColor: C.accentSoft(0.25) }} />
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function VehiculeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const v = getVehicleDetail(id);
  if (!v) notFound();

  const images = v.images;
  const features = v.features;
  const documents = v.documents.map((d) => ({ src: `/vehicules/audi-tt-mk3/factures/${d.file}`, label: d.label }));
  const maintenance = v.maintenance;

  const { name, subtitle } = parseTitle(v.make, v.model, v.power);
  const categories = categorize(features);
  const pointsForts = features.slice(0, 6);
  const isSold = v.status === "vendu";
  const isAvailable = v.status === "disponible";

  const allParagraphs = v.description.split("\n\n").filter(Boolean);
  const descParagraphs = allParagraphs.filter(
    (p) => !p.toLowerCase().includes("accident") && !p.toLowerCase().includes("contrôle technique"),
  );
  const etatParagraph = allParagraphs.find(
    (p) => p.toLowerCase().includes("accident") || p.toLowerCase().includes("contrôle technique"),
  );
  const etatFacts = etatParagraph?.split(/\.\s+/).map((s) => s.replace(/\.$/, "").trim()).filter(Boolean) ?? [];

  let sectionIdx = 0;
  const nextNum = () => (++sectionIdx).toString().padStart(2, "0");

  const sectionCardStyle: CSSProperties = {
    background: `linear-gradient(160deg, ${C.card} 0%, ${C.bg} 100%)`,
    border: `1px solid ${C.border(0.1)}`,
    borderRadius: "10px",
    padding: "2rem",
  };

  const contactHref = `/contact?vehicule=${encodeURIComponent(`${v.make} ${v.model} ${v.year}`)}`;

  return (
    <div style={{ backgroundColor: C.bg, color: C.text }}>
      {/* HERO */}
      <VehicleHeroCarousel images={images} alt={name} imgOpacity={isSold ? 0.45 : 1}>
        <div className="absolute left-6 top-32 z-10 lg:left-12">
          <Link
            href="/vehicules"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] transition-opacity hover:opacity-70"
            style={{ color: C.textSoft(0.8) }}
          >
            ← Retour au stock
          </Link>
        </div>
        <div className="absolute right-6 top-32 z-10 lg:right-12">
          <span
            className="px-3 py-1.5 text-[10px] uppercase tracking-[0.3em]"
            style={{
              backgroundColor: isAvailable ? C.greenSoft(0.12) : "transparent",
              color: isAvailable ? C.green : C.textSoft(0.8),
              border: isAvailable ? `1px solid ${C.greenSoft(0.35)}` : `1px solid ${C.border(0.2)}`,
              borderRadius: "4px",
            }}
          >
            {isAvailable ? "Disponible" : isSold ? "Vendu" : "Réservé"}
          </span>
        </div>
      </VehicleHeroCarousel>

      {/* LAYOUT */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-10 pb-28 pt-12 lg:grid-cols-5 lg:gap-20">
          {/* COLONNE GAUCHE */}
          <div className="lg:col-span-3">
            <p className="mb-5 text-xs uppercase tracking-[0.45em]" style={{ color: C.accent }}>
              {v.make} · {v.origin}
            </p>
            <h1 className="mb-2 font-display font-black uppercase leading-[0.9]" style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)", letterSpacing: "-0.03em" }}>
              {name}
            </h1>
            {subtitle && (
              <p className="mb-10 font-light" style={{ color: C.textSoft(0.6), fontSize: "clamp(0.85rem, 1.5vw, 1rem)", letterSpacing: "0.04em" }}>
                {subtitle}
              </p>
            )}

            {/* 01 — Présentation */}
            {descParagraphs.length > 0 && (
              <div className="mb-14">
                <SectionHeader num={nextNum()} title="Présentation" />
                <div style={sectionCardStyle}>
                  <DescriptionBlock paragraphs={descParagraphs} />
                  {etatFacts.length > 0 && (
                    <div className="mt-8 flex flex-wrap gap-3">
                      {etatFacts.map((fact, i) => (
                        <span
                          key={i}
                          className="flex items-center gap-3 px-4 py-3 text-[14px] font-medium"
                          style={{ backgroundColor: C.surface(0.05), border: `1px solid ${C.border(0.14)}`, color: C.textSoft(0.92), borderRadius: "6px" }}
                        >
                          <span
                            className="flex flex-shrink-0 items-center justify-center font-bold"
                            style={{ color: C.green, fontSize: "11px", width: "1.25rem", height: "1.25rem", backgroundColor: C.greenSoft(0.15), borderRadius: "50%" }}
                          >
                            ✓
                          </span>
                          {fact}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 02 — Points forts */}
            {pointsForts.length > 0 && (
              <div className="mb-14">
                <SectionHeader num={nextNum()} title="Points forts" />
                <div style={sectionCardStyle}>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {pointsForts.map((f) => (
                      <div
                        key={f}
                        className="flex items-start gap-4 px-5 py-5 transition-all duration-300 hover:-translate-y-0.5"
                        style={{ backgroundColor: C.surface(0.04), border: `1px solid ${C.border(0.1)}`, borderLeft: `3px solid ${C.accent}`, borderRadius: "6px" }}
                      >
                        <span className="mt-0.5 flex-shrink-0 text-xs font-bold" style={{ color: C.accent }}>✓</span>
                        <span className="text-[15px] font-medium leading-snug" style={{ color: C.textSoft(0.92) }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 03 — Équipements */}
            {categories.length > 0 && (
              <div className="mb-14">
                <SectionHeader num={nextNum()} title="Équipements" />
                <div style={sectionCardStyle}>
                  <EquipementsAccordion categories={categories} />
                </div>
              </div>
            )}

            {/* 04 — Entretien & Documents */}
            {(maintenance.length > 0 || documents.length > 0) && (
              <div className="mb-14">
                <SectionHeader num={nextNum()} title="Entretien & Documents" />
                <div style={sectionCardStyle}>
                  <EntretienDocumentsSection maintenance={maintenance} documents={documents} />
                </div>
              </div>
            )}

            {/* Branding */}
            <div className="mt-8 flex items-center gap-4">
              <div style={{ width: "40px", height: "2px", backgroundColor: C.accent, borderRadius: "1px" }} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.45em]" style={{ color: C.textSoft(0.9) }}>
                TransakAuto · Conseil · Achat · Vente
              </span>
              <div className="h-px flex-1" style={{ backgroundColor: C.accentSoft(0.15) }} />
            </div>
          </div>

          {/* COLONNE DROITE — STICKY */}
          <div className="lg:col-span-2">
            <div style={{ position: "sticky", top: "calc(7rem + 40px)" }}>
              <div
                style={{
                  background: `linear-gradient(160deg, ${C.cardLight} 0%, ${C.card} 100%)`,
                  border: `1px solid ${C.accentSoft(0.2)}`,
                  borderTop: `2px solid ${C.accent}`,
                  borderRadius: "10px",
                  boxShadow: `0 20px 60px ${C.accentSoft(0.1)}`,
                  overflow: "hidden",
                }}
              >
                {/* Garantie */}
                <div className="flex items-center gap-2.5 px-6 py-3.5" style={{ borderBottom: `1px solid ${C.accentSoft(0.12)}`, backgroundColor: C.accentSoft(0.06) }}>
                  <span className="flex flex-shrink-0 items-center justify-center font-bold" style={{ color: C.accent, fontSize: "10px", width: "1.25rem", height: "1.25rem", backgroundColor: C.accentSoft(0.15), borderRadius: "50%" }}>
                    ✓
                  </span>
                  <span className="text-[13px] font-medium tracking-wide" style={{ color: C.textSoft(0.85) }}>
                    Garantie jusqu&apos;à 24 mois en Europe
                  </span>
                </div>

                {/* Prix */}
                <div className="px-6 pb-2 pt-6">
                  <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.4em]" style={{ color: C.textSoft(0.55) }}>
                    Prix de vente
                  </p>
                  <div className="mb-1 font-display font-black leading-none" style={{ fontSize: "clamp(2.6rem, 4.5vw, 3.4rem)", letterSpacing: "-0.04em", color: C.text }}>
                    {formatNumber(v.price)} €
                  </div>
                </div>

                {/* Specs */}
                <div className="mx-6 mb-5 grid grid-cols-2 gap-px" style={{ backgroundColor: C.accentSoft(0.15) }}>
                  {[
                    { label: "Kilométrage", value: `${formatNumber(v.mileage)} km` },
                    { label: "Mise en circulation", value: String(v.year) },
                    v.power ? { label: "Puissance", value: `${v.power} ch` } : null,
                    { label: "Carburant", value: v.fuel },
                    { label: "Boîte", value: v.transmission },
                    { label: "Provenance", value: v.origin },
                  ]
                    .filter(Boolean)
                    .map((s) => (
                      <div key={s!.label} className="flex flex-col px-4 py-4" style={{ backgroundColor: C.card }}>
                        <span className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.25em]" style={{ color: C.textSoft(0.55) }}>
                          {s!.label}
                        </span>
                        <span className="font-display font-black leading-tight" style={{ fontSize: "1.1rem", color: C.text, letterSpacing: "-0.01em" }}>
                          {s!.value}
                        </span>
                      </div>
                    ))}
                </div>

                {/* Services */}
                <div className="flex flex-col gap-2.5 px-6 pb-6 pt-4" style={{ borderTop: `1px solid ${C.accentSoft(0.1)}` }}>
                  {["Financement sur mesure", "Démarches administratives incluses"].map((g) => (
                    <div key={g} className="flex items-center gap-2.5">
                      <span className="flex-shrink-0 font-bold" style={{ color: C.accent, fontSize: "11px" }}>✓</span>
                      <span className="text-xs tracking-wide" style={{ color: C.textSoft(0.75) }}>{g}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-3 flex flex-col gap-2">
                {isAvailable ? (
                  <>
                    <Link
                      href={`${contactHref}&sujet=reservation`}
                      className="block w-full py-5 text-center text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-y-px hover:opacity-90"
                      style={{ backgroundColor: C.accent, color: "#fff" }}
                    >
                      Réserver ce véhicule
                    </Link>
                    <Link
                      href={`${contactHref}&sujet=dossier`}
                      className="block w-full border py-4 text-center text-xs font-semibold uppercase tracking-widest transition-all duration-300"
                      style={{ borderColor: C.border(0.2), color: C.textSoft(0.8) }}
                    >
                      Demander le dossier complet
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/vehicules"
                    className="block w-full py-5 text-center text-xs font-semibold uppercase tracking-widest"
                    style={{ backgroundColor: C.accent, color: "#fff" }}
                  >
                    Voir le stock disponible
                  </Link>
                )}

                {images.length > 1 && (
                  <a
                    href="#galerie"
                    className="block w-full py-3 text-center text-[11px] font-semibold uppercase tracking-[0.3em] transition-opacity hover:opacity-70"
                    style={{ color: C.accent }}
                  >
                    Voir les {images.length} photos
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* GALERIE */}
        {images.length > 1 && (
          <div id="galerie" className="border-t pb-24" style={{ borderColor: C.border(0.1), paddingTop: "3.5rem" }}>
            <div className="mb-10 flex items-center gap-4">
              <p className="flex-shrink-0 text-[9px] uppercase tracking-[0.55em]" style={{ color: C.text }}>
                Galerie
              </p>
              <span className="text-[9px] tracking-[0.2em]" style={{ color: C.accentSoft(0.5) }}>
                {images.length} photos
              </span>
              <div className="h-px flex-1" style={{ backgroundColor: C.border(0.1) }} />
            </div>
            <GalleryLightbox images={images} alt={name} />
          </div>
        )}

        {/* CTA FINAL */}
        <div className="pb-28 lg:pb-24" style={{ paddingTop: "3.5rem" }}>
          <div className="mx-auto max-w-3xl text-center" style={{ ...sectionCardStyle, padding: "3.5rem 2.5rem" }}>
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.5em]" style={{ color: C.accent }}>
              Essai disponible
            </p>
            <h2 className="mb-6 font-display font-black uppercase leading-tight" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.025em" }}>
              Envie de l&apos;essayer ?
            </h2>
            <p className="mb-12 text-[15px]" style={{ color: C.textSoft(0.65) }}>
              Prenez rendez-vous avec votre agence TransakAuto Bruxelles. On vous accompagne de A à Z.
            </p>
            {isAvailable && (
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href={`${contactHref}&sujet=reservation`}
                  className="px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-y-px hover:opacity-90"
                  style={{ backgroundColor: C.accent, color: "#fff" }}
                >
                  Réserver ce véhicule
                </Link>
                <Link
                  href={`${contactHref}&sujet=dossier`}
                  className="border px-10 py-5 text-xs font-semibold uppercase tracking-widest transition-all duration-300"
                  style={{ borderColor: C.accentSoft(0.4), color: C.accent }}
                >
                  Demander le dossier complet
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE STICKY CTA */}
      {isAvailable && (
        <div
          className="fixed bottom-0 left-0 right-0 z-40 px-4 py-3 lg:hidden"
          style={{ backgroundColor: "rgba(13,12,16,0.95)", borderTop: `1px solid ${C.accentSoft(0.2)}`, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
        >
          <Link
            href={`${contactHref}&sujet=reservation`}
            className="block w-full py-4 text-center text-xs font-bold uppercase tracking-[0.2em]"
            style={{ backgroundColor: C.accent, color: "#fff" }}
          >
            Réserver · {formatNumber(v.price)} €
          </Link>
        </div>
      )}
    </div>
  );
}
