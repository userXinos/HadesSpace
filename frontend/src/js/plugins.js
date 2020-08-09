
// скролл, после загрузки данных
export const srcollPlugin = {
  install(Vue, options) {
    Vue.prototype.$fixScroll = () => {
      if (options.router.history.current.hash) {
        location.href = options.router.history.current.hash;
      }
    };
  },
};
