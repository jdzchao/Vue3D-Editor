<template>
    <i :class="`vue3d-icon vue3d-${type}`" :style="styles"></i>
</template>

<script>
    import "../../assets/vue-icon/iconfont.css"

    export default {
        name: 'IconFont',
        props: {
            type: {
                type: String,
                required: true
            },
            color: {
                type: String,
                default: 'auto'
            },
            size: {
                type: Number,
                default: 16
            }
        },
        computed: {
            styles() {
                return {
                    fontSize: `${this.size}px`,
                    color: this.color
                }
            }
        }
    }
</script>
