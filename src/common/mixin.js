import {
  debounce
} from 'common/utils.js'

import BackTop from 'components/content/backTop/BackTop.vue'

export const itemImgListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null,
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 200)

    this.itemImgListener = () => {
      this.refresh()
    }

    // 接收数据，对数据进行操作
    this.$bus.$on('itemImageLoad', this.itemImgListener)
    // console.log('123');
  }
}

export const backTopMixin = {
  components: {
    BackTop,
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    btnClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
  }
}
