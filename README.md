# 基于 React + Vite 实现的Chrome插件项目

基于Vite4的Chrome Extension Manifest V3工程脚手架。

本项目架构实现了以下功能：

- 基于Vite 4.x搭建
- 基于Chrome Extension Manifest V3规范
- 集成Sass/Scss/Less/Stylus
- 集成Ant Design 5.x
- 集成mock.js、mockjs-fetch模拟请求
- 集成react-router-dom
- 将popup、content、background目录互相独立，便于团队协作开发维护
- 按照Chrome Extension最终生成目录要求配置Vite
- 封装fetch，满足popup、content script、background script跨域请求
- 实现了完整的Chrome Extension MV3项目Demo。


## 安装项目
执行：
```
npm install
```
或
```
yarn
```

## 使用方法：开发环境

> ※注：为方便演示接口请求，本Demo使用了mock.js，也配置了反向代理。
> mock.js便于直接调试，使用前请修改src/api/index.jsx，将import '@/mock'前的注释去掉，保证mock.js的正确引入。
> 如使用反向代理，需要自行在本地搭建API服务，接口返回数据可参考src/mock.jsx中的数据。

执行：
```
npm run dev
```
或
```
yarn dev
```

## 使用方法：build项目

> ※注：
> 1. 执行build前一定检查是否取消mock.js，即确认src/api/index.jsx中，将import '@/mock'注释掉。这是因为mock.js使用window变量，而运行background script的Service Worker不支持window，将导致插件运行失败。
> 2. 执行build前一定检查src/main.jsx代码中，注释掉import '@/content'。这段代码是用于方便在开发环境调试content script的，否则content script会被集成到popup页面中。

执行：
```
npm run build
```
或
```
yarn build
```


## Chrome Extension的组成

主要由以下部分组成：
1. manifest.json （插件配置文件）
2. popup (点击插件图标弹出的页面)
3. content script (插入到目标页面中执行的js)
4. background script (在Chrome后台Service Workers中运行的程序)

### manifest.json
manifest.json必须放在插件项目根目录，里面包含了插件的各种配置信息，其中也包括了popup、content script、background script等文件的存放路径。

### popup
作为一个独立的弹出页面，有自己的html、css、js，可以按照常规项目来开发。

### content script
content script是注入到目标页面中执行的js脚本，可以获取目标页面的Dom并进行修改。但是，content script的JavaScript与目标页面是互相隔离的。也就是说，content script与目标页面的JavaScript不会出现互相污染的问题，同时，也不能调用对方的方法
注意，以上只是js作用域的隔离，通过content script向目标页面加入的DOM是可以应用目标页面的css，从而造成css互相污染。

### background script
background script 常驻在浏览器后台Service Workers运行，没有实际页面。一般把全局的、需要一直运行的代码放在这里。重要的是，background script的权限非常高，除了可以调用几乎所有Chrome Extension API外，还可以发起跨域请求