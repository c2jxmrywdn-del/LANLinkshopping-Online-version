import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    // Only register Ant Design Vue components actually referenced by templates.
    // Ant Design Vue uses CSS-in-JS, so its component styles are generated on demand.
    Components({
      resolvers: [AntDesignVueResolver({ importStyle: false })]
    })
  ],
  build: {
    rollupOptions: {
      output: {
        // Keep framework/vendor code cacheable without forcing the entire Ant Design Vue
        // package barrel into a single eagerly-loaded chunk.
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia', 'axios'],
          'swiper': ['swiper']
        }
      }
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  },
  // 生产构建预览（Lighthouse 评测等）同样代理 /api 到后端
  preview: {
    port: 4173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})
