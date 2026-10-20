import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://danielegreco.com',
  integrations: [
    react(),
    // English at /, Italian at /it/: the sitemap lists each page with its translation.
    sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en', it: 'it' } } }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
