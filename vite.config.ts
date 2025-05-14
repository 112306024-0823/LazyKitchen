import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // 環境變量設置
    'import.meta.env.VITE_USE_MOCK_API': JSON.stringify('true'),
    'import.meta.env.VITE_APP_NAME': JSON.stringify('懶人食代'),
    'import.meta.env.VITE_FOOD_API_KEY': JSON.stringify('development-key')
  }
})
