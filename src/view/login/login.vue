<template>
  <div class="login">
    <img class="loginImg" src="/src/assets/login/u14.png" alt="" />
    <div class="loginFrom">
      <h1>易制枪物品图形比对系统</h1>
      <div class="form">
        <el-form ref="form">
          <el-form-item>
            <el-input v-model="name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="pwd" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="submit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '/@/api/system/login'
export default defineComponent({
  setup() {
    const router = useRouter()
    const state = reactive({
      name: '',
      pwd: '',
      submit: async () => {
        const res = await login({username: state.name, password: state.pwd})
        localStorage.setItem('token',res.data.token)
        router.push('/homePage')
      }
    })
    return state
  }
})
</script>
<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  position: relative;
  .loginImg {
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translateY(-50%);
  }
  .loginFrom {
    position: absolute;
    top: 30%;
    right: 0;
    transform: translate(-10%, -20%);
    h1 {
      font-size: 0.8rem;
      font-weight: bold;
      color: #fff;
      margin-bottom: 0.4rem;
    }
    .form {
      width: 100%;
      height: 4rem;
      background: url('/src/assets/login/u2.png') no-repeat center center;
      background-size: 100% 100%;
      padding-top: 1rem;
      box-sizing: border-box;
      .el-form {
        width: 100%;
        .el-form-item {
          width: 50%;
          margin: 0 auto 0.2rem;
          .el-form-item__content {
            .el-input {
              input {
                background-color: #091923;
                border-color: #212121;
                color: #fff;
              }
              input::placeholder {
                color: #00f3ff;
                font-weight: bold;
                font-size: 0.2rem;
              }
            }
            .el-button {
              width: 100%;
              background-color: #07545d;
              border: none;
              span {
                color: #fff;
                font-weight: bold;
                font-size: 0.2rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>