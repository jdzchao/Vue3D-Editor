<template>
    <div id="vue3d-editor">
        <div class="viewport">
            <vue3d id="editor" :width="width" :height="height" :plugins="plugins">
                <slot></slot>
            </vue3d>
            <!--            <panel-scene></panel-scene>-->
        </div>
        <div class="tools">
            <el-tabs type="border-card" class="tabs">
                <!--                <el-tab-pane label="Inspector">-->
                <!--                    <panel-inspector></panel-inspector>-->
                <!--                </el-tab-pane>-->
                <!--                <el-tab-pane label="Hierarchy">-->
                <!--                    <panel-hierarchy></panel-hierarchy>-->
                <!--                </el-tab-pane>-->
                <slot slot-scope="label">

                </slot>
            </el-tabs>
            <panel-menu></panel-menu>
        </div>
<!--        <panel-dialog></panel-dialog>-->
    </div>
</template>

<script>
    // import Vue3d from "@/views/editor/index";
    import PanelScene from "./layout/Scene";
    import PanelInspector from "./layout/Inspector";
    import PanelHierarchy from "./layout/Hierarchy";
    import PanelMenu from "./layout/Menu"
    import PanelDialog from "./layout/Dialog";
    // import core from './core'
    import {Materials} from 'vue3d'

    export default {
        name: "Vue3dEditor",
        components: {
            PanelScene, PanelInspector, PanelHierarchy, PanelMenu, PanelDialog
        },
        data() {
            return {
                width: 100,
                height: 100,
                position: {x: 0, y: 0, z: 0},
                rotation: {x: 0, y: 0, z: 0},
                scale: {x: 1, y: 1, z: 1},
                Materials,
                plugins: {box: true, grid: true}
            }
        },
        methods: {
            setCamera(camera) {
                camera.position.z = 50;
            },
            resize() {
                this.width = this.$el.clientWidth;
                this.height = this.$el.clientHeight;
            },
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
        mounted() {
            console.log(this.$parent)
            console.log(this.$refs.scene.$data.$_scene, this.$refs.scene.scene);
            this.resize();
            window.addEventListener("resize", this.resize);
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

    .tools {
        float: left;
        width: 350px;
        height: 100%;
        overflow: hidden;
    }

    .tabs {
        width: 100%;
        height: calc(100% - 61px);
    }

</style>
<style>
    .tabs .el-tabs__content {
        overflow-y: scroll;
        height: calc(100% - 39px);
    }

    .tabs .el-tabs__content::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #F5F5F5;
    }

    .tabs .el-tabs__content::-webkit-scrollbar {
        width: 3px;
        background-color: #F5F5F5;
    }

    .tabs .el-tabs__content::-webkit-scrollbar-thumb {
        background-color: #545c64;
    }
</style>

