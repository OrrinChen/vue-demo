<template>
  <div>
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!--<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>-->
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>OA-ERP</el-breadcrumb-item>
      <el-breadcrumb-item>交互列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--card卡片-->
    <el-card>
      <!--Layout 布局-->
      <el-row :gutter="12">
        <el-col :span="8">
          <!--搜索框-->
          <div class="grid-content bg-purple-dark" @click="searchUser()">
            <el-input  :clearable="true" placeholder="请输入要搜索的目标表id" class="input-with-select" v-model="queryInfo.targetid">
              <el-select  :clearable="true" v-model="queryInfo.status" slot="prepend" placeholder="请选择状态" @change="searchUser()">
                <el-option label="成功" value="1"></el-option>
                <el-option label="失败" value="0"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-col>
<!--       <el-col :span="4">-->
<!--          &lt;!&ndash;按钮&ndash;&gt;-->
<!--          <div class="grid-content bg-purple-dark">-->
<!--            <el-button type="primary" @click="addUserDialogVisible = true">添加用户</el-button>-->
<!--          </div>-->
<!--        </el-col>-->
      </el-row>
      <!--列表-->
      <el-table :data="oaerpList" :stripe=true :border="true">
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="状态" prop="status" :formatter="statusFormat"></el-table-column>
        <el-table-column label="办结时间" prop="time"></el-table-column>
        <el-table-column label="源表" prop="sourcetable"></el-table-column>
        <el-table-column label="源表id" prop="sourceid"></el-table-column>
        <!--<el-table-column label="源数据JSON" prop="sourcejson"></el-table-column>-->
        <!--<el-table-column label="交互log" prop="changelog"></el-table-column>-->
        <el-table-column label="目标表" prop="targettable"></el-table-column>
        <el-table-column label="目标表id" prop="targetid"></el-table-column>
        <!--<el-table-column label="目标JSON" prop="targetjson"></el-table-column>-->
        <el-table-column label="交互时间" prop="changetime"></el-table-column>
<!--        <el-table-column label="状态">-->
<!--          &lt;!&ndash; 自定义列模板，使用作用域插槽，通过scope.row获取当前行的数据 &ndash;&gt;-->
<!--          <template slot-scope="scope">-->
<!--            <el-switch v-model="scope.row.mg_state" @change="changUserState(scope.row)"></el-switch>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column label="操作">-->
<!--          &lt;!&ndash; 自定义列模板，使用作用域插槽，通过scope.row获取当前行的数据 &ndash;&gt;-->
<!--          <template slot-scope="scope">-->
<!--            <el-row>-->
<!--              <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="showEditDialog(scope.row.id)"></el-button>-->
<!--              <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="showDeleteDialog(scope.row.id)"></el-button>-->
<!--              <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="removeUser(scope.row)"></el-button>-->
<!--              <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">-->
<!--                <el-button type="warning" icon="el-icon-setting" circle size="mini" @click="showRoleDialog(scope.row)"></el-button>-->
<!--              </el-tooltip>-->
<!--            </el-row>-->
<!--          </template>-->
<!--        </el-table-column>-->
      </el-table>
      <!--分页-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page=this.queryInfo.pagenum
          :page-sizes="[1, 2, 5, 10]"
          :page-size="this.queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          v-if="reflushPageFlag">
      </el-pagination>
    </el-card>

    <!--添加用户弹窗-->
    <el-dialog
        title="添加用户"
        :visible.sync="addUserDialogVisible"
        width="70%"
        @close="addUserDialogClosed">
      <el-form :model="addUserForm" status-icon :rules="addUserRules" ref="addUserFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addUserForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
          <el-button @click="addUserDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser()">确 定</el-button>
        </span>
    </el-dialog>

    <!--修改用户弹窗-->
    <el-dialog
        title="修改用户"
        :visible.sync="editUserDialogVisible"
        width="70%"
        @close="editUserDialogClosed">
      <el-form :model="editUserForm" status-icon :rules="editUserRules" ref="editUserFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editUserForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </span>
    </el-dialog>

    <!--删除用户弹窗-->
    <el-dialog
        title="删除用户"
        :visible.sync="deleteUserDialogVisible"
        width="70%">
      <el-form :model="deleteUserForm" status-icon ref="deteleUserFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="deleteUserForm.username" disabled></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteUser()">确 定</el-button>
      </span>
    </el-dialog>

    <!--修改角色弹窗-->
    <el-dialog
        title="修改角色"
        :visible.sync="roleDialogVisible"
        width="70%"
        @close="roleDialogClosed">
      <div>
        <p>当前的用户：{{userInfo.username}}</p>
        <p>当前的角色：{{userInfo.role_name}}</p>
        <p>
          <template>
            <el-select v-model="selectedRole" placeholder="请选择">
              <el-option
                  v-for="item in roleList"
                  :key="item.id"
                  :label="item.roleName"
                  :value="item.id"
                  :disabled="item.roleName == userInfo.role_name ? true : false">
              </el-option>
            </el-select>
          </template>
        </p>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="roleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="selectRole()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
export default {
  data(){
    return{
      // 查询参数
      queryInfo:{
        targetid:'',
        status: '',
        pagenum:1,
        pagesize:10
      },
      // 交互数据列表
      oaerpList:[],
      // 用户总数量
      total:0,
      // 强制刷新分页组件
      reflushPageFlag:true,

      // 添加用户对话框是否显示
      addUserDialogVisible:false,
      // 添加用户数据仓
      addUserForm:{
        username:'',
        password:'',
        email:'',
        mobile:'',
      },
      // 添加用户的校验规则
      addUserRules:{
        username:[
          {required:true, message:'请输入用户名', target:'blur'},
          {min:3, max:10, message: "长度在 3 - 10 个字符", target: 'blur'}
        ],
        password:[
          {required:true, message:'请输入密码', target:'blur'},
          {min:6, max:15, message: '长度在 6 - 15 个字符', target: 'blur'}
        ],
        email: [
          {required:true, message:'请输入邮箱', target:'blur'},
          {pattern:/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, message: '请输入正确的邮箱', target: 'blur'}
        ],
        mobile: [
          {required:true, message:'请输入电话', target:'blur'},
          {pattern:/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/, message: '请输入正确的电话', target: 'blur'}
        ]
      },

      // 修改用户对话框是否显示
      editUserDialogVisible:false,
      // 修改用户数据仓
      editUserForm:{},
      // 添加用户的校验规则
      editUserRules:{
        email: [
          {required:true, message:'请输入邮箱', target:'blur'},
          {pattern:/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, message: '请输入正确的邮箱', target: 'blur'}
        ],
        mobile: [
          {required:true, message:'请输入电话', target:'blur'},
          {pattern:/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/, message: '请输入正确的电话', target: 'blur'}
        ]
      },

      // 删除用户对话框是否显示
      deleteUserDialogVisible:false,
      // 删除用户数据仓
      deleteUserForm:{},

      // 分配角色时，用户数据仓
      userInfo:{},
      // 角色数据仓
      roleList:[],
      // 修改角色对话框是否显示
      roleDialogVisible:false,
      // 被选择的角色
      selectedRole:''
    }
  },
  created() {
    this.getUserList();
  },

  methods:{
    // 分页查询方法：更改条件或者清空条件时调用
    async getUserList(){
      this.reflushPageFlag=false;
      // console.log(this.queryInfo)
      // 每次查询时，将当前页设置为1
      this.queryInfo.pagenum = 1;

      const {data:res} = await this.$http.get('oaerp/getOaerp', {params:this.queryInfo});
      console.log(res);
      // console.log(this.queryInfo)
      if(res == null){
        return this.$message.error('获取用户列表失败')
      }
      this.oaerpList = res.list;
      this.total = res.total;
      this.$nextTick(function () {
        this.reflushPageFlag=true;
      });
    },
    // 分页查询方法2：只在选择页标时调用
    async getUserList2(){
      this.reflushPageFlag=false;
      // console.log(this.queryInfo)
      // this.queryInfo.pagenum = 1;

      const {data:res} = await this.$http.get('oaerp/getOaerp', {params:this.queryInfo});
      console.log(res);
      // console.log(this.queryInfo)
      if(res == null){
        return this.$message.error('获取用户列表失败')
      }
      this.oaerpList = res.list;
      this.total = res.total;
      this.$nextTick(function () {
        this.reflushPageFlag=true;
      });
    },
    statusFormat(row,column){
      // console.log(row.status);
      var statusW = '';
      switch (row.status) {
        case '1':statusW= "成功";break;
        case '0':statusW= "失败";break;
      }
      return statusW
    },
    // 搜索用户
    searchUser(){
      this.getUserList();
    },
    // 添加用户
    addUser(){
      this.$refs.addUserFormRef.validate(async valid => {
        if(!valid){ //校验不通过，返回，后面代码不执行
          return
        }
        // 发送添加用户请求
        const {data:res} = await this.$http.post('users',this.addUserForm)
        if(res.meta.status!==201){
          return this.$message.error('添加用户失败')
        }
        // 关闭对话框
        this.addUserDialogVisible = false;
        // 刷新用户列表
        this.getUserList();
        // 提示信息
        this.$message.success('添加用户成功')
      })
    },
    // 添加用户对话框的关闭事件
    addUserDialogClosed(){
      this.$refs.addUserFormRef.resetFields();
    },
    // 监听用户状态改变事件
    async changUserState(userInfo){
      // 发送请求，改变用户状态
      console.log(userInfo)
      // ${}获取动态值，必须用`引起来，用'或者"都是原样值，而不是动态值
      const {data:res} = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`);
      if(res.meta.status !== 200){
        // 更新失败时恢复为原始状态(状态取反)
        userInfo.mg_state = !userInfo.mg_state;
        return this.$message.error('更新用户状态失败');
      }
      this.$message.success('更新用户状态成功')
    },
    // 显示修改用户对话框
    async showEditDialog(id){
      const {data:res} = await this.$http.get(`users/${id}`);
      if(res.meta.status !== 200){
        return this.$message.error('查询用户失败')
      }
      this.editUserForm = res.data;
      this.editUserDialogVisible=true;
    },
    // 修改用户
    editUser(){
      // 校验
      this.$refs.editUserFormRef.validate(async valid => {
        if(!valid){//校验不通过
          return
        }
        // 发送请求
        const {data:res} = await this.$http.put(`users/${this.editUserForm.id}`,{
          email:this.editUserForm.email,
          mobile:this.editUserForm.mobile,
        });
        if(res.meta.status !== 200){
          return this.$message.error('修改用户失败')
        }
        this.$message.success('修改用户成功');
        this.editUserDialogVisible = false
        this.getUserList();
      })

    },
    // 修改用户对话框的关闭事件
    editUserDialogClosed(){
      this.$refs.editUserFormRef.resetFields()
    },
    // 显示删除用户对话框
    async showDeleteDialog(id){
      const {data:res} = await this.$http.get(`users/${id}`);
      if(res.meta.status !== 200){
        return this.$message.error('查询用户失败')
      }
      this.deleteUserForm = res.data;
      console.log(this.deleteUserForm)
      this.deleteUserDialogVisible=true;
    },
    // 删除用户
    async deleteUser(){
      const {data:res} = await this.$http.delete(`users/${this.deleteUserForm.id}`);
      if(res.meta.status !== 200){
        return this.$message.error('删除用户失败')
      }
      this.$message.success('删除用户成功');
      this.deleteUserDialogVisible=false
      this.getUserList();
    },

    // 删除用户
    removeUser(user){
      this.$confirm(`确认删除用户：${user.username} 吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const {data:res} = await this.$http.delete(`users/${user.id}`);
        if(res.mate.status !== 200){ //如没有mate对象，则直接条转到catch函数，例如：写成错误 res.mate.status
          return this.$message.error('删除用户失败');
        }
        this.$message.success('删除用户成功');
        this.getUserList()
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },

    // 显示修改角色对话框
    async showRoleDialog(user){
      this.userInfo = user;
      // 获取菜单列表
      const {data:res} = await this.$http.get('roles');
      if(res.meta.status !== 200){
        return this.$message.error('获取菜单失败')
      }
      this.roleList = res.data;
      // this.$message.success('获取菜单成功')
      console.log(this.selectedRole)
      console.log(this.userInfo)
      this.roleDialogVisible = true;
    },
    // 修改角色
    async selectRole(){
      if(!this.selectedRole){
        return this.$message.error('请选择角色')
      }
      // 向后台发送修改角色请求
      const {data:res} = await this.$http.put(`users/${this.userInfo.id}/role`,{
        rid:this.selectedRole
      })
      // console.log(res)
      if(res.meta.status !== 200){
        return this.$message.error('角色修改失败')
      }
      this.$message.success('角色修改成功')
      this.roleDialogVisible=false;
      this.getUserList();
    },
    // 监听修改角色对话框关闭事件
    roleDialogClosed(){
      this.selectedRole=''
    },

    // 监听pagesize改变的事件
    handleSizeChange(pagesize){
      // 当前页码从1开始
      this.queryInfo.pagenum = 1;
      this.queryInfo.pagesize = pagesize;
      this.getUserList();
    },
    // 监听pagenum改变事件
    handleCurrentChange(pagenum){
      this.queryInfo.pagenum = pagenum;
      this.getUserList2();
    }
  },

}
</script>
<style lang="less" scoped>

</style>
