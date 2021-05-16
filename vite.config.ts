import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  server: {
    port: 8888,
    open: true,
    host: 'localhost',
    proxy: {
      '/api': {
        //开发环境所需
        // target: 'http://192.168.1.9:8085/',
        // target: 'http://192.168.1.3:8085/',
        target: 'http://pm2.winvers.com/yzq',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/url': {
        //生产环境所需
        target: 'http://pm2.winvers.com/yzq',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/url/, '')
      }
    }
  },
  build: {
    minify: 'esbuild',
    outDir: 'dist',
    base: './'
  },
  alias: {
    '/@/': path.resolve(__dirname, './src') + '/'
  },
  plugins: [vue()],
  optimizeDeps: {
    include: ['echarts', 'axios', 'BMap']
  }
})
