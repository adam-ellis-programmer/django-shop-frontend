import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // server: {
  //   proxy: {
  //     '/api': {
  //       target:
  //         'http://django-api-prod.eba-2ff8w2hp.eu-north-1.elasticbeanstalk.com/',
  //       changeOrigin: true,
  //       secure: false,
  //       https: false,
  //     },
  //   },
  // },
})
