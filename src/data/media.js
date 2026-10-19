// src/data/media.js
// ─────────────────────────────────────────────────────────────
//  IMAGE PLACEHOLDERS — swap these for your own pictures.
//  Put files in public/assets/ and change a URL to '/assets/your-file.jpg'.
//  Every picsum.photos link below is a random stand-in image.
// ─────────────────────────────────────────────────────────────

// The cut-out portrait that stands in front of the hero title. Background
// removed, upscaled 2x, lightly retouched and graded into the site's blues.
// To swap it: a transparent WebP/PNG of a person, roughly 1260 x 2000.
export const HERO_PORTRAIT = '/assets/ivan-cutout.webp';

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
// Your own travel photos (public/assets/wall, enhanced), mixed with stand-ins.
// Each tile takes its photo's own shape so nothing important gets cropped:
// 'tall' 3:4, 'portrait' 4:5, 'land' 4:3, 'wide' 16:10, 'photo' 3:2, 'square'.
// Order matters: tile i goes into column i % 5.
const wall = (name) => `/assets/wall/${name}.webp`;
export const COLLAGE = [
  { src: wall('aurora'), shape: 'tall' },
  { src: wall('canyon'), shape: 'tall' },
  { src: 'https://picsum.photos/seed/ivan-c2/640/400', shape: 'wide' },      // REPLACE
  { src: wall('chongqing-ivan'), shape: 'tall' },
  { src: wall('sunset'), shape: 'tall' },
  { src: 'https://picsum.photos/seed/ivan-c4/480/600', shape: 'portrait' },  // REPLACE
  { src: wall('whistler-hike'), shape: 'land' },
  { src: wall('st-peters'), shape: 'tall' },
  { src: 'https://picsum.photos/seed/ivan-c6/520/520', shape: 'square' },    // REPLACE
  { src: wall('autumn-pond'), shape: 'photo' },
  { src: wall('chongqing-bridge'), shape: 'tall' },
  { src: thumb(PROJECT_SHOTS.finwise), shape: 'wide' },                      // REPLACE with a screenshot
  { src: 'https://picsum.photos/seed/ivan-c11/480/600', shape: 'portrait' }, // REPLACE
  { src: 'https://picsum.photos/seed/ivan-c14/520/520', shape: 'square' },   // REPLACE
  { src: thumb(PROJECT_SHOTS.matchmind), shape: 'wide' },                    // REPLACE with a screenshot
];

// Floats beside the cursor in "Experience". Best at 4:3, about 800×600.
export const EXPERIENCE_SHOTS = {
  Sendbird: 'https://picsum.photos/seed/ivan-sendbird/800/600',                         // REPLACE: Sendbird office / team
  'UBC Chemistry': 'https://picsum.photos/seed/ivan-chem/800/600',                      // REPLACE: chatbot screenshot
  'University of British Columbia': 'https://picsum.photos/seed/ivan-ubc/800/600',      // REPLACE: UBC campus / lab
};
