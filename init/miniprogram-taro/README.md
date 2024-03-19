## 项目介绍

> 基础脚手架   
> 包含了(基础目录结构+环境+构建脚本+cicd脚本+基础模块)

## 技术栈

[![Taro](https://badgen.net/badge/Taro/v3.02/green)](https://docs.taro.zone/docs/)
[![React](https://img.shields.io/badge/React-v18.2.0-brightgreen.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScrpt-v5.1.6-brightgreen.svg)](https://www.typescriptlang.org/)
[![Zustand](https://badgen.net/badge/Zustand/v4.4.1/green)](https://github.com/pmndrs/zustand/)
[![sass](https://badgen.net/badge/sass/v3.02/green)](https://www.sass.hk/)

### 目录结构

```tree
.
├── .husky                    # git hooks 操作 配置
├── __test__                  # 端对端测试脚本
│   ├── config                # 环境配置
│   │   ├── env
│   │   │   ├── .env              
│   │   │   ├── .env.dev          
│   │   │   ├── .env.prod          
│   │   │   ├── .env.uat    
│   │   ├── helper      
│   ├── script                # 构建脚本
│   │   ├── ci.js             # 小程序构建上传
├── src                       # 源码目录
│   ├── __tests__             # 测试文件目录
│   ├── api                   # 调用接口(Service 层调用 Backend) 【 Service 】
│   │   ├── user              # 用户信息 API 调用 
│   │   │   ├── index.ts             
│   │   │   ├── types.ts      # 类型检查(用户相关的数据类型检查)          
│   ├── assets                # 静态资源(图片、字体)           
│   ├── components            # 通用组件 【 View + ViewModel 】      
│   │   ├── Layout            # 通用组件Layout
│   │   │   ├── index.tsx     # 组件代码  
│   │   │   ├── styled.ts     # 组件样式
│   ├── constants             # 常量        
│   │   ├── api.ts            # 接口地址常量            
│   │   ├── path.ts           # 页面地址常量       
│   │   ├── storage.ts        # 存储Key常量       
│   ├── hooks                 # 全局hooks
│   ├── pages                 # 页面目录【 View + ViewModel 】
│   │   ├── login             # demo 页面
│   │   │   ├── components    # 页面组件    
│   │   │   ├── index.tsx     # 页面入口 
│   │   │   ├── propsType.ts     
│   │   │   ├── styled.ts  
│   ├── store                 # 状态管理目录【 Model 】
│   ├── styles                # 样式目录
│   │   ├── reset             # 样式处理函数目录
│   ├── types                 # 通用ts类型定义
│   ├── utils                 # 工具类
│   │   ├── libs              # 三方通用库，不以node_module 引入
│   │   └── message           # message 提示工具
│   ├── mian.ts               # 入口文件
│   └── router.ts             # 路由配置
├── global.d.ts               # 全局ts类型
├── tsconfig.json
├── package.json
└── yarn.lock
```

### 命令

##### yarn 安装

```shell
corepack enable
corepack prepare yarn@stable --activate
yarn set version stable
```

##### 安装依赖

```shell
yarn install
```

##### 启动项目

```shell
yarn run dev
```

##### 构建项目

```shell
yarn run build:dev
```

### 代码规范

##### 分支管理

##### 开发/发布流程



