<template>
    <div id="vue3d-editor">
        <div class="viewport">
            <vue3d ref="editor" :width="width" :height="height" :config="config" :plugins="plugins"
                   @success="onSuccess">
                <v3d-scene id="editor">
                    <v3d-camera-perspective :width="width" :height="height"
                                            :position="{x:0,y:0,z:10}"></v3d-camera-perspective>
                    <v3d-light-rect-area :width="100" :height="100" :intensity="1"
                                         :target="{x:5,y:0,z:0}" :position="{x:0,y:0,z:10}"></v3d-light-rect-area>
                    <v3d-geom-box :material="Materials.standard()">
                        <v3d-geom-box :material="Materials.standard()"></v3d-geom-box>
                    </v3d-geom-box>
                    <!--                    <v3d-loader-obj path="/models/obj/Cerberus.obj" :material="Materials.standard()"></v3d-loader-obj>-->
                </v3d-scene>
            </vue3d>
        </div>
        <div class="side-bar" v-if="load">
            <panel-hierarchy></panel-hierarchy>
            <panel-tools class="side-bar"></panel-tools>
        </div>
        <panel-dialog></panel-dialog>
    </div>
</template>

<script>
    import {Materials} from 'vue3d'
    import PanelTools from "./layout/Tools"
    import PanelHierarchy from "./layout/Hierarchy";
    import PanelDialog from "./layout/Dialog"
    import V3dGeomBox from "../Vue3D/packages/V3dGeomBox/V3dGeomBox";
    import V3dCameraPerspective from "../Vue3D/packages/V3dCameraPerspective/V3dCameraPerspective";

    export default {
        name: "Vue3dEditor",
        components: {V3dCameraPerspective, V3dGeomBox, PanelHierarchy, PanelTools, PanelDialog},
        data() {
            return {
                Materials,
                width: 500,
                height: 500,
                config: {debug: false},
                plugins: {box: true, grid: true},
                load: false,
            }
        },
        mounted() {
            // resize
            this.resize();
            window.addEventListener("resize", this.resize);
            // set Vue3D
            this.$editor.init(this.$refs.editor);
        },
        methods: {
            resize() {
                const viewport = document.querySelector(".viewport")
                this.width = viewport.clientWidth;
                this.height = viewport.clientHeight;
            },
            onSuccess() {
                this.load = true;
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


