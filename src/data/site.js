export const contact = {
  phone: '+91 89776 30636',
  address: 'Road No. 39, Jubilee Hills, Hyderabad',
  venue: 'Jubilee Hills Experience Centre',
  whatsapp: (import.meta.env.VITE_WHATSAPP_NUMBER || '918977030636').replace(/\D/g, ''),
  email: import.meta.env.VITE_APPOINTMENT_EMAIL || 'gvkdecor@gmail.com',
};
export const navigation = [ ['Our Legacy', '/our-legacy'], ['Collections', '/collections'], ['Projects', '/projects'], ['Behind the Craft', '/behind-the-craft'] ];
// Replace empty media fields only with approved GVK Decor assets.
// Place originals in public/media (see public/media/README.md).
export const collections = [
  { id: 'curtains', name: 'Curtains & sheers', category: 'Light, beautifully framed', description: 'From the softest diffusion to a dramatic drape. Window dressings considered in relation to light, proportion and the rhythm of your room.', tone: 'drape', image: '', alt: '', video: '', poster: '' },
  { id: 'upholstery', name: 'Upholstery', category: 'A tactile point of view', description: 'Texture, colour and comfort, brought together with attention to the way a space is lived in.', tone: 'weave', image: '', alt: '', video: '', poster: '' },
  { id: 'wallcoverings', name: 'Wallcoverings', category: 'Character in every layer', description: 'Quiet texture or a confident statement. Discover surfaces that give a room its own distinctive character.', tone: 'wall', image: '', alt: '', video: '', poster: '' },
  { id: 'soft-furnishings', name: 'Soft furnishings', category: 'The finishing conversation', description: 'Thoughtful accents that connect a palette, soften an edge and bring a personal sense of harmony to a home.', tone: 'fold', image: '', alt: '', video: '', poster: '' },
];
// Add verified completed projects here. Empty deliberately: no fictional portfolio.
// { id, title, category: 'Homes' | 'Collaborations', location, description,
//   media: [{ image: '/media/example.webp', alt: 'Descriptive text', tone: 'weave' }] }
export const projects = [];
export const brandFilm = { image: '', alt: '', video: '', poster: '', tone: 'fold' };
