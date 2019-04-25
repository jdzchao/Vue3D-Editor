<template>
    <div id="panel-scene">
        <vue3d ref="scene" :width="width" :height="height" :config="config" :plugins="plugins">
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
            console.log(this.$refs.scene.$data.$_scene, this.$refs.scene.scene);
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
