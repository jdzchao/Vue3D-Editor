// import Vue3D from '../Vue3D'
import Vue3D from '../Vue3D'
// import Vue3D from 'vue3d'
import Vue3dEditor from './Vue3dEditor'

import core from './core'

/**
 * 全局加载
 */
export default {
    install: function (Vue, opts) {
        Vue.use(Vue3D, opts)
        Vue.component('vue3d-editor', Vue3dEditor)

        Vue.prototype.$editor = core
    }
};
