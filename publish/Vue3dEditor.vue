<template>
    <div id="vue3d-editor">
        <div class="viewport">
            <vue3d ref="editor" :width="width" :height="height" :config="$config" @success="onSuccess">
                <v3d-scene v-for="scene in data.scenes" :id="scene.id">
                    <v-component v-for="com in scene.components" v-bind="com"></v-component>
                </v3d-scene>
                <!--                <box-helper></box-helper>-->
                <grid-helper :size="100"></grid-helper>
            </vue3d>
        </div>
        <div class="side-bar" v-if="ready">
            <panel-hierarchy class="hierarchy"></panel-hierarchy>
            <panel-tools class="tools"></panel-tools>
        </div>
        <mobile-preview v-if="ready"></mobile-preview>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {TransformControls} from 'three/examples/jsm/controls/TransformControls'
    import {Bus} from '../Vue3D'
    import PanelTools from "./layout/Tools"
    import PanelHierarchy from "./layout/Hierarchy";
    import BoxHelper from "./plugins/BoxHelper";
    import GridHelper from "./plugins/GridHelper";
    import VComponent from "./components/VComponent";
    import MobilePreview from "@edt/layout/MobilePreview";

    export default {
        name: "Vue3dEditor",
        components: {
            MobilePreview,
            VComponent,
            GridHelper,
            BoxHelper,
            PanelHierarchy,
            PanelTools,
        },
        data() {
            return {
                width: 500,
                height: 500,

                core: null, // vue3d 核心组件引用
                canvas: null, // 编辑器画布
                scene: null, // 编辑器场景
                camera: null, // 编辑器像机
                renderer: null,

                orbit: null, // orbit controller
                control: null, // transform controller

                materials: {standard: Bus.mtl_standard()},

                ready: false,

            }
        },
        computed: {
            selected: {
                get() {
                    if (!this.core && this.core.renderer.pause) return null;
                    return this.core.capture.target;
                },
                set(obj) {
                    this.core.capture.target = obj;
                }
            },
            data() {
                return {
                    version: 0.1,
                    materials: [],
                    scenes: [
                        {
                            id: 'editor',
                            components: [
                                {
                                    id: 'camera',
                                    type: 'V3dCameraPerspective',
                                    width: this.width,
                                    height: this.height,
                                    position: {x: 0, y: 0, z: 10},
                                    near: 0.1,
                                    far: 2000,
                                },
                                {
                                    id: 'light',
                                    type: 'V3dLightRectArea',
                                    width: 100,
                                    height: 100,
                                    intensity: 1,
                                    target: {x: 5, y: 0, z: 0},
                                    position: {x: 0, y: 0, z: 10}
                                },
                                {
                                    id: 'box',
                                    type: 'V3dGeomBox',
                                    material: Bus.mtl_standard()
                                }
                            ]
                        }
                    ]
                }
            }
        },
        mounted() {
            Vue.prototype.$editor = this;

            this.core = this.$refs.editor;
            this.canvas = this.core.$data.$_canvas;
            this.scene = this.core.$data.$_scene;
            this.camera = this.core.$data.$_camera;
            this.renderer = this.core.$data.renderer;
            this.camera.position.z = 10;
            this.orbit = this.core.orbit;

            // set TransformControls
            this.control = new TransformControls(this.camera, this.canvas);
            this.control.addEventListener('change', this.render);
            this.control.update = this.render;
            this.control.addEventListener('dragging-changed', (event) => {
                this.orbit.control.enabled = !event.value;
            });
            this.scene.add(this.control);

            // resize
            this.onResize();
            window.addEventListener("resize", this.onResize);
            this.$vue3d.on('capture', this.setAttach);
        },
        methods: {
            setAttach(editor, obj) {
                try {
                    if (obj) {
                        this.control.attach(obj);
                    } else {
                        this.control.detach();
                    }
                } catch (err) {
                    console.error(err);
                }
            },
            render() {
                this.renderer.render();
            },
            onResize() {
                const viewport = document.querySelector(".viewport");
                this.width = viewport.clientWidth;
                this.height = viewport.clientHeight;
            },
            onSuccess() {
                this.ready = true;
            }
        },

    }
</script>

<style scoped>
    #vue3d-editor {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .viewport {
        float: left;
        width: calc(100% - 350px);
        height: 100%;
        overflow: hidden;
        background-color: #000000;
    }

    .side-bar {
        float: left;
        width: 350px;
        height: 100%;
        overflow: hidden;
    }

    .hierarchy {
        width: 100%;
        height: 50%;
        position: relative;
    }

    .tools {
        width: 100%;
        height: 50%;
        position: relative;
    }
</style>


