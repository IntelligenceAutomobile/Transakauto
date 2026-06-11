import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "À propos — TransakAuto",
  description:
    "Depuis 2011, TransakAuto sécurise la transaction automobile entre particuliers. 197 agences, 500 collaborateurs, un cadre clair à chaque étape.",
};

const heroStats = [
  { value: "197", label: "agences en France et en Europe" },
  { value: "32 000", label: "véhicules vendus en 2025" },
  { value: "500", label: "collaborateurs à votre service" },
];

const figures = [
  { value: "197", label: "agences dans le monde" },
  { value: "500", label: "collaborateurs" },
  { value: "32 000", label: "véhicules vendus*" },
  { value: "4 500", label: "véhicules disponibles" },
  { value: "60 M€", label: "de chiffre d’affaires*" },
  { value: "+150 %", label: "de croissance annuelle*" },
];

const franchiseBenefits = [
  "Formation complète",
  "Accompagnement personnalisé",
  "Outils digitaux",
  "Animation réseau",
];

export default function AProposPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[78svh] items-end overflow-hidden">
        <Image
          src="/images/ambiance-showroom.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/70 to-night/30" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-44 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-magenta sm:text-sm">
              À propos
            </p>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight sm:text-6xl">
              La transaction auto entre particuliers,{" "}
              <span className="text-magenta">sécurisée</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg font-medium text-cream/85">
              Depuis 2011. 15 ans d’expérience, un paiement sécurisé, une vente
              rapide.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/vendre"
                className="rounded-full bg-magenta px-7 py-3.5 font-semibold text-white transition-colors hover:bg-magenta-dark"
              >
                Vendre ma voiture
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-cream/40 px-7 py-3.5 font-semibold transition-colors hover:border-magenta hover:text-magenta"
              >
                Trouver une agence
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats clés */}
      <section className="bg-cream py-16 text-ink">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:grid-cols-3 sm:px-8">
          {heroStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <div className="text-center sm:text-left">
                <p className="font-display text-4xl font-bold text-magenta sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-ink/70">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Positionnement */}
      <section className="bg-night py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl">
                Plus qu’un intermédiaire.
                <br />
                <span className="text-magenta">Un cadre sécurisé.</span>
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/75">
                Vendre ou acheter entre particuliers, sans le risque. On encadre
                la négociation, les démarches et le paiement.
              </p>
              <p className="mt-4 max-w-md text-lg font-medium text-cream">
                Vous gardez l’esprit tranquille.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/conseil-poignee-main.jpg"
                alt="Une transaction conclue en toute confiance"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Origine */}
      <section className="bg-cream py-24 text-ink">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
          <Reveal className="lg:order-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-magenta">
                Origine
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
                Structurer un marché trop informel
              </h2>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink/75">
                <p>Acheter ou vendre entre particuliers : long, flou, risqué.</p>
                <p>
                  En 2011, <span className="font-semibold text-ink">Michael Ledoux</span>{" "}
                  crée TransakAuto pour y mettre de l’ordre.
                </p>
                <p>
                  Ni concessionnaire, ni simple plateforme. Un réseau d’agences,
                  des outils digitaux, un cadre sûr.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/ambiance-rue.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Vision & ambition */}
      <section className="relative overflow-hidden py-24">
        <Image
          src="/images/ambiance-phare.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-night/70" />
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-magenta">
              Vision &amp; ambition
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight sm:text-5xl">
              Devenir le <span className="text-magenta">leader européen</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-cream/80">
              France, Belgique, Luxembourg, DOM-TOM. La Suisse bientôt.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {["France", "Belgique", "Luxembourg", "DOM-TOM", "Suisse — bientôt"].map((zone) => (
                <span
                  key={zone}
                  className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 font-medium text-cream backdrop-blur-sm"
                >
                  {zone}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-12 font-display text-xl font-semibold uppercase tracking-wide text-cream">
              Cap 2030 : <span className="text-magenta">350 agences</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Le modèle */}
      <section className="bg-cream py-24 text-ink">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl">
              À chaque ville de <span className="text-magenta">+50 000 habitants</span>, sa concession
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mx-auto mt-8 max-w-xl space-y-4 text-lg leading-relaxed text-ink/75">
              <p>Le modèle ? La franchise.</p>
              <p>Des entrepreneurs engagés, un réseau cohérent et agile.</p>
              <p className="font-medium text-ink">
                Pensé pour durer : humain, technologique, compétitif.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* En chiffres */}
      <section className="bg-night py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-magenta">
              En chiffres
            </p>
            <h2 className="mt-4 text-center font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
              Une dynamique forte
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-3">
            {figures.map((figure, i) => (
              <Reveal key={figure.label} delay={(i % 3) * 0.08}>
                <div className="text-center">
                  <p className="font-display text-4xl font-bold text-magenta sm:text-5xl">
                    {figure.value}
                  </p>
                  <p className="mx-auto mt-3 max-w-[12rem] text-sm text-cream/75">{figure.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-12 text-center text-xs text-cream/40">*sur l’année 2025</p>
          </Reveal>
        </div>
      </section>

      {/* Franchise */}
      <section className="bg-cream-dark py-24 text-ink">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/ambiance-ferrari.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-magenta">
                Franchise
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
                Entreprendre avec TransakAuto
              </h2>
              <p className="mt-5 text-lg text-ink/75">Même sans expérience automobile.</p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {franchiseBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5 shrink-0 text-magenta">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span className="font-medium text-ink/85">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-9 inline-block rounded-full bg-ink px-7 py-3.5 font-semibold text-cream transition-colors hover:bg-magenta"
              >
                Découvrir la franchise
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
