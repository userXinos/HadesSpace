const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  publicPath: (isProd) ? '/hades-star-data/' : '/',
  productionSourceMap: !isProd,
  css: {
    sourceMap: !isProd,
  },
};
