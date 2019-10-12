import React, {Component} from 'react';
import {BackHandler, Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
// import NetInfo from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import AppNavigator from './router/navigator';
// import {ToastUtil} from './service/Toast';
import configureStore from './store/Store';
import CommonDialog from './component/CommonDialog';
import LoadingView from './component/loadingView/LoadingView';

const store = configureStore();

export default class Root extends Component {
  constructor(props) {
    super(props);
    this.index = 0;
    this.lastBackPressed = 0;
  }

  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <AppNavigator onNavigationStateChange={this.onNavigationStateChange} />
          <LoadingView ref={(ref) => (global.loadingRef = ref)} />
          <CommonDialog ref={(ref) => (global.dialogRef = ref)} />
        </React.Fragment>
      </Provider>
    );
  }

  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
    // NetInfo.isConnected.fetch().done(isConnected => {
    //   if (!isConnected) {
    //     // ToastUtil.center('当前设备无网络连接，请检查网络！')
    //   }
    // });
    // NetInfo.addEventListener('change', this.handleConnectivityChange);
  }

  handleConnectivityChange(status) {
    if (status === 'NONE') {
      global.isConnected = false;
      // ToastUtil.center('网络异常！');
    } else {
      global.isConnected = true;
    }
    // 监听第一次改变后, 可以取消监听.或者在componentUnmount中取消监听
    // NetInfo.removeEventListener('change', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  onBackAndroid = () => {
    if (this.index === 0) {
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        return false;
      }
      this.lastBackPressed = Date.now();
      // ToastAndroid.show('再点击一次退出应用', ToastAndroid.SHORT)
      return true;
    }
    return false;
  };

  onNavigationStateChange = (nav) => {
    this.index = nav.index;
  };
}
