import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import VehicleCard from "@/components/VehicleCard";
import { site } from "@/lib/site";
import { vehicles } from "@/lib/vehicles";

export const metadata: Metadata = {
  title: "Nos véhicules d’occasion à Bruxelles — TransakAuto",
  description:
    "Découvrez les voitures d’occasion sélectionnées, contrôlées et garanties de votre agence TransakAuto à Bruxelles.",
};

export default function VehiculesPage() {
  return (
    <>
      <section className="bg-night pb-16 pt-40">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-magenta sm:text-sm">
              Notre stock — {site.city}
            </p>
            <h1 className="mt-5 font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
              Nos véhicules <span className="text-magenta">d’occasion</span>
            </h1>
            <p className="mt-6 max-w-2xl leading-relaxed text-cream/75">
              Chaque véhicule est sélectionné, contrôlé et présenté avec une
              fiche détaillée et un historique vérifié. Garantie jusqu’à
              24&nbsp;mois en Europe sur les modèles éligibles.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-night pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((vehicle, i) => (
              <Reveal key={vehicle.id} delay={(i % 3) * 0.1}>
                <VehicleCard vehicle={vehicle} />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-16 rounded-2xl border border-white/10 bg-coal p-8 text-center sm:p-12">
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl">
                Vous cherchez un modèle <span className="text-magenta">précis</span> ?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-cream/70">
                Notre réseau de plus de 150 agences nous permet de trouver le
                véhicule qu’il vous faut. Dites-nous ce que vous cherchez, on
                s’occupe du reste.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="rounded-full bg-magenta px-7 py-3.5 font-semibold text-white transition-colors hover:bg-magenta-dark"
                >
                  Décrire ma recherche
                </Link>
                <a
                  href={site.phoneHref}
                  className="rounded-full border border-cream/40 px-7 py-3.5 font-semibold transition-colors hover:border-magenta hover:text-magenta"
                >
                  {site.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
