import { createApp } from 'vue'
import App from '/@/App.vue'
import router from '/@/router'
import ElementPlus from 'element-plus'
import locale from '/@/assets/style/elementLocale'
import 'element-plus/lib/theme-chalk/index.css'
import '/@/assets/style/reset.css'
import '/@/assets/style/scrollbar.css'
import remConfig from '/@/assets/style/remConfig.js'
remConfig()
createApp(App).use(router).use(ElementPlus, { locale }).mount('#app')
