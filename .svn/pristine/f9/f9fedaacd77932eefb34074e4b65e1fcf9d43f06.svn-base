<template>
  <el-container>
    <!--表头-->
    <el-header>
      <div class="left">
        <img src="../assets/imgs/shop.png">
        <span>数据交互日记查询系统</span>
      </div>
      <div class="right">
        <span>欢迎你：{{userInfo.username}}</span>
        <el-button type="danger" @click="loginout">退出</el-button>
      </div>
    </el-header>
    <!--内容体-->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 切换菜单的折叠和显示 -->
        <div class="toggle-button" @click="isCollapse = !isCollapse">|||</div>
        <!--菜单栏-->
        <el-menu
            :default-active="$route.path" unique-opened router
            :collapse="isCollapse"
            :collapse-transition="false">
          <el-submenu
              :index="item.id+''"
              v-for="item in menuList"
              :key="item.id">
            <template slot="title">
              <i :class="iconObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item
                :index="'/'+subItem.path"
                v-for="subItem in item.children"
                :key="subItem.id+''">
              <i class="el-icon-menu"></i>{{ subItem.authName }}
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <!--内容窗-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data(){
    return{
      // 用户信息对象
      userInfo:null,
      // 菜单列表
      menuList:[],
      // 图标样式对象
      iconObj:{
        201:'iconfont icon-shouye',
        125:'iconfont icon-users',
        103:'iconfont icon-tijikongjian',
        101:'iconfont icon-shangpin',
        102:'iconfont icon-danju'
      },
      // 是否折叠左侧菜单
      isCollapse :false
    }
  },
  // 创建实例化对象
  created() {
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
    this.getMenuList()
  },
  methods:{
    loginout(){
      // alert('退出操作');

      this.$confirm('确认退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 清空sessionStorage
        sessionStorage.clear();
        this.$message({
          type: 'success',
          message: '退出成功'
        });
        // 跳转到/login登录页面
        this.$router.push('/login')
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });
      });


    },
    async getMenuList(){
      const {data:res} = await this.$http.get('menus',this.from);
      if(res.meta.status !== 200){
        return this.$message.error('获取菜单失败')
      }
      this.menuList = res.data ;
      // console.log('###########--1--##########');
      // console.log(this.menuList);
      // console.log(res)
      // console.log('###########--2--##########');
    }
  }
}
</script>
<style lang="less" scoped>
.el-container{
  height: 100%;

  .el-header{
    background: url("../assets/imgs/header_bg.gif") repeat-x center;
    height: 50px !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;

    .left{
      display: flex;
      align-items: center;
      img{
        width: 40px;
        margin-right: 20px;
      }
      span{
        font-size: 20px;
      }
    }

    .right{
      span{
        margin-right: 10px;
      }
    }

  }

  .el-aside{
    .el-menu{
      border-right: 0;
      .iconfont{
        margin-right: 10px;
      }
    }
    .toggle-button{
      background-color: #60779d;
      font-size: 10px;
      line-height: 24px;
      text-align: center;
      color: white;
      letter-spacing: 0.2rem;
      cursor: pointer;
    }


  }

}
.el-main{
  background: #eaedf1;
}

</style>