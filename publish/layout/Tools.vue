<template>
    <div class="tools">
        <slot></slot>
        <!--        <el-tabs type="border-card" class="tabs">-->
        <!--            <el-tab-pane label="Inspector" class="panel">-->
        <!--                <panel-inspector></panel-inspector>-->
        <!--            </el-tab-pane>-->
        <!--            &lt;!&ndash;            <el-tab-pane label="Hierarchy">&ndash;&gt;-->
        <!--            &lt;!&ndash;                &lt;!&ndash;            <panel-hierarchy></panel-hierarchy>&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;            </el-tab-pane>&ndash;&gt;-->
        <!--            <slot slot-scope="label">-->

        <!--            </slot>-->
        <!--        </el-tabs>-->
    </div>
</template>

<script>
    import PanelInspector from "./Inspector"

    export default {
        name: "PanelHierarchy",
        components: {PanelInspector}
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
    }
</style>
<style>
    .tabs > .el-tabs__content {
        overflow-y: scroll;
        height: calc(100% - 69px);
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
