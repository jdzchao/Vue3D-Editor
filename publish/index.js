import Vue3D from 'vue3d'

/**
 * 全局加载
 */
export default {
    install: function (Vue, opt) {
        Vue.use(Vue3D, opt)
    }
};
