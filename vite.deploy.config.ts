import {fileURLToPath} from 'node:url';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
const path=(relative:string)=>fileURLToPath(new URL(relative,import.meta.url));
export default defineConfig({
 root:path('./web'),
 publicDir:false,
 plugins:[react()],
 resolve:{alias:{'@':path('./')}},
 css:{postcss:{plugins:[tailwindcss()]}},
 build:{
  outDir:path('./dist'),
  emptyOutDir:true,
  rollupOptions:{
   output:{
    entryFileNames:'assets/app.js',
    chunkFileNames:'assets/[name]-[hash].js',
    assetFileNames:asset=>asset.names?.some(name=>name.endsWith('.css'))?'assets/app.css':'assets/[name]-[hash][extname]'
   }
  }
 }
});
