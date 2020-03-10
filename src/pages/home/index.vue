<template>
  <div class="home">
    <!-- 头部 -->
    <header class="g-header-container">
      <home-header></home-header>
    </header>
    <!-- 滚动区 -->
    <me-scroll 
    :data='recommends' 
    pullDown 
    pullUp 
    @pull-down="pullDownRefresh"
    @pull-up="pullToLoadMore"
    >
      <home-slider/>
      <home-nav></home-nav>
      <home-recommend @loaded='getRecommends' ref="recommend"></home-recommend>
    </me-scroll>
    <!-- 返回顶部 -->
    <div class="g-backtop-container">
      <me-backtop :visible='isBacktopVisible'></me-backtop>
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
  export default {
    name:'Home',
    data() {
      return {
        recommends:[],
        isBacktopVisible: false,
      }
    },
    created() {
      setTimeout(() =>{
          this.isBacktopVisible = true;
        },1000);
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

</style>