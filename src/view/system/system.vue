<template>
  <div class="system">
    <h2 class="title">{{ $route.matched[2].name }}</h2>
    <el-button
      class="systemBtn"
      v-for="(item, index) in menu"
      :key="index"
      @click="goRouter(item.path)"
      >{{ item.name }}</el-button
    >
    <main>
      <router-view />
    </main>
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
        { name: '系统管理', path: '/system/user' },
        { name: '角色管理', path: '/system/role' },
        { name: '设备管理', path: '/system/equipment' },
        { name: '字典管理', path: '/system/dictionaries' },
        { name: '组织机构', path: '/system/organization' },
        { name: '系统日志', path: '/system/log' }
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
.system {
  .systemBtn {
    margin: 0;
    margin-right: 0.04rem;
  }
  main {
    width: 100%;
    height: calc(100% - 0.34rem - 0.4rem);
    .user,
    .role,
    .log,
    .organization,
    .dictionaries,
    .equipment {
      width: 100%;
      height: 100%;
      .searchCom {
        margin-top: 0.2rem;
      }
    }
  }
}
</style>