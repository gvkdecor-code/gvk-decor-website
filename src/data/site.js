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
  image: "",
  alt: "",
  video: "",
  poster: "",
  tone: "cinema",
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
