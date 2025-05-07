
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api/update-complaint-status': {
        target: 'https://odenbatdqohfxgjibkff.supabase.co/functions/v1/update-complaint-status',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/update-complaint-status/, ''),
      },
      '/api/respond-to-complaint': {
        target: 'https://odenbatdqohfxgjibkff.supabase.co/functions/v1/respond-to-complaint',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/respond-to-complaint/, ''),
      },
      '/api/complaint-responses': {
        target: 'https://odenbatdqohfxgjibkff.supabase.co/functions/v1/complaint-responses',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/complaint-responses/, ''),
      },
    },
  },
})
