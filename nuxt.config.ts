// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-06-13',
  devtools: { enabled: false },

  ssr: false,
  app: {
    buildAssetsDir: "/assets/",

    head: {
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/assets/images/icon.svg" },
        { rel: "manifest", href: "/manifest.json" },
      ],
      meta: [
        { name: "application-name", content: "Piyori" },
        { name: "robots", content: "nofollow, noindex, noarchive, nosnippet" },
        { name: "description", content: "みんなを平等につなぐ次世代ポイントシステム" },
        { name: "theme-color", content: "#ffe140" },
        { property: "og:type", content: "website" },
        { property: "og:site:name", content: "Piyori" },
      ],
      title: "Piyori",
    },
  },

  experimental: {
    inlineRouteRules: true
  },

  nitro: {
    preset: "cloudflare-pages",
  },

  modules: ["@pinia/nuxt"],
  pinia: {
    storesDirs: ["./stores/**"],
  },
})
