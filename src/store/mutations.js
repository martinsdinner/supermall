import {
  ADD_TO_CART,
  ADD_COUNTER
} from './mutation-type'

export default {
  /* mutations中的方法执行的功能最好单一，只做一件事情，这里是又给已有商品增加数量和
     给未添加的商品添加到购物车中*/
  // addCart(state, payload) {
  //   // payload是加入购物车的商品,
  //   // let oldProduct = null
  //   // for (let item of state.cartList) {
  //   //   if (item.iid === payload.iid) {
  //   //     oldProduct = item
  //   //   }
  //   // }
  //   let oldProduct = state.cartList.find(item => {
  //     item.iid === payload.iid
  //   })

  //   if (oldProduct) {
  //     oldProduct.count += 1
  //   } else {
  //     payload.count = 1
  //     state.cartList.push(payload)
  //   }
  // }
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}
