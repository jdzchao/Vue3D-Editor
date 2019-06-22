import Vue3dEditor from './Vue3dEditor'
import VueIcon from './components/VueIcon'

/**
 * 全局加载
 */
export default {
    install: function (Vue, opts) {
        Vue.component('vue3d-editor', Vue3dEditor)
        Vue.component('vue-icon', VueIcon)
    }
};
