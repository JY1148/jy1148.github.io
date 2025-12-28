// src/utils/backgrounds.ts
// List of available background images in /public/images/background
// Update this list if you add/remove files in that folder.
const BACKGROUNDS = [
  '/images/background/Untitled_Artwork 18.png',
  '/images/background/Untitled_Artwork 19.png',
  '/images/background/Untitled_Artwork 31.png',
  '/images/background/Untitled_Artwork 34.png',
  '/images/background/Untitled_Artwork 37.png',
  '/images/background/Untitled_Artwork 7.png',
];

export function pickUniqueBackgrounds(count: number): string[] {
  const copy = BACKGROUNDS.slice();
  const picked: string[] = [];
  const n = Math.min(count, copy.length);
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(Math.random() * copy.length);
    picked.push(copy.splice(idx, 1)[0]);
  }
  return picked;
}

export const availableBackgrounds = BACKGROUNDS.slice();
