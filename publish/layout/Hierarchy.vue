<template>
    <div class="hierarchy">
        <div class="head">Hierarchy</div>
        <div class="tree">
<!--            <el-tree ref="tree" show-checkbox check-strictly :data="objects" @current-change="changeTarget"-->
<!--                     :props="defaultProps" node-key="name" default-expand-all :expand-on-click-node="false"></el-tree>-->
        </div>
        <div class="menu">
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
                activeIndex: '1',
                activeIndex2: '1',
                save_text: '保存', // 保存 OR 保存中
                save_keep: false,
                objects: [{
                    id: 1,
                    label: '一级 2',
                    children: [{
                            id: 3,
                            label: '二级 2-1',
                            children: [{
                                id: 4,
                                label: '三级 3-1-1'
                            }, {
                                id: 5,
                                label: '三级 3-1-2',
                                disabled: true
                            },{
                                id: 5,
                                label: '三级 3-1-2',
                                disabled: true
                            },{
                                id: 5,
                                label: '三级 3-1-2',
                                disabled: true
                            },{
                                id: 5,
                                label: '三级 3-1-2',
                                disabled: true
                            },{
                                id: 5,
                                label: '三级 3-1-2',
                                disabled: true
                            },{
                                id: 5,
                                label: '三级 3-1-2',
                                disabled: true
                            },{
                                id: 5,
                                label: '三级 3-1-2',
                                disabled: true
                            },{
                                id: 5,
                                label: '三级 3-1-2',
                                disabled: true
                            },{
                                id: 5,
                                label: '三级 3-1-2',
                                disabled: true
                            }]
                    }, {
                        id: 2,
                        label: '二级 2-2',
                        disabled: true,
                        children: [{
                            id: 6,
                            label: '三级 3-2-1'
                        }, {
                            id: 7,
                            label: '三级 3-2-2',
                            disabled: true
                        }]
                    }]
                }],
            };
        }
    }
</script>

<style scoped>
    .hierarchy {
        width: 100%;
        height: 380px;
        position: relative;
    }

    .title{
        height: 28px;
        line-height: 28px;
        background-color: #545C64;
        text-align: center;
        color: #ffffff;
    }

    .tree {
        height: 300px;
        overflow-y: scroll;
        padding: 10px;
    }

    .tree::-webkit-scrollbar-track {
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

    .menu {
        height: 39px;
    }

    .btn-l {
        float: left;
        margin: 2px 2px 1px 2px;
    }

    .btn-r {
        float: right;
        margin: 2px 2px 1px 2px;
    }

    .el-divider {
        position: absolute;
        top: 0;
        margin: 0;
        z-index: 99;
    }
</style>
