<template>
  <div class="login">
    <el-card class="box-card">
      <img class="login_img" src="../../assets/logo.png" alt="" />
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item prop="mobile">
          <el-input
            placeholder="请输入手机号"
            v-model="form.mobile"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            placeholder="请输入验证码"
            v-model="form.code"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="check">
          <el-checkbox v-model="form.check"
            >我已阅读并同意 [用户协议] 和 [隐式条款]</el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-button class="login_btn" type="primary" @click="loginCheck"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getLoginPost } from '@/api/index.js'
import { setItem } from '@/utils/auth.js'
export default {
  data () {
    return {
      form: {
        mobile: '13811111111',
        code: '134659',
        check: []
      },
      rules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空',
            trigger: 'blur'
          },
          {
            // 表单局部验证
            validator: (rule, value, callback) => {
              const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
              reg.test(value) ? callback() : callback(new Error('手机号错误'))
            },
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 6,
            message: '请输入6位验证码',
            trigger: 'blur'
          },
          {
            // 表单局部验证
            validator: (rule, value, callback) => {
              const reg = /^\d+$/
              reg.test(value) ? callback() : callback(new Error('验证码错误'))
            },
            trigger: 'blur'
          }
        ],
        check: [
          {
            required: true,
            message: '请勾选协议',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    loginCheck () {
      // form表单全局验证
      this.$refs.form.validate(async res => {
        if (res) {
          const res = await getLoginPost(this.form)
          // console.log(res)
          setItem(res.data.token)
          this.$message.success('登录成功')
          this.$router.push('/layout')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  background: url('../../assets/login.png');
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .box-card {
    width: 460px;
    background-color: #fff;
    padding: 0 20px;
    // ::v-deep .el-card__body {
    //   padding: 20px 40px;
    // }
    .login_img {
      display: block;
      width: 200px;
      margin: 0 auto;
    }
    .el-checkbox {
      color: #09f;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>
