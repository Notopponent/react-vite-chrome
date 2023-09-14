# 基于 React + Vite 实现的Chrome插件项目

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## 1.基本目录结构 
> 按照Chrome Extension官方开发文档以及manifest.json的要求，按以下结构build最终的目录
```yml 
├─ /assets             <--popup的静态资源目录
|  ├─ index-xxxx.css   <--popup的样式文件
|  ├─ index-xxxx.js    <--popup script
|  └─ xxxx.png         <--popup的图片等文件（示例）
├─ /images             <--公共图片资源目录
|  └─ app.png          <--插件的图标文件
├─ background.js       <--background script
├─ content.js          <--content script
├─ content.css         <--content script的css文件
├─ favicon.ico         <--这个没有也行，用不到
├─ index.html          <--popup入口页面
├─ insert.js           <--插入到目标页面执行的js（非必须，视业务需求而定）
└─ manifest.json       <--插件的配置文件
```

## 2.Chrome Extension的组成

主要由以下部分组成：
1. manifest.json （插件配置文件）
2. popup (点击插件图标弹出的页面)
3. content script (插入到目标页面中执行的js)
4. background script (在Chrome后台Service Workers中运行的程序)

### 2.1 manifest.json
manifest.json必须放在插件项目根目录，里面包含了插件的各种配置信息，其中也包括了popup、content script、background script等文件的存放路径。

### 2.2 popup
作为一个独立的弹出页面，有自己的html、css、js，可以按照常规项目来开发。

### 2.3 content script
content script是注入到目标页面中执行的js脚本，可以获取目标页面的Dom并进行修改。但是，content script的JavaScript与目标页面是互相隔离的。也就是说，content script与目标页面的JavaScript不会出现互相污染的问题，同时，也不能调用对方的方法
注意，以上只是js作用域的隔离，通过content script向目标页面加入的DOM是可以应用目标页面的css，从而造成css互相污染。

### 2.4 background script
background script 常驻在浏览器后台Service Workers运行，没有实际页面。一般把全局的、需要一直运行的代码放在这里。重要的是，background script的权限非常高，除了可以调用几乎所有Chrome Extension API外，还可以发起跨域请求