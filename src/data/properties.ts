export type ListingMode = "sale" | "short-rent" | "long-rent";

export type PropertyType = "Villa" | "Estate" | "Penthouse" | "Apartment" | "Townhouse" | "Chalet";

export interface Property {
  id: string;
  slug: string;
  title: string;
  location: string;
  region: string;
  country: string;
  price: number;
  mode: ListingMode;
  type: PropertyType;
  beds: number;
  baths: number;
  sqm: number;
  year: number;
  tags: string[];
  reserved: boolean;
  featured: boolean;
  image: string;
  gallery: string[];
  overview: string;
  description: string;
  amenities: string[];
  /** Position on the stylised map (percentages) */
  pin: { x: number; y: number };
}

const px = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400`;

export const properties: Property[] = [
  {
    id: "p1",
    slug: "villa-azure-cap-dantibes",
    title: "Villa Azure",
    location: "Cap d'Antibes",
    region: "French Riviera",
    country: "France",
    price: 18500000,
    mode: "sale",
    type: "Villa",
    beds: 7,
    baths: 8,
    sqm: 1200,
    year: 2023,
    tags: ["Beachfront", "Infinity Pool", "New Development", "Sea View"],
    reserved: false,
    featured: true,
    image: px(12715491),
    gallery: [px(12715491), px(19075385), px(29702291), px(19075381), px(7031879), px(6585757)],
    overview:
      "A sculptural oceanfront villa carved into the cliffs of Cap d'Antibes, where floor-to-ceiling glass dissolves the line between interior and sea.",
    description:
      "Set on a private promontory above the Mediterranean, Villa Azure pairs uncompromising contemporary architecture with the effortless calm of the Côte d'Azur. Vast living volumes open onto a heated infinity pool that appears to spill directly into the bay, while seven serene bedroom suites each frame their own horizon. A spa, private cinema and staff quarters make this a turnkey estate for the most discerning collector.",
    amenities: [
      "Infinity Pool",
      "Private Beach Access",
      "Home Cinema",
      "Wine Cellar",
      "Spa & Sauna",
      "Staff Quarters",
      "Smart Home",
      "Garage",
    ],
    pin: { x: 28, y: 34 },
  },
  {
    id: "p2",
    slug: "casa-del-mare-positano",
    title: "Casa del Mare",
    location: "Positano",
    region: "Amalfi Coast",
    country: "Italy",
    price: 12500,
    mode: "short-rent",
    type: "Villa",
    beds: 5,
    baths: 6,
    sqm: 680,
    year: 2019,
    tags: ["Beachfront", "Sea View", "Infinity Pool", "Staff"],
    reserved: false,
    featured: true,
    image: px(29702290),
    gallery: [px(29702290), px(19075385), px(24807124), px(19075383), px(7167066), px(8135505)],
    overview:
      "A pastel terraced villa tumbling toward the Tyrrhenian, with terraced gardens, a saltwater pool and a full household staff.",
    description:
      "Casa del Mare cascades down the legendary cliffs of Positano in a sequence of sun-drenched terraces. Lemon groves frame the approach; beyond, uninterrupted views sweep from Li Galli to the Faraglioni. Inside, hand-laid majolica and limewashed walls echo the colours of the coast. A dedicated concierge, chef and housekeeping team ensure every stay feels like a private five-star retreat.",
    amenities: [
      "Infinity Pool",
      "Sea View",
      "Private Chef",
      "Concierge",
      "Lemon Garden",
      "Air Conditioning",
      "Wi-Fi",
      "Boat Mooring",
    ],
    pin: { x: 52, y: 62 },
  },
  {
    id: "p3",
    slug: "domaine-de-flore-tuscany",
    title: "Domaine de Flore",
    location: "Siena",
    region: "Tuscany",
    country: "Italy",
    price: 9750000,
    mode: "sale",
    type: "Estate",
    beds: 9,
    baths: 8,
    sqm: 1450,
    year: 1760,
    tags: ["Vineyard", "Countryside", "Historic", "Pool"],
    reserved: true,
    featured: false,
    image: px(36591535),
    gallery: [px(36591535), px(23441099), px(35681768), px(13995283), px(6587896), px(37436121)],
    overview:
      "A restored 18th-century estate at the heart of a working vineyard, framed by cypress avenues and rolling Brunello country.",
    description:
      "Domaine de Flore is a statement of Tuscan patrimony — a meticulously restored villa presiding over twelve hectares of working vineyard and olive grove. Vaulted ceilings, original frescoes and period fireplaces coexist with quietly modern kitchens and baths. The price is held in private negotiation, reflecting the rarity of contiguous land of this calibre in central Tuscany.",
    amenities: [
      "Working Vineyard",
      "Olive Grove",
      "Swimming Pool",
      "Chapel",
      "Cellar",
      "Formal Gardens",
      "Staff House",
      "Helipad",
    ],
    pin: { x: 20, y: 70 },
  },
  {
    id: "p4",
    slug: "sky-penthouse-dubai-marina",
    title: "Sky Penthouse",
    location: "Dubai Marina",
    region: "Dubai",
    country: "United Arab Emirates",
    price: 6400000,
    mode: "sale",
    type: "Penthouse",
    beds: 4,
    baths: 5,
    sqm: 520,
    year: 2024,
    tags: ["Skyline View", "New Development", "Smart Home", "Gym"],
    reserved: false,
    featured: false,
    image: px(7045915),
    gallery: [px(7045915), px(7167066), px(7031879), px(6207940), px(35021550), px(8082324)],
    overview:
      "A duplex sky penthouse on the upper floors of a brand-new marina tower, with 360° glass and a private rooftop terrace.",
    description:
      "Occupying the crowning floors of one of Dubai Marina's newest towers, the Sky Penthouse delivers an immersive panorama of the Gulf, Palm and skyline. Double-height living spaces, a private elevator lobby and a wraparound rooftop terrace with plunge pool define a residence engineered for modern luxury. Fully smart-home enabled and sold furnished to a bespoke standard.",
    amenities: [
      "Private Elevator",
      "Rooftop Plunge Pool",
      "Smart Home",
      "Gym & Spa",
      "Concierge",
      "Underground Parking",
      "Skyline View",
      "24/7 Security",
    ],
    pin: { x: 72, y: 22 },
  },
  {
    id: "p5",
    slug: "villa-lumiere-saint-tropez",
    title: "Villa Lumière",
    location: "Saint-Tropez",
    region: "French Riviera",
    country: "France",
    price: 32000,
    mode: "long-rent",
    type: "Villa",
    beds: 6,
    baths: 6,
    sqm: 850,
    year: 2021,
    tags: ["Infinity Pool", "Sea View", "Helipad", "Staff"],
    reserved: false,
    featured: false,
    image: px(31817160),
    gallery: [px(31817160), px(28054849), px(24807141), px(19075381), px(7031712), px(8082562)],
    overview:
      "A glass-and-stone villa above the Bay of Pampelonne, available on a long seasonal lease with helipad and full staff.",
    description:
      "Villa Lumière captures the golden-hour glamour of Saint-Tropez from a hillside above Pampelonne. Travertine terraces step down to a mirror-flat infinity pool, while interiors by a Milanese atelier balance warmth and restraint. Offered on a long-term seasonal basis, the villa includes a helipad, daily housekeeping and a private driver, placing the village and beaches minutes away.",
    amenities: [
      "Infinity Pool",
      "Helipad",
      "Private Chef",
      "Driver",
      "Wine Cellar",
      "Gym",
      "Sea View",
      "Air Conditioning",
    ],
    pin: { x: 40, y: 40 },
  },
  {
    id: "p6",
    slug: "the-glass-house-marbella",
    title: "The Glass House",
    location: "Marbella",
    region: "Costa del Sol",
    country: "Spain",
    price: 7200000,
    mode: "sale",
    type: "Villa",
    beds: 5,
    baths: 5,
    sqm: 640,
    year: 2022,
    tags: ["Beachfront", "Infinity Pool", "New Development", "Sea View"],
    reserved: false,
    featured: true,
    image: px(12715498),
    gallery: [px(12715498), px(7031607), px(8143671), px(7167073), px(6903155), px(8082324)],
    overview:
      "A frontline beach villa in the Golden Mile, defined by disappearing glass walls and a 25-metre infinity pool.",
    description:
      "The Glass House is a study in transparency, where entire walls retract to merge the great room with a south-facing terrace and 25-metre infinity pool. Fronting one of Marbella's most discreet stretches of sand, it offers five suites, a wellness level with gym and hammam, and a rooftop solarium oriented for all-day sun. A rare new-build delivered turnkey.",
    amenities: [
      "Beachfront",
      "Infinity Pool",
      "Gym & Hammam",
      "Smart Home",
      "Wine Cellar",
      "Rooftop Solarium",
      "Garage",
      "Landscaped Gardens",
    ],
    pin: { x: 60, y: 50 },
  },
  {
    id: "p7",
    slug: "chalet-edelweiss-courchevel",
    title: "Chalet Edelweiss",
    location: "Courchevel 1850",
    region: "French Alps",
    country: "France",
    price: 45000,
    mode: "long-rent",
    type: "Chalet",
    beds: 6,
    baths: 6,
    sqm: 720,
    year: 2020,
    tags: ["Ski-in/Ski-out", "Fireplace", "Spa", "Mountain View"],
    reserved: true,
    featured: false,
    image: px(7031407),
    gallery: [px(7031407), px(7167066), px(8082562), px(8135505), px(6538939), px(7167066)],
    overview:
      "A ski-in, ski-out chalet in Courchevel 1850 with a subterranean spa, indoor pool and chauffeured transfers.",
    description:
      "Chalet Edelweiss sits directly on the Bellecôte piste, offering genuine ski-in, ski-out access in the heart of the Trois Vallées. Inside, aged oak, stone and cashmere create an enveloping warmth around a double-height fireplace. A lower level houses a 12-metre pool, treatment room and cinema. Reserved for seasonal lease and managed with a full chalet team.",
    amenities: [
      "Ski-in/Ski-out",
      "Indoor Pool",
      "Spa & Sauna",
      "Home Cinema",
      "Fireplace",
      "Chauffeur",
      "Chef & Host",
      "Boot Room",
    ],
    pin: { x: 35, y: 20 },
  },
  {
    id: "p8",
    slug: "villa-selene-mykonos",
    title: "Villa Selene",
    location: "Mykonos",
    region: "Cyclades",
    country: "Greece",
    price: 9800,
    mode: "short-rent",
    type: "Villa",
    beds: 5,
    baths: 5,
    sqm: 540,
    year: 2018,
    tags: ["Beachfront", "Infinity Pool", "Sea View", "Sunset"],
    reserved: false,
    featured: true,
    image: px(19075385),
    gallery: [px(19075385), px(19075379), px(29702291), px(24807124), px(7722168), px(8135505)],
    overview:
      "A whitewashed Cycladic villa above a private cove, oriented entirely toward the Aegean sunset.",
    description:
      "Perched above a near-private cove on Mykonos' calmer southern shore, Villa Selene is built for long, sun-soaked days. Cubist volumes in local stone and lime render wrap around a generous pool deck with uninterrupted sunset views over Delos. Five suites, an outdoor kitchen and a fast tender to the town make it the ideal island base.",
    amenities: [
      "Infinity Pool",
      "Sea View",
      "Outdoor Kitchen",
      "Boat Tender",
      "Sunset Terrace",
      "Air Conditioning",
      "Wi-Fi",
      "Housekeeping",
    ],
    pin: { x: 66, y: 66 },
  },
  {
    id: "p9",
    slug: "palazzo-rosa-florence",
    title: "Palazzo Rosa",
    location: "Florence",
    region: "Tuscany",
    country: "Italy",
    price: 5600000,
    mode: "sale",
    type: "Townhouse",
    beds: 6,
    baths: 5,
    sqm: 560,
    year: 1690,
    tags: ["Historic", "City View", "Garden", "Frescoes"],
    reserved: true,
    featured: false,
    image: px(13995283),
    gallery: [px(13995283), px(35681768), px(27115145), px(6587896), px(6434592), px(8082324)],
    overview:
      "A noble palazzo moments from the Arno, preserving original frescoes beneath modernised service and a secret garden.",
    description:
      "Palazzo Rosa is a rare surviving aristocratic residence in the historic centre of Florence, offered discreetly and by private negotiation. Restored over five years under the supervision of the Soprintendenza, it retains soaring frescoed salons, a noble staircase and a hidden formal garden — an almost unheard-of privilege in the city core — while services have been quietly modernised throughout.",
    amenities: [
      "Original Frescoes",
      "Private Garden",
      "Elevator",
      "Formal Salons",
      "Wine Cellar",
      "City View",
      "Restored Facade",
      "Staff Quarters",
    ],
    pin: { x: 24, y: 54 },
  },
  {
    id: "p10",
    slug: "azure-bay-residence-bodrum",
    title: "Azure Bay Residence",
    location: "Bodrum",
    region: "Aegean Coast",
    country: "Turkey",
    price: 4250000,
    mode: "sale",
    type: "Villa",
    beds: 4,
    baths: 4,
    sqm: 420,
    year: 2023,
    tags: ["Beachfront", "Infinity Pool", "New Development", "Sea View"],
    reserved: false,
    featured: false,
    image: px(28054849),
    gallery: [px(28054849), px(19075383), px(36676879), px(7174386), px(6585757), px(6903155)],
    overview:
      "A brand-new waterfront villa in a gated Bodrum enclave, with private mooring and a sunset-facing pool deck.",
    description:
      "Part of an exclusive new waterfront community on the Bodrum peninsula, Azure Bay Residence blends Aegean light with contemporary restraint. Sliding glass opens the living level to an infinity pool and a private path to the sea. Four ensuite bedrooms, a wellness room and a private mooring make it equally suited as a private retreat or a managed rental asset.",
    amenities: [
      "Beachfront",
      "Infinity Pool",
      "Private Mooring",
      "Wellness Room",
      "Smart Home",
      "Gated Community",
      "Sea View",
      "Landscaped Garden",
    ],
    pin: { x: 80, y: 60 },
  },
  {
    id: "p11",
    slug: "the-penthouse-collection-new-york",
    title: "The Grand Penthouse",
    location: "Upper East Side",
    region: "New York",
    country: "United States",
    price: 21000000,
    mode: "sale",
    type: "Penthouse",
    beds: 5,
    baths: 6,
    sqm: 760,
    year: 2024,
    tags: ["Skyline View", "New Development", "Concierge", "Smart Home"],
    reserved: true,
    featured: true,
    image: px(7167066),
    gallery: [px(7167066), px(7045915), px(7722168), px(7031879), px(37436121), px(8082324)],
    overview:
      "A full-floor penthouse atop a new Billionaires' Row tower, with park-facing terraces and white-glove service.",
    description:
      "The Grand Penthouse occupies an entire floor of one of New York's newest landmark towers, with wraparound terraces framing Central Park and the Midtown skyline. Interiors are delivered to a bespoke specification with double-aspect light in every room, a private chef's kitchen, and access to a club-level of services. Available through private negotiation.",
    amenities: [
      "Full Floor",
      "Park Terrace",
      "Concierge",
      "Private Elevator",
      "Smart Home",
      "Chef's Kitchen",
      "Wine Room",
      "24/7 Security",
    ],
    pin: { x: 50, y: 14 },
  },
];

export function getProperty(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getRelated(property: Property, count = 3): Property[] {
  return properties
    .filter((p) => p.id !== property.id)
    .map((p) => {
      let score = 0;
      if (p.country === property.country) score += 3;
      if (p.type === property.type) score += 2;
      if (p.mode === property.mode) score += 1;
      score += p.tags.filter((t) => property.tags.includes(t)).length;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((x) => x.p);
}
