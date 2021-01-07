<template>
  <div class="home">
    <div class="homeTitle">
      <div class="titleUser">
        <span class="user">下午好！157***6999</span>
        <el-button type="text">退出登录</el-button>
      </div>
      <h2>易制枪物品图形比对系统</h2>
      <ul>
        <li v-for="(item, index) in menu" :key="index">
          <div class="test" @click="goRouter(item.path)">{{ item.name }} </div>
        </li>
      </ul>
    </div>
    <div class="homeBody">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const router = useRouter()
    const state = reactive({
      menu: [
        { name: '首页', path: '/homePage' },
        { name: '分类查询', path: '/classification' },
        { name: '统计分析', path: '' },
        { name: '报警管理', path: '' },
        { name: '视频管理', path: '' },
        { name: '状态监测', path: '' },
        { name: '图像识别', path: '' },
        { name: '样本管理', path: '' },
        { name: '系统管理', path: '' }
      ],
      goRouter: (path: string) => {
        router.push(path)
      }
    })
    return state
  }
})
</script>
<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  padding: 0 0.2rem 0.2rem;
  box-sizing: border-box;
  .homeTitle {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .titleUser {
      width: 100%;
      height: 0.42rem;
      display: flex;
      justify-content: flex-end;
      line-height: 0.4rem;
      .user {
        margin-right: 0.1rem;
      }
      .el-button > span,
      .user {
        color: #00f3ff;
        font-weight: bold;
        font-size: 0.16rem;
      }
    }
    h2 {
      width: 5rem;
      height: 0.86rem;
      color: #fff;
      font-size: 0.4rem;
      font-weight: bold;
      background: #064c7c;
      border-radius: 0.16rem;
      padding: 0.2rem;
      box-sizing: border-box;
    }
    ul {
      padding-top: 0.2rem;
      width: calc(100% - 5rem);
      height: 0.54rem;
      line-height: 0.54rem;
      display: flex;
      li {
        width: 2.2rem;
        height: 100%;
        font-size: 0.16rem;
        background: url('/src/assets/home/tu.png') no-repeat center center;
        background-size: 120% 120%;
        text-align: center;
        transform: rotate(20deg);
        .test {
          transform: rotate(-20deg);
          cursor: pointer;
          color: #fff;
          font-weight: bold;
        }
      }
    }
  }
  .homeBody {
    width: 100%;
    height: calc(100% - 0.42rem - 0.86rem - 0.2rem);
    margin-top: 0.2rem;
    background: url('/src/assets/login/u2.png') no-repeat center center;
    background-size: 100% 100%;
  }
}
</style>