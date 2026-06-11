// Fiche véhicule détaillée — données réelles.
// (Audi TT MK3 — données reprises telles quelles du stock.)

export type MaintenanceEntry = {
  date: string;
  km: string;
  operation: string;
  amount?: string;
  linkedDoc?: string;
};

export type VehicleDocument = { file: string; label: string };

export type VehicleDetail = {
  id: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  color: string;
  transmission: string;
  fuel: string;
  power: number;
  origin: string;
  status: "disponible" | "vendu" | "reserve";
  description: string;
  features: string[];
  images: string[];
  documents: VehicleDocument[];
  maintenance: MaintenanceEntry[];
};

const MK3_DIR = "/vehicules/audi-tt-mk3";

export const vehicleDetails: Record<string, VehicleDetail> = {
  "audi-tt-mk3-sline-2014": {
    id: "audi-tt-mk3-sline-2014",
    make: "Audi",
    model: "TT 2.0 TFSI Coupé S line quattro S tronic",
    year: 2014,
    mileage: 147005,
    price: 20990,
    color: "Noir Mythos",
    transmission: "S tronic 7 rapports",
    fuel: "Essence",
    power: 230,
    origin: "Belgique",
    status: "disponible",
    description:
      "Troisième génération du Coupé Audi TT — génération 8S, produite de 2014 à 2023. Ce 2.0 TFSI 230 ch couplé à la transmission intégrale quattro et à la boîte S tronic 7 rapports représente la configuration la plus aboutie de la gamme. Le Virtual Cockpit (instrumentation 12.3\" entièrement numérique) fait son apparition sur cette génération.\n\nPremière immatriculation le 17/11/2014 en Belgique. Kilométrage au CT belge (24/04/2026) : 147 005 km. Finition S line avec seuils de portes aluminium, jantes 19\" multi-branches et sellerie alcantara/cuir. CT belge valide jusqu'au 24/04/2027. Car-Pass belge disponible.\n\nContrôle technique valide jusqu'au 24/04/2027. Pas d'accident déclaré. Car-Pass belge avec historique complet des kilométrages.",
    features: [
      'Virtual Cockpit — instrumentation numérique 12.3"',
      "Apple CarPlay intégré",
      "Pack S line extérieur complet",
      "Seuils de portes S line aluminium",
      'Jantes alliage 19" multi-branches',
      "Sellerie alcantara/cuir",
      "S tronic 7 rapports",
      "Transmission intégrale quattro (Haldex)",
      "Freinage Haldex révisé (fév. 2026)",
      "Bougies neuves (fév. 2026)",
      "Batterie VARTA AGM neuve (mars 2025)",
      "Climatisation automatique",
      "Feux LED",
      "Régulateur de vitesse",
      "Rétroviseurs électriques rabattables",
      "Aide au stationnement arrière",
      "ESP + ASR",
      "Airbags conducteur / passager / latéraux",
      "Norme Euro 6",
    ],
    images: [
      `${MK3_DIR}/01.png`,
      `${MK3_DIR}/02.png`,
      `${MK3_DIR}/03.png`,
      `${MK3_DIR}/04.png`,
      `${MK3_DIR}/05.png`,
      `${MK3_DIR}/06.png`,
      `${MK3_DIR}/07.png`,
      `${MK3_DIR}/08.png`,
      `${MK3_DIR}/09-interior.jpg`,
      `${MK3_DIR}/10-seats-door.jpg`,
      `${MK3_DIR}/11-virtual-cockpit.jpg`,
      `${MK3_DIR}/12-wheel.jpg`,
      `${MK3_DIR}/13-sline-badge.jpg`,
    ],
    documents: [
      { file: "carnet-entretien.jpg", label: "Carnet d'entretien" },
      { file: "car-pass.jpg", label: "Car-Pass" },
      { file: "ct-belge.jpg", label: "Contrôle technique belge" },
      { file: "coc-audi.jpg", label: "COC Audi" },
      { file: "carte-grise-belge.jpg", label: "Carte grise belge" },
      { file: "demande-immat.jpg", label: "Demande d'immatriculation" },
      { file: "batterie-invoice-1.jpg", label: "Facture batterie (1/2)" },
      { file: "batterie-invoice-2.jpg", label: "Facture batterie (2/2)" },
    ],
    maintenance: [
      {
        date: "Fév. 2026",
        km: "~147 000 km",
        operation: "Bougies neuves, service Haldex quattro, remplacement pneus Michelin",
      },
      {
        date: "Mars 2025",
        km: "—",
        operation: "Batterie VARTA A6 AGM neuve + montage en atelier",
        amount: "301,89 €",
        linkedDoc: "batterie-invoice-1.jpg",
      },
    ],
  },
};

export function getVehicleDetail(id: string): VehicleDetail | undefined {
  return vehicleDetails[id];
}
