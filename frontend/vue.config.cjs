const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  publicPath: (isProd) ? '/HadesStarData/' : '/',
  productionSourceMap: !isProd,
  css: {
    sourceMap: !isProd,
  },
};
