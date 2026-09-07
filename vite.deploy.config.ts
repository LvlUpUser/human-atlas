import {fileURLToPath} from 'node:url';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
const path=(relative:string)=>fileURLToPath(new URL(relative,import.meta.url));
const external=(id:string)=>['react','react-dom','react-dom/client','lucide-react','class-variance-authority','clsx','tailwind-merge','three'].includes(id)||id.startsWith('@base-ui/react/')||id.startsWith('three/');
export default defineConfig({root:path('./web'),publicDir:false,plugins:[react()],resolve:{alias:{'@':path('./')}},css:{postcss:{plugins:[tailwindcss()]}},build:{outDir:path('./dist'),emptyOutDir:true,rollupOptions:{external}}});
