<template>
    <component :id="id" :is="type" v-bind="$attrs" @update="update">
        <v-component v-for="com in children" v-bind="com" @synced="onSynced(com,$event)"></v-component>
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
        methods: {
            update(val) {
                this.$attrs[val.attr] = val.value
                this.$emit('synced', val)
            },
            onSynced(obj, val) {
                obj[val.attr] = val.value
                console.log(obj)
            }
        }
    }
</script>
