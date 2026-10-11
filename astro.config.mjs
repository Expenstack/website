// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import { satteri } from "@astrojs/markdown-satteri";
import externalLinks from "./src/plugins/external-links";

import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://expenstack.sprucepad.net/",
  i18n: {
    defaultLocale: "en",
    locales: ["pt", "en"],
    routing: {
      prefixDefaultLocale: true,
    },
  },

  integrations: [sitemap(), mdx(), svelte()],
  vite: { plugins: [tailwindcss()] },

  fonts: [
    {
      name: "DM Sans",
      cssVariable: "--font-dm-sans",
      provider: fontProviders.google(),
      weights: ["100 900"],
    },
    {
      name: "DM Mono",
      cssVariable: "--font-dm-mono",
      provider: fontProviders.google(),
      weights: ["400 600"],
    },
  ],

  markdown: {
    shikiConfig: {
      themes: {
        dark: "horizon",
        light: "horizon-bright",
      },
    },
    processor: satteri({
      hastPlugins: [externalLinks],
    }),
  },
});
