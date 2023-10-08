import { loadEnv } from 'vite';
import { generateModifyVars } from './build/generate/generateModifyVars';
import { createVitePlugins } from './build/vite/plugin';
import { wrapperEnv } from './build/utils';
const path = require('path');
const resolve = dir => path.join(__dirname, dir);

export default ({ command, mode }) => {
  const isBuild = command === 'build';

  const root = process.cwd();

  const env = loadEnv(mode, root);

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env);

  const {
    VITE_PORT,
    VITE_PUBLIC_PATH,
    VITE_DROP_CONSOLE,
    VITE_APP_BASE_URL,
    VITE_APP_OUTPUT_DIR
  } = viteEnv;

  return {
    base: VITE_PUBLIC_PATH,
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          charset: false,
          additionalData: `@import "./src/styles/less/base.less";`,
          modifyVars: generateModifyVars()
        }
      }
    },
    esbuild: {
      drop: VITE_DROP_CONSOLE ? ['console', 'debugger'] : []
    },
    server: {
      host: '0.0.0.0',
      port: VITE_PORT,
      open: true,
      https: false,
      proxy: {
        '/api': {
          target: VITE_APP_BASE_URL,
          changeOrigin: true,
          ws: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve('src'),
        _api: resolve('./src/api'),
        _com: resolve('./src/components'),
        _page: resolve('./src/page'),
        _css: resolve('./src/styles/css'),
        _less: resolve('./src/styles/less'),
        _img: resolve('./src/assets/images')
      }
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    build: {
      outDir: VITE_APP_OUTPUT_DIR,
      assetsDir: 'static/img/', // 静态资源合并打包
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    }
  };
};
