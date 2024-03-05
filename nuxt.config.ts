// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@nuxt/content', 'nuxt-lodash'],
  tailwindcss: {
    config: {
      plugins: [require('@tailwindcss/typography'), require('daisyui')]
    }
  }
});
