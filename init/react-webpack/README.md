## 项目介绍 

> 基础项目搭建结构  
> 包含各种组件完成项目对基础功能


## 技术栈
[![Webpack](https://img.shields.io/badge/Webpack-v5.88.2-brightgreen.svg)](https://webpack.js.org/)
[![React](https://img.shields.io/badge/React-v18.2.0-brightgreen.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScrpt-v5.1.6-brightgreen.svg)](https://www.typescriptlang.org/)


### 目录结构

```tree
.
├── config                    # 配置文件
│   ├── env.js                # 环境配置
│   ├── jest                  # jest 
├── public                    # 静态文件目录
│   ├── index.html            # 页面静态文件
├── src                       # 源码目录
│   ├── __tests__             # 测试文件目录
│   ├── api                   # 调用接口(Service 层调用 Backend) 【 Service 】
│   │   ├── user              # 用户信息 API 调用 
│   │   │   ├── index.ts             
│   │   │   ├── types.ts      # 类型检查(用户相关的数据类型检查)          
│   ├── assets                # 静态资源(图片、字体)           
│   ├── components            # 通用组件 【 View + ViewModel 】      
│   │   ├── Layout              # 通用组件Layout
│   │   │   ├── index.ts      # 组件代码  
│   │   │   ├── constants       # 组件样式
│   ├── constants             # 常量        
│   │   ├── api.ts            # 接口地址常量            
│   │   ├── path.ts           # 页面地址常量       
│   │   ├── storage.ts        # 存储Key常量       
│   ├── hooks                 # 全局hooks
│   ├── pages                 # 页面目录【 View + ViewModel 】
│   │   ├── login              # demo 页面
│   │   │   ├── components    # 页面组件    
│   │   │   ├── index.ts      # 页面入口 
│   │   │   ├── propsType.ts     
│   │   │   ├── styled.ts  
│   ├── store                 # 状态管理目录【 Model 】
│   ├── styles                # 样式目录
│   │   ├── reset            # 样式处理函数目录
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
