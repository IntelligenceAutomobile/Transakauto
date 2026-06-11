"use client";

import { useState } from "react";
import { site } from "@/lib/site";

// Formulaire de démonstration : la soumission ouvre le client mail avec un
// message pré-rempli adressé à l'agence (aucun backend requis pour la démo).
export default function EstimationForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = [
      `Marque : ${data.get("marque")}`,
      `Modèle : ${data.get("modele")}`,
      `Année : ${data.get("annee")}`,
      `Kilométrage : ${data.get("km")} km`,
      "",
      `Nom : ${data.get("nom")}`,
      `Téléphone : ${data.get("telephone")}`,
    ];
    const subject = encodeURIComponent(
      `Demande d'estimation — ${data.get("marque")} ${data.get("modele")}`,
    );
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const inputClass =
    "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink placeholder:text-ink/40 outline-none transition-colors focus:border-magenta";

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <input required name="marque" placeholder="Marque (ex. BMW)" className={inputClass} />
      <input required name="modele" placeholder="Modèle (ex. Série 3)" className={inputClass} />
      <input
        required
        name="annee"
        type="number"
        min={1980}
        max={2026}
        placeholder="Année"
        className={inputClass}
      />
      <input
        required
        name="km"
        type="number"
        min={0}
        placeholder="Kilométrage"
        className={inputClass}
      />
      <input required name="nom" placeholder="Votre nom" className={inputClass} />
      <input
        required
        name="telephone"
        type="tel"
        placeholder="Votre téléphone"
        className={inputClass}
      />
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="w-full rounded-xl bg-magenta px-7 py-4 font-semibold text-white transition-colors hover:bg-magenta-dark sm:w-auto"
        >
          Demander mon estimation gratuite
        </button>
        {sent && (
          <p className="mt-4 text-sm text-ink/70">
            Votre client mail vient de s’ouvrir avec votre demande pré-remplie —
            il ne reste qu’à l’envoyer. Vous pouvez aussi nous appeler au{" "}
            <a href={site.phoneHref} className="font-semibold text-magenta">
              {site.phone}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
