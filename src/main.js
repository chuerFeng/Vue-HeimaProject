// 入口文件
import Vue from 'vue'

// 导入 Mui 样式
import './lib/mui/css/mui.min.css'

// 导入 Mint-UI 组件
import { Header } from 'mint-ui'
Vue.component(Header.name, Header)



import app from './App.vue'


var vm = new Vue({  
  el: "#app",
  data:{},
  methods: {},
  render: c => c(app)
})