const LoadingUtil = {
  showLoading(text = '', showType) {
    // eslint-disable-next-line no-unused-expressions
    global.loadingRef && global.loadingRef.showLoading(text, showType);
  },
  dismissLoading() {
    // eslint-disable-next-line no-unused-expressions
    global.loadingRef && global.loadingRef.dismissLoading();
  }
};

export default LoadingUtil;
