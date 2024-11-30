import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    AutoImport({
      imports: ['vue'],
      dts: 'src/auto-imports.d.ts',
      resolvers: [],
    }),
    Components({
      dts: 'src/components.d.ts', // 生成的文件的位置
      dirs: ['src/components'], // 我这个意思是,如果是components文件夹下的组件,实现自动引入
      resolvers: [],
      extensions: ['vue'],
      // 只导入 dirs 指定的根目录组件，不进行深度导入
      deep: false,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
