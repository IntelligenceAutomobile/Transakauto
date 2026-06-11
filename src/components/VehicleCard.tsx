import Image from "next/image";
import Link from "next/link";
import { formatNumber } from "@/lib/format";
import type { Vehicle } from "@/lib/vehicles";

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const inner = (
    <article className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-coal transition-colors hover:border-magenta/60">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={vehicle.image}
          alt={vehicle.title}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {vehicle.highlight && (
          <span className="absolute left-4 top-4 rounded-full bg-magenta px-3 py-1 text-xs font-semibold text-white">
            {vehicle.highlight}
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-semibold text-cream">{vehicle.title}</h3>
            <p className="mt-0.5 text-sm text-cream/60">{vehicle.subtitle}</p>
          </div>
          <p className="shrink-0 font-display text-lg font-bold text-magenta">
            {formatNumber(vehicle.price)} €
          </p>
        </div>
        <ul className="mt-4 flex flex-wrap gap-2 text-xs text-cream/70">
          {[
            String(vehicle.year),
            `${formatNumber(vehicle.km)} km`,
            vehicle.fuel,
            vehicle.gearbox,
          ].map((spec) => (
            <li key={spec} className="rounded-full border border-white/15 px-3 py-1">
              {spec}
            </li>
          ))}
        </ul>
        {vehicle.hasDetail && (
          <p className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-magenta">
            Voir la fiche
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </p>
        )}
      </div>
    </article>
  );

  if (vehicle.hasDetail) {
    return (
      <Link href={`/vehicules/${vehicle.id}`} className="block h-full">
        {inner}
      </Link>
    );
  }
  return inner;
}
