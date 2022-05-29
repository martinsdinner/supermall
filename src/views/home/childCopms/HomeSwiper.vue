<template>
  <swiper>
      <swiper-item v-for="item in banner" :key="item.acm">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import  {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name:'HomeSwiper',
  components:{
    Swiper,
    SwiperItem
  },
  props:{
    banner:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      isLoad:false
    }
  },
  methods:{
    imageLoad(){
      // 优化性能，只用知道轮播图的一张图片加载完即可（这样就better-scroll就已经获取到了轮播图的高度了）
      if(!this.isLoad){
        this.$emit('swiperImageLoad')
        this.isLoad=true
      }
    }
  }
}
</script>

<style scoped>

</style>