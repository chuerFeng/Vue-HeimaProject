// 入口文件
import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 导入 vuex 状态管理
import Vuex from 'vuex'
// 导入格式化时间的插件
import moment, { months } from 'moment'
// 2.1 导入 axios
import axios from 'axios'

// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'

// 安装路由
Vue.use(VueRouter)
Vue.use(Vuex)


// 定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern='YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})


//把 `axios` 加到 `Vue` 的原型中
Vue.prototype.axios = axios;
axios.defaults.baseURL = 'http://www.liulongbin.top:3005/api'; 
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


// 按需导入 Mint-UI 中的组件   
import { Header, Swipe, SwipeItem, Button, Lazyload, Switch } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.component(Switch.name, Switch);
Vue.use(Lazyload)


// 1.3 导入自己的 router.js 路由模块
import router from './router.js'

// 导入 App 根组件
import app from './App.vue'


var store = new Vuex.Store({
  state: {
    cart: []
  },
  mutations: {
    addToCar(state, goodsinfo){
      // 分析：
      // 如果购物车中，之前就已经有这个对应的商品，那么只需要更新数量
      // 如果没有，则直接把商品数据 push 到 car 中
      var flag = false

      state.cart.some( item => {
        // console.log('item:' + item);
        
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true          
        }
      })

      if(!flag) {
        state.cart.push(goodsinfo)
      }
    }
  },
  getters: {
    getAllCount(state) {
      let c = 0;
      state.cart.forEach( item => {
        c += item.count
      })    
      return c
    },

    getGoodsCount(state) {
      let goodsCount = []
      state.cart.forEach( v => {        
        goodsCount[v.id] = v.count
      })
      return goodsCount
    }


  }
})


var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router, // 1.4 挂载路由对象到 VM 实例上
  store
})