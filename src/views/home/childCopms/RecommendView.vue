<template>
  <div class="recommend">
    <div v-for="item in recommend" :key="item.index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name:'RecommendView',
  props:{
    recommend:{
      type:Array,
      default(){
      return []
    }
    }
  }
}
</script>

<style scoped>
  .recommend{
    display: flex;
    text-align: center;
    width: 100%;
    font-size: 14px;
    padding: 10px 0 20px ;
    border-bottom: 10px solid #eee;
  }
  
  .recommend-item{
    flex: 1;
  }

  .recommend-item img{
    width: 65px;
    height: 65px;
    margin-bottom: 10px;
  }
</style>