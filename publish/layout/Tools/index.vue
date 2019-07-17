<template>
    <div class="tools">
        <el-tabs type="border-card" class="tabs">

            <el-tab-pane>
                <vue-icon type="transform" slot="label"></vue-icon>
                <v3de-transform></v3de-transform>
            </el-tab-pane>

            <el-tab-pane>
                <vue-icon type="materials" slot="label"></vue-icon>
                <v3de-material class="scroll"></v3de-material>
            </el-tab-pane>

            <el-tab-pane>
                <vue-icon type="setting" slot="label"></vue-icon>
                <v3de-setting/>
            </el-tab-pane>

        </el-tabs>
    </div>
</template>

<script>
    import V3deTransform from "./V3deTransform";
    import V3deMaterial from "./V3deMaterial";
    import V3deSetting from "./V3deSetting";

    export default {
        name: "PanelTools",
        components: {V3deSetting, V3deMaterial, V3deTransform}
    }
</script>
<style scoped>
    .tools {
        width: 100%;
        height: calc(100% - 390px);
    }

    .tabs {
        height: 100%;
        border: 0;
        border-top: 1px solid #E4E7ED;
    }
</style>
<style>
    .tabs > .el-tabs__content {
        overflow-y: scroll;
        height: calc(100% - 69px);
    }

    .tabs > .el-tabs__content::-webkit-scrollbar-track {
        display: none;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #F5F5F5;
    }

    .tabs > .el-tabs__content::-webkit-scrollbar {
        width: 3px;
        background-color: #F5F5F5;
    }

    .tabs > .el-tabs__content::-webkit-scrollbar-thumb {
        background-color: #545c64;
    }
</style>
