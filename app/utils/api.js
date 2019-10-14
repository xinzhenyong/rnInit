import Storage from './Storage';
import {ACCESS_TOKEN} from '../config';

let tokenCache = ''; // 缓存的token变量

/* 获取变量token值 */
export const getTokenCache = () => tokenCache;

/* 更新变量token ，为了同步获取而缓存 */
export const updateTokenCache = (token) => {
  tokenCache = token;
  Storage.save(ACCESS_TOKEN, token);
};

/* 从缓存中获取token */
export const getToken = () =>
  new Promise((resolve, reject) => {
    if (tokenCache) {
      return resolve(tokenCache);
    }
    // AsyncStorage hangs
    // https://github.com/facebook/react-native/issues/18372
    Storage.get(ACCESS_TOKEN)
      .then((token) => {
        tokenCache = token;
        return resolve(token);
      })
      .catch((error) => {
        tokenCache = '';
        return reject(error);
      });
  });
