// 渲染器 && 主场景
import Vue3d from "./packages/Vue3d"
import V3dScene from "./packages/V3dScene"
// 摄像机
import V3dCameraPerspective from "./packages/V3dCameraPerspective" // 透视像机
// 几何体
import V3dGeomBox from "./packages/V3dGeomBox" // Box
import V3dGeomCylinder from "./packages/V3dGeomCylinder" // Cylinder
// 灯光
import V3dLightAmbient from "./packages/V3dLightAmbient" // Ambient Light
import V3dLightDirectional from "./packages/V3dLightDirectional" // Directional Light
import V3dLightRectArea from "./packages/V3dLightRectArea" // RectArea Light
import V3dLightSpot from "./packages/V3dLightSpot" // Spot Light
// Helper
// 工具
import Materials from './utils/Materials'
import Utils from './utils/Utils'
import Config from './config'
import editor from './editor'

export {
    Vue3d,
    V3dScene,
    V3dCameraPerspective,
    V3dGeomBox,
    V3dGeomCylinder,
    V3dLightAmbient,
    V3dLightDirectional,
    V3dLightRectArea,
    V3dLightSpot,
    // utils
    Materials,
    Config
};

/**
 * 全局加载
 */
export default {
    install: function (Vue, opt) {
        Vue.prototype.V3d$editor = editor; // 全局编辑器总线
        Vue.component("vue-3d", Vue3d);
        Vue.component("v3d-scene", V3dScene);
        Vue.component("v3d-camera-perspective", V3dCameraPerspective);
        Vue.component("v3d-geom-box", V3dGeomBox);
        Vue.component("v3d-geom-cylinder", V3dGeomCylinder);
        Vue.component("v3d-light-ambient", V3dLightAmbient);
        Vue.component("v3d-light-directional", V3dLightDirectional);
        Vue.component("v3d-light-rect-area", V3dLightRectArea);
        Vue.component("v3d-light-spot", V3dLightSpot);
    }
};
