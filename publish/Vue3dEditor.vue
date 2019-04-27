<template>
    <div id="vue3d-editor">
        <div class="viewport">
            <vue3d ref="editor" :width="width" :height="height" :config="config" :plugins="plugins">
                <v3d-scene id="scene">
                    <v3d-light-rect-area :width="100" :height="100" :intensity="1"
                                         :target="{x:5,y:0,z:0}" :position="{x:0,y:0,z:10}"></v3d-light-rect-area>
                    <v3d-geom-cylinder :material="Materials.standard()" :radialSegments="50"></v3d-geom-cylinder>
                    <!--                <v3d-camera-perspective ref="camera" :dis="10" :size="1" :x="0" :y="0" :width="500" :height="500"-->
                    <!--                                        @ready="setCamera">-->
                    <!--                </v3d-camera-perspective>-->
                </v3d-scene>
            </vue3d>
        </div>
        <panel-tools class="side-bar"></panel-tools>
        <panel-dialog></panel-dialog>
    </div>
</template>

<script>
    import PanelTools from "./layout/Tools"
    import PanelDialog from "./layout/Dialog"
    import {Materials} from 'vue3d'
    import {TransformControls} from './extend/TransformControls'

    export default {
        name: "Vue3dEditor",
        components: {
            PanelTools, PanelDialog
        },
        data() {
            return {
                Materials,
                width: 500,
                height: 500,
                config: {debug: false},
                plugins: {box: true, grid: true},

                canvas: null, // 编辑器画布
                scene: null, // 编辑器场景
                camera: null, // 编辑器像机
                control: null, // 控制器
            }
        },
        mounted() {
            // resize
            this.resize();
            window.addEventListener("resize", this.resize);
            // set Vue3D
            this.$editor.v3d = this.$refs.editor;
            this.canvas = this.$editor.v3d.$data.$_canvas;
            this.scene = this.$editor.v3d.$data.$_scene;
            this.camera = this.$editor.v3d.$data.$_camera;
            this.camera.position.z = 10;
            let orbit = this.$editor.v3d.renderer.orbit_get()
            // set TransformControls
            this.control = new TransformControls(this.camera, this.canvas);
            this.control.addEventListener('change', this.renderControl);
            this.control.update = this.renderControl;
            this.control.addEventListener('dragging-changed', function (event) {
                orbit.enabled = !event.value;
            });
            this.scene.add(this.control);
            //
            this.$vue3d.on('capture', this.setAttach)
        },
        methods: {
            setAttach(editor, obj) {
                try {
                    if (obj) {
                        // this.control.attach(obj.object);
                    } else {
                        // this.control.detach();
                    }
                } catch (err) {
                    console.error(err);
                }

            },
            resize() {
                const viewport = document.querySelector(".viewport")
                this.width = viewport.clientWidth;
                this.height = viewport.clientHeight;
            },
            renderControl() {
                this.control.update();
                this.$editor.v3d.renderer.render();
            }
        },
        watch: {
            selectedObj(val, oldVal) {
                if (val && val !== oldVal) {
                    this.position = val.position;
                    this.rotation = val.rotation;
                    this.scale = val.scale;
                }
            },
            position: {
                deep: true,
                handler() {
                    if (!this.selectedObj) return;
                    this.render();
                }
            },
            rotation: {
                deep: true,
                handler() {
                    if (!this.selectedObj) return;
                    this.render();
                }
            },
            scale: {
                deep: true,
                handler() {
                    if (!this.selectedObj) return;
                    this.render();
                }
            },
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


