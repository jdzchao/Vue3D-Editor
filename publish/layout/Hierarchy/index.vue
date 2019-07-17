<template>
    <div class="hierarchy">

        <hi-scenes></hi-scenes>
        <hi-tree></hi-tree>

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

    import HiTree from "./HiTree";
    import HiScenes from "./HiScenes";

    export default {
        name: "PanelHierarchy",
        components: {HiScenes, HiTree},
        data() {
            return {
                save_text: '保存', // 保存 OR 保存中
                save_keep: false,
            };
        },
        watch: {
            "$editor.selected"(val, oldVal) {
                if (val && val.hasOwnProperty('helper')) {
                    val.helper.visible = true
                }
                if (oldVal && oldVal.hasOwnProperty('helper')) {
                    oldVal.helper.visible = false
                }
            },
        },
        methods: {
            appendSelected() {
            },
            removeSelected() {
                this.$editor.selected.parent.remove(this.$editor.selected)
                this.freeSelected()
                this.$editor.render()
            },
            freeSelected() {
                this.$editor.selected = null
            },
            save() {
            },


        }
    }
</script>

<style scoped>


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
