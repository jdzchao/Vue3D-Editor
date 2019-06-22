<template>
    <div id="vue3d-editor">
        <div class="viewport">
            <vue3d ref="editor" :width="width" :height="height" :config="config" @success="onSuccess">
                <v-component v-for="item in arr" v-bind="item"></v-component>
                <!--                <v3d-scene id="editor">-->
                <!--                    <v3d-camera-perspective :width="width" :height="height"-->
                <!--                                            :position="{x:0,y:0,z:10}"></v3d-camera-perspective>-->
                <!--                    <v3d-light-rect-area :width="100" :height="100" :intensity="1"-->
                <!--                                         :target="{x:5,y:0,z:0}" :position="{x:0,y:0,z:10}"></v3d-light-rect-area>-->
                <!--                    <v3d-geom-box :material="Materials.standard()"></v3d-geom-box>-->
                <!--                    &lt;!&ndash;                    <v3d-loader-obj path="/models/obj/Cerberus.obj" :material="Materials.standard()"></v3d-loader-obj>&ndash;&gt;-->
                <!--                </v3d-scene>-->
                <!--                <v3d-scene id="test2">-->
                <!--                    <v3d-camera-perspective :width="width" :height="height"-->
                <!--                                            :position="{x:0,y:0,z:10}"></v3d-camera-perspective>-->
                <!--                    <v3d-light-rect-area :width="100" :height="100" :intensity="1"-->
                <!--                                         :target="{x:5,y:0,z:0}" :position="{x:0,y:0,z:10}"></v3d-light-rect-area>-->
                <!--                    <v3d-geom-cylinder :material="Materials.standard()"></v3d-geom-cylinder>-->
                <!--                    &lt;!&ndash;                    <v3d-loader-obj path="/models/obj/Cerberus.obj" :material="Materials.standard()"></v3d-loader-obj>&ndash;&gt;-->
                <!--                </v3d-scene>-->
                <box-helper></box-helper>
                <grid-helper :size="100"></grid-helper>
            </vue3d>
        </div>
        <div class="side-bar" v-if="ready">
            <panel-hierarchy></panel-hierarchy>
            <panel-tools class="side-bar"></panel-tools>
        </div>
        <panel-dialog></panel-dialog>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {Materials} from '../Vue3D'
    import PanelTools from "./layout/Tools"
    import PanelHierarchy from "./layout/Hierarchy";
    import PanelDialog from "./layout/Dialog"
    import BoxHelper from "./plugins/BoxHelper";
    import GridHelper from "./plugins/GridHelper";
    import {TransformControls} from 'three/examples/jsm/controls/TransformControls'
    import VComponent from "@edt/components/VComponent";

    export default {
        name: "Vue3dEditor",
        components: {
            VComponent,
            GridHelper,
            BoxHelper,
            PanelHierarchy,
            PanelTools,
            PanelDialog
        },
        data() {
            return {
                Materials,
                width: 500,
                height: 500,
                config: {debug: false},

                core: null, // vue3d 核心组件引用
                canvas: null, // 编辑器画布
                scene: null, // 编辑器场景
                camera: null, // 编辑器像机
                renderer: null,

                orbit: null, // orbit controller
                control: null, // transform controller

                ready: false,

                arr: [
                    {
                        id: 'first', type: 'V3dScene', children: [
                            {
                                id: 'camera',
                                type: 'V3dCameraPerspective',
                                width: this.width,
                                height: this.height,
                                position: {x: 0, y: 0, z: 10}
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
                                material: Materials.standard()
                            }
                        ]
                    }
                ]
            }
        },
        computed: {
            selected: {
                get() {
                    if (!this.core && this.core.renderer.pause) return null;
                    console.log(this.core)
                    return this.core.capture.target;
                },
                set(obj) {
                    this.core.capture.target = obj;
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
</style>


