export const brand = {
  name: "GVK Decor",
  tagline: "Crafting Timeless Spaces Since 1959",
  // Set only after receiving and reviewing the official GOLD logo. Do not recreate it.
  goldLogo: "/brand/gvk-decor-gold.png",
};
export const locations = [
  {
    id: "experience-centre",
    name: "GVK Decor Experience Centre",
    address: "Road No. 39, Jubilee Hills, Hyderabad",
  },
  { id: "store", name: "GVK Decor Store", address: "Secunderabad, Hyderabad" },
];
// Set the selected, reviewed short film here. Never use unreviewed footage.
export const sequenceFilm = { video: "", poster: "", alt: "", captions: "" };
export const craftSequence = [
  {
    id: "light",
    title: "Light, framed.",
    detail: "Curtains and sheers photographed in the GVK Decor pitch deck.",
    tone: "drape",
    image: "/media/deck/curtain-sheers.webp",
    width: 619,
    height: 964,
    alt: "Full-height sheers, dark trim and soft daylight from the GVK Decor pitch deck",
  },
  {
    id: "surface",
    title: "Texture, layered.",
    detail: "A close look at the curtain border, weave and finishing detail.",
    tone: "weave",
    image: "/media/deck/curtain-detail.webp",
    width: 619,
    height: 963,
    alt: "Cream and navy curtain border with fringe, from the GVK Decor pitch deck",
  },
  {
    id: "detail",
    title: "Details, made personal.",
    detail:
      "A maker at work. Handwork photographed in the GVK Decor workshop section.",
    tone: "embroidery",
    image: "/media/deck/craft-handwork.webp",
    width: 425,
    height: 755,
    alt: "A maker adding details by hand to a figurative textile in the GVK Decor pitch deck",
  },
];
// These are descriptive album labels, not invented project identities or locations.
export const deckSelections = [
  {
    id: "deck-living",
    title: "Light & living",
    category: "Pitch-deck selection",
    location: "GVK Decor pitch deck · pages 12–13",
    description:
      "Room and upholstery photographs supplied in the brand deck. Project name, location and credits are awaiting confirmation.",
    media: [
      {
        image: "/media/deck/living-room.webp",
        srcSet:
          "/media/deck/living-room-800.webp 800w, /media/deck/living-room.webp 1734w",
        width: 1734,
        height: 1157,
        alt: "Ivory upholstery and full-height sheers in a room shown in the GVK Decor pitch deck",
      },
      {
        image: "/media/deck/upholstery-detail.webp",
        width: 633,
        height: 986,
        alt: "Ochre armchair with cushions and a grey throw from the supplied pitch deck",
      },
    ],
  },
  {
    id: "deck-curtains",
    title: "The curtain studies",
    category: "Pitch-deck selection",
    location: "GVK Decor pitch deck · pages 15–16",
    description:
      "Window treatments and fabric details extracted from the supplied gallery. Descriptive selection only; project details are not yet confirmed.",
    media: [
      {
        image: "/media/deck/window-lounge.webp",
        width: 908,
        height: 482,
        alt: "Curved window with drapes and patterned sheers, from the supplied pitch deck",
      },
      {
        image: "/media/deck/curtain-detail.webp",
        width: 619,
        height: 963,
        alt: "A close-up of the cream and navy curtain border in the supplied deck",
      },
    ],
  },
  {
    id: "deck-bedding",
    title: "Bedding & headboards",
    category: "Pitch-deck selection",
    location: "GVK Decor pitch deck · pages 15, 17",
    description:
      "Layered bedding, upholstered headboards and curtains in the supplied brand gallery. Client and project attribution are awaiting confirmation.",
    media: [
      {
        image: "/media/deck/bedroom.webp",
        width: 908,
        height: 482,
        alt: "Upholstered bed against full-height dark curtains, from the GVK Decor pitch deck",
      },
      {
        image: "/media/deck/bed-layers.webp",
        width: 908,
        height: 482,
        alt: "Textured headboard, patterned cushions and layered bedding shown in the supplied deck",
      },
    ],
  },
];
export const contact = {
  phone: "+91 89776 30636",
  address: "Road No. 39, Jubilee Hills, Hyderabad",
  venue: "Jubilee Hills Experience Centre",
  whatsapp: (import.meta.env.VITE_WHATSAPP_NUMBER || "918977030636").replace(
    /\D/g,
    "",
  ),
  email: import.meta.env.VITE_APPOINTMENT_EMAIL || "gvkdecor@gmail.com",
};
export const navigation = [
  ["Our Legacy", "/our-legacy"],
  ["Collections", "/collections"],
  ["Projects", "/projects"],
  ["Behind the Craft", "/behind-the-craft"],
];
// Replace empty media fields only with approved GVK Decor assets.
// Place originals in public/media (see public/media/README.md).
export const collections = [
  {
    id: "curtains",
    name: "Curtains & sheers",
    category: "The poetry of light",
    description:
      "Beautifully measured drapes and sheers that frame the light, soften the architecture and change the way a room feels.",
    tone: "drape",
    image: "",
    alt: "",
    video: "",
    poster: "",
  },
  {
    id: "blinds",
    name: "Designer blinds",
    category: "Precision meets softness",
    description:
      "A considered balance of privacy, light and proportion. Explore blinds that sit naturally within the architecture of your home.",
    tone: "blind",
    image: "",
    alt: "",
    video: "",
    poster: "",
  },
  {
    id: "wallpapers",
    name: "Wallpapers",
    category: "A new dimension",
    description:
      "From quiet, tactile surfaces to expressive patterns. Walls with character, chosen to complement the larger story of your space.",
    tone: "wall",
    image: "",
    alt: "",
    video: "",
    poster: "",
  },
  {
    id: "upholstery",
    name: "Upholstery",
    category: "An invitation to linger",
    description:
      "Texture you can feel. Colour you can live with. Discover fabrics selected in conversation with your furniture, interiors and daily rituals.",
    tone: "weave",
    image: "",
    alt: "",
    video: "",
    poster: "",
  },
  {
    id: "bedding",
    name: "Bedding",
    category: "A softer way to end the day",
    description:
      "Thoughtful layers for your most personal space. A tactile composition of comfort, colour and finishing details.",
    tone: "fold",
    image: "",
    alt: "",
    video: "",
    poster: "",
  },
  {
    id: "headboards",
    name: "Headboards",
    category: "A personal silhouette",
    description:
      "A focal point shaped around your room. Explore proportion, upholstery and detail with our team.",
    tone: "headboard",
    image: "",
    alt: "",
    video: "",
    poster: "",
  },
  {
    id: "bespoke",
    name: "Custom furnishings",
    category: "Beyond the expected",
    description:
      "For an idea that feels entirely your own. Bring us your inspiration and let’s explore materials, finishes and possibilities together.",
    tone: "embroidery",
    image: "",
    alt: "",
    video: "",
    poster: "",
  },
];
export const heroMedia = {
  image: "/media/deck/living-room.webp",
  srcSet:
    "/media/deck/living-room-800.webp 800w, /media/deck/living-room.webp 1734w",
  alt: "Ivory furnishings, sheer curtains and warm accents from the GVK Decor pitch deck",
  width: 1734,
  height: 1157,
  video: "",
  poster: "",
  tone: "cinema",
  source: "GVK Decor pitch deck · page 12",
};
export const craftStudies = [
  {
    title: "The touch.",
    detail: "Texture is where a room becomes a feeling.",
    tone: "weave",
    image: "",
    alt: "",
    video: "",
  },
  {
    title: "The detail.",
    detail: "Small decisions. An entirely different impression.",
    tone: "embroidery",
    image: "",
    alt: "",
    video: "",
  },
  {
    title: "The fall.",
    detail: "A dialogue between fabric, light and proportion.",
    tone: "drape",
    image: "",
    alt: "",
    video: "",
  },
];
// Add verified completed projects here. Empty deliberately: no fictional portfolio.
// { id, title, category: 'Homes' | 'Collaborations', location, description,
//   media: [{ image: '/media/example.webp', alt: 'Descriptive text', tone: 'weave' }] }
export const projects = [];
export const brandFilm = {
  image: "",
  alt: "",
  video: "",
  poster: "",
  tone: "fold",
};

// Source-attributed deck photographs replace only categories actually shown.
for (const collection of collections) {
  const selected = {
    curtains: {
      image: "/media/deck/curtain-detail.webp",
      width: 619,
      height: 963,
      alt: "Cream and navy curtain border from the GVK Decor pitch deck",
    },
    upholstery: {
      image: "/media/deck/upholstery-detail.webp",
      width: 633,
      height: 986,
      alt: "Layered cushions and a throw on an ochre armchair, from the supplied deck",
    },
    bedding: {
      image: "/media/deck/bed-layers.webp",
      width: 908,
      height: 482,
      alt: "Layered bedding and cushions from the GVK Decor pitch deck",
    },
    headboards: {
      image: "/media/deck/bedroom.webp",
      width: 908,
      height: 482,
      alt: "Upholstered bed and dark curtains from the supplied deck",
    },
  }[collection.id];
  if (selected) Object.assign(collection, selected);
}
Object.assign(brandFilm, {
  image: "/media/deck/craft-workshop.webp",
  width: 422,
  height: 739,
  alt: "A maker working on a textile, photographed in the workshop section of the supplied pitch deck",
});
