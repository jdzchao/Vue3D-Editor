<template>
    <div id="v3de-setting">
        <div class="title">
            <el-col>
                <vue-icon type="panel"></vue-icon>
                <span> SETTING </span>
            </el-col>
        </div>

        <template v-if="!disabled">
            <component :is="setting.type" :setting="setting"></component>
        </template>

    </div>
</template>

<script>
    export default {
        name: "V3deSetting",
        data() {
            return {
                selected: {},
                disabled: true,
            }
        },
        created() {
            this.selected = this.$editor.selected;
        },
        watch: {
            "$editor.selected"(val) {
                // if (val && val.material) {
                //     this.selected = val;
                //     this.disabled = false
                // } else {
                //     this.selected = {}
                //     this.disabled = true
                // }
            },
        },
    }
</script>

<style scoped>
    #v3de-setting {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .title {
        width: 100%;
        height: 50px;
        line-height: 30px;
        color: #666666;
    }
</style>
