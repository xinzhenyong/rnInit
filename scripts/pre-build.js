const fse = require('fs-extra');
const configProps = require('./config.json'); // 配置文件
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// https://stackoverflow.com/questions/11580961/sending-command-line-arguments-to-npm-script
const env = process.argv.splice(2)[0] || 'prod'; // 环境
const appVersion = process.env.npm_package_version;

console.log(env);
console.log(appVersion);

/**
 * 配置文件根据环境替换
 * uri:文件地址
 * type:如果是json，则适用json赋值的方式替换内容，其他则用正则匹配替换
 * noRegExpEscape:是否用RegExp.escape进行编码正则表达式
 * oldStr:需要替换的原字符，用作搜索 (支持数组)
 * newStr:替换的新字符 (支持数组，元素顺序对应oldStr)
 * desc:描述内容，只作为注释
 */
const modifiedContentList = [
  {
    uri: './app/config.js',
    noRegExpEscape: true,
    oldStr: [
      "export const BASE_URL = '(.*)'",
      "export const HOTCODE_PUSH = '(.*)'",
      "export const SHARE_PAGE_URL = '(.*)'"
    ],
    newStr: [
      "export const BASE_URL = '" + configProps.BASE_URL[env] + "'",
      "export const HOTCODE_PUSH = '" + configProps.HOTCODE_PUSH[env] + "'",
      "export const SHARE_PAGE_URL = '" + configProps.SHARE_PAGE_URL[env] + "'"
    ],
    desc: 'BASE_URL HOTCODE_PUSH SHARE_PAGE_URL配置'
  }
  /*  {
         uri: './android/build.gradle',
         oldStr: "url 'https://maven.google.com/'",
         newStr: 'url "http://maven.aliyun.com/nexus/content/groups/public/"',
         desc: "build.gradle maven镜像地址"
     },
     {
         noRegExpEscape: true,
         uri: './android/app/build.gradle',
         oldStr: 'applicationId "(.*)"',
         newStr: 'applicationId "com.mobxrn' + (env == 'prod' ? '' : '.' + env) + '"',
         desc: "applicationId"
     },
     {
         noRegExpEscape: true,
         uri: './android/app/src/main/res/values/strings.xml',
         oldStr: '<string name="app_name">(.*)</string>',
         newStr: '<string name="app_name">WMS' + (env == 'prod' ? '' : '-' + env) + '</string>',
         desc: "app name"
     },
     {
         noRegExpEscape: true,
         uri: './android/app/src/main/AndroidManifest.xml',
         oldStr: '<meta-data android:name="BaiduMobAd_CHANNEL" android:value="(.*)" />',
         newStr: '<meta-data android:name="BaiduMobAd_CHANNEL" android:value="' + env + '" />',
         desc: "百度统计开发环境"
     } */
];

RegExp.escape = function(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

const handlePromise = (promise) => promise.then((res) => [null, res]).catch((err) => [err, null]);

async function modifiedContent(obj) {
  const [err, content] = await handlePromise(readFile(obj.uri, 'utf-8'));
  if (!content || err) {
    console.log(`Error: 文件读取失败：${obj.uri}`);
    console.log(err);
    return;
  }
  if (
    content.indexOf(obj.newStr) !== -1 &&
    content.indexOf(obj.oldStr) === -1 &&
    !obj.noRegExpEscape &&
    typeof oldStr === 'string'
  ) {
    console.log(`Warn：【无需修改】：${obj.uri}`);
    return;
  }
  let newFile = '';
  if (obj.type === 'json') {
    let dataObj = JSON.parse(content);
    if (obj.object) {
      obj.oldStr.forEach((oldStr, index) => {
        dataObj[obj.object][obj.oldStr[index]] = obj.newStr[index];
      });
    } else {
      dataObj[obj.oldStr] = obj.newStr;
    }
    newFile = JSON.stringify(dataObj);
  } else {
    newFile = replaceText(content, obj);
  }

  const [wErr, result] = await handlePromise(writeFile(obj.uri, newFile));
  if (wErr) {
    console.log(`Error: 文件：${obj.uri} 修改失败！`);
    console.log(err);
    return;
  }
  console.log(`Success: 修改 ${obj.uri} 内容【${obj.desc}】 成功！`);
}

/* 文本替换 */
function replaceText(data, obj) {
  let newContent = data;
  let repTypeIsString = typeof obj.oldStr === 'string';

  if (obj.noRegExpEscape) {
    if (repTypeIsString) {
      newContent = data.replace(new RegExp(obj.oldStr, 'g'), obj.newStr);
      return newContent;
    }

    obj.oldStr.forEach((item, index) => {
      newContent = newContent.replace(new RegExp(obj.oldStr[index], 'g'), obj.newStr[index]);
    });
    // console.log(newContent);
    return newContent;
  }

  if (repTypeIsString) {
    newContent = data.replace(new RegExp(RegExp.escape(obj.oldStr), 'g'), obj.newStr);
    return newContent;
  }

  obj.oldStr.forEach((item, index) => {
    newContent = newContent.replace(new RegExp(RegExp.escape(obj.oldStr[index]), 'g'), obj.newStr[index]);
  });

  return newContent;
}

console.log('>>>>>>>>>>>开始执行<<<<<<<<<<<<<<');

// 签名文件复制
try {
  fse.copySync('./my-release-key.keystore', './android/app/my-release-key.keystore');
  console.log('Success: copy my-release-key.keystore success!');
} catch (err) {
  console.error(err);
}

for (let item of modifiedContentList) {
  modifiedContent(item);
}
