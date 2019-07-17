<template>
    <div class="scenes">
        <el-button-group>
            <el-button @click="setPlay" :type="play?'primary':'info'" size="small">
                <vue-icon type="stop" v-if="play"></vue-icon>
                <vue-icon type="play" v-else></vue-icon>
            </el-button>
            <el-button @click="setPause" :type="pause?'primary':'info'" size="small">
                <vue-icon type="pause"></vue-icon>
            </el-button>
        </el-button-group>
        <el-button-group>
            <el-select v-model="scene" size="medium" @change="changeScene">
                <el-option v-for="item,index in scenes"
                           :key="item.uuid"
                           :label="item.name"
                           :value="index"
                ></el-option>
            </el-select>
        </el-button-group>
        <el-button-group>
            <el-button type="success" size="small">
                <vue-icon type="add"></vue-icon>
            </el-button>
        </el-button-group>
    </div>
</template>

<script>
    export default {
        name: "HiScenes",
        computed: {
            play: {
                get() {
                    return this.$editor.core.play
                }
            },
            pause: {
                get() {
                    return this.$editor.renderer.pause
                }
            },
            scenes: {
                get() {
                    return this.$editor.core.scenes.manager
                }
            },
            scene: {
                get() {
                    return this.$editor.core.scenes.index
                },
                set(val) {
                    this.$editor.core.scenes.change(val)
                    this.$editor.core.render();
                }
            },
        },
        methods: {
            setPlay() {
                this.$editor.core.play = !this.$editor.core.play
                this.$editor.control.enabled = !this.play
            },
            setPause() {
                this.$editor.orbit.enabled = this.pause
                this.$editor.control.enabled = this.pause
                this.$editor.renderer.pause = !this.pause
            },
            changeScene(scene) {
                this.freeSelected()
            },
            freeSelected() {
                this.$editor.selected = null
            },
        }
    }
</script>

<style scoped>
    .scenes {
        height: 36px;
        padding: 2px;
        text-align: center;
        vertical-align: center;
    }
</style>
