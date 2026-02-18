import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://danielegreco.com',
  integrations: [
    react(), 
    tailwind(), 
    sitemap()
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'it', 'es'],
    routing: {
      prefixDefaultLocale: true
    }
  },
  // We will add the Cloudflare adapter later when we set up the Workers
});