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
        methods: {
            update(val) {
                this.$attrs[val.attr] = val.value

                // this.$attrs.position.x++;
                // console.log(this.$attrs.position)
                this.$emit('synced', val)
            },

        },
        watch: {
            $attrs: {
                handler(val) {
                    console.log(val)
                },
                deep: true
            }
        }
    }
</script>
