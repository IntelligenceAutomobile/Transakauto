// Annonces de démonstration — à remplacer par le stock réel de l'agence.
export type Vehicle = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  year: number;
  km: number;
  fuel: string;
  gearbox: string;
  image: string;
  highlight?: string;
  hasDetail?: boolean;
};

export const vehicles: Vehicle[] = [
  {
    id: "audi-tt-mk3-sline-2014",
    title: "Audi TT 2.0 TFSI quattro",
    subtitle: "Coupé S line · 230 ch · S tronic",
    price: 20990,
    year: 2014,
    km: 147005,
    fuel: "Essence",
    gearbox: "Automatique",
    image: "/vehicules/audi-tt-mk3/01.png",
    highlight: "Fiche détaillée",
    hasDetail: true,
  },
  {
    id: "bmw-m4-competition",
    title: "BMW M4 Competition",
    subtitle: "Coupé · 510 ch · Pack Carbone",
    price: 64900,
    year: 2021,
    km: 42500,
    fuel: "Essence",
    gearbox: "Automatique",
    image: "/images/vehicule-bmw-m4.jpg",
    highlight: "Garantie 24 mois",
  },
  {
    id: "range-rover-sport-hse",
    title: "Range Rover Sport P400e",
    subtitle: "HSE Dynamic · Toit panoramique",
    price: 56500,
    year: 2020,
    km: 58300,
    fuel: "Hybride",
    gearbox: "Automatique",
    image: "/images/vehicule-range-rover.jpg",
    highlight: "Première main",
  },
  {
    id: "audi-rs6-avant",
    title: "Audi RS6 Avant",
    subtitle: "Quattro · 600 ch · Céramique",
    price: 79900,
    year: 2019,
    km: 67200,
    fuel: "Essence",
    gearbox: "Automatique",
    image: "/images/vehicule-audi-rs6.jpg",
    highlight: "Historique complet",
  },
  {
    id: "fiat-500-lounge",
    title: "Fiat 500 1.2 Lounge",
    subtitle: "Citadine · Toit ouvrant · CarPlay",
    price: 9490,
    year: 2019,
    km: 38900,
    fuel: "Essence",
    gearbox: "Manuelle",
    image: "/images/vehicule-fiat-500.jpg",
  },
  {
    id: "bmw-430d-msport",
    title: "BMW 430d M Sport",
    subtitle: "Coupé · Cuir · Harman Kardon",
    price: 27900,
    year: 2017,
    km: 89000,
    fuel: "Diesel",
    gearbox: "Automatique",
    image: "/images/vehicule-bmw-serie4.jpg",
  },
  {
    id: "bmw-m5-competition",
    title: "BMW M5 Competition",
    subtitle: "Berline · 625 ch · Entretien BMW",
    price: 69900,
    year: 2019,
    km: 49800,
    fuel: "Essence",
    gearbox: "Automatique",
    image: "/images/vehicule-bmw-m5.jpg",
    highlight: "Garantie 24 mois",
  },
];
