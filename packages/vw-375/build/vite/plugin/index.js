import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import { configHtmlPlugin } from './html';
import { configCompressPlugin } from './compress';

export function createVitePlugins(viteEnv, isBuild) {
  const {
    // VITE_USE_IMAGEMIN,
    // VITE_USE_MOCK,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
  } = viteEnv;

  const vitePlugins = [
    // have to
    vue(),
    // have to
    vueJsx()
    // support name
  ];

  // @vitejs/plugin-legacy
  VITE_LEGACY && isBuild && vitePlugins.push(legacy());

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  // The following plugins only work in the production environment
  if (isBuild) {
    // vite-plugin-imagemin
    // VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());

    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(
        VITE_BUILD_COMPRESS,
        VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
      )
    );

    // vite-plugin-pwa
    // vitePlugins.push(configPwaConfig(viteEnv));
  }

  return vitePlugins;
}
