import reactotron from 'reactotron-react-native';
import {DeviceEventEmitter} from 'react-native';
import {API_VERSION, BASE_URL} from '../config';
// import JPush from '../utils/JPush';
import LoadingUtil from '../utils/loadingUtils';
import {getToken} from './api';
import {ToastUtil} from './Toast';
import {API_MASTER_VERSION} from '../api_version';
import {NET_NOT_CONNECT} from '../const/AppConst';

export default class FetchUtils {
  static get = (url, baseurl = BASE_URL) =>
    new Promise((resolve, reject) => {
      if (!global.isConnected) {
        ToastUtil.center('当前无网络！');
        LoadingUtil.dismissLoading();
        return;
      }
      fetch(baseurl + url)
        .then(response => {
          if (response) {
            return response.json() || {data: []};
          }
          return {code: response.status, desc: NET_NOT_CONNECT};
        })
        .then(result => {
          resolve(result || {});
        })
        .catch(() => {
          reject();
        });
    });

  static getNeedUrl = url =>
    new Promise((resolve, reject) => {
      if (!global.isConnected) {
        ToastUtil.center('当前无网络！');
        LoadingUtil.dismissLoading();
        return;
      }
      fetch(url)
        .then(response => {
          if (response) {
            return response.json() || {data: []};
          }
          return {code: response.status, desc: NET_NOT_CONNECT};
        })
        .then(result => {
          resolve(result || {});
        })
        .catch(() => {
          reject();
        });
    });

