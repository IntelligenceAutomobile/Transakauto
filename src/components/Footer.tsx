import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-night">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Image src="/logo.png" alt="TransakAuto" width={896} height={278} className="h-12 w-auto" />
          <p className="mt-2 text-xs font-medium uppercase tracking-[0.35em] text-cream/50">
            {site.baseline}
          </p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/60">
            Votre agence automobile à {site.city}. Nous vous accompagnons de
            A&nbsp;à&nbsp;Z dans la vente et l’achat de votre voiture
            d’occasion, au meilleur prix et en toute sérénité.
          </p>
        </div>

        <nav aria-label="Navigation du pied de page">
          <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-cream/40">
            Navigation
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/vendre" className="text-cream/80 transition-colors hover:text-magenta">Vendre ma voiture</Link></li>
            <li><Link href="/vehicules" className="text-cream/80 transition-colors hover:text-magenta">Nos véhicules</Link></li>
            <li><Link href="/contact" className="text-cream/80 transition-colors hover:text-magenta">Nous contacter</Link></li>
          </ul>
        </nav>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-cream/40">
            L’agence
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-cream/80">
            <li>
              {site.address.street}
              <br />
              {site.address.zip} {site.address.city}
            </li>
            <li>
              <a href={site.phoneHref} className="transition-colors hover:text-magenta">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-magenta">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} TransakAuto {site.city} — Tous droits réservés</p>
          <p>Mentions légales · Politique de confidentialité</p>
        </div>
      </div>
    </footer>
  );
}
