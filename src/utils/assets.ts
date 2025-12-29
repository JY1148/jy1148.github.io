// src/utils/assets.ts
// Centralized static asset URL resolver. Converts local `/images/...` paths
// to jsDelivr CDN URLs (GitHub repo: jy1148/jy1148.github.io@main).

const CDN_BASE = 'https://cdn.jsdelivr.net/gh/jy1148/jy1148.github.io@main';

export function imageUrl(raw?: string): string {
    if (!raw) return '';
    // If already an absolute URL, return as-is
    if (/^https?:\/\//i.test(raw)) return raw;

    // Normalize raw to start with '/'
    const path = raw.startsWith('/') ? raw : '/' + raw;

    // In development prefer the local `public` assets so edits are visible immediately.
    if (process.env.NODE_ENV === 'development') {
        return (process.env.PUBLIC_URL || '') + path;
    }

    // In production, resolve to jsDelivr CDN pointing to the repo's public folder.
    return CDN_BASE + encodeURI('/public' + path);
}

export default imageUrl;
