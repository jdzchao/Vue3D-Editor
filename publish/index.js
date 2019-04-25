// import Vue3D from '../Vue3D'
import Vue3D from 'vue3d'
import Vue3dEditor from './Vue3dEditor'

/**
 * 全局加载
 */
export default {
    install: function (Vue, opt) {
        Vue.use(Vue3D, opt)
        Vue.component('vue3d-editor', Vue3dEditor)
    }
};
