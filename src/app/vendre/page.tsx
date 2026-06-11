import type { Metadata } from "next";
import Image from "next/image";
import EstimationForm from "@/components/EstimationForm";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Vendre ma voiture à Bruxelles — TransakAuto",
  description:
    "Faites estimer gratuitement votre voiture par un expert TransakAuto à Bruxelles. Vente sécurisée, accompagnement de A à Z, paiement sous 24-48h.",
};

const steps = [
  {
    title: "Renseignez les informations de votre véhicule",
    text: "En ligne ou directement à l’agence, vous complétez les caractéristiques de votre voiture afin de préparer l’estimation : marque, modèle, année, kilométrage, état.",
  },
  {
    title: "Une estimation réalisée par un expert, en agence",
    text: "Lors d’un rendez-vous à Bruxelles, un expert analyse votre véhicule et établit une estimation basée sur son état réel et le marché. Gratuite, sans engagement et sans obligation d’achat.",
  },
  {
    title: "Vous vendez en toute sécurité",
    text: "Annonce, contacts, visites, démarches et paiement sécurisé sous 24 à 48h : vous êtes accompagné de A à Z jusqu’à la remise des clés.",
  },
];

const guarantees = [
  {
    title: "Estimation gratuite",
    text: "L’évaluation de votre véhicule par notre expert ne vous coûte rien, en ligne comme à l’agence.",
  },
  {
    title: "Sans engagement",
    text: "Vous restez libre d’accepter ou non. Aucune obligation de vente, aucune obligation d’achat.",
  },
  {
    title: "Paiement sous 24-48h",
    text: "Dès la vente conclue, vous recevez votre paiement sécurisé sous 24 à 48 heures.",
  },
];

const faq = [
  {
    q: "Combien coûte la mise en vente de mon véhicule ?",
    a: "L’estimation est gratuite et sans engagement. Notre commission n’est due que si votre véhicule est vendu — vous connaissez le montant exact avant de signer quoi que ce soit.",
  },
  {
    q: "Dois-je laisser ma voiture à l’agence ?",
    a: "C’est l’idéal pour la présenter aux acheteurs (dépôt-vente), mais nous pouvons aussi convenir d’une formule où vous gardez votre véhicule entre les visites.",
  },
  {
    q: "Que dois-je apporter pour l’estimation ?",
    a: "La carte grise, le carnet ou les factures d’entretien si vous les avez, et le certificat de contrôle technique. Pas de panique : on vous aide à rassembler le reste.",
  },
  {
    q: "En combien de temps ma voiture sera-t-elle vendue ?",
    a: "Cela dépend du véhicule et du prix retenu, mais notre réseau de plus de 150 agences et d’acheteurs qualifiés permet en général une vente en quelques semaines.",
  },
];

export default function VendrePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[70svh] items-end overflow-hidden">
        <Image
          src="/images/hero-vendre.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-night/30" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-44 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-magenta sm:text-sm">
              Vendre ma voiture — {site.city}
            </p>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold uppercase leading-[1.08] tracking-tight sm:text-6xl">
              Faites estimer votre voiture par des experts,{" "}
              <span className="text-magenta">gratuitement</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
              Après avoir reçu tous vos éléments, nous vous proposons un
              rendez-vous en agence afin d’estimer votre véhicule. Laissez-vous
              guider, on s’occupe de tout.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Garanties */}
      <section className="bg-cream py-20 text-ink">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 md:grid-cols-3">
          {guarantees.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="h-full rounded-2xl bg-white p-8 shadow-sm">
                <h2 className="font-display text-lg font-semibold">
                  <span className="text-magenta">— </span>
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Étapes */}
      <section className="bg-cream pb-24 text-ink">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
              Comment <span className="text-magenta">ça marche</span> ?
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-ink/10 p-8">
                  <span className="inline-block rounded-full bg-magenta px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    Étape {i + 1}
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire d'estimation */}
      <section id="estimation" className="bg-cream-dark py-24 text-ink">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-magenta">
                Estimation gratuite
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
                Démarrez votre estimation
              </h2>
              <p className="mt-5 leading-relaxed text-ink/70">
                Remplissez ce court formulaire : un expert de l’agence de{" "}
                {site.city} vous recontacte pour organiser votre rendez-vous
                d’estimation. Vous préférez le téléphone ?
              </p>
              <a
                href={site.phoneHref}
                className="mt-4 inline-block font-display text-2xl font-bold text-magenta"
              >
                {site.phone}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <EstimationForm />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-night py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
              Questions <span className="text-magenta">fréquentes</span>
            </h2>
          </Reveal>
          <div className="mt-10 space-y-4">
            {faq.map((item, i) => (
              <Reveal key={item.q} delay={i * 0.06}>
                <details className="group rounded-2xl border border-white/10 bg-coal px-6 py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-cream">
                    {item.q}
                    <span className="text-magenta transition-transform group-open:rotate-45">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                        <path strokeLinecap="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-cream/70">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
