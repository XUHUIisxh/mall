<template>
<!-- options传参 -->
  <swiper :options="swiperOption" >
    <slot></slot>
    <div class="swiper-pagination" v-if="pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import {swiper} from 'vue-awesome-swiper'
  export default {
    name:'MeSlider',
    data() {
      return {
        // swiperOption:{
        //   direction: 'horizontal', // horizontal:水平 vertical:垂直
        //   loop: true, // 是否无缝滚动
        //   interval: 0, // 自动播放时间间隔，为0则不自动播放
        //   pagination: true, // 是否需要分页器
        // },
        swiperOption :{
          watchOverflow: true,
          direction: this.direction,
          autoplay: this.interval ? {
            delay: this.interval,
            disableOnInteraction: false
          } : false,
          slidesPerView: 1,
          loop: this.loop,
          pagination: {
            el: this.pagination ? '.swiper-pagination' : null
          }
        },
      }
    },
    props:{
      // 滑动方向 horizontal横向（默认）,vertical竖向
      direction:{
        type:String,
        default:'horizontal',
        validator(value){
          return [
            'horizontal',
            'vertical'
          ].indexOf(value) > -1
        }
      },
      // 轮播速度
      interval:{
        type:Number,
        default: 3000,
        validator(value){
          return value >= 0;
        }
      },
      // 是否循环播放
      loop:{
        type:Boolean,
        default:false
      },
      // 是否需要分页器
      pagination:{
        type:Boolean,
        default:true
      }
    },
    mounted(){
      // console.log(this.swiperOption)
    },
    components:{
      swiper,
    },
  }
</script>

<style lang="scss" scoped>
.swiper-container{
  width: 100%;
  height: 100%;
}
</style>