  static post = (url, data) =>
    getToken()
      .then(token => {
        reactotron.log('token', token);
        // console.log('url', url);
        // console.log('data', data);
        // console.log('token', token);

        return new Promise((resolve, reject) => {
          if (!global.isConnected) {
            ToastUtil.center(NET_NOT_CONNECT);
            LoadingUtil.dismissLoading();
            return;
          }
          fetch(BASE_URL + url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          })
            .then(response => {
              if (response) {
                return response.json() || {data: []};
              }
              return {code: response.status, desc: NET_NOT_CONNECT};
            })
            .then(result => {
              //Token过期退出登录
              if (
                result.code === 4100 &&
                url !== `${API_MASTER_VERSION}/worker/getBasicInfo`
              ) {
                ToastUtil.center(result.desc || '已超过有效期，请重新登录');
                DeviceEventEmitter.emit('loginOut');
                return;
              }
              reactotron.log('result', result);
              resolve(result || {});
            })
            .catch(() => {
              reject();
            });
        });
      })
      .catch(error => {
        ToastUtil.center('获取token失败', error);
      });

  static postCESHI = (url, data) =>
    getToken()
      .then(token => {
        reactotron.log('postParam', token);
        return new Promise((resolve, reject) => {
          if (!global.isConnected) {
            ToastUtil.center(NET_NOT_CONNECT);
            LoadingUtil.dismissLoading();
            return;
          }
          fetch(BASE_URL + url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          })
            .then(response => {
              if (response) {
                return response.json() || {data: []};
              }
              return {code: response.status, desc: NET_NOT_CONNECT};
            })
            .then(result => {
              if (result.code === 4100) {
                DeviceEventEmitter.emit('loginOut');
                return;
              }
              reactotron.log('resultCESHI', result);
              resolve(result || {});
            })
            .catch(error => {
              reactotron.log('errorCESHI', error);
              reject();
            });
        });
      })
      .catch(error => {
        ToastUtil.center('获取token失败', error);
      });

  static postNoVerification = (url, data) =>
    new Promise((resolve, reject) => {
      if (!global.isConnected) {
        ToastUtil.center('当前无网络！');
        LoadingUtil.dismissLoading();
        return;
      }
      fetch(BASE_URL + url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => {
          if (response) {
            return response.json() || {data: []};
          }
          return {code: response.status, desc: NET_NOT_CONNECT};
        })
        .then(result => {
          resolve(result || {});
        })
        .catch(() => {
          reject();
        });
    });

  /**
   * 使用密码登陆传参为 账号和密码
   * 使用验证码登陆传参为 账号和验证码+false
   *
   */
  static login = (account, pwd, usePassword = true) => {
    let data = `username=${account}&password=${pwd}&grant_type=password&scope=openid&sys_role=WORKER`;
    if (!usePassword) {
      data = `type=verifyCode&username=${account}&grant_type=password&scope=openid&verifycode=${pwd}&sys_role=WORKER`;
    }
    return new Promise((resolve, reject) => {
      if (!global.isConnected) {
        ToastUtil.center('当前无网络！');
        LoadingUtil.dismissLoading();
        return;
      }
      fetch(`${BASE_URL}oauth/token`, {
        method: 'POST',
        headers: {
          Authorization: 'Basic YmlnYnJvdGhlcjpiaWdicm90aGVy',
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      })
        .then(response => {
          if (response) {
            return response.json() || {data: []};
          }
          return {code: response.status, desc: NET_NOT_CONNECT};
        })
        .then(result => {
          resolve(result || {});
          reactotron.log('resolve', result);
        })
        .catch(() => {
          // reactotron.log('error', error);
          reject();
        });
    });
  };

  static loginOut = () =>
    getToken()
      .then(token => {
        reactotron.log('token', token);
        return new Promise((resolve, reject) => {
          if (!global.isConnected) {
            ToastUtil.center(NET_NOT_CONNECT);
            LoadingUtil.dismissLoading();
            return;
          }
          fetch(`${BASE_URL}auth/${API_VERSION}/api/user/user/logout`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({token}),
          })
            .then(response => {
              if (response) {
                return response.json() || {data: []};
              }
              return {code: response.status, desc: NET_NOT_CONNECT};
            })
            .then(result => {
              resolve(result || {});
              // reactotron.log('result', result)
            })
            .catch(() => {
              // reactotron.log('error', error)
              reject();
              // ToastUtil.center(error || error.desc)
            });
        });
      })
      .catch(error => {
        ToastUtil.center('退出登录失败:', error);
      });

  // static unbindingMessage = () => {
  //   JPush.getRegistrationID(registrationId => {
  //     const params = {
  //       receive: 'USER', //用户类型 USER:APP用户 PLATFORM:运营用户 MERCHANT:商户用户
  //       resourceType: 'APP_JPUSH', //绑定类型 SMS:短信 EMAIL:邮箱 APP_JPUSH:极光 APP_GETUI:信鸽
  //       resource: registrationId, //绑定信息 和绑定类型相关,手机号,邮箱,极光reg_id等
  //     };
  //     FetchUtils.post(
  //       `message/${API_VERSION}/api/userResource/unbinding`,
  //       params,
  //     )
  //       .then(result => {
  //         if (result.code === 2000) {
  //           // ToastUtil.center('registrationId解绑成功');
  //         } else {
  //           // ToastUtil.center('registrationId解绑失败');
  //         }
  //       })
  //       .catch(() => {});
  //   });
  // };

  static postUrl = (url, data) =>
    getToken()
      .then(token => {
        reactotron.log('postParam', token);
        return new Promise((resolve, reject) => {
          if (!global.isConnected) {
            ToastUtil.center(NET_NOT_CONNECT);
            LoadingUtil.dismissLoading();
            return;
          }
          fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          })
            .then(response => {
              if (response) {
                return response.json() || {data: []};
              }
              return {code: response.status, desc: NET_NOT_CONNECT};
            })
            .then(result => {
              if (result.code === 4100) {
                DeviceEventEmitter.emit('loginOut');
                return;
              }
              // eslint-disable-next-line no-console
              console.log(`result===>${result}`);
              resolve(result || {});
            })
            .catch(() => {
              reject();
              // ToastUtil.center(error || error.desc);
            });
        });
      })
      .catch(error => {
        ToastUtil.center('获取token失败', error);
      });
}
