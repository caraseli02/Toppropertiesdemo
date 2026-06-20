type Property = {
  id: string;
  name: string;
  location: string;
  price: string;
  image: string;
  tags: string[];
  why: string;
  beds: number;
  baths: number;
  sqm: number;
};

type Tradeoff = {
  label: string;
  icon: "building" | "compass" | "trending-up" | "waves";
  winner: string;
  verdict: string;
  note: string;
};

export type Brief = {
  summary: string;
  properties: Property[];
  tradeoffs: Tradeoff[];
  nextQuestion: string;
};

export type FollowUp = {
  question: string;
  answer: string;
};

export const DEFAULT_PROMPT = "find best options for home in Mallorca";

export const SUGGESTIONS = [
  "Sea views and privacy near Palma",
  "Family home with marina access",
  "Historic townhouse in the old town",
  "Investment-ready modern villa",
];

export function buildBrief(): Brief {
  return {
    summary:
      "For a buyer searching for the best home options in Mallorca, the market splits into three distinct propositions: the poetic seclusion of a Tramuntana finca, the spectacle of a contemporary cliffside villa above the Mediterranean, and the cultured convenience of a restored Palma townhouse. Each option trades proximity for privacy, or liquidity for lifestyle. The right choice depends on which version of ‘home’ you want to wake up to.",
    properties: [
      {
        id: "soller",
        name: "Can Rebassa",
        location: "Sóller, Tramuntana foothills",
        price: "€4.8M",
        image: "/images/property-soller.jpg",
        tags: ["Primary residence", "Heritage renovation", "Infinity pool"],
        why: "A 17th-century finca reimagined with museum-grade restraint: dry-stone walls, olive-terrace gardens, and an infinity pool that floats above the valley. Best for buyers who prize permanence and silence over quick trips to Palma.",
        beds: 5,
        baths: 4,
        sqm: 620,
      },
      {
        id: "andratx",
        name: "Vista del Puerto",
        location: "Port d'Andratx",
        price: "€7.2M",
        image: "/images/property-andratx.jpg",
        tags: ["Seafront", "Architecture-led", "Yacht proximity"],
        why: "Floor-to-ceiling glass terraces cantilever over the marina, framing sea-and-sunset views from almost every room. This is the statement option: bold privacy, immediate sea access, and a front-row seat to Mallorca’s most glamorous harbour.",
        beds: 4,
        baths: 4,
        sqm: 480,
      },
      {
        id: "palma",
        name: "Casa del Mercader",
        location: "Palma Old Town",
        price: "€3.4M",
        image: "/images/property-palma.jpg",
        tags: ["Lock-up-and-leave", "Cultural proximity", "Restored palacio"],
        why: "A nobleman’s townhouse behind an unmarked wooden door: soaring ceilings, a jasmine courtyard, and a five-minute walk to the cathedral. Best for buyers who want Palma’s restaurants, galleries, and airport access on foot.",
        beds: 4,
        baths: 3,
        sqm: 350,
      },
    ],
    tradeoffs: [
      {
        label: "Privacy",
        icon: "compass",
        winner: "Can Rebassa, Sóller",
        verdict: "Strongest sanctuary fit",
        note: "The finca sits on terraced hillside land with no immediate neighbours. You trade the hum of Palma for total quiet — ideal if seclusion is non-negotiable.",
      },
      {
        label: "Sea access",
        icon: "waves",
        winner: "Vista del Puerto, Andratx",
        verdict: "Clear Mediterranean lead",
        note: "Direct sightlines to the marina and a short drive to hidden coves. This is the only option where the Mediterranean is the dominant feature, not a weekend excursion.",
      },
      {
        label: "Palma convenience",
        icon: "building",
        winner: "Casa del Mercader",
        verdict: "Best lock-up-and-leave",
        note: "Walking distance to Santa Catalina, the cathedral, and the airport link. You sacrifice scale and land, but gain the city as an extension of your living room.",
      },
      {
        label: "Investment confidence",
        icon: "trending-up",
        winner: "Vista del Puerto, Andratx",
        verdict: "Most liquid trophy asset",
        note: "Southwest seafront stock has consistently outperformed. High demand from international buyers and limited coastal supply protect resale value and rental yield.",
      },
    ],
    nextQuestion:
      "Is your priority a private sanctuary surrounded by nature, or being able to walk to Palma’s restaurants and airport within minutes?",
  };
}

export function buildFollowUpResponse(question: string): string {
  const normalized = question.toLowerCase();
  if (normalized.includes("pool") || normalized.includes("outdoor")) {
    return "Both Can Rebassa and Vista del Puerto offer heated infinity pools; Casa del Mercader has a courtyard fountain but no full-size pool.";
  }
  if (normalized.includes("family") || normalized.includes("school")) {
    return "For families, Sóller and Palma Old Town offer the strongest school access. Port d'Andratx is better suited to older children or weekend-focused living.";
  }
  if (normalized.includes("rent") || normalized.includes("invest")) {
    return "Andratx leads on short-term rental demand and capital growth. Palma is stable and liquid. Sóller is the most niche — slower to sell, but deeply scarce.";
  }
  if (normalized.includes("sea")) {
    return "Vista del Puerto is the only option where the sea is the immediate backdrop. Can Rebassa has valley views, and Casa del Mercader is courtyard-focused.";
  }
  return "Good question. Based on your brief, the Andratx villa balances the strongest sea access with solid investment fundamentals, while Sóller offers the most privacy and Palma the most convenience.";
}
