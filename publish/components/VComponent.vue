<template>
    <component :id="id" :is="type" v-bind="$attrs">
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
        watch: {
            $attrs(val) {
                console.log(val)
            }
        }
    }
</script>
