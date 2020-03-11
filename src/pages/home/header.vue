<template>
  
  <me-navbar class="header" v-show="visable">
    <i class="iconfont icon-scan" slot="left"></i>
    <div slot="center">搜索框</div>
    <i class="iconfont icon-msg" slot="right"></i>
  </me-navbar>
  
</template>

<script>
import MeNavbar from 'base/navbar'
  export default {
    name:'HomeHeader',
    data() {
      return {
        visable:true
      }
    },
    components:{
      MeNavbar
    },
    methods:{
      show(){
        this.visable = true
        // console.log(this.visable)
      },
      hide(){
        this.visable = false
        // console.log(this.visable)
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '~assets/scss/_mixins.scss';
  .header {
    &.mine-navbar {
      /*background-color: $header-bgc-translucent; */
      background-color: transparent;
      transition: background-color 0.5s;
    }

    &.header-transition {
      background-color: $header-bgc-translucent;
    }

    .iconfont {
      color:$icon-color-default;
      font-size: $icon-font-size;
    }
  }
</style>