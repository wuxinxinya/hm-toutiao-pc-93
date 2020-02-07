<template>
  <div class='container-login'>
    <!-- 卡片 -->
    <el-card class='my-card'>
      <img src='../../assets/logo_index.png'>
      <!-- 表单 -->
      <!-- status-icon反馈图标 -->
      <el-form ref="loginForm"
               :model='loginForm'
               :rules="loginRules"
               status-icon>
        <!-- 表单项容器 -->
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile"
                    placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code"
                    placeholder="请输入验证码"
                    style="width:240px;margin-right:8px"></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐藏条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%"
                     @click="login()"
                     type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'app-login',
  data () {
    // 自定义校验手机号的函数
    const checkMobile = (rule, value, callback) => {
      // 进行校验
      if (!/^1[3-9]\d{9}$/.test(value)) {
        // 校验失败
        callback(new Error('手机号格式错误'))
      } else {
        //校验成功
        callback()
      }
    }
    return {
      loginForm: {
        mobile: '',
        code: ''
      },
      // 表单对应的校验规则
      loginRules: {
        mobile: [
          // required是否必填
          // message错误提示
          //trigger触发校验时机
          { required: true, message: '请输入手机号', trigger: 'blur' },
          // 手机号格式校验没有提供 需要实现自定义校验
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          // len输入内容必须是6位 min max指定字符串的范围
          { len: 6, message: "验证码6个字符", trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    login () {
      //对整体表单进行校验
      this.$refs.loginForm.validate((valid) => {
        // valid值true校验成功
        if (valid) {
          this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
            this.loginForm
          ).then(res => {
            this.$router.push('/')
          }).catch(err => {
            // 提示手机号或验证码错误----查阅element-ui文档--消息提示
            this.$message.error('手机号或验证码错误');
          })
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.container-login {
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
  background: url(../../assets/login_bg.jpg) no-repeat;
  // 让背景图等比例铺满容器
  background-size: cover;
  .my-card {
    width: 400px;
    height: 350px;
    transform: translate(-50%, -50%);
    position: absolute;
    left: 50%;
    top: 50%;
    img {
      width: 200px;
      display: block;
      margin: 0 auto 20px;
    }
  }
}
</style>