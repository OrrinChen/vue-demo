import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/components/Login"
import Home from '../components/Home.vue'
import Login2 from '../components/Login2.vue'
import Oaerp from '../components/oaerp/Oaerps'
import Test from '../components/Test.vue'

// 导入axios，用于发送请求
import axios from "axios";


Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    component:Login
  },
  {
    path:'/',
    redirect:'/login'
  },
  {
    path: '/home',
    component: Home,
    children:[
      {path:'/welcome',component:() => import('../components/index/Welcome.vue')},
      {path:'/users',component:() => import('../components/user/Users.vue')},
      {path:'/oaerps',component:() => import('../components/oaerp/Oaerps.vue')}
    ]
  },
  {
    path:'/login2',
    component:Login2
  },
  {
    path:'/oaerp',
    component:Oaerp
  },
  {
    path:'/test',
    component: Test
  }
]

const router = new VueRouter({
  routes
})


// 配置路由守卫 (暂时放开)
router.beforeEach(async (to,from,next) => {
  // 如果访问登录页，则放行
  if(to.path === '/login'){
    sessionStorage.removeItem('userInfo')
    console.log("/login...")
    return next();
  }

  // 获取sessionStorage中的userInfo对象
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))

  //userInfo为空，则代表用户未登录，访问的是其他页面则跳转到/login
  if(!userInfo){
    return next('/login');
  }


  //校验token合法性
  // axios({
  // // this.$http({
  //   url:'/checkToken',
  //   method:'get',
  //   headers:{
  //     token:userInfo.token
  //   }
  // }).then((response) => {
  //   console.log('123')
  //   console.log(response.data)
  //   if(!response.data){
  //     console.log('校验失败')
  //     next({path: '/login'})
  //   }
  // });
  // next()

  // JWT token有效认证（未能实现功能）
  try {
    const response = await axios.get('/checkToken');
    console.log("-----111-checkToken----")
    console.log(response);
    console.log("-----222-checkToken----")
  } catch (error) {
    console.log("-----333-checkToken----")
    return next({path: '/login'})
    // console.log("-----444-----")
  }


  // userInfo存在，代表用户已经登录，放行
  console.log('next()...')
  next();

})


/*
// JWT(json web token --begin)
router.beforeEach((to, from, next) => {
if (to.path.startsWith('/login2')) {
//取出token信息
window.localStorage.removeItem('access-admin')
next()
} else {
//获取token的信息。
let admin = JSON.parse(window.localStorage.getItem('access-admin'))
if (!admin) {
  next({path: '/login2'})
} else {
  //校验token合法性
  // axios({
  this.$http({
    url:'http://localhost:8888/user/checkToken',
    method:'get',
    headers:{
      token:admin.token
    }
  }).then((response) => {
    console.log(response.data)
    if(!response.data){
      console.log('校验失败')
      next({path: '/error'})
    }
  })
  next()
}
}
})
// JWT(json web token --end)
// */


export default router
