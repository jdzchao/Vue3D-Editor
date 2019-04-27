import Vue from 'vue'
import App from './App.vue'
import Vue3dEditor from '../publish'
import ElementUI from 'element-ui'

// CSS
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/icon-font' //icon font

// Vue preset
Vue.use(Vue3dEditor)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
