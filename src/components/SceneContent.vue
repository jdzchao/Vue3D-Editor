<template>
    <div id="content">
        <vue3d-editor></vue3d-editor>
    </div>
</template>

<script>
    export default {
        name: "SceneContent",
    }
</script>

<style scoped>
    #content {
        width: 100%;
        height: calc(100% - 90px);
    }
</style>
