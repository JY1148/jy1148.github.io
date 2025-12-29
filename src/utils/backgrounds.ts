// src/utils/backgrounds.ts
// List of available background images in /public/images/background
// Update this list if you add/remove files in that folder.
// Return raw local paths for backgrounds (App will resolve via imageUrl()).
// Keep filenames matching `public/images/background` after renaming spaces -> underscores.
const BACKGROUNDS = [
    '/images/background/Untitled_Artwork_18.png',
    '/images/background/Untitled_Artwork_19.png',
    '/images/background/Untitled_Artwork_31.png',
    '/images/background/Untitled_Artwork_34.png',
    '/images/background/Untitled_Artwork_37.png',
    '/images/background/Untitled_Artwork_7.png',
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
