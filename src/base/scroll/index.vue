<template>
  <swiper :options="swiperOption" ref="swiper">
    <!-- 下拉刷新组件 -->
    <div class="mine-scroll-pull-down" v-if="pullDown" >
      <me-loading :text='pullDownText' inline ref="pullDownLoading"></me-loading>
    </div>
    <!-- 幻灯片 -->
    <swiper-slide>
      <slot></slot>
    </swiper-slide>
    <!-- 按钮 -->
    <div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
  </swiper>
</template>

<script>
import {swiper,swiperSlide} from 'vue-awesome-swiper'
import MeLoading from 'base/loading/'
import {
      PULL_DOWN_HEIGHT,
      PULL_DOWN_TEXT_INIT,
      PULL_DOWN_TEXT_START,
      PULL_DOWN_TEXT_ING,
      PULL_DOWN_TEXT_END,
      PULL_UP_HEIGHT,
      PULL_UP_TEXT_INIT,
      PULL_UP_TEXT_START,
      PULL_UP_TEXT_ING,
      PULL_UP_TEXT_END
    } from './config'

  export default {
    name:'MeScroll',
    data() {
      return {
        pullDownText:PULL_DOWN_TEXT_INIT,//初始提示语
        swiperOption:{
          direction: 'vertical',
          slidesPerView: 'auto',
          freeMode: true,
          setWrapperSize: true,
          scrollbar: {
            el: this.scrollbar ? '.swiper-scrollbar' : null,
            hide: true
          },
          // 添加绑定事件
          on:{
            sliderMove:this.scroll
          }
        }
      }
    },
    props:{
      scrollbar:{
        type:Boolean,
        default:true
      },
      data:{
        type:[Array,Object]
      },
      // home传值 是否需要下拉
      pullDown:{
        type:Boolean,
        default:false
      },
    },
    components:{
      swiper,
      swiperSlide,
      MeLoading
    },
    watch: {
      data:'updata'
    },
    methods: {
      // 解决swiper_scroll初始化 计算高度问题
      updata(){
        this.$refs.swiper && this.$refs.swiper.swiper.update()
      },

      scroll(){
        // 获取swiper对象
        const swiper = this.$refs.swiper.swiper

        // 数值大于0 为下拉状态
        if( swiper.translate > 0){
          // 如果没有传入pullDown 取消动作
          if(!this.pullDown){
            return;
          }

          if( swiper.translate > PULL_DOWN_HEIGHT){
            // 通过$refs 获取子组件 loading 中方法池中setText（）方法
            this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_START)
          }else{
            this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_INIT)
          }
        }

      }
    },
  }
</script>

<style lang="scss" scoped>
.swiper-container{
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.swiper-slide{
  height: auto;
}
.mine-scroll-pull-down{
  position: absolute;
  left: 0;
  bottom: 100%;
  width: 100%;
  height: 80px;
}
</style>
