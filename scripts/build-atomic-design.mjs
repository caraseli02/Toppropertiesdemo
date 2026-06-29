/**
 * Builds atomic design system nodes for design.pen
 * Run: node scripts/build-atomic-design.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { randomBytes } from "node:crypto";

const id = (prefix) => prefix + randomBytes(3).toString("hex").slice(0, 5);

// ---------------------------------------------------------------------------
// Updated design tokens — SantAndrea burgundy luxury + Mallorca agentic brief
// ---------------------------------------------------------------------------
const variables = {
  "--background": {
    type: "color",
    value: [{ value: "#FAFAF8" }, { value: "#030712", theme: { Mode: "Dark" } }],
  },
  "--foreground": {
    type: "color",
    value: [{ value: "#1A1A1A" }, { value: "#F8FAFC", theme: { Mode: "Dark" } }],
  },
  "--card": {
    type: "color",
    value: [{ value: "#FFFFFF" }, { value: "#0F172A", theme: { Mode: "Dark" } }],
  },
  "--card-foreground": {
    type: "color",
    value: [{ value: "#1A1A1A" }, { value: "#F8FAFC", theme: { Mode: "Dark" } }],
  },
  "--primary": {
    type: "color",
    value: [{ value: "#9B1B30" }, { value: "#C42B45", theme: { Mode: "Dark" } }],
  },
  "--primary-foreground": {
    type: "color",
    value: [{ value: "#FFFFFF" }, { value: "#FFFFFF", theme: { Mode: "Dark" } }],
  },
  "--secondary": {
    type: "color",
    value: [{ value: "#1A1A1A" }, { value: "#1E293B", theme: { Mode: "Dark" } }],
  },
  "--secondary-foreground": {
    type: "color",
    value: [{ value: "#FFFFFF" }, { value: "#F8FAFC", theme: { Mode: "Dark" } }],
  },
  "--muted": {
    type: "color",
    value: [{ value: "#F3F0EB" }, { value: "#1E293B", theme: { Mode: "Dark" } }],
  },
  "--muted-foreground": {
    type: "color",
    value: [{ value: "#6B6560" }, { value: "#94A3B8", theme: { Mode: "Dark" } }],
  },
  "--accent": {
    type: "color",
    value: [{ value: "#C4A574" }, { value: "#6366F1", theme: { Mode: "Dark" } }],
  },
  "--accent-foreground": {
    type: "color",
    value: [{ value: "#1A1A1A" }, { value: "#E0E7FF", theme: { Mode: "Dark" } }],
  },
  "--border": {
    type: "color",
    value: [{ value: "#E5E0D8" }, { value: "#FFFFFF1A", theme: { Mode: "Dark" } }],
  },
  "--input": {
    type: "color",
    value: [{ value: "#E5E0D8" }, { value: "#334155", theme: { Mode: "Dark" } }],
  },
  "--ring": {
    type: "color",
    value: [{ value: "#9B1B30" }, { value: "#818CF8", theme: { Mode: "Dark" } }],
  },
  "--destructive": {
    type: "color",
    value: [{ value: "#DC2626" }, { value: "#EF4444", theme: { Mode: "Dark" } }],
  },
  "--success": {
    type: "color",
    value: [{ value: "#22C55E" }, { value: "#4ADE80", theme: { Mode: "Dark" } }],
  },
  "--white": { type: "color", value: "#FFFFFF" },
  "--black": { type: "color", value: "#000000" },
  "--font-display": { type: "string", value: "Playfair Display" },
  "--font-sans": { type: "string", value: "Outfit" },
  "--font-mono": { type: "string", value: "JetBrains Mono" },
  "--radius-sm": { type: "number", value: 6 },
  "--radius-md": { type: "number", value: 12 },
  "--radius-lg": { type: "number", value: 16 },
  "--radius-pill": { type: "number", value: 999 },
  "--space-1": { type: "number", value: 4 },
  "--space-2": { type: "number", value: 8 },
  "--space-3": { type: "number", value: 12 },
  "--space-4": { type: "number", value: 16 },
  "--space-5": { type: "number", value: 20 },
  "--space-6": { type: "number", value: 24 },
  "--space-8": { type: "number", value: 32 },
  "--space-10": { type: "number", value: 40 },
  "--text-xs": { type: "number", value: 11 },
  "--text-sm": { type: "number", value: 14 },
  "--text-base": { type: "number", value: 16 },
  "--text-lg": { type: "number", value: 18 },
  "--text-xl": { type: "number", value: 20 },
  "--text-2xl": { type: "number", value: 24 },
  "--text-3xl": { type: "number", value: 30 },
  "--text-4xl": { type: "number", value: 36 },
  "--text-5xl": { type: "number", value: 48 },
};

// ---------------------------------------------------------------------------
// Reusable component IDs (stable)
// ---------------------------------------------------------------------------
const IDS = {
  btnPrimary: "cmpBtnPri",
  btnOutline: "cmpBtnOut",
  btnDark: "cmpBtnDrk",
  chip: "cmpChip01",
  chipActive: "cmpChipAc",
  badge: "cmpBadge1",
  input: "cmpInput1",
  label: "cmpLabel1",
  toggle: "cmpToggl1",
  stepper: "cmpStepr1",
  header: "cmpHeadr1",
  propertyCard: "cmpPropC1",
  briefComposer: "cmpBrief1",
  tradeoffCard: "cmpTradC1",
  filterSection: "cmpFiltS1",
};

function textNode(nodeId, name, content, opts = {}) {
  return {
    type: "text",
    id: nodeId,
    name,
    content,
    fill: opts.fill ?? "$--foreground",
    fontFamily: opts.fontFamily ?? "$--font-sans",
    fontSize: opts.fontSize ?? "$--text-sm",
    fontWeight: opts.fontWeight ?? "normal",
    textGrowth: opts.textGrowth ?? "auto",
    ...(opts.width ? { width: opts.width } : {}),
  };
}

function swatch(name, colorVar, label) {
  const sid = id("sw");
  return {
    type: "frame",
    id: sid,
    name,
    layout: "vertical",
    gap: 6,
    alignItems: "center",
    width: 88,
    children: [
      {
        type: "rectangle",
        id: id("sq"),
        name: "Swatch",
        width: 72,
        height: 48,
        cornerRadius: "$--radius-md",
        fill: colorVar,
        stroke: "$--border",
        strokeWidth: 1,
      },
      textNode(id("lb"), "Label", label, {
        fontSize: "$--text-xs",
        fill: "$--muted-foreground",
      }),
      textNode(id("vl"), "Value", colorVar.replace("$", ""), {
        fontSize: 10,
        fill: "$--muted-foreground",
        fontFamily: "$--font-mono",
      }),
    ],
  };
}

// ---------------------------------------------------------------------------
// Reusable components
// ---------------------------------------------------------------------------
const components = [
  // Primary pill button
  {
    type: "frame",
    id: IDS.btnPrimary,
    name: "Button / Primary",
    reusable: true,
    layout: "horizontal",
    alignItems: "center",
    justifyContent: "center",
    padding: [10, 20],
    cornerRadius: "$--radius-pill",
    fill: "$--primary",
    children: [
      textNode("btnPriLbl", "Label", "Long Rent", {
        fill: "$--primary-foreground",
        fontSize: "$--text-sm",
        fontWeight: "600",
      }),
    ],
  },
  // Outline pill button
  {
    type: "frame",
    id: IDS.btnOutline,
    name: "Button / Outline",
    reusable: true,
    layout: "horizontal",
    alignItems: "center",
    justifyContent: "center",
    padding: [10, 20],
    cornerRadius: "$--radius-pill",
    fill: "$--card",
    stroke: "$--border",
    strokeWidth: 1,
    children: [
      textNode("btnOutLbl", "Label", "Short Rent", {
        fill: "$--foreground",
        fontSize: "$--text-sm",
        fontWeight: "500",
      }),
    ],
  },
  // Dark CTA button
  {
    type: "frame",
    id: IDS.btnDark,
    name: "Button / Dark CTA",
    reusable: true,
    layout: "horizontal",
    alignItems: "center",
    justifyContent: "center",
    padding: [14, 28],
    cornerRadius: "$--radius-md",
    fill: "$--secondary",
    width: "fill_container",
    children: [
      textNode("btnDrkLbl", "Label", "Results", {
        fill: "$--secondary-foreground",
        fontSize: "$--text-base",
        fontWeight: "600",
      }),
    ],
  },
  // Chip inactive
  {
    type: "frame",
    id: IDS.chip,
    name: "Chip / Default",
    reusable: true,
    layout: "horizontal",
    alignItems: "center",
    justifyContent: "center",
    padding: [8, 16],
    cornerRadius: "$--radius-pill",
    fill: "$--card",
    stroke: "$--border",
    strokeWidth: 1,
    children: [
      textNode("chipLbl", "Label", "Villa", {
        fill: "$--foreground",
        fontSize: "$--text-sm",
      }),
    ],
  },
  // Chip active
  {
    type: "frame",
    id: IDS.chipActive,
    name: "Chip / Active",
    reusable: true,
    layout: "horizontal",
    alignItems: "center",
    justifyContent: "center",
    padding: [8, 16],
    cornerRadius: "$--radius-pill",
    fill: "$--primary",
    children: [
      textNode("chipAcLbl", "Label", "Loft", {
        fill: "$--primary-foreground",
        fontSize: "$--text-sm",
        fontWeight: "600",
      }),
    ],
  },
  // Badge
  {
    type: "frame",
    id: IDS.badge,
    name: "Badge / Brand",
    reusable: true,
    layout: "horizontal",
    alignItems: "center",
    justifyContent: "center",
    padding: [4, 10],
    cornerRadius: "$--radius-pill",
    fill: "$--primary",
    children: [
      textNode("badgeLbl", "Label", "TOP PROPERTIES", {
        fill: "$--primary-foreground",
        fontSize: "$--text-xs",
        fontWeight: "700",
      }),
    ],
  },
  // Input field
  {
    type: "frame",
    id: IDS.input,
    name: "Input / Text",
    reusable: true,
    layout: "vertical",
    gap: 6,
    width: 160,
    children: [
      textNode("inpLbl", "Label", "Min price", {
        fill: "$--muted-foreground",
        fontSize: "$--text-xs",
      }),
      {
        type: "frame",
        id: "inpField",
        name: "Field",
        layout: "horizontal",
        alignItems: "center",
        padding: [10, 14],
        cornerRadius: "$--radius-md",
        fill: "$--muted",
        stroke: "$--input",
        strokeWidth: 1,
        width: "fill_container",
        children: [
          textNode("inpVal", "Value", "$0", {
            fill: "$--foreground",
            fontSize: "$--text-sm",
            fontWeight: "500",
          }),
        ],
      },
    ],
  },
  // Section label
  {
    type: "frame",
    id: IDS.label,
    name: "Label / Section",
    reusable: true,
    layout: "horizontal",
    alignItems: "center",
    gap: 6,
    children: [
      {
        type: "ellipse",
        id: "lblDot",
        name: "Accent",
        width: 6,
        height: 6,
        fill: "$--accent",
      },
      textNode("lblTxt", "Text", "Price range", {
        fill: "$--accent",
        fontSize: "$--text-sm",
        fontWeight: "600",
      }),
    ],
  },
  // Toggle
  {
    type: "frame",
    id: IDS.toggle,
    name: "Toggle / On",
    reusable: true,
    layout: "horizontal",
    alignItems: "center",
    width: 44,
    height: 24,
    padding: 2,
    cornerRadius: "$--radius-pill",
    fill: "$--success",
    children: [
      {
        type: "ellipse",
        id: "togKnob",
        name: "Knob",
        width: 20,
        height: 20,
        fill: "$--white",
        x: 20,
      },
    ],
  },
  // Stepper
  {
    type: "frame",
    id: IDS.stepper,
    name: "Stepper / Counter",
    reusable: true,
    layout: "horizontal",
    alignItems: "center",
    gap: 12,
    children: [
      {
        type: "frame",
        id: "stpMin",
        name: "Minus",
        width: 28,
        height: 28,
        cornerRadius: "$--radius-pill",
        stroke: "$--border",
        strokeWidth: 1,
        layout: "horizontal",
        alignItems: "center",
        justifyContent: "center",
        children: [
          textNode("stpMinI", "Icon", "−", { fontSize: "$--text-lg", fill: "$--foreground" }),
        ],
      },
      textNode("stpVal", "Value", "2", {
        fontSize: "$--text-base",
        fontWeight: "600",
        fill: "$--foreground",
      }),
      {
        type: "frame",
        id: "stpPls",
        name: "Plus",
        width: 28,
        height: 28,
        cornerRadius: "$--radius-pill",
        stroke: "$--border",
        strokeWidth: 1,
        layout: "horizontal",
        alignItems: "center",
        justifyContent: "center",
        children: [
          textNode("stpPlsI", "Icon", "+", { fontSize: "$--text-lg", fill: "$--foreground" }),
        ],
      },
    ],
  },
  // App header
  {
    type: "frame",
    id: IDS.header,
    name: "Header / App",
    reusable: true,
    layout: "horizontal",
    alignItems: "center",
    justifyContent: "space_between",
    padding: [16, 24],
    width: "fill_container",
    fill: "$--card",
    stroke: "$--border",
    strokeAlignment: "inner",
    strokeWidth: { bottom: 1 },
    children: [
      {
        type: "frame",
        id: "hdrBrand",
        name: "Brand",
        layout: "horizontal",
        alignItems: "center",
        gap: 10,
        children: [
          {
            type: "rectangle",
            id: "hdrLogo",
            name: "Logo Mark",
            width: 36,
            height: 36,
            cornerRadius: "$--radius-md",
            fill: "$--primary",
          },
          {
            type: "frame",
            id: "hdrName",
            name: "Name",
            layout: "vertical",
            gap: 2,
            children: [
              textNode("hdrTitle", "Title", "TopProperties", {
                fontFamily: "$--font-display",
                fontSize: "$--text-lg",
                fontWeight: "600",
                fill: "$--foreground",
              }),
              textNode("hdrSub", "Subtitle", "Mallorca Private Office", {
                fontSize: 10,
                fill: "$--muted-foreground",
              }),
            ],
          },
        ],
      },
      {
        type: "frame",
        id: "hdrNav",
        name: "Nav Icons",
        layout: "horizontal",
        gap: 12,
        children: ["○", "◇", "⌕", "☰"].map((icon, i) => ({
          type: "frame",
          id: `hdrIc${i}`,
          name: `Icon ${i}`,
          width: 32,
          height: 32,
          cornerRadius: "$--radius-pill",
          layout: "horizontal",
          alignItems: "center",
          justifyContent: "center",
          children: [
            textNode(`hdrIcT${i}`, "Glyph", icon, {
              fontSize: "$--text-sm",
              fill: "$--muted-foreground",
            }),
          ],
        })),
      },
    ],
  },
  // Property card
  {
    type: "frame",
    id: IDS.propertyCard,
    name: "Card / Property",
    reusable: true,
    layout: "vertical",
    width: 280,
    cornerRadius: "$--radius-lg",
    fill: "$--card",
    stroke: "$--border",
    strokeWidth: 1,
    clip: true,
    children: [
      {
        type: "rectangle",
        id: "propImg",
        name: "Image",
        width: "fill_container",
        height: 180,
        fill: "$--muted",
      },
      {
        type: "frame",
        id: "propBody",
        name: "Body",
        layout: "vertical",
        gap: 8,
        padding: 16,
        width: "fill_container",
        children: [
          {
            type: "ref",
            id: "propBadge",
            ref: IDS.badge,
            descendants: {
              badgeLbl: { content: "LUXURY HOUSES" },
            },
          },
          textNode("propRef", "Ref", "RIF: 1346064", {
            fontSize: "$--text-xs",
            fill: "$--muted-foreground",
            fontFamily: "$--font-mono",
          }),
          textNode("propLoc", "Location", "SÓLLER, TRAMUNTANA", {
            fontSize: "$--text-xs",
            fill: "$--muted-foreground",
          }),
          textNode("propTitle", "Title", "Can Rebassa", {
            fontFamily: "$--font-display",
            fontSize: "$--text-xl",
            fontWeight: "600",
            fill: "$--foreground",
            width: "fill_container",
            textGrowth: "fixed-width",
          }),
          textNode("propPrice", "Price", "€4.8M", {
            fontSize: "$--text-lg",
            fontWeight: "600",
            fill: "$--primary",
          }),
          {
            type: "frame",
            id: "propMeta",
            name: "Meta",
            layout: "horizontal",
            gap: 12,
            children: [
              textNode("propBeds", "Beds", "5 beds", {
                fontSize: "$--text-xs",
                fill: "$--muted-foreground",
              }),
              textNode("propBath", "Baths", "4 baths", {
                fontSize: "$--text-xs",
                fill: "$--muted-foreground",
              }),
              textNode("propSqm", "Sqm", "620 m²", {
                fontSize: "$--text-xs",
                fill: "$--muted-foreground",
              }),
            ],
          },
        ],
      },
    ],
  },
  // Brief composer
  {
    type: "frame",
    id: IDS.briefComposer,
    name: "Composer / Brief",
    reusable: true,
    layout: "vertical",
    width: 560,
    cornerRadius: "$--radius-lg",
    fill: "$--card",
    stroke: "$--border",
    strokeWidth: 1,
    theme: { Mode: "Dark" },
    children: [
      {
        type: "frame",
        id: "cmpRow",
        name: "Input Row",
        layout: "horizontal",
        alignItems: "end",
        gap: 8,
        padding: 12,
        width: "fill_container",
        children: [
          {
            type: "rectangle",
            id: "cmpIcon",
            name: "Sparkle",
            width: 40,
            height: 40,
            cornerRadius: "$--radius-md",
            fill: "$--accent",
          },
          textNode("cmpPrompt", "Prompt", "find best options for home in Mallorca", {
            fill: "$--foreground",
            fontSize: "$--text-base",
            width: "fill_container",
            textGrowth: "fixed-width",
          }),
          {
            type: "frame",
            id: "cmpSend",
            name: "Send",
            layout: "horizontal",
            alignItems: "center",
            justifyContent: "center",
            padding: [10, 16],
            cornerRadius: "$--radius-md",
            fill: "$--white",
            children: [
              textNode("cmpSendLbl", "Label", "Generate →", {
                fill: "$--black",
                fontSize: "$--text-sm",
                fontWeight: "600",
              }),
            ],
          },
        ],
      },
      {
        type: "frame",
        id: "cmpFoot",
        name: "Footer",
        layout: "horizontal",
        justifyContent: "space_between",
        padding: [8, 16],
        width: "fill_container",
        stroke: { fill: "$--border", align: "inside" },
        strokeWidth: { top: 1 },
        children: [
          textNode("cmpFootL", "Hint", "PERSISTENT BRIEF COMPOSER", {
            fontSize: 10,
            fill: "$--muted-foreground",
          }),
          textNode("cmpFootR", "Example", "sea-view villa in Port d'Andratx", {
            fontSize: 10,
            fill: "$--muted-foreground",
          }),
        ],
      },
    ],
  },
  // Tradeoff card
  {
    type: "frame",
    id: IDS.tradeoffCard,
    name: "Card / Tradeoff",
    reusable: true,
    layout: "vertical",
    gap: 12,
    padding: 20,
    width: 320,
    cornerRadius: "$--radius-lg",
    fill: "$--card",
    stroke: "$--border",
    strokeWidth: 1,
    theme: { Mode: "Dark" },
    children: [
      {
        type: "frame",
        id: "trdHead",
        name: "Header",
        layout: "horizontal",
        alignItems: "center",
        gap: 10,
        children: [
          {
            type: "ellipse",
            id: "trdIcon",
            name: "Icon",
            width: 36,
            height: 36,
            fill: "$--accent",
          },
          textNode("trdLabel", "Label", "PRIVACY", {
            fontSize: "$--text-xs",
            fontWeight: "700",
            fill: "$--muted-foreground",
          }),
        ],
      },
      textNode("trdWinner", "Winner", "Can Rebassa", {
        fontFamily: "$--font-display",
        fontSize: "$--text-xl",
        fill: "$--foreground",
      }),
      {
        type: "frame",
        id: "trdVerdict",
        name: "Verdict",
        layout: "horizontal",
        alignItems: "center",
        padding: [4, 12],
        cornerRadius: "$--radius-pill",
        fill: "$--muted",
        children: [
          textNode("trdVerdTxt", "Text", "Strongest", {
            fontSize: "$--text-xs",
            fontWeight: "600",
            fill: "$--accent-foreground",
          }),
        ],
      },
      textNode("trdNote", "Note", "Valley seclusion with no overlooking neighbours.", {
        fontSize: "$--text-sm",
        fill: "$--muted-foreground",
        width: "fill_container",
        textGrowth: "fixed-width",
      }),
    ],
  },
  // Filter section organism piece
  {
    type: "frame",
    id: IDS.filterSection,
    name: "Filter / Price Range",
    reusable: true,
    layout: "vertical",
    gap: 12,
    width: 320,
    children: [
      { type: "ref", id: "filtLbl", ref: IDS.label },
      {
        type: "frame",
        id: "filtSlider",
        name: "Slider Track",
        layout: "horizontal",
        alignItems: "center",
        width: "fill_container",
        height: 8,
        children: [
          {
            type: "rectangle",
            id: "filtSlActive",
            name: "Active",
            width: 140,
            height: 8,
            cornerRadius: "$--radius-pill",
            fill: "$--primary",
          },
          {
            type: "rectangle",
            id: "filtSlRest",
            name: "Rest",
            width: "fill_container",
            height: 8,
            cornerRadius: "$--radius-pill",
            fill: "$--muted",
          },
        ],
      },
      {
        type: "frame",
        id: "filtInputs",
        name: "Inputs",
        layout: "horizontal",
        gap: 12,
        width: "fill_container",
        children: [
          { type: "ref", id: "filtMin", ref: IDS.input },
          {
            type: "ref",
            id: "filtMax",
            ref: IDS.input,
            descendants: {
              inpLbl: { content: "Max price" },
              "inpField/inpVal": { content: "$10,000" },
            },
          },
        ],
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Page frames (templates)
// ---------------------------------------------------------------------------
function sectionHeader(title, subtitle) {
  return {
    type: "frame",
    id: id("sh"),
    name: "Section Header",
    layout: "vertical",
    gap: 4,
    width: "fill_container",
    children: [
      textNode(id("st"), "Title", title, {
        fontFamily: "$--font-display",
        fontSize: "$--text-3xl",
        fontWeight: "700",
        fill: "$--foreground",
      }),
      textNode(id("ss"), "Subtitle", subtitle, {
        fontSize: "$--text-sm",
        fill: "$--muted-foreground",
      }),
    ],
  };
}

const dsTokens = {
  type: "frame",
  id: "dsTokens1",
  name: "01 · Design Tokens",
  x: 0,
  y: -2600,
  width: 960,
  fill: "$--background",
  cornerRadius: "$--radius-lg",
  stroke: "$--border",
  strokeWidth: 1,
  layout: "vertical",
  gap: 24,
  padding: 32,
  children: [
    sectionHeader(
      "Design Tokens",
      "Color, typography, and spacing primitives for TopProperties Mallorca",
    ),
    {
      type: "frame",
      id: id("cg"),
      name: "Color Palette",
      layout: "vertical",
      gap: 12,
      width: "fill_container",
      children: [
        textNode(id("cgt"), "Heading", "Colors", {
          fontSize: "$--text-sm",
          fontWeight: "700",
          fill: "$--foreground",
        }),
        {
          type: "frame",
          id: id("cr"),
          name: "Swatches",
          layout: "horizontal",
          gap: 12,
          width: "fill_container",
          children: [
            swatch("Primary", "$--primary", "Primary"),
            swatch("Accent", "$--accent", "Accent Gold"),
            swatch("Secondary", "$--secondary", "Secondary"),
            swatch("Background", "$--background", "Background"),
            swatch("Muted", "$--muted", "Muted"),
            swatch("Success", "$--success", "Success"),
            swatch("Border", "$--border", "Border"),
          ],
        },
      ],
    },
    {
      type: "frame",
      id: id("tg"),
      name: "Typography",
      layout: "vertical",
      gap: 16,
      width: "fill_container",
      children: [
        textNode(id("tgt"), "Heading", "Typography", {
          fontSize: "$--text-sm",
          fontWeight: "700",
          fill: "$--foreground",
        }),
        textNode(id("t1"), "Display", "Find your place in Mallorca", {
          fontFamily: "$--font-display",
          fontSize: "$--text-5xl",
          fontWeight: "500",
          fill: "$--foreground",
          width: "fill_container",
          textGrowth: "fixed-width",
        }),
        textNode(id("t2"), "Heading", "Your Mallorca brief", {
          fontFamily: "$--font-display",
          fontSize: "$--text-3xl",
          fontWeight: "600",
          fill: "$--foreground",
        }),
        textNode(id("t3"), "Body", "Curated for luxury buyers planning a move or second home.", {
          fontSize: "$--text-base",
          fill: "$--muted-foreground",
          width: "fill_container",
          textGrowth: "fixed-width",
        }),
        textNode(id("t4"), "Caption", "AGENTIC BRIEFING · PERSISTENT COMPOSER", {
          fontSize: "$--text-xs",
          fontWeight: "700",
          fill: "$--accent",
        }),
      ],
    },
    {
      type: "frame",
      id: id("rg"),
      name: "Radius",
      layout: "horizontal",
      gap: 16,
      children: ["sm", "md", "lg", "pill"].map((r) => ({
        type: "frame",
        id: id("rx"),
        name: `Radius ${r}`,
        layout: "vertical",
        gap: 6,
        alignItems: "center",
        children: [
          {
            type: "rectangle",
            id: id("rb"),
            name: "Box",
            width: 56,
            height: 56,
            cornerRadius: `$--radius-${r}`,
            fill: "$--muted",
            stroke: "$--border",
            strokeWidth: 1,
          },
          textNode(id("rl"), "Label", r, {
            fontSize: "$--text-xs",
            fill: "$--muted-foreground",
          }),
        ],
      })),
    },
  ],
};

const dsAtoms = {
  type: "frame",
  id: "dsAtoms01",
  name: "02 · Atoms",
  x: 1000,
  y: -2600,
  width: 720,
  fill: "$--background",
  cornerRadius: "$--radius-lg",
  stroke: "$--border",
  strokeWidth: 1,
  layout: "vertical",
  gap: 24,
  padding: 32,
  children: [
    sectionHeader("Atoms", "Indivisible UI primitives — buttons, inputs, badges, controls"),
    {
      type: "frame",
      id: id("ab"),
      name: "Buttons",
      layout: "vertical",
      gap: 12,
      children: [
        textNode(id("abt"), "Label", "Buttons", { fontWeight: "700", fontSize: "$--text-sm" }),
        {
          type: "frame",
          id: id("abr"),
          name: "Row",
          layout: "horizontal",
          gap: 12,
          children: [
            { type: "ref", id: id("r1"), ref: IDS.btnPrimary },
            { type: "ref", id: id("r2"), ref: IDS.btnOutline },
          ],
        },
        { type: "ref", id: id("r3"), ref: IDS.btnDark, width: 200 },
      ],
    },
    {
      type: "frame",
      id: id("ac"),
      name: "Chips & Badges",
      layout: "vertical",
      gap: 12,
      children: [
        textNode(id("act"), "Label", "Chips & Badges", {
          fontWeight: "700",
          fontSize: "$--text-sm",
        }),
        {
          type: "frame",
          id: id("acr"),
          layout: "horizontal",
          gap: 8,
          children: [
            { type: "ref", id: id("c1"), ref: IDS.chip },
            { type: "ref", id: id("c2"), ref: IDS.chipActive },
            { type: "ref", id: id("c3"), ref: IDS.badge },
          ],
        },
      ],
    },
    {
      type: "frame",
      id: id("ai"),
      name: "Inputs & Controls",
      layout: "vertical",
      gap: 12,
      children: [
        textNode(id("ait"), "Label", "Inputs & Controls", {
          fontWeight: "700",
          fontSize: "$--text-sm",
        }),
        { type: "ref", id: id("i1"), ref: IDS.input },
        { type: "ref", id: id("s1"), ref: IDS.stepper },
        { type: "ref", id: id("t1"), ref: IDS.toggle },
      ],
    },
  ],
};

const dsMolecules = {
  type: "frame",
  id: "dsMolec1",
  name: "03 · Molecules",
  x: 1760,
  y: -2600,
  width: 720,
  fill: "$--background",
  cornerRadius: "$--radius-lg",
  stroke: "$--border",
  strokeWidth: 1,
  layout: "vertical",
  gap: 24,
  padding: 32,
  children: [
    sectionHeader("Molecules", "Composed groups — filter rows, price inputs, section labels"),
    { type: "ref", id: id("m1"), ref: IDS.filterSection },
    { type: "ref", id: id("m2"), ref: IDS.label },
  ],
};

const dsOrganisms = {
  type: "frame",
  id: "dsOrgan1",
  name: "04 · Organisms",
  x: 2520,
  y: -2600,
  width: 960,
  fill: "$--background",
  cornerRadius: "$--radius-lg",
  stroke: "$--border",
  strokeWidth: 1,
  layout: "vertical",
  gap: 24,
  padding: 32,
  children: [
    sectionHeader(
      "Organisms",
      "Complex sections — header, property card, composer, tradeoff panel",
    ),
    { type: "ref", id: id("o1"), ref: IDS.header, width: "fill_container" },
    {
      type: "frame",
      id: id("or"),
      name: "Cards Row",
      layout: "horizontal",
      gap: 16,
      children: [
        { type: "ref", id: id("o2"), ref: IDS.propertyCard },
        { type: "ref", id: id("o3"), ref: IDS.tradeoffCard },
      ],
    },
    { type: "ref", id: id("o4"), ref: IDS.briefComposer },
  ],
};

// Desktop Editorial Prompt Workspace
const screenWorkspaceDesktop = {
  type: "frame",
  id: "scrWrkDs",
  name: "05 · Editorial Prompt Workspace (Desktop)",
  x: 0,
  y: -1700,
  width: 1440,
  height: 900,
  fill: "$--background",
  theme: { Mode: "Dark" },
  layout: "vertical",
  clip: true,
  children: [
    {
      type: "ref",
      id: id("wsH"),
      ref: IDS.header,
      width: "fill_container",
      descendants: {
        hdrTitle: { content: "TopProperties", fill: "$--foreground" },
        hdrSub: { content: "Mallorca Private Office" },
      },
    },
    {
      type: "frame",
      id: id("wsM"),
      name: "Hero",
      layout: "vertical",
      alignItems: "center",
      justifyContent: "center",
      gap: 20,
      width: "fill_container",
      height: "fill_container",
      padding: [80, 120],
      children: [
        {
          type: "frame",
          id: id("wsBadge"),
          name: "Badge",
          layout: "horizontal",
          padding: [6, 14],
          cornerRadius: "$--radius-pill",
          fill: "$--muted",
          stroke: "$--border",
          strokeWidth: 1,
          children: [
            textNode(id("wsBd"), "Text", "✦ AGENTIC BRIEFING", {
              fontSize: "$--text-xs",
              fontWeight: "700",
              fill: "$--accent-foreground",
            }),
          ],
        },
        textNode(id("wsH1"), "Headline", "Find your place\nin Mallorca", {
          fontFamily: "$--font-display",
          fontSize: 72,
          fontWeight: "500",
          fill: "$--foreground",
          textAlign: "center",
        }),
        textNode(
          id("wsP"),
          "Body",
          "Describe what home means to you. We'll generate a curated brief of properties, tradeoffs, and the one question that will move your search forward.",
          {
            fontSize: "$--text-lg",
            fill: "$--muted-foreground",
            width: 560,
            textGrowth: "fixed-width",
            textAlign: "center",
          },
        ),
        {
          type: "frame",
          id: id("wsSug"),
          name: "Suggestions",
          layout: "horizontal",
          gap: 8,
          children: [
            {
              type: "ref",
              id: id("sg1"),
              ref: IDS.chip,
              descendants: { chipLbl: { content: "Sea-view villa" } },
            },
            {
              type: "ref",
              id: id("sg2"),
              ref: IDS.chip,
              descendants: { chipLbl: { content: "Palma townhouse" } },
            },
            {
              type: "ref",
              id: id("sg3"),
              ref: IDS.chip,
              descendants: { chipLbl: { content: "Tramuntana finca" } },
            },
          ],
        },
      ],
    },
    {
      type: "frame",
      id: id("wsC"),
      name: "Composer Dock",
      layout: "horizontal",
      justifyContent: "center",
      padding: [0, 0, 32, 0],
      width: "fill_container",
      children: [{ type: "ref", id: id("wsCmp"), ref: IDS.briefComposer, width: 640 }],
    },
  ],
};

// Desktop Generated Brief
const screenBriefDesktop = {
  type: "frame",
  id: "scrBrfDs",
  name: "06 · Generated Property Brief (Desktop)",
  x: 1500,
  y: -1700,
  width: 1440,
  height: 1200,
  fill: "$--background",
  theme: { Mode: "Dark" },
  layout: "vertical",
  gap: 0,
  clip: true,
  children: [
    {
      type: "ref",
      id: id("brH"),
      ref: IDS.header,
      width: "fill_container",
      descendants: {
        hdrNav: { enabled: false },
      },
    },
    {
      type: "frame",
      id: id("brM"),
      name: "Content",
      layout: "vertical",
      gap: 32,
      padding: [40, 80, 120, 80],
      width: "fill_container",
      children: [
        {
          type: "frame",
          id: id("brHd"),
          name: "Brief Header",
          layout: "vertical",
          gap: 8,
          children: [
            textNode(id("brEy"), "Eyebrow", "✦ GENERATED PROPERTY BRIEF", {
              fontSize: "$--text-xs",
              fontWeight: "700",
              fill: "$--accent-foreground",
            }),
            textNode(id("brT"), "Title", "Your Mallorca brief", {
              fontFamily: "$--font-display",
              fontSize: "$--text-4xl",
              fill: "$--foreground",
            }),
          ],
        },
        {
          type: "frame",
          id: id("brSum"),
          name: "Summary",
          layout: "vertical",
          gap: 12,
          padding: 32,
          cornerRadius: "$--radius-lg",
          fill: "$--card",
          stroke: "$--border",
          strokeWidth: 1,
          width: "fill_container",
          children: [
            textNode(id("brSumL"), "Label", "BRIEF SUMMARY", {
              fontSize: "$--text-xs",
              fontWeight: "700",
              fill: "$--muted-foreground",
            }),
            textNode(
              id("brSumT"),
              "Text",
              "For a buyer searching for the best home options in Mallorca, the market splits into three distinct propositions…",
              {
                fontFamily: "$--font-display",
                fontSize: "$--text-xl",
                fill: "$--foreground",
                width: "fill_container",
                textGrowth: "fixed-width",
              },
            ),
          ],
        },
        {
          type: "frame",
          id: id("brGrid"),
          name: "Properties",
          layout: "horizontal",
          gap: 20,
          width: "fill_container",
          children: [
            { type: "ref", id: id("bp1"), ref: IDS.propertyCard },
            {
              type: "ref",
              id: id("bp2"),
              ref: IDS.propertyCard,
              descendants: {
                "propBody/propTitle": { content: "Vista del Puerto" },
                "propBody/propLoc": { content: "PORT D'ANDRATX" },
                "propBody/propPrice": { content: "€7.2M" },
                badgeLbl: { content: "SEAFRONT" },
              },
            },
            {
              type: "ref",
              id: id("bp3"),
              ref: IDS.propertyCard,
              descendants: {
                "propBody/propTitle": { content: "Casa del Mercader" },
                "propBody/propLoc": { content: "PALMA OLD TOWN" },
                "propBody/propPrice": { content: "€3.9M" },
              },
            },
          ],
        },
        {
          type: "frame",
          id: id("brTrd"),
          name: "Tradeoffs",
          layout: "horizontal",
          gap: 16,
          children: [
            { type: "ref", id: id("bt1"), ref: IDS.tradeoffCard },
            {
              type: "ref",
              id: id("bt2"),
              ref: IDS.tradeoffCard,
              descendants: {
                trdLabel: { content: "SEA ACCESS" },
                trdWinner: { content: "Vista del Puerto" },
                trdNote: { content: "Immediate marina and Mediterranean access." },
              },
            },
          ],
        },
      ],
    },
    {
      type: "frame",
      id: id("brC"),
      name: "Composer Dock",
      layout: "horizontal",
      justifyContent: "center",
      padding: 24,
      width: "fill_container",
      children: [
        {
          type: "ref",
          id: id("brCmp"),
          ref: IDS.briefComposer,
          width: 640,
          descendants: {
            cmpSendLbl: { content: "Send →" },
          },
        },
      ],
    },
  ],
};

// Mobile workspace
const screenWorkspaceMobile = {
  type: "frame",
  id: "scrWrkMb",
  name: "07 · Editorial Prompt Workspace (Mobile 375)",
  x: 0,
  y: -600,
  width: 375,
  height: 812,
  fill: "$--background",
  theme: { Mode: "Dark" },
  layout: "vertical",
  clip: true,
  children: [
    {
      type: "ref",
      id: id("mbH"),
      ref: IDS.header,
      width: "fill_container",
      descendants: {
        hdrSub: { enabled: false },
        hdrNav: { children: [{ type: "frame", id: "mbMenu", width: 32, height: 32 }] },
      },
    },
    {
      type: "frame",
      id: id("mbM"),
      name: "Hero",
      layout: "vertical",
      alignItems: "center",
      gap: 16,
      padding: [48, 24, 24, 24],
      width: "fill_container",
      height: "fill_container",
      children: [
        textNode(id("mbH1"), "Headline", "Find your place in Mallorca", {
          fontFamily: "$--font-display",
          fontSize: "$--text-3xl",
          fontWeight: "500",
          fill: "$--foreground",
          textAlign: "center",
          width: "fill_container",
          textGrowth: "fixed-width",
        }),
        textNode(id("mbP"), "Body", "Describe what home means to you.", {
          fontSize: "$--text-sm",
          fill: "$--muted-foreground",
          textAlign: "center",
          width: "fill_container",
          textGrowth: "fixed-width",
        }),
        {
          type: "frame",
          id: id("mbSug"),
          layout: "vertical",
          gap: 8,
          width: "fill_container",
          children: [
            {
              type: "ref",
              id: id("ms1"),
              ref: IDS.chip,
              width: "fill_container",
              descendants: { chipLbl: { content: "Sea-view villa in Andratx" } },
            },
            {
              type: "ref",
              id: id("ms2"),
              ref: IDS.chip,
              width: "fill_container",
              descendants: { chipLbl: { content: "Palma townhouse" } },
            },
          ],
        },
      ],
    },
    {
      type: "frame",
      id: id("mbC"),
      name: "Composer",
      padding: [0, 12, 24, 12],
      width: "fill_container",
      children: [{ type: "ref", id: id("mbCmp"), ref: IDS.briefComposer, width: "fill_container" }],
    },
  ],
};

// Mobile filter overlay (from screenshot reference)
const screenFilterMobile = {
  type: "frame",
  id: "scrFltMb",
  name: "08 · Filter Overlay (Mobile 375)",
  x: 420,
  y: -600,
  width: 375,
  height: 812,
  fill: "$--card",
  layout: "vertical",
  gap: 0,
  clip: true,
  children: [
    {
      type: "frame",
      id: id("flH"),
      name: "Header",
      layout: "horizontal",
      justifyContent: "end",
      padding: 16,
      width: "fill_container",
      children: [
        {
          type: "frame",
          id: id("flX"),
          name: "Close",
          width: 32,
          height: 32,
          cornerRadius: "$--radius-pill",
          layout: "horizontal",
          alignItems: "center",
          justifyContent: "center",
          children: [textNode(id("flXI"), "X", "✕", { fontSize: "$--text-sm" })],
        },
      ],
    },
    {
      type: "frame",
      id: id("flB"),
      name: "Body",
      layout: "vertical",
      gap: 28,
      padding: [0, 24, 24, 24],
      width: "fill_container",
      height: "fill_container",
      children: [
        { type: "ref", id: id("fl1"), ref: IDS.filterSection, width: "fill_container" },
        {
          type: "frame",
          id: id("flType"),
          name: "Property Type",
          layout: "vertical",
          gap: 12,
          children: [
            textNode(id("flTyL"), "Label", "Property type", {
              fontWeight: "700",
              fontSize: "$--text-sm",
            }),
            {
              type: "frame",
              id: id("flTyR"),
              layout: "horizontal",
              gap: 8,
              children: [
                { type: "ref", id: id("ft1"), ref: IDS.chipActive },
                {
                  type: "ref",
                  id: id("ft2"),
                  ref: IDS.chip,
                  descendants: { chipLbl: { content: "Villa" } },
                },
                {
                  type: "ref",
                  id: id("ft3"),
                  ref: IDS.chip,
                  descendants: { chipLbl: { content: "Ático" } },
                },
              ],
            },
          ],
        },
        {
          type: "frame",
          id: id("flRm"),
          name: "Rooms",
          layout: "vertical",
          gap: 12,
          children: [
            textNode(id("flRmL"), "Label", "Rooms and beds", {
              fontWeight: "700",
              fontSize: "$--text-sm",
            }),
            {
              type: "frame",
              id: id("flRmR"),
              layout: "horizontal",
              justifyContent: "space_between",
              alignItems: "center",
              width: "fill_container",
              children: [
                textNode(id("flRmT"), "Field", "Rooms", { fontSize: "$--text-sm" }),
                { type: "ref", id: id("flSt"), ref: IDS.stepper },
              ],
            },
          ],
        },
        {
          type: "frame",
          id: id("flTg"),
          name: "Tags",
          layout: "vertical",
          gap: 12,
          children: [
            textNode(id("flTgL"), "Label", "Tags", { fontWeight: "700", fontSize: "$--text-sm" }),
            {
              type: "frame",
              id: id("flTgR"),
              layout: "horizontal",
              justifyContent: "space_between",
              alignItems: "center",
              children: [
                textNode(id("flTg1"), "Tag", "Luxury Houses", { fontSize: "$--text-sm" }),
                { type: "ref", id: id("flTgT"), ref: IDS.toggle },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "frame",
      id: id("flF"),
      name: "Footer",
      layout: "horizontal",
      justifyContent: "space_between",
      alignItems: "center",
      padding: 24,
      width: "fill_container",
      stroke: { fill: "$--border", align: "inside" },
      strokeWidth: { top: 1 },
      children: [
        textNode(id("flCan"), "Cancel", "Cancel filters", {
          fontSize: "$--text-sm",
          fill: "$--muted-foreground",
        }),
        { type: "ref", id: id("flRes"), ref: IDS.btnDark, width: 160 },
      ],
    },
  ],
};

// Catalog desktop (from screenshot reference)
const screenCatalogDesktop = {
  type: "frame",
  id: "scrCatDs",
  name: "09 · Catalog Grid (Desktop)",
  x: 840,
  y: -600,
  width: 1200,
  height: 900,
  fill: "$--background",
  layout: "vertical",
  clip: true,
  children: [
    { type: "ref", id: id("ctH"), ref: IDS.header, width: "fill_container" },
    {
      type: "frame",
      id: id("ctF"),
      name: "Filters",
      layout: "horizontal",
      gap: 8,
      padding: [16, 24],
      width: "fill_container",
      children: [
        {
          type: "ref",
          id: id("cf1"),
          ref: IDS.chip,
          descendants: { chipLbl: { content: "Tutte le categorie" } },
        },
        {
          type: "ref",
          id: id("cf2"),
          ref: IDS.chipActive,
          descendants: { chipAcLbl: { content: "TOP PROPERTIES" } },
        },
        {
          type: "ref",
          id: id("cf3"),
          ref: IDS.chip,
          descendants: { chipLbl: { content: "Luxury Houses" } },
        },
        {
          type: "ref",
          id: id("cf4"),
          ref: IDS.chip,
          descendants: { chipLbl: { content: "Top Rent" } },
        },
      ],
    },
    {
      type: "frame",
      id: id("ctG"),
      name: "Grid",
      layout: "horizontal",
      gap: 20,
      padding: [0, 24, 24, 24],
      width: "fill_container",
      children: [
        { type: "ref", id: id("cg1"), ref: IDS.propertyCard },
        { type: "ref", id: id("cg2"), ref: IDS.propertyCard },
        { type: "ref", id: id("cg3"), ref: IDS.propertyCard },
      ],
    },
    {
      type: "frame",
      id: id("ctL"),
      name: "Load More",
      layout: "horizontal",
      justifyContent: "center",
      padding: 24,
      width: "fill_container",
      children: [
        {
          type: "ref",
          id: id("ctBtn"),
          ref: IDS.btnDark,
          width: 200,
          descendants: { btnDrkLbl: { content: "Carica altri" } },
        },
      ],
    },
  ],
};

// Reference label for screenshots
const refLabel = {
  type: "frame",
  id: "refScreens",
  name: "Reference · Current Screenshots",
  x: 2989,
  y: -2550,
  width: 400,
  fill: "$--muted",
  cornerRadius: "$--radius-md",
  padding: 16,
  layout: "vertical",
  gap: 8,
  children: [
    textNode("refT", "Title", "Reference screenshots", {
      fontWeight: "700",
      fontSize: "$--text-sm",
    }),
    textNode(
      "refD",
      "Desc",
      "Original SantAndrea UI captures below → transformed into atomic system to the left.",
      {
        fontSize: "$--text-xs",
        fill: "$--muted-foreground",
        width: "fill_container",
        textGrowth: "fixed-width",
      },
    ),
  ],
};

const newChildren = [
  ...components,
  dsTokens,
  dsAtoms,
  dsMolecules,
  dsOrganisms,
  screenWorkspaceDesktop,
  screenBriefDesktop,
  screenWorkspaceMobile,
  screenFilterMobile,
  screenCatalogDesktop,
  refLabel,
];

const penPath = new URL("../design.pen", import.meta.url);
const pen = JSON.parse(readFileSync(penPath, "utf8"));

pen.variables = { ...variables };
pen.children = [...newChildren, ...pen.children];

writeFileSync(penPath, JSON.stringify(pen, null, 2) + "\n");
console.log(`Added ${newChildren.length} design system nodes`);
console.log(`Total children: ${pen.children.length}`);
console.log(`Variables: ${Object.keys(pen.variables).length}`);
