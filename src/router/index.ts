import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: {
        name: 'login'
      }
    },
    {
      path: '/login',
      name: 'login',
      // 必须添加.vue后缀
      component: () => import('/@/view/login/login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('/@/view/home/home.vue'),
      children: [
        {
          path: '/homePage',
          name: '首页',
          component: () => import('/@/view/home/homePage.vue')
        },
        {
          path: '/classification',
          name: '分类查询',
          component: () => import('/@/view/classification/classification.vue')
        },
        {
          path: '/statistical',
          name: '统计分析',
          component: () => import('/@/view/statistical/statistical.vue')
        }
      ]
    }
  ]
})
export default router
