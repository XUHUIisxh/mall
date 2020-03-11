<template>
  <div class="home">
    <!-- 头部 -->
    <header class="g-header-container">
      <home-header :class="{'header-translate':isHeaderTranslate}" ref="header"></home-header>
    </header>
    <!-- 滚动区 -->
    <me-scroll 
    :data='recommends' 
    pullDown 
    pullUp 
    @pull-down="pullDownRefresh"
    @scroll="scroll"
    @pull-up="pullToLoadMore"
    @scroll-end="scrollEnd"
    @pull-down-transition-end="pullDownTransitionEnd"
    ref="scroll"
    >
      <home-slider/>
      <home-nav></home-nav>
      <home-recommend @loaded='getRecommends' ref="recommend"></home-recommend>
    </me-scroll>
    <!-- 返回顶部 -->
    <div class="g-backtop-container">
      <me-backtop :visible='isBacktopVisible' @backtop="backToTop"></me-backtop>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import MeScroll from 'base/scroll'
import HomeHeader from './header'
import HomeSlider from './slider'
import HomeNav from './nav'
import HomeRecommend from './recommend'
import MeBacktop from 'base/backtop'
import {HEADER_TRANSITION_HEIGHT} from './config'
  export default {
    name:'Home',
    data() {
      return {
        recommends:[],
        isBacktopVisible: false,
        isHeaderTranslate:false
      }
    },
    components:{
      MeScroll,
      HomeHeader,
      HomeSlider,
      HomeNav,
      HomeRecommend,
      MeBacktop
    },
    created() {
      this.getRecommends()
    },
    methods: {
      getRecommends(data){
        this.recommends = data
      },
      pullDownRefresh(end){
        setTimeout(()=>{
          end()
        },1000)
      },
      pullToLoadMore(end){
        this.$refs.recommend.update().then(end).catch(err =>{
          if(err){
            console.log(err)
          } 
          end();
        })
      },
      scroll(translate){
        this.changeHeaderStatus(translate);
      },
      scrollEnd(translate,scroll,pulling){
        if(!pulling){
          this.changeHeaderStatus(translate);
        }
        this.isBacktopVisible = translate < 0 &&  -translate > scroll.height
      },
      pullDownTransitionEnd() {
        this.$refs.header.show();
      },
      backToTop(){
        this.$refs.scroll.scrollToTop()
      },
      changeHeaderStatus(translate){
        if(translate > 0){
          this.$refs.header.hide();
          return;
        }

        this.$refs.header.show();

        this.isHeaderTranslate = -translate > HEADER_TRANSITION_HEIGHT
      }
    },
  }
</script>

<style lang="scss" scoped>
@import '~assets/scss/_mixins.scss';

.home{
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: $bgc-theme;
}

.g-header-container{
  position: absolute;
  left: 0;
  top: 0;
  z-index: $navbar-z-index;
  width: 100%;
}

.g-backtop-container{
  position: absolute;
  z-index: $backtop-z-index;
  right: 10px;
  bottom: 60px;
}
</style>