import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入公共样式
import './styles/common.css'
// 导入normalize.css
import 'normalize.css'
// 导入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// // 导入频道选择全局组件
import ChannelSelect from '@/components/ChannelSelect.vue'
Vue.component(ChannelSelect.name, ChannelSelect)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
