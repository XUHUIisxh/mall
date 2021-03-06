// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
// 第三方插件
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

// 引入全局样式
import './assets/scss/index.min.css';
// swiper插件库的样式
import 'swiper/dist/css/swiper.css'

fastclick.attach(document.body)

Vue.use(VueLazyload,{
  preLoad: 1,
  error: require('assets/img/error.png'),
  loading: require('assets/img/loading.gif'),
  attempt: 1
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
