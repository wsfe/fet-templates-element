# fet-iview-temp

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# 在localhost:8080启动本地调试
npm run serve

# 打包成开发机环境的代码
npm run pack

# 为不同开发机环境打包代码
npm run pack --server=开发机名称（在fet.config.json中的servers里面配置，详细见下面）

# 发布到对应的开发机
- 可以直接在命令行运行 `npm run pack --server=serverName && fet sync serverName`
- 也可以在package.json里面配置scripts`npm run pack --server=serverName && fet sync serverName`，然后运行该命令，建议用第二种方式

# 打包线上代码
npm run build

# 打包线上代码并生成分析报告
npm run build:report

# run unit tests
npm run test:unit
```

# servers配置说明
```json
{
  "servers": {
    "serverName": { // 服务器名称
      "host": "1.1.1.1", // sync到远程的服务器ip
      "domain": "//static.example.com", // 服务器对应的域名
      "port": 22, // 服务器的ssh端口
      "local": "./", // sync那个目录下面的文件，默认是当前目录下面
      "path": "/usr/local/share/fet-iview-temp", // sync到服务器的那个地址
      "sudo": false, // 是否开启sudo权限
      "user": "sshName", // 登录服务器的ssh账号，默认获取电脑名称。
      "include": ["dev"] // 需要传到服务器的文件
    }
  }
}
```

# 目录说明
```javascript
├── .browserslistrc           // 浏览器兼容范围
├── .editorconfig             // 通用编辑器配置
├── .env.joint                // 联调环境的变量设置
├── .eslintignore             // 忽略eslint检查的文件配置
├── .eslintrc.js              // eslint配置
├── .gitignore                // git不追踪管理的文件配置
├── README.md                 // 项目说明
├── babel.config.js           // babel配置
├── config                    // 构建配置
│   ├── index.js
│   ├── vue.config.dev.js     // 本地开发环境配置
│   ├── vue.config.joint.js   // 联调环境配置
│   ├── vue.config.prd.js     // 生产环境配置
│   └── vue.config.test.js    // 单元测试环境配置
├── fet.config.js             // 打包环境配置
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js         // postcss配置
├── src                       // 业务源码
│   ├── App.vue               // 根实例App
│   ├── assets                // 存放需编译的静态资源目录, 如:图片, svg, font, 视频, 音频等
│   │   └── logo.png
│   ├── components            // 公共组件
│   │   └── grid              // 组件由文件夹包裹, index导出
│   │       ├── Grid.vue
│   │       ├── index.js
│   │       └── store.js
│   ├── config                // 存放插件的功能配置
│   │   ├── index.js          // 插件功能配置
│   │   └── interceptors      // 存放插件拦截器, 由index导出
│   │       ├── axios.js      // axios拦截器
│   │       ├── index.js      // index导出
│   │       └── router.js     // 路由拦截器
│   ├── directives            // 存放指令
│   │   ├── highlight.js      // 具体指令文件
│   │   └── index.js          // 将需要全局注册的指令导入到index
│   ├── filters               // 存放过滤器
│   │   ├── daterange.js      // 具体过滤器文件
│   │   └── index.js          // 将需要全局注册的过滤器导入到index
│   ├── main.js               // 入口文件, 程序的入口
│   ├── mixins                // 存放混入
│   │   └── modal.js          // 具体混入文件
│   ├── mock                  // 存放本地mock配置
│   │   └── index.js          // 由index导出
│   ├── modules                             // 存放页面, 层级根据项目菜单划分
│   │   └── moduleA                         // 一级目录
│   │       └── pageA                       // 页面A
│   │           ├── children                // 拆分的子页面,
│   │           │   ├── a.vue               // 子页面a
│   │           │   └── b.vue               // 子页面b
│   │           ├── components              // 页面内拆分的组件
│   │           │   ├── button.vue          // button组件
│   │           │   └── list.vue            // list组件
│   │           ├── index.vue               // 页面入口文件
│   │           └── store                   // 页面需要store管理时, 动态注册的store配置
│   │               ├── actions.js          // action配置
│   │               ├── childrenAModule.js  // 子页面A的store配置
│   │               ├── childrenBModule.js  // 子页面B的store配置
│   │               └── index               // index导出
│   ├── plugins               // 存放插件
│   │   ├── api.js            // 整合config和service配置生成$api对象, 每个key对应一个接口请求函数
│   │   ├── axios.js          // 利用config配置将axios实例化为$axios, 用于网络请求
│   │   ├── const.js          // 整合config和service配置生成$const, 每个key对应一个常量配置
│   │   ├── inject.js         // 将需要挂载到vue实例上的插件导入
│   │   ├── router.js         // 整合config和route的配置实例化路由
│   │   └── store.js          // 整合config和service配置实例化store
│   ├── routes                // 存放路由配置
│   │   └── index.js          // index导出
│   ├── service               // 存放插件业务配置
│   │   ├── api               // api配置
│   │   │   ├── common.js     // 分类为common的api
│   │   │   └── index.js      // index导出
│   │   ├── const             // 常量配置
│   │   │   ├── app.js        // 分类为app的常量
│   │   │   └── index.js      // index导出
│   │   └── store                 // 全局store配置
│   │       └── common            // 根级的store配置
│   │           ├── actions.js    // action
│   │           ├── getters.js    // getters
│   │           ├── index.js      // index导出
│   │           └── mutations.js  // state和mutations
│   ├── styles                 // 存放样式
│   │   ├── base.less          // 基础样式, 对基础标签的重置
│   │   ├── mixins             // 存放样式函数, 将某个功能变成一个函数, 可以混入到每个class中使用
│   │   │   ├── center-block.less
│   │   │   ├── clearfix.less
│   │   │   ├── icon-arrow.less
│   │   │   ├── list-none-type.less
│   │   │   ├── text-break.less
│   │   │   ├── text-hide.less
│   │   │   └── text-overflow.less
│   │   ├── mixins.less        // 导出所有样式函数
│   │   ├── utilities.less     // 工具类的class, 一些简单的样式class, 如: 边距/浮动/字体颜色
│   │   ├── variables.less     // 变量
│   │   └── vuetemplate.less   // 样式入口, 将所有样式集中到这个文件中导出
│   └── utils                  // 工具库
│       ├── index.js           // index导出
│       └── uuid.js            // 具体某个工具函数, 生成唯一的id值
├── static                     // 不需要经过编译的资源, 会直接copy到生成的文件夹的static中
│   └── .gitkeep               // 占位, 使git识别这个空文件夹
├── tests                      // 存放测试相关的东西
│   └── unit                   // 单元测试
│       ├── .eslintrc.js       // eslint配置
│       ├── index.js           // 入口文件
│       └── specs              // 测试用例
│           └── example.spec.js// 某个测试用例
└── vue.config.js              // vue-cli3的配置
````
