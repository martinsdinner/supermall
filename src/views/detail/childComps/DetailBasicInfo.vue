<template>
  <div id="basic-info" v-if="Object.keys(goods).length!==0">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="low-price">￥{{goods.lowNowPrice}}</span>
      <span class="old-price">{{goods.oldPrice}}</span>
      <span class="discountDesc">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span v-for="index in goods.services.length-1" :key="index" class="info-service-item">
        <img :src="goods.services[index-1].icon">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name:'DetailBasicInfo',
  props:{
    goods:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
  #basic-info{
    padding: 10px;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-title{
    font-weight: bold;
  }
  .info-price{
    margin-top: 10px;
  }
  .info-price span{
    margin-right: 5px;
  }
  .low-price{
    font-size: 24px;
    color: var(--color-high-text);
  }
  .old-price{
    text-decoration: line-through;
  }
  .discountDesc{
    font-size: 12px;
    border-radius: 8px;
    padding: 2px 5px;
    color: #fff;
    background-color: var(--color-high-text);

    position: relative;
    top: -8px;
  }

  .info-other{
    display: flex;
    margin-top: 15px ;
    line-height: 30px;
    font-size: 13px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    justify-content: space-between;
  }
  .info-service{
    display: flex;
    justify-content: space-between;
    line-height: 60px;
  }
  .info-service-item img{
    width: 14px;
    height: 14px;
    position: relative;
    top: 2px;
  }  
  .info-service-item span{
    font-size: 13px;
    color: #333;
  }
</style>