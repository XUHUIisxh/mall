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
- vue-awesome-swiper 动态加载数据滚动条的问题以及解决方法
  recommend组件中 获取数据之后通过$emit将数据暴露给 home/index ，定义空数据接受传参，在方法池中接收赋值传来的参数，在 me-scroll 组件绑定数组，进入 me-scroll 接收数组，定义方法，当接受的数组长度不等于零的时候调用swiper API中更新数据的方法 解决动态加载数据滚动条失效问题