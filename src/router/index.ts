import { createRouter, createWebHistory } from 'vue-router'
import { clearPending } from '../utils/http'
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
        },
        {
          path: '/alarm',
          name: '报警管理',
          component: () => import('/@/view/alarm/alarm.vue')
        },
        {
          path: '/video',
          name: '视频图像管理',
          component: () => import('/@/view/video/video.vue')
        },
        {
          path: '/status',
          name: '状态监测',
          component: () => import('/@/view/status/status.vue')
        },
        {
          path: '/photo',
          name: '可见光图像识别',
          component: () => import('/@/view/photo/photo.vue')
        },
        {
          path: '/sample',
          name: '样本管理',
          component: () => import('/@/view/sample/sample.vue')
        },
        {
          path: '/system',
          name: '系统设置',
          component: () => import('/@/view/system/system.vue'),
          children: [
            {
              path: '/system/user',
              name: '用户管理',
              component: () => import('/@/view/system/child/user.vue')
            },
            {
              path: '/system/role',
              name: '角色管理',
              component: () => import('/@/view/system/child/role.vue')
            },
            {
              path: '/system/log',
              name: '系统日志',
              component: () => import('/@/view/system/child/log.vue')
            },
            {
              path: '/system/organization',
              name: '组织机构',
              component: () => import('/@/view/system/child/organization.vue')
            },
            {
              path: '/system/dictionaries',
              name: '字典管理',
              component: () => import('/@/view/system/child/dictionaries.vue')
            },
            {
              path: '/system/equipment',
              name: '设备管理',
              component: () => import('/@/view/system/child/equipment.vue')
            }
          ]
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to, from, next)
  // 在跳转路由之前，先清除所有的请求
  clearPending()
  next()
})

export default router
