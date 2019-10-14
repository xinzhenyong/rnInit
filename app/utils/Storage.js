// import { Component } from "react";
import {AsyncStorage} from 'react-native';

class Storage {
  /**
   * 获取数据
   * @param key
   * @returns {Promise.<TResult>}
   */
  static get(key) {
    return AsyncStorage.getItem(key)
      .then((value) => {
        const jsonValue = JSON.parse(value);
        return jsonValue;
      })
      .catch(() => {
        // console.log(error);
      });
  }

  /**
   *
   * 保存数据
   * @param key
   * @param value
   * @return {*|Promise}
   */
  static save(key, value) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * 更新
   * @param key
   * @param value
   * @returns {Promise.<TResult>|Promise.<*>|Promise.<U>|*}
   */
  static update(key, value) {
    // eslint-disable-next-line no-undef
    return DeviceStorage.get(key)
      .then((item) => {
        value = typeof value === 'string' ? value : Object.assign({}, item, value);
        return AsyncStorage.setItem(key, JSON.stringify(value));
      })
      .catch(() => {});
  }

  /**
   * 删除
   * @param key
   * @returns {*|Promise}
   */
  static delete(key) {
    return AsyncStorage.removeItem(key);
  }
}

export default Storage;
