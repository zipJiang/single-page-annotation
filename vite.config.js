import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { babel } from '@rollup/plugin-babel';
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            '@babel/plugin-transform-template-literals',
            {"extensions": [".js", ".jsx", ".ts", ".tsx", ".es6", ".es", ".mjs"]}
          ]
        ],
      }
    }),
    {
      ...babel({
        babelHelpers: 'bundled',
        plugins: ['@babel/plugin-transform-template-literals'],
        include: ["src/**", "node_modules/**"],
        extensions: [".js", ".jsx", ".ts", ".tsx", ".es6", ".es", ".mjs"],
      }),
      enforce: 'post',
    },
    {
      ...viteSingleFile(),
      apply: 'build',
    }
  ],
})
