<template>
    <component ref="obj" :id="id" :is="type" v-bind="$attrs">
        <v-component v-for="com in children" v-bind="com"></v-component>
    </component>
</template>

<script>
    export default {
        name: "VComponent",
        props: {
            id: {type: String},
            type: {type: String},
            children: {type: Array}
        },
        mounted() {
            console.log(this.$refs.obj.$props)
        },
        watch: {}
    }
</script>
