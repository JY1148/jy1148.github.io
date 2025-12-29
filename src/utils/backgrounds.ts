// src/utils/backgrounds.ts
// List of available background images in /public/images/background
// Update this list if you add/remove files in that folder.
// Serve images via jsDelivr CDN from the GitHub repo `jy1148/jy1148.github.io`.
// URLs use the `main` branch and reference the files under `public/images/background`.
const CDN_PREFIX = 'https://cdn.jsdelivr.net/gh/jy1148/jy1148.github.io@main/public/images/background/';
const BACKGROUNDS = [
    `${CDN_PREFIX}Untitled_Artwork%2018.png`,
    `${CDN_PREFIX}Untitled_Artwork%2019.png`,
    `${CDN_PREFIX}Untitled_Artwork%2031.png`,
    `${CDN_PREFIX}Untitled_Artwork%2034.png`,
    `${CDN_PREFIX}Untitled_Artwork%2037.png`,
    `${CDN_PREFIX}Untitled_Artwork%207.png`,
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
