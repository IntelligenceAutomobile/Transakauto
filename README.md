# TransakAuto Bruxelles — site vitrine

Site vitrine de démonstration pour l'agence TransakAuto de Bruxelles
(réseau d'agences automobiles : conseil, achat, vente de véhicules d'occasion).

## Stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS 4
- Aucune base de données : contenu statique de démonstration

## Lancer le projet

```bash
npm install
npm run dev
```

## Structure

- `src/lib/site.ts` — coordonnées de l'agence (adresse, téléphone, horaires) : **valeurs de démo à remplacer**
- `src/lib/vehicles.ts` — annonces du catalogue (statiques, photos génériques Unsplash)
- `src/app/` — pages : accueil, `/vendre`, `/vehicules`, `/contact`
- `public/logo.png` — logo officiel TransakAuto (fond transparent)
- `refs/` — captures du site existant et logos source (non versionné)
- `scripts/shot-*-tmp.mjs` — scripts temporaires de capture d'écran (vérification visuelle)
