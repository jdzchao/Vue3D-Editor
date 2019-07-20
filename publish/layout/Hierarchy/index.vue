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
                <el-button @click="save" size="small" type="primary" :loading="saving">
                    <vue-icon type="start"></vue-icon>
                </el-button>
            </el-button-group>
        </div>
        <hd-add :visible.sync="adding"></hd-add>
    </div>
</template>

<script>

    import HiTree from "./HiTree";
    import HiScenes from "./HiScenes";
    import HdAdd from "@edt/layout/Hierarchy/HdAdd";

    export default {
        name: "PanelHierarchy",
        components: {HdAdd, HiScenes, HiTree},
        data() {
            return {
                adding: false,
                saving: false,
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
                this.adding = !this.adding
            },
            removeSelected() {
                if (this.$editor.selected) {
                    this.$editor.selected.parent.remove(this.$editor.selected)
                    this.freeSelected()
                    this.$editor.render()
                }
            },
            freeSelected() {
                this.$editor.selected = null
            },
            save() {
                this.saving = !this.saving
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
