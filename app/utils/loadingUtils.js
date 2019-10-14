const LoadingUtil = {
  showLoading(text = '', showType) {
    global.loadingRef && global.loadingRef.showLoading(text, showType);
  },
  dismissLoading() {
    global.loadingRef && global.loadingRef.dismissLoading();
  },
};

export default LoadingUtil;
