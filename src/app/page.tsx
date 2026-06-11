import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import VehicleCard from "@/components/VehicleCard";
import { site } from "@/lib/site";
import { vehicles } from "@/lib/vehicles";

const steps = [
  {
    title: "Renseignez votre véhicule",
    text: "En ligne ou par téléphone, décrivez votre voiture en quelques minutes : marque, modèle, kilométrage, état général.",
  },
  {
    title: "Recevez une estimation d’expert",
    text: "Un expert de l’agence évalue votre véhicule et établit une estimation basée sur son état réel et le marché.",
  },
  {
    title: "Vendez en toute sécurité",
    text: "Annonce, visites, démarches et paiement sécurisé sous 24 à 48h : vous êtes accompagné de A à Z.",
  },
];

const services = [
  {
    title: "Conseil",
    text: "Un accompagnement honnête et transparent pour vendre ou acheter au juste prix, sans pression et sans mauvaise surprise.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm3.75 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm3.75 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM21 12c0 4.556-4.03 8.25-9 8.25a9.76 9.76 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
      </svg>
    ),
  },
  {
    title: "Achat",
    text: "Des véhicules d’occasion sélectionnés, contrôlés et garantis jusqu’à 24 mois, avec un historique clair et vérifié.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    title: "Vente",
    text: "Votre voiture vendue rapidement et au meilleur prix : estimation gratuite, mise en valeur professionnelle, paiement sécurisé.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
];

const advantages = [
  "Une prise en charge complète, de l’estimation jusqu’au paiement",
  "Une fiche détaillée et des photos professionnelles de votre véhicule",
  "Un réseau national de plus de 150 agences et d’acheteurs qualifiés",
  "Des partenaires financement et garantie pour faciliter la transaction",
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-svh items-center overflow-hidden">
        <Image
          src="/images/hero-accueil.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-night via-night/80 to-night/30" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-36 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-magenta sm:text-sm">
              Agence automobile — {site.city}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold uppercase leading-[1.08] tracking-tight sm:text-6xl">
              Vendez votre voiture <span className="text-magenta">au meilleur prix</span>, en toute sérénité
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
              Estimation gratuite par un expert, mise en vente professionnelle
              et paiement sécurisé sous 24 à 48h. Votre agence TransakAuto à{" "}
              {site.city} s’occupe de tout.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/vendre"
                className="rounded-full bg-magenta px-7 py-3.5 font-semibold text-white transition-colors hover:bg-magenta-dark"
              >
                Faire estimer ma voiture
              </Link>
              <Link
                href="/vehicules"
                className="rounded-full border border-cream/40 px-7 py-3.5 font-semibold text-cream transition-colors hover:border-magenta hover:text-magenta"
              >
                Voir nos véhicules
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <ul className="mt-14 flex flex-wrap gap-3">
              {["Estimation gratuite", "Sans engagement", "Paiement sous 24-48h", "Garantie jusqu’à 24 mois"].map(
                (item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-cream backdrop-blur-sm sm:text-base"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4 shrink-0 text-magenta">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ),
              )}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Services — Conseil · Achat · Vente */}
      <section className="bg-cream py-24 text-ink">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-magenta">
              {site.baseline}
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
              Une agence, trois métiers
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl bg-white p-8 shadow-sm">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-magenta/10 text-magenta">
                    {service.icon}
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold">{service.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink/70">{service.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
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
                <div className="relative h-full rounded-2xl border border-ink/10 p-8">
                  <span className="font-display text-5xl font-bold text-magenta/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-12">
              <Link
                href="/vendre"
                className="inline-block rounded-full bg-ink px-7 py-3.5 font-semibold text-cream transition-colors hover:bg-magenta"
              >
                Démarrer mon estimation gratuite
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="relative overflow-hidden py-24">
        <Image
          src="/images/ambiance-phare.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-night/60" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
              TransakAuto <span className="text-magenta">en chiffres</span>
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-10 lg:grid-cols-4">
            {site.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div className="text-center">
                  <p className="font-display text-4xl font-bold text-magenta sm:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mx-auto mt-3 max-w-[14rem] text-sm text-cream/75">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Véhicules en vitrine */}
      <section className="bg-night py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-magenta">
                  Notre sélection
                </p>
                <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
                  Véhicules disponibles à {site.city}
                </h2>
              </div>
              <Link
                href="/vehicules"
                className="rounded-full border border-cream/40 px-6 py-3 text-sm font-semibold transition-colors hover:border-magenta hover:text-magenta"
              >
                Tout le stock
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.slice(0, 3).map((vehicle, i) => (
              <Reveal key={vehicle.id} delay={i * 0.1}>
                <VehicleCard vehicle={vehicle} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi TransakAuto */}
      <section className="bg-cream py-24 text-ink">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/conseil-poignee-main.jpg"
                alt="Conclusion d’une vente de véhicule"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-magenta">
                Pourquoi nous confier votre véhicule
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
                Vous restez libre, on s’occupe du reste
              </h2>
              <p className="mt-5 leading-relaxed text-ink/70">
                Vendre une voiture peut être un processus complexe et
                chronophage. Notre expertise et notre réseau professionnel vous
                simplifient la vie, sans engagement et sans obligation d’achat.
              </p>
              <ul className="mt-8 space-y-4">
                {advantages.map((advantage) => (
                  <li key={advantage} className="flex items-start gap-3">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 h-5 w-5 shrink-0 text-magenta">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span className="text-ink/85">{advantage}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative overflow-hidden py-24">
        <Image
          src="/images/ambiance-rue.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-5xl">
              Prêt à vendre <span className="text-magenta">votre voiture</span> ?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-cream/75">
              Demandez votre estimation gratuite dès aujourd’hui. Un expert de
              l’agence de {site.city} vous recontacte rapidement.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                href="/vendre"
                className="rounded-full bg-magenta px-7 py-3.5 font-semibold text-white transition-colors hover:bg-magenta-dark"
              >
                Démarrer l’estimation
              </Link>
              <a
                href={site.phoneHref}
                className="rounded-full border border-cream/40 px-7 py-3.5 font-semibold transition-colors hover:border-magenta hover:text-magenta"
              >
                {site.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
