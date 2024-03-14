// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@nuxt/content', 'nuxt-lodash'],
  tailwindcss: {
    config: {
      content: [
        `components/**/*.{vue,js,ts}`,
        `layouts/**/*.vue`,
        `pages/**/*.vue`,
        `composables/**/*.{js,ts}`,
        `plugins/**/*.{js,ts}`,
        `utils/**/*.{js,ts}`,
        `App.{js,ts,vue}`,
        `app.{js,ts,vue}`,
        `Error.{js,ts,vue}`,
        `error.{js,ts,vue}`,
        `app.config.{js,ts}`
      ],
      plugins: [require('@tailwindcss/typography'), require('daisyui')]
    }
  },
  content: {
    navigation: {
      fields: ['description', 'author', 'updatedAt', 'tags']
    }
  }
});
