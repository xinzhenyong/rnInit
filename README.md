# 基础框架

技术栈，`react-native + redux`


## 目录说明

```
/* ========================================================

    目录结构：
    - app
        + assets      -> 放静态资源，例如图片
        + component   -> 公共组件
        + const       -> 常量
        - router      -> 路由栈，页面文件夹
            + advertisingPage
            + home 
                    +redux    ->每个模块各种要用到的redux，对应的action与reducer写在同一个文件方便代码阅读
                    +component->私有的组件
            + my
                    +redux    ->每个模块各种要用到的redux，对应的action与reducer写在同一个文件方便代码阅读
            - order
            index.js   -> 在这里注册navigator，注册过的组件，其props会增加navigation属性
        + store        -> store文件.用来存储state的状态
        + service  -> 服务目录
        + utils    -> 一些工具类
        App.js     -> 项目入口


   ====================================================== */
```
## 1. 配置管理
    不同的环境在./scripts/config.json维护，执行 npm run prebuild 即可动态配置
## 2. 静态资源
## 3. 网络请求
    网络请求在app\utils\fetch.js
## 4. 组件化
    原生组件重用可以在一智通组织https://www.npmjs.com/settings/1ziton/packages里面查找并重用，新的组件发布到组织方便以后重用
## 5. 路由管理   
    在app\router\navigator.js配置并使用，参考https://github.com/react-navigation
## 6. 数据缓存
    用户信息使用key-value存储，工具类app\utils\Storage.js
## 7. 热更新
    安卓热更新插件https://www.npmjs.com/package/react-native-hot-deployment
## 8. 数据搜集
    ### 百度统计接入
    https://mtj.baidu.com/static/userguide/book/android/sdk/gradle.html

    ### 百度统计接入
    百度统计应用名称	系统平台	AppKey
    小智哥	android	98380cb5a3
    小智哥	ios	083dbff646
## 9. 应用状态管理
    需要在多界面共享数据与复杂操作的，用redux，其余简单界面与操作用state，避免简单逻辑复杂化。
    store:app\store\Store.js
    action与reducer写在同一个文件方便查找，如app\router\order\redux\CountReducer.js
    参考http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html
## 调式工具

VSCode 推荐安装插件 `React-Native snippets`，可以通过 `rnc` 快速创建一个 React Component 文件内容，更多快捷缩写见插件文档[es7-react-js-snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)


若maven镜像网络问题，更换为阿里云maven , build.gradle `maven { url "http://maven.aliyun.com/nexus/content/groups/public/" }`
## 使用说明

如果没有android目录，执行 `react-native eject android` 生成android环境目录

- 环境配置脚本执行：`npm run prebuild ${env}`，其中 `${env}` 值可以为 `mock、dev、test、uat、prod` ，脚本会动态替换为对应环境，详情见 `./scripts/config.json`
- android 虚拟机运行：`react-native run-android` 或 `npm run android`，ios同样的道理
- android 打包构建 `npm run build:${env}`，其中 `${env}` 值可以为 `dev、test、uat、prod` ， 比如打包测试环境的APP，则执行 `npm run build:test`

脚本自动修改配置可以在 `./scripts` 目录下修改配置，**一律不允许手工修改，统一配置和脚本自动化**，目前环境暂不考虑IOS

## 代码规范强制检查

IDE安装两个插件，[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) 和 [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)，用来做代码语法检查和格式化

配合工程根目录下的几个配置文件生效：

- `.eslintrc` ESLint插件和脚本检查配置，执行代码规范检查：`npm run lint`，自动修复代码：`npm run lint-fix` （只能少部分修复）
- `.prettierrc` Prettier插件配置
- `.editorconfig` VSCode编辑器自带配置
### git message 格式强制规范

- [Git 提交消息规范指南](https://wiki.1ziton.com/流程规范/git-commit-guidelines.html)


## 其他

### 资料参考

- https://reactnative.cn/docs/signed-apk-android/
- 慕课网的这个账号 `developer@1ziton.com/1zitondev123` 有个RN实战的视频教程。需要的时候可以看一下。
- [React Native 错误合集&解决方案 ](https://github.com/giscafer/front-end-manual/issues/19)

### 原生与RN混合开发
[http://www.devio.org/tags/#React Native](http://www.devio.org/tags/#React%20Native)
# npm安装模块
npm安装模块
【npm install xxx】利用 npm 安装xxx模块到当前命令行所在目录；
【npm install -g xxx】利用npm安装全局模块xxx；
本地安装时将模块写入package.json中：
【npm install xxx】安装但不写入package.json；
【npm install xxx –save】 安装并写入package.json的”dependencies”中；
【npm install xxx –save-dev】安装并写入package.json的”devDependencies”中。
npm 删除模块
【npm uninstall xxx】删除xxx模块； 
【npm uninstall -g xxx】删除全局模块xxx；
npm i --save-dev reactotron-react-native
# git提交修改
Type
必须是以下之一：
build: 影响构建系统或外部依赖项的更改（示例范围：gulp，broccoli，npm）
ci: 对CI配置文件和脚本的更改（示例范围：Travis，Circle，BrowserStack，SauceLabs）
docs: 只更改文档
feat: 一项新功能
fix: bug修复
perf: 改进性能的代码更改
refactor:代码更改既不修复错误也不添加功能
style: 不影响代码含义的更改（空格，格式，缺少分号等）
test: 添加缺失测试或更正现有测试
# 解决cli问题
遇到这个问题： import cli, { run } from '@react-native-community/cli';
采用下列方法
rm -rf node_modules
npm install

# 建立静态库时发生错误  
cannot find interface declaration for 'UIView', superclass of 'TestmageView'
解决方法：引入框架  <UIKit/UIKit.h>
## 其他正在完善