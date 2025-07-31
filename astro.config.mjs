// @ts-check
import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'
import Compress from '@playform/compress'

export default defineConfig({
  site: 'https://devchallenges.aitormt.dev',

  vite: {
    plugins: [tailwindcss()],
  },

  build: {
    inlineStylesheets: 'auto',
  },

  compressHTML: true,

  devToolbar: {
    enabled: false,
  },

  integrations: [
    Compress({
      CSS: {
        lightningcss: {
          minify: true,
        },
      },
      HTML: {
        'html-minifier-terser': {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
          removeAttributeQuotes: true,
          minifyCSS: true,
          minifyJS: true,
        },
      },
      Image: {
        webp: {
          quality: 75,
        },
        mozjpeg: { quality: 75 },
        optipng: { optimizationLevel: 5 },
        svgo: true,
      },
      JavaScript: {
        terser: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
          format: {
            comments: false,
          },
        },
      },
      JSON: true,
      SVG: true,
    }),
  ],
})
