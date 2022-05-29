<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailnav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scrollPosition="scrollPosition">
      <detail-swiper :top-images="topImages"/>
      <detail-basic-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="btnClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBasicInfo from './childComps/DetailBasicInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll.vue'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'

import {itemImgListenerMixin,backTopMixin} from 'common/mixin.js'
import {debounce} from 'common/utils.js'

export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    Goods,
    DetailBasicInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    Scroll,
    DetailBottomBar,
  },
  mixins:[itemImgListenerMixin,backTopMixin],
  data(){
    return{
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      itemImgListener:null,
      themeTopYs:[],
      getThemeTopY:null,
      currentIndex:0,
      positionY:null,
    }
  },
  created(){
    // 1.保存存入的iid
    this.iid=this.$route.params.iid

    // 2.根据iid请求详情数据 
    getDetail(this.iid).then(res=>{
      // 1.获取顶部轮播图的数据
      // console.log(res);
      const data=res.result
      this.topImages=data.itemInfo.topImages

      // 3.获取商品信息
      // 通过一个类把复杂数据整合到一起
      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      // 4.获取店铺信息
      this.shop=new Shop(data.shopInfo)

      // 5.获取图片信息
      this.detailInfo = data.detailInfo;

      // 6.获取商品参数的信息
      this.paramInfo=new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 7.获取评论的信息
      if(data.rate.cRate!==0){
        this.commentInfo=data.rate.list[0]
      }
    })

    // 3.请求推荐数据
    getRecommend().then(res=>{
      this.recommends=res.data.list
    })

    this.getThemeTopY=debounce(()=>{
        this.themeTopYs=[]
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)

        // console.log(this.themeTopYs);
      },300)
  },
  methods:{ 
    imageLoad(){
      this.refresh()
      this.getThemeTopY()
    },
    titleClick(index){
      // console.log(index);
      // scrollTo第一个参数是x轴，第二个参数是y轴
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },
    scrollPosition(position){
      this.positionY=-position.y

      let length=this.themeTopYs.length
      for(let i=0;i<length-1;i++){
        if(this.currentIndex !== i && (this.positionY>=this.themeTopYs[i] && this.positionY<this.themeTopYs[i+1])){
          this.currentIndex=i
          console.log(this.currentIndex);
          this.$refs.detailnav.currentIndex=this.currentIndex
        } 
      }
      // console.log(this.positionY);

      // 是否显示回到顶部
      // 判断BackTop是否显示
      this.isShowBackTop = -position.y>1000
    },
    btnClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    addToCart(){
      // 1.获取购物车需要展示的信息
      const product={}
      product.image=this.topImages[0]
      product.title=this.goods.title
      product.desc=this.goods.desc
      product.price=this.goods.lowNowPrice
      product.iid=this.iid

      // 2.将商品添加到购物车里
      // mutations的发送方式
      // this.$store.commit('addCart',product)
      // mutations的发送方式
      this.$store.dispatch('addCart',product)

    }
  },
  mounted(){
    
  },
  destroyed(){
    // 离开detail页面后不对img的加载进行刷新
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  }
}
</script>

<style scoped>
  #detail{
    height: 100vh;
    /* background: #fff;
    position: relative;
    z-index: 9; */
  }
  .detail-nav{
    background:  #fff;
    position: relative;
    z-index: 9;
  }
  .content{
    height: calc(100% - 44px - 49px);
  }
</style>