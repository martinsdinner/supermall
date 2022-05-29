<template>
   <div class="tab-bar-item" @click="itemClick">
    <div v-if="isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name:'TabBarItem',
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path)==-1
    },
    activeStyle(){
      return this.isActive ? {} : {color:this.activeColor}
    }
  },
  data(){
    return{
      // isActive:true
    }
  },
  methods:{
    itemClick(){
      // 这里的if判断是解决浏览器报错(重复跳转相同页面的错误)
      if(this.$route.path!==this.path){
        this.$router.replace(this.path)
      }
    }
  }
}
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height:24px;
    vertical-align: middle;
    margin-top: 3px;
    margin-bottom: 2px;
  }
</style>