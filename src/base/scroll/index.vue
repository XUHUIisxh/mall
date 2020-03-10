<template>
  <swiper :options="swiperOption" ref="swiper">
    <!-- 下拉刷新组件 -->
    <div class="mine-scroll-pull-down" v-if="pullDown">
      <me-loading :text="pullDownText" inline ref="pullDownLoading"></me-loading>
    </div>
    <!-- 幻灯片 -->
    <swiper-slide>
      <slot></slot>
    </swiper-slide>
    <!-- 上拉组件 -->
    <div class="mine-scroll-pull-up" v-if="pullUp">
      <me-loading inline ref="pullUpLoading"></me-loading>
    </div>
    <!-- 按钮 -->
    <div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import MeLoading from "base/loading/";
import {
  // 下拉文字
  PULL_DOWN_HEIGHT,
  PULL_DOWN_TEXT_INIT,
  PULL_DOWN_TEXT_START,
  PULL_DOWN_TEXT_ING,
  PULL_DOWN_TEXT_END,
  // 上拉文字
  PULL_UP_HEIGHT,
  PULL_UP_TEXT_INIT,
  PULL_UP_TEXT_START,
  PULL_UP_TEXT_ING,
  PULL_UP_TEXT_END
} from "./config";

export default {
  name: "MeScroll",
  
  props: {
    scrollbar: {
      type: Boolean,
      default: true
    },
    data: {
      type: [Array, Object]
    },
    // home传值 是否需要下拉
    pullDown: {
      type: Boolean,
      default: false
    },
    // home传值 是否需要上拉
    pullUp: {
      type: Boolean,
      default: false
    }
  },

  components: {
    swiper,
    swiperSlide,
    MeLoading
  },

  watch: {
    data: "updata"
  },

  created () {
    this.init();
  },

  methods: {
    // 解决swiper_scroll初始化 计算高度问题
    updata() {
      this.$refs.swiper && this.$refs.swiper.swiper.update();
    },
    // 返回最顶部
    scrollToTop(speed, runCallbacks) {
      this.$refs.swiper && this.$refs.swiper.swiper.slideTo(0, speed, runCallbacks);
    },

    
    init(){
      this.pulling=false,
      this.pullDownText= PULL_DOWN_TEXT_INIT, //下拉初始提示语
      this.pullUpText= PULL_UP_TEXT_INIT, //上拉初始提示语
      this.swiperOption = {
        direction: "vertical",
        slidesPerView: "auto",
        freeMode: true,
        setWrapperSize: true,
        scrollbar: {
          el: this.scrollbar ? ".swiper-scrollbar" : null,
          hide: true
        },
        // 添加绑定事件
        on: {
          sliderMove: this.scroll,
          touchEnd: this.touchEnd,
          transitionEnd: this.scrollEnd // 向上滑动时监听scrollEnd
        }
      }
    },
    // 判断松手刷新临界点
    scroll() {
      // 获取swiper对象
      const swiper = this.$refs.swiper.swiper;

      this.$emit('scroll', swiper.translate, this.$refs.swiper.swiper);

      if(this.pulling){
        return;
      }

      if (swiper.translate > 0) { //下拉
        
        // 如果没有传入pullDown 取消动作
        if (!this.pullDown) {
          return;
        }

        if (swiper.translate > PULL_DOWN_HEIGHT) {
          // 通过$refs 获取子组件 loading 中方法池中setText（）方法
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_START);
        } else {
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_INIT);
        }
      } else if (swiper.isEnd) { //上拉
        
        if (!this.pullUp) {
          return;
        }

        // 判断高度
        const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > parseInt(swiper.$wrapperEl.css("height"));

        if (isPullUp) {
          this.$refs.pullUpLoading.setText(PULL_UP_TEXT_START);
        } else {
          this.$refs.pullUpLoading.setText(PULL_UP_TEXT_INIT);
        }
      }
    },
    scrollEnd(){
      const swiper = this.$refs.swiper.swiper;
      this.$emit('scroll-end', swiper.translate, swiper, this.pulling);
    },
    //松手刷新 
    touchEnd(){
      const swiper = this.$refs.swiper.swiper;

      if(this.pulling){
        return;
      }

      if(swiper.translate > PULL_DOWN_HEIGHT){

        if(!this.pullDown){
          return;
        }
        this.pulling = true;
        swiper.allowTouchMove = false;// 禁止触摸
        swiper.setTransition(swiper.params.speed);
        swiper.setTranslate(PULL_DOWN_HEIGHT);
        swiper.params.virtualTranslate = true;// 定住不给回弹
        this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_ING);
        this.$emit('pull-down', this.pullDownEnd);// 触发一个事件
      }else if(swiper.isEnd){ //底部
        const totalHeight = parseInt(swiper.$wrapperEl.css('height'));
        const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > totalHeight;

        if (isPullUp) { // 上拉
          if (!this.pullUp) {
            return;
          }
          this.pulling = true;
          swiper.allowTouchMove = false; // 禁止触摸
          swiper.setTransition(swiper.params.speed);
          swiper.setTranslate(-(totalHeight + PULL_UP_HEIGHT - swiper.height));
          swiper.params.virtualTranslate = true; // 定住不给回弹
          this.$refs.pullUpLoading.setText(PULL_UP_TEXT_ING);
          this.$emit('pull-up', this.pullUpEnd);
        }

      }

    },
    pullDownEnd() {
      const swiper = this.$refs.swiper.swiper;

      this.pulling = false;
      this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_END);
      swiper.params.virtualTranslate = false;
      swiper.allowTouchMove = true;
      swiper.setTransition(swiper.params.speed);
      swiper.setTranslate(0);
      setTimeout(() => {
        this.$emit('pull-down-transition-end');
      }, swiper.params.speed);
    },
    pullUpEnd(){
      const swiper = this.$refs.swiper.swiper;
      this.pulling = false;
      this.$refs.pullUpLoading.setText(PULL_UP_TEXT_END);
      swiper.params.virtualTranslate = false;
      swiper.allowTouchMove = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.swiper-container {
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding-bottom: 50px;
}

.swiper-slide {
  height: auto;
}
.mine-scroll-pull-up,
.mine-scroll-pull-down {
  position: absolute;
  left: 0;
  width: 100%;
}
.mine-scroll-pull-down {
  bottom: 100%;
  height: 80px;
}

.mine-scroll-pull-up {
  top: 100%;
  height: 30px;
}
</style>
