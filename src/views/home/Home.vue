<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']"
      @tabClick="tabClick" 
      class="tab-control"
      ref="tabControl1"
      v-show="isTabFixed"/>
    <scroll class="content" ref="scroll" 
      :probe-type="3" @scrollPosition="scrollPosition"
      :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banner="banner" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommend="recommend"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"
        @tabClick="tabClick"
        ref="tabControl2"/>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="btnClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'

import HomeSwiper from './childCopms/HomeSwiper.vue'
import RecommendView from './childCopms/RecommendView.vue'
import FeatureView from './childCopms/FeatureView.vue'

import {getHomeMultidata,getHomeGoods} from 'network/home.js'
import {debounce} from 'common/utils.js'
import {itemImgListenerMixin,backTopMixin} from 'common/mixin.js'

export default {
  name:'Home',
  components:{
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    HomeSwiper,
    RecommendView,
    FeatureView,
    Scroll,
    debounce
  },
  data(){
    return{
      banner:[],
      recommend:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,
    } 
  },
  mixins:[itemImgListenerMixin,backTopMixin],
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  activated(){
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated(){
    this.saveY=this.$refs.scroll.scroll.y

    // 离开home页面后不对img的加载进行刷新
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  created(){
    // 1.请求多个数据
    this.getHomeMultidata(),
    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted(){
  },
  methods:{
    /*
    事件监听相关的方法
    */
    tabClick(index){
      switch(index){
        case 0:
          this.currentType='pop'
          break
        case 1:
          this.currentType='new'
          break
        case 2:
          this.currentType='sell'
          break
      }
      this.$refs.tabControl1.currentIndex=index
      this.$refs.tabControl2.currentIndex=index
    },
    scrollPosition(position){
      // 判断BackTop是否显示
      this.isShowBackTop = -position.y>1000

      // 判断tabControl是否显示
      this.isTabFixed = -position.y>this.tabOffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad(){
      this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop;
    },
    /*
    网络请求相关的方法
    */ 
    getHomeMultidata(){
      getHomeMultidata().then(res => {
      this.banner=res.data.banner.list
      this.recommend=res.data.recommend.list
      // console.log(res.data.banner.list);
    })
    },
    getHomeGoods(type){
      const page=this.goods[type].page+1
      getHomeGoods(type,page).then(res=>{
        // console.log(res);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page+1

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
  #home{
    height:100vh ;
    position: relative;
  }
  .home-nav{
    background-color:var(--color-tint) ;
    color: #fff;

    /* 在使用浏览器原生滚动时，为了不让导航跟着一起滚动而使用的  */
    /* position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 9; */
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }

.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
</style>