/**
 * 配置文件
 * @description: 请在./scripts/config.json维护，执行 npm run prebuild 即可动态配置
 */

/**
 * 后端微服务统一地址
 */
export const BASE_URL = 'https://dsx-api-dev.1ziton.com/';

export const SHARE_PAGE_URL = 'https://dsx-dev.1ziton.com/#/download';

/**
 * 当前版本
 */
export const API_VERSION = 'v1';

/**
 * 热更新压缩包下载地址
 */
export const HOTCODE_PUSH = 'https://app-hotcode.1ziton.com/xiaozhige/test/bundle.zip';

/**
 * websocket地址
 */
export const WEBSOCKET_URL = `${BASE_URL}websocketsrv/websocket`;

/* access_token */
export const ACCESS_TOKEN = 'access_token';
/* 登录用户信息 */
export const USER_INFO = '_user_info';

/* 是否开启websocket debug */
export const WEBSOCKET_DEBUG = false;
