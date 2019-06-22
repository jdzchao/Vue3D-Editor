<template>
    <component :id="id" :is="type">
        <v-component v-for="item in children" v-bind="item"></v-component>
    </component>
</template>

<script>
    export default {
        name: "VComponent",
        props: {
            id: {type: String},
            type: {type: String},
            children: {type: Array}
        }
    }
</script>

<style scoped>

</style>
