import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { CRX_OUTDIR } from './globalConfig.js'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: CRX_OUTDIR,
  },
  server: {
    port: 3000, // 制定dev server的端口号，默认为3000
    open: '/',  // 自动打开浏览器运行以下页面（基于vite创建的工程默认情况下并不会自定打开浏览器，需自行配置）
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  plugins: [react()],
})
