<template>
    <div id="panel-scene">

    </div>
</template>

<script>
    import {Materials, Bus} from 'vue3d'
    // import CLoader from '../extend/CLoader'
    // import CMaterial from '../extend/CMaterial'

    export default {
        name: "PanelScene",
        data() {
            return {
                width: 100,
                height: 100,
                position: {x: 0, y: 0, z: 0},
                rotation: {x: 0, y: 0, z: 0},
                scale: {x: 1, y: 1, z: 1},
                Materials,
                config: Bus.config,
                plugins: {box: true, grid: true}
            }
        },
        methods: {
            sceneResize() {
                this.width = this.$el.clientWidth;
                this.height = this.$el.clientHeight;
            },
            debug(obj) {
                console.log(obj)
            },
            setCamera(camera) {
                camera.position.z = 50;
            },
            cast(obj) {
                console.log(obj)
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
            this.$editor.editor = this.$refs.editor;
            console.log(this.$editor.editor)
            this.resize();
            window.addEventListener("resize", this.resize);
        },
    }
</script>

<style scoped>
    #panel-scene {
        width: 100%;
        height: 100%;
    }
</style>
