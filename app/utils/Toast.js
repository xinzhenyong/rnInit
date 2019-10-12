/**
 * @author: giscafer ,https://github.com/giscafer
 * @date: 2018-10-30 10:31:14
 * @description: Toast统一包装使用
 */

import Toast from 'react-native-simple-toast';

export class ToastUtil {
  /**
   * 居中显示toast
   * @param {string} message 信息
   * @param {number} duration 延迟关闭时间，默认2000ms
   */
  static center(message, duration = Toast.SHORT) {
    // eslint-disable-next-line no-undef
    this.show(message, duration, (position = Toast.CENTER));
  }

  /**
   * 底部显示toast
   * @param {string} message 信息
   * @param {number} duration 延迟关闭时间，默认2000ms
   */
  static bottom(message, duration = Toast.SHORT) {
    // eslint-disable-next-line no-undef
    this.show(message, duration, (position = Toast.BOTTOM));
  }

  /**
   * toast
   * @param {string} message 信息
   * @param {number} duration 延迟关闭时间，默认2000ms
   * @param {number} position 默认位置TOP
   */
  static show(message, duration = Toast.SHORT, position = Toast.TOP) {
    // Add a Toast on screen.
    Toast.showWithGravity(message, duration, position);
  }
}
