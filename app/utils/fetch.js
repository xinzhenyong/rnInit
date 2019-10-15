import { DeviceEventEmitter } from 'react-native';
import { API_VERSION, BASE_URL } from '../config';
import LoadingUtil from './loadingUtils';
import { getToken } from './api';
import { ToastUtil } from './Toast';
import { NET_NOT_CONNECT } from '../const/AppConst';

export default class FetchUtils {
  static get = (url, baseurl = BASE_URL) =>
    new Promise((resolve, reject) => {
      if (!global.isConnected) {
        ToastUtil.center('当前无网络！');
        LoadingUtil.dismissLoading();
        return;
      }
      fetch(baseurl + url)
        .then((response) => {
          if (response) {
            return response.json() || { data: [] };
          }
          return { code: response.status, desc: NET_NOT_CONNECT };
        })
        .then((result) => {
          resolve(result || {});
        })
        .catch(() => {
          reject();
        });
    });

  static getNeedUrl = (url) =>
    new Promise((resolve, reject) => {
      if (!global.isConnected) {
        ToastUtil.center('当前无网络！');
        LoadingUtil.dismissLoading();
        return;
      }
      fetch(url)
        .then((response) => {
          if (response) {
            return response.json() || { data: [] };
          }
          return { code: response.status, desc: NET_NOT_CONNECT };
        })
        .then((result) => {
          resolve(result || {});
        })
        .catch(() => {
          reject();
        });
    });

  static post = (url, data) =>
    getToken()
      .then((token) =>
        // console.log('url', url);
        // console.log('data', data);
        // console.log('token', token);

         new Promise((resolve, reject) => {
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
            .then((response) => {
              if (response) {
                return response.json() || { data: [] };
              }
              return { code: response.status, desc: NET_NOT_CONNECT };
            })
            .then((result) => {
              //Token过期退出登录
              // if (result.code === 4100 && url !== `${API_MASTER_VERSION}/worker/getBasicInfo`) {
              //   ToastUtil.center(result.desc || '已超过有效期，请重新登录');
              //   DeviceEventEmitter.emit('loginOut');
              //   return;
              // }
              resolve(result || {});
            })
            .catch(() => {
              reject();
            });
        })
      )
      .catch((error) => {
        ToastUtil.center('获取token失败', error);
      });

  static postCESHI = (url, data) =>
    getToken()
      .then((token) => new Promise((resolve, reject) => {
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
            .then((response) => {
              if (response) {
                return response.json() || { data: [] };
              }
              return { code: response.status, desc: NET_NOT_CONNECT };
            })
            .then((result) => {
              if (result.code === 4100) {
                DeviceEventEmitter.emit('loginOut');
                return;
              }
              resolve(result || {});
            })
            .catch(() => {
              reject();
            });
        }))
      .catch((error) => {
        ToastUtil.center('获取token失败', error);
      });

  static postNoVerification = (url, data) =>
    new Promise((resolve, reject) => {
      // if (!global.isConnected) {
      //   ToastUtil.center('当前无网络！');
      //   LoadingUtil.dismissLoading();
      //   return;
      // }
      fetch(BASE_URL + url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response) {
            return response.json() || { data: [] };
          }
          return { code: response.status, desc: NET_NOT_CONNECT };
        })
        .then((result) => {
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
        .then((response) => {
          if (response) {
            return response.json() || { data: [] };
          }
          return { code: response.status, desc: NET_NOT_CONNECT };
        })
        .then((result) => {
          resolve(result || {});
        })
        .catch(() => {
          reject();
        });
    });
  };

  static loginOut = () =>
    getToken()
      .then((token) => new Promise((resolve, reject) => {
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
            body: JSON.stringify({ token }),
          })
            .then((response) => {
              if (response) {
                return response.json() || { data: [] };
              }
              return { code: response.status, desc: NET_NOT_CONNECT };
            })
            .then((result) => {
              resolve(result || {});
            })
            .catch(() => {
              reject();
            });
        }))
      .catch((error) => {
        ToastUtil.center('退出登录失败:', error);
      });

  static postUrl = (url, data) =>
    getToken()
      .then((token) => new Promise((resolve, reject) => {
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
            .then((response) => {
              if (response) {
                return response.json() || { data: [] };
              }
              return { code: response.status, desc: NET_NOT_CONNECT };
            })
            .then((result) => {
              if (result.code === 4100) {
                DeviceEventEmitter.emit('loginOut');
                return;
              }
              resolve(result || {});
            })
            .catch(() => {
              reject();
            });
        }))
      .catch((error) => {
        ToastUtil.center('获取token失败', error);
      });
}
