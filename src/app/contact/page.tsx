import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — TransakAuto Bruxelles",
  description:
    "Contactez votre agence TransakAuto à Bruxelles : adresse, téléphone, horaires. Estimation gratuite de votre véhicule sur rendez-vous.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-night pb-16 pt-40">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-magenta sm:text-sm">
              Contact
            </p>
            <h1 className="mt-5 font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
              Votre agence de <span className="text-magenta">{site.city}</span>
            </h1>
            <p className="mt-6 max-w-2xl leading-relaxed text-cream/75">
              Une question, une estimation, un véhicule à vendre ou à trouver ?
              Passez nous voir, appelez-nous ou écrivez-nous : on vous répond
              rapidement.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-20 text-ink">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-ink/50">
                  Adresse
                </h2>
                <p className="mt-2 text-lg font-medium">
                  {site.address.street}
                  <br />
                  {site.address.zip} {site.address.city}
                </p>
              </div>
              <div>
                <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-ink/50">
                  Téléphone
                </h2>
                <a
                  href={site.phoneHref}
                  className="mt-2 inline-block font-display text-2xl font-bold text-magenta"
                >
                  {site.phone}
                </a>
              </div>
              <div>
                <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-ink/50">
                  Email
                </h2>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-2 inline-block text-lg font-medium transition-colors hover:text-magenta"
                >
                  {site.email}
                </a>
              </div>
              <div>
                <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-ink/50">
                  Horaires
                </h2>
                <ul className="mt-2 space-y-1.5">
                  {site.hours.map((slot) => (
                    <li key={slot.days} className="flex justify-between gap-8 text-sm sm:max-w-xs">
                      <span className="text-ink/70">{slot.days}</span>
                      <span className="font-medium">{slot.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="overflow-hidden rounded-2xl border border-ink/10 shadow-sm">
              <iframe
                title={`Plan d’accès — TransakAuto ${site.city}`}
                src="https://www.openstreetmap.org/export/embed.html?bbox=4.3068%2C50.8303%2C4.4268%2C50.8903&layer=mapnik&marker=50.8603%2C4.3668"
                className="h-[480px] w-full border-0"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
