import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { babel } from '@rollup/plugin-babel';
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      ...babel({
        babelHelpers: 'bundled',
        plugins: ['@babel/plugin-transform-template-literals'],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      }),
      apply: 'build',
    },
    {
      ...viteSingleFile(),
      apply: 'build',
    }
  ],
})
