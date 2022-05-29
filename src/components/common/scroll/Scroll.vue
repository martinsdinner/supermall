<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name:'Srcoll',
  data(){
    return{
      scroll:null
    }
  },
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  mounted(){
    // 1.创建BScroll对象
    this.scroll=new BScroll(this.$refs.wrapper, {
      /* 是否计算滚动的位置 有 0 1 2 3 默认0，
          1手指按在滚动区域。每300毫秒算一次位置
          2手指按在滚动区域，一直计算位置
          3一直计算位置，手指离开后的惯性滚动也计算 */ 
      probeType: this.probeType,
      // 是否上拉加载
      pullUpLoad: this.pullUpLoad,
      click:true
    })

    // 2.监听滚动的位置
    this.scroll.on('scroll',(position)=>{
      this.$emit('scrollPosition',position)
    })

    // 3.监听滚动到底部
    if(this.pullUpLoad){
      this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
      })
    } 

    // 重新计算better-scroll
    // 解决无法滚动问题，原因是betterscroll计算的content的高度可能不包含图片的高度
    // 图片还没刷新，等图片刷新后，betterscroll不会重新计算content的高度
    // 所以出现了无法滚动的BUG
    this.scroll.refresh()
  },
  methods:{
    // 滚动到指定的位置
    scrollTo(x,y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    refresh(){
      this.scroll && this.scroll.refresh()
      // console.log('333333');
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    }
  }
}
</script>

<style scoped>

</style>