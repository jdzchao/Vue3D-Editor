<template>
    <div class="hierarchy">

        <div class="head">
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

        <div class="tree">
            <el-tree ref="tree"
                     :data="objects"
                     :props="defaultProps"
                     :expand-on-click-node="false"
                     :highlight-current="true"
                     @current-change="changeTarget"
                     node-key="uuid"
                     default-expand-all>
            </el-tree>
        </div>

        <div class="foot">
            <el-button-group class="btn-l">
                <el-button @click="appendSelected" size="small">
                    <vue-icon type="add"></vue-icon>
                </el-button>
                <el-button @click="removeSelected" size="small">
                    <vue-icon type="subtract"></vue-icon>
                </el-button>
                <el-button @click="freeSelected" size="small">
                    <vue-icon type="free"></vue-icon>
                </el-button>
            </el-button-group>
            <el-button-group class="btn-r">
                <!--<el-button type="primary" @click="preview">预览</el-button>-->
                <el-button @click="save" size="small" type="primary" :disabled="save_keep">
                    <vue-icon type="start"></vue-icon>
                </el-button>
            </el-button-group>
        </div>
    </div>
</template>

<script>

    export default {
        name: "PanelHierarchy",
        data() {
            return {
                save_text: '保存', // 保存 OR 保存中
                save_keep: false,
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
            };
        },
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
            objects: {
                get() {
                    if (this.scenes.length > 0) {
                        return this.scenes[this.scene].children
                    } else {
                        return []
                    }
                }
            }
        },
        mounted() {
            this.$vue3d.on('capture', this.captured)
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
            appendSelected() {
            },
            removeSelected() {
            },
            freeSelected() {
                this.$editor.selected = null
                this.$refs.tree.setCurrentKey(null)
            },
            save() {
            },
            captured(editor, obj) {
                if (obj) {
                    this.$refs.tree.setCurrentKey(obj.uuid)
                } else {
                    this.$refs.tree.setCurrentKey(null)
                }
            },
            changeTarget(obj) {
                this.$editor.selected = obj
            },
            changeScene(scene) {
                this.$editor.selected = null
            }
        }
    }
</script>

<style scoped>
    .hierarchy {
        width: 100%;
        height: 400px;
        position: relative;
    }

    .head {
        height: 36px;
        padding: 2px;
        text-align: center;
        vertical-align: center;
    }

    .tree {
        height: 300px;
        overflow-y: scroll;
        padding: 10px;
    }

    .tree::-webkit-scrollbar-track {
        display: none;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #F5F5F5;
    }

    .tree::-webkit-scrollbar {
        width: 3px;
        background-color: #F5F5F5;
    }

    .tree::-webkit-scrollbar-thumb {
        background-color: #545c64;
    }

    .foot {
        height: 36px;
        padding: 2px;
    }

    .foot > .btn-l {
        float: left;
    }

    .foot > .btn-r {
        float: right;
    }
</style>
