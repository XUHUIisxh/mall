# 实现购物商城

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


- 有关node-sass以及sass-loader的解决办法（仅为此项目）
  
  安装node-sass出现‘ERROR in Cannot find module 'node-sass'’表示找不到node-sass模块导致，是因为cnpm安装导致的丢包，换成npm即可，或者输入 cnpm install node-sass@latest
  sass-loader 会出现版本不兼容问题，此项目安装的为 sass-loader@7.3.1版本

- 安装es6语法转换器 babel-polyfill
- 安装fastclick 解决移动端300毫秒延迟
- vue-awesome-swiper 动态加载数据出现的问题以及解决方法
