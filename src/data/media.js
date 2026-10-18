// src/data/media.js
// ─────────────────────────────────────────────────────────────
//  IMAGE PLACEHOLDERS — swap these for your own pictures.
//  Put files in public/assets/ and change a URL to '/assets/your-file.jpg'.
//  Every picsum.photos link below is a random stand-in image.
// ─────────────────────────────────────────────────────────────

// Already printed in the site's blues (baked in, so the opening never runs a live filter).
// To swap it: replace public/assets/profile-duotone.jpg with your own blue-toned photo.
export const HERO_PORTRAIT = '/assets/profile-duotone.jpg';

// Shown in "Selected work". Best at 16:10, about 1600×1000.
export const PROJECT_SHOTS = {
  finwise:   'https://picsum.photos/seed/ivan-finwise/1600/1000',   // REPLACE: FinWise app screenshot
  polar:     'https://picsum.photos/seed/ivan-polar/1600/1000',     // REPLACE: POV renderer photo
  wastenot:  'https://picsum.photos/seed/ivan-wastenot/1600/1000',  // REPLACE: WasteNot screenshot
  insight:   'https://picsum.photos/seed/ivan-insight/1600/1000',   // REPLACE: InsightUBC screenshot
  matchmind: 'https://picsum.photos/seed/ivan-matchmind/1600/1000', // REPLACE: MatchMind screenshot
  movies:    'https://picsum.photos/seed/ivan-movies/1600/1000',    // REPLACE: Movie List screenshot
};

// Tiles are about 300px wide, so ask for small versions
const thumb = (url) => url.replace('/1600/1000', '/640/400');

// The wall of pictures that drifts behind the laptop in the opening.
// Mix of shapes on purpose: 'tall' (4:5), 'wide' (16:10) or 'square'.
export const COLLAGE = [
  { src: 'https://picsum.photos/seed/ivan-c1/480/600', shape: 'tall' },    // REPLACE
  { src: 'https://picsum.photos/seed/ivan-c2/640/400', shape: 'wide' },    // REPLACE
  { src: 'https://picsum.photos/seed/ivan-c3/520/520', shape: 'square' },   // REPLACE
  { src: 'https://picsum.photos/seed/ivan-c4/480/600', shape: 'tall' },    // REPLACE
  { src: thumb(PROJECT_SHOTS.finwise), shape: 'wide' },
  { src: 'https://picsum.photos/seed/ivan-c6/520/520', shape: 'square' },   // REPLACE
  { src: '/assets/hero-bg-1600.jpg', shape: 'wide' },
  { src: 'https://picsum.photos/seed/ivan-c8/480/600', shape: 'tall' },    // REPLACE
  { src: thumb(PROJECT_SHOTS.polar), shape: 'wide' },
  { src: 'https://picsum.photos/seed/ivan-c10/520/520', shape: 'square' },  // REPLACE
  { src: 'https://picsum.photos/seed/ivan-c11/480/600', shape: 'tall' },   // REPLACE
  { src: thumb(PROJECT_SHOTS.insight), shape: 'wide' },
  { src: 'https://picsum.photos/seed/ivan-c13/480/600', shape: 'tall' },   // REPLACE
  { src: 'https://picsum.photos/seed/ivan-c14/520/520', shape: 'square' },  // REPLACE
  { src: thumb(PROJECT_SHOTS.matchmind), shape: 'wide' },
];

// Floats beside the cursor in "Experience". Best at 4:3, about 800×600.
export const EXPERIENCE_SHOTS = {
  Sendbird: 'https://picsum.photos/seed/ivan-sendbird/800/600',                         // REPLACE: Sendbird office / team
  'UBC Chemistry': 'https://picsum.photos/seed/ivan-chem/800/600',                      // REPLACE: chatbot screenshot
  'University of British Columbia': 'https://picsum.photos/seed/ivan-ubc/800/600',      // REPLACE: UBC campus / lab
};
