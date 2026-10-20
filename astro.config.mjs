import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { createHash } from 'node:crypto';
import { INLINE_SCRIPTS } from './src/scripts/inline.js';

// Astro hashes the scripts it builds, not the ones written inline: these are hashed here.
const sha256 = (code) => `sha256-${createHash('sha256').update(code).digest('base64')}`;

export default defineConfig({
  site: 'https://danielegreco.com',
  // No Markdown on this site: without Shiki, nothing conflicts with the Content Security Policy below.
  markdown: { syntaxHighlight: false },
  integrations: [
    react(),
    // English at /, Italian at /it/: the sitemap lists each page with its translation.
    sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en', it: 'it' } } }),
  ],
  // Content Security Policy: Astro hashes the scripts and styles it builds (ours are hashed above) and
  // writes the policy into a <meta> tag on each page. Cloudflare Web Analytics, which the zone injects into every
  // page, is the only other origin. frame-ancestors cannot live in a <meta> tag: see public/_headers.
  security: {
    csp: {
      scriptDirective: {
        resources: ["'self'", 'https://static.cloudflareinsights.com'],
        hashes: Object.values(INLINE_SCRIPTS).map(sha256),
      },
      // React and the map set sizes and positions through style attributes.
      styleDirective: { resources: ["'self'", { resource: "'unsafe-inline'", kind: 'attribute' }] },
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self' https://cloudflareinsights.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'none'",
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
