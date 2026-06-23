export const defaultPrompt = "find best options for home in Mallorca";

export type PropertyMatch = {
  id: string;
  name: string;
  area: string;
  price: string;
  image: string;
  fit: string;
  thesis: string;
  highlights: string[];
  signals: {
    privacy: string;
    airport: string;
    lifestyle: string;
  };
};

export type AreaSignal = {
  area: string;
  mood: string;
  buyerFit: string;
  timing: string;
  tone: "coast" | "capital" | "village";
};

export const propertyMatches: PropertyMatch[] = [
  {
    id: "andratx-cliff-house",
    name: "Cliff House Andratx",
    area: "Port d'Andratx",
    price: "EUR 9.6M",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=86",
    fit: "Best for yacht access and sunset hosting",
    thesis:
      "A sculptural sea-edge villa for buyers who want the island to feel private without leaving the marina orbit.",
    highlights: ["harbor in 7 min", "guest pavilion", "sunset terraces"],
    signals: {
      privacy: "high",
      airport: "34 min",
      lifestyle: "marina",
    },
  },
  {
    id: "son-vida-modern-estate",
    name: "Son Vida Modern Estate",
    area: "Palma hills",
    price: "EUR 11.4M",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=86",
    fit: "Best investor-grade base near Palma",
    thesis:
      "A polished trophy estate with strong year-round convenience, city access, and a credible executive relocation story.",
    highlights: ["golf belt", "airport in 18 min", "bay panorama"],
    signals: {
      privacy: "medium-high",
      airport: "18 min",
      lifestyle: "Palma access",
    },
  },
  {
    id: "deia-stone-retreat",
    name: "Deia Stone Retreat",
    area: "Tramuntana coast",
    price: "EUR 7.8M",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=86",
    fit: "Best emotional second-home choice",
    thesis:
      "A quieter mountain-and-sea retreat for buyers prioritizing atmosphere, village dining, and long-stay restoration.",
    highlights: ["olive terraces", "UNESCO landscape", "walkable village"],
    signals: {
      privacy: "high",
      airport: "42 min",
      lifestyle: "artist village",
    },
  },
];

export const areaSignals: AreaSignal[] = [
  {
    area: "Port d'Andratx",
    mood: "polished harbor energy",
    buyerFit: "second-home owners who entertain",
    timing: "best for summer arrival rituals",
    tone: "coast",
  },
  {
    area: "Son Vida",
    mood: "quiet capital-adjacent security",
    buyerFit: "investors and relocating families",
    timing: "strongest year-round practicality",
    tone: "capital",
  },
  {
    area: "Deia",
    mood: "cinematic mountain village",
    buyerFit: "privacy-led lifestyle buyers",
    timing: "best for slow stays and shoulder season",
    tone: "village",
  },
];

export function composePrototypeBrief(prompt: string) {
  const cleanPrompt = prompt.trim() || defaultPrompt;

  return {
    prompt: cleanPrompt,
    intent: /invest|yield|return/i.test(cleanPrompt) ? "Investor lens" : "Move / second-home lens",
    location: /mallorca/i.test(cleanPrompt) ? "Mallorca" : "Mallorca only",
    summary:
      "I would shortlist three different Mallorca lifestyles first, then choose by privacy, Palma access, and how often the home needs to perform for guests.",
    matches: propertyMatches,
    areas: areaSignals,
  };
}
