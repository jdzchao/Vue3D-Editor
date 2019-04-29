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
            <el-select v-model="scene" placeholder="请选择" size="medium">
                <!--                <el-option-->
                <!--                        v-for="item in options"-->
                <!--                        :key="item.value"-->
                <!--                        :label="item.label"-->
                <!--                        :value="item.value"-->
                <!--                        :disabled="item.disabled">-->
                <!--                </el-option>-->
            </el-select>
            <el-button type="success" size="small">
                <vue-icon type="add"></vue-icon>
            </el-button>
            <!--<el-button type="primary" @click="preview">预览</el-button>-->


        </div>
        <div class="tree">
            <!--            <el-tree ref="tree" show-checkbox check-strictly :data="objects" @current-change="changeTarget"-->
            <!--                     :props="defaultProps" node-key="name" default-expand-all :expand-on-click-node="false"></el-tree>-->
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
    import ItemHierarchy from "../components/ItemHierarchy";

    export default {
        name: "PanelHierarchy",
        components: {ItemHierarchy},
        data() {
            return {
                scene: '',
                activeIndex: '1',
                activeIndex2: '1',
                save_text: '保存', // 保存 OR 保存中
                save_keep: false,
                objects: [],
            };
        },
        computed: {
            play: {
                get() {
                    return this.$editor.renderer.getPlay()
                }
            },
            pause: {
                get() {
                    return this.$editor.renderer.getPause()
                }
            }
        },
        methods: {
            setPlay() {
                this.$editor.renderer.setPlay();
            },
            setPause() {
                this.$editor.orbit.enabled = this.pause;
                this.$editor.selected = null;
                this.$editor.control.detach();
                this.$editor.renderer.setPause();
            },
            appendSelected() {
            },
            removeSelected() {
            },
            freeSelected() {
            },
            save() {
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
