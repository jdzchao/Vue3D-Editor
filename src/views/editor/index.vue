<template>
    <vue3d-editor/>
</template>

<script>

    export default {
        name: "vue3d",
        data() {
            return {
                id: this.$route.query.id
            }
        },
        methods: {
            load() {
                // this.$store.dispatch('LoadSceneData', {id: this.id}).then()
            }
        },
        mounted() {
            this.load();
        }
    }
</script>
