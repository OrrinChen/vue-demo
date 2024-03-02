<template>
  <div class="login-container">
    <div class="login-left">
      <img src="../assets/imgs/login_img.png">
    </div>
    <div class="login-box">
      <!--头像-->
      <div class="avatar-box">
        <img src="../assets/imgs/login_logo.png">
      </div>
      <!--标题-->
      <div class="title">
        数据交互日记查询系统
      </div>
      <!--登录窗口-->
      <el-form ref="loginFormRef" class="login-form" :model="loginForm" :rules="loginFormRules">
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" prefix-icon="iconfont icon-user" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" prefix-icon="iconfont icon-3702mima"  show-password v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="login">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      // 表单的数据绑定对象
      loginForm:{
        username:'admin',
        password:'123456'
      },
      // 表单的校验规则
      loginFormRules:{
        username:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min:3, max:10, message: '请输入3-10个字符', trigger: ['blur', ''] }
        ],
        password: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {min:6, max:12, message: '请输入6-12个字符', trigger: ['blur','']}
        ]
      }
    }

  },
  methods:{
    login(){
      // alert(123);
      this.$refs.loginFormRef.validate(async valid => {
        if(!valid){//校验不通过，跳出方法
          return
        }
        //发送登录请求
        console.log('开始发送登录请求');
        // 发送请求判断是否登陆成功
        // alert(this.loginForm.username);
        // const {data:res} = await this.$http.post('login',this.loginForm);//将返回结果中的data赋值给res
        const {data:res} = await this.$http.post('login',this.$Qs.stringify(this.loginForm));//将返回结果中的data赋值给res
        console.log(res);//data内容

        if(res.meta.status !== 200){//状态码不为200表示登录失败
          return this.$message.error('登录失败');
        }

        // return 没执行代表状态码为200，表示登录成功
        this.$message.success('登录成功');

        // 将用户信息保存到SessionStorage中
        sessionStorage.setItem('userInfo',JSON.stringify(res.data));

        // 登录成功，页面跳转
        // await this.$router.push('/home');
        // await this.$router.push('/oaerp');
        await this.$router.push('/oaerps');

        console.log('发送登录请求结束');
      })

    }
  }
}


</script>

<style lang="less" scoped>
.login-container{
  background: #93defe;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-left{
    margin-right: 100px;
  }

  .login-box{
    width: 400px;
    height: 350px;
    background: #fff;
    padding: 50px;
    border-radius: 6px;
    box-sizing: border-box;
    position: relative;

    .avatar-box{
      width: 120px;
      height: 120px;
      border: 5px solid #93defe;
      border-radius: 100px;
      text-align: center;
      line-height: 110px;
      position: absolute;
      top: -60px;
      right: 140px;
      background: #fff;
    }

    .title{
      position: absolute;
      top: 100px;
      left:50%;
      transform: translate(-50%);
      font-size: 18px;
      color: #444;
    }

    .login-form{
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%);
      padding: 0 20px;
      width: 80%;
      box-sizing: border-box;

      .login-btn{
        width: 100%;
      }
    }
  }
}
</style>