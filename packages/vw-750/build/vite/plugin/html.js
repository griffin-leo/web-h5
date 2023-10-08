import createHtmlPlugin from 'vite-plugin-html';

export function configHtmlPlugin(env, isBuild) {
  const { VITE_GLOB_APP_TITLE } = env;

  const htmlPlugin = createHtmlPlugin({
    minify: isBuild,
    inject: {
      // Inject data into ejs template
      data: {
        title: VITE_GLOB_APP_TITLE
        // echartsScript: '<script src="https://cdn.jsdelivr.net/npm/echarts@4.8.0/dist/echarts.min.js"  async="async"></script>'
      }
    }
  });
  return htmlPlugin;
}
