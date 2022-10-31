// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        }
      ]
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    }),
  ],
  server: {
    proxy: {
      '/apis': {
        target: 'http://localhost:8090',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apis/, "")
      },
      '/food/getFoodImage': {
        target: 'http://localhost:8090',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/food\/getFoodImage/, "")
      },
      '/food/uploadImage': {
        target: 'http://localhost:8090',
        changeOrigin: true,
      },
      '/user/getAvatar': {
        target: 'http://localhost:8090',
        changeOrigin: true,
      }
    }
  }
})