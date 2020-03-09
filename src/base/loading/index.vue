<template>
  <div class="mine-loading" :class="{'mine-loading-inline': inline}">
    <span class="mine-loading-indicator">
      <slot><img src="./loading.gif" alt="loading"></slot>
    </span>
    <span class="mine-loading-text">{{loadingText}}</span>
  </div>
</template>

<script>
  export default {
    name:'MeLoading',
    data() {
      return {
        loadingText: this.text
      }
    },
    props:{
      indicator:{
        type:String,
        default:'on',
        validator(value){
          return ['on','off'].indexOf(value) > -1;
        }
      },
      text:{
        type:String,
        default:'正在加载中...'
      },
      inline:{
        type:Boolean,
        default:false
      }
    },
    // 监听传值的修改
    watch: {
      text(text){
        this.loadingText = text
      }
    },
    methods: {
      // 接受scroll父组件中的值
      setText(text){
        this.loadingText = text
      }
    },
  }
</script>

<style lang="scss" scoped>
@import '~assets/scss/_mixins.scss';

.mine-loading{
  overflow: hidden;
  width: 100%;
  height: 100%;
  @include flex-center(column);
}
.mine-loading-inline{
  flex-direction: row;

  .mine-loading-indicator ~ .mine-loading-text{
    margin-top: 0;
    margin-left: 6px;
  }
}
.mine-loading-indicator ~ .mine-loading-text{
  margin-top: 6px;
} 
</style>