export function createDiscoveryBrief(prompt, properties) {
  const heroPrompt = String(prompt || "").trim();
  const safeProperties = Array.isArray(properties) ? properties : [];

  return {
    intent: inferIntent(heroPrompt),
    location: inferLocation(heroPrompt),
    heroPrompt,
    sections: [
      {
        kind: "curated-properties",
        title: "Best-fit homes for the brief",
        items: safeProperties.slice(0, 3),
      },
      {
        kind: "neighborhood-intelligence",
        title: "Neighborhood intelligence to compare next",
        items: [
          "Privacy versus walkability",
          "Sea-view exposure and seasonal traffic",
          "International school access and airport timing",
        ],
      },
    ],
  };
}

function inferIntent(prompt) {
  return /home|house|villa|property/i.test(prompt) ? "home search" : "property discovery";
}

function inferLocation(prompt) {
  return /mallorca/i.test(prompt) ? "Mallorca" : "Unknown";
}
