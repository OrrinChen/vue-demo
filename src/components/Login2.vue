<template>
  <el-form ref="ruleForm" class="login-form" :model="ruleForm" :rules="rules">
    <el-form-item prop="username">
      <el-input placeholder="请输入用户名" prefix-icon="iconfont icon-user" v-model="ruleForm.username"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input placeholder="请输入密码" prefix-icon="iconfont icon-3702mima"  show-password v-model="ruleForm.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="login-btn" @click="handleSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: "Login2",
  data(){
    return{
      ruleForm: {
        username: 'admin',
        password: '123123'
      },
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}]
      }
    }
  },
  methods: {
    handleSubmit(){
      this.$refs.ruleForm.validate((valid) => {
        if(valid){
          let _this = this
          this.$http.get('http://localhost:88888/user/login',{params:_this.ruleForm}).then(function (response) {
            if(response.data!=null){
              //将token信息保存在本地客户端
              localStorage.setItem('access-admin',JSON.stringify(response.data))
              _this.$router.replace({path:'/'})
            }
          })
        }else{
          console.log('error submit!');
          return false;
        }
      })
    }
  }
};
</script>