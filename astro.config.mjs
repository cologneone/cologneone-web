// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Version: 1.0.0 (2026-08-18) — Erstanlage
// Ziel: statische Website cologneone.de, Deploy über GitHub Pages
export default defineConfig({
  site: 'https://cologneone.de',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
});
