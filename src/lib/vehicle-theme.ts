// Palette partagée pour la fiche véhicule détaillée (DA TransakAuto).
// Reprend la structure de la fiche d'origine en l'habillant aux couleurs
// de la marque : magenta, night/coal, cream.
export const C = {
  accent: "#ed008c",
  accentSoft: (a: number) => `rgba(237,0,140,${a})`,
  bg: "#0d0c10",
  card: "#16151b",
  cardLight: "#211f27",
  text: "#f4f0e8",
  textSoft: (a: number) => `rgba(244,240,232,${a})`,
  border: (a: number) => `rgba(244,240,232,${a})`,
  // Voile neutre (crème) pour les surfaces — plus lisible que le magenta translucide
  surface: (a: number) => `rgba(244,240,232,${a})`,
  green: "#34d399",
  greenSoft: (a: number) => `rgba(52,211,153,${a})`,
  error: "#f87171",
};
