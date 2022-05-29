<template>
  <div v-if="Object.keys(commentInfo).length!==0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="" >
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs">
        <img :src="item" v-for="item in commentInfo.images" :key="item" >
      </div>
    </div>
  </div>
</template>

<script>
// import {formateDate} from 'common/utils.js'
const moment = require('moment');

export default {
  name:"DetailCommentInfo",
  props:{
    commentInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  filters:{
    showDate(value){
      const a=value*1000
      return moment(a).format('YYYY-MM-DD h:mm:ss')
    }
  }
}
</script>

<style scoped>
.comment-info{
  padding: 5px 12px ;
  color: #333;
  border-bottom: 5px solid #f2f5f8;
}
.info-header{
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgba(0,0,0,.1); 
  display: flex; 
  justify-content: space-between;
}
.header-title{
  font-size: 18px;
  font-weight: 500;
}
.header-more{
  font-weight: 550;
}
.info-user{
  padding: 10px 0;
  display: flex;
  align-items: center;
}
.info-user img{
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
}
.info-user span{
  font-size: 20px;
  font-weight: 500;
}
.info-detail{
  padding: 5px;
}
.info-detail p{
  font-size: 16px;
}
.info-other{
  font-size: 14px;
  color: rgb(94, 92, 92);
  margin: 8px 0 8px;
}
.date{
  margin-right: 20px;
}
.info-imgs img{
  width: 80px;
  height: 80px;
  margin-right: 8px;
}
</style>