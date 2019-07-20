// CSS
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import 'element-ui/lib/theme-chalk/index.css'

import Vue from 'vue'
import App from './App.vue'
import Vue3dEditor from '../publish'
import ElementUI from 'element-ui'
// import Vue3D from 'vue3d'
import Vue3D from '../Vue3D'

// Vue preset
Vue.use(ElementUI)
Vue.use(Vue3D)
Vue.use(Vue3dEditor, {
    debug: false,
    upload_image: {
        action: 'https://s3.cifuwu.com/api/upload/image/file',
        data: {},
        headers: {}
    },
    upload_model: {
        action: 'https://s3.cifuwu.com/api/upload/model',
        data: {},
        headers: {}
    },
    image_loader: (name, size) => {
        if (!name) return;
        if (!size) size = '1024';
        return 'https://s3.cifuwu.com/image/show/' + size + '/' + name;
    },
    model_loader: (name) => {
        if (!name) return;
        return 'https://s3.cifuwu.com/storage/uploads/' + name;
    }
})

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
