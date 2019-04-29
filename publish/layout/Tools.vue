<template>
    <div class="tools">
        <!--        <panel-hierarchy></panel-hierarchy>-->
        <el-tabs type="border-card" class="tabs">
            <el-tab-pane>
                <span slot="label">
                    <vue-icon type="transform"></vue-icon></span>
                <v3de-transform></v3de-transform>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label">
                    <vue-icon type="materials"></vue-icon></span>
                <v3de-materials></v3de-materials>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import V3deTransform from "../components/V3deTransform";
    import V3deMaterials from "../components/V3deMaterials";

    export default {
        name: "PanelTools",
        components: {V3deMaterials, V3deTransform}
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
        padding: 0
    }

    .tabs > .el-tabs__content::-webkit-scrollbar-track {
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
