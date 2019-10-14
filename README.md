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

## 其他正在完善