import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'

// 导入axios，用于发送请求
import axios from "axios";
import Qs from "qs";

// 导入NProgress进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 接口请求路径
// axios.defaults.baseURL='http://www.tangxiaoyang.vip:8888/api/v2/'

// 接口请求路径 需要用户端能访问此接口地址，而非vue应用服务器
// axios.defaults.baseURL='http://192.168.1.34:8888/'
// axios.defaults.baseURL='http://192.168.11.127:8888/'
// axios.defaults.baseURL='http://192.168.1.15:8888/'
// axios.defaults.baseURL='http://192.168.1.34:8888/'
axios.defaults.baseURL='http://ds-test:8888/'

// 请求头添加 Authorization 存放令牌 token
axios.interceptors.request.use(config => {
  // 请求时开启进度条
  NProgress.start();
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  config.headers.Authorization = userInfo ? userInfo.token : ''
  console.log('*********--11--*********')
  console.log(config.headers.Authorization)
  console.log('*********--22--*********')
  return config
})

axios.interceptors.response.use(config => {
  // 结束进度条
  NProgress.done();
  return config
})

// Vue全局定义$http=axios
Vue.prototype.$http = axios
Vue.prototype.$Qs = Qs

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
