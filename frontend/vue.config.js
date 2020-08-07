const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  publicPath: (isProd) ? './' : '/',
  productionSourceMap: !isProd,
  css: {
    sourceMap: !isProd,
  },
};
