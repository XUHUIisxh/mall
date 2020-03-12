<template>
  <me-scroll :scrollbar="false">
    <ul class="tab">
      <li 
        class="tab-item"
        :class="{'tab-item-active': item.id === curId}"
        v-for="(item,index) in items" 
        :key="index"
        @click="switchTab(item.id)"
        >
        {{ item.name }}
      </li>
    </ul>
  </me-scroll>
</template>

<script>
  import MeScroll from 'base/scroll';
  import { categoryNames } from './config'
  

  export default {
    name: 'CategoryTab',
    data() {
      return {
        items:[],
        curId:''
      }
    },
    components: {
      MeScroll
    },
    created () {
      this.init();
      // 初始化点击第一个
      this.switchTab(this.items[0].id)
    },
    methods: {
      init(){
        this.items = categoryNames
      },
      switchTab(id){
        if(this.curId === id){
          return;
        }
        this.curId = id;
        this.$emit('switch-tab',id)
      }
    },
  };
</script>

<style lang="scss" scoped>
@import '~assets/scss/_mixins.scss';

  $tab-item-height: 46px;

 .tab{
   width: 100%;

   &-item{
    height: $tab-item-height;     
    line-height: $tab-item-height;
    text-align: center;
    background-color: #fff;
    color: #080808;
    font-size: $font-size-l;
    font-weight: bold;
    border-right: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    @include ellipsis();
   }
   &:last-child{
     border-bottom: none;
   }

   &-item-active{
     background: none;
     border-right: none;
     color: #f23030;
   }
 }
</style>
