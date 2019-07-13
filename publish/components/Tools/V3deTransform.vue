<template>
    <div id="v3de-transform">
        <div class="title">
            <vue-icon type="panel"></vue-icon>
            <span> TRANSFORM </span>
        </div>
        <!--Tools-->
        <div class="buttons">
            <el-button-group>
                <el-button @click="reset" :disabled="disabled">
                    <vue-icon type="reset"></vue-icon>
                </el-button>
            </el-button-group>
            <el-radio-group v-model="mode" @change="changeMode" style="float:right">
                <el-radio-button label="translate" :disabled="disabled">
                    <vue-icon type="translate"></vue-icon>
                </el-radio-button>
                <el-radio-button label="rotate" :disabled="disabled">
                    <vue-icon type="rotation"></vue-icon>
                </el-radio-button>
                <el-radio-button label="scale" :disabled="disabled">
                    <vue-icon type="scale"></vue-icon>
                </el-radio-button>
            </el-radio-group>
        </div>
        <!--Position-->
        <div class="tf-group">
            <div class="input-group">
                <label>Position</label>
                <el-input-number v-model="position.x" :disabled="disabled" size="mini"
                                 controls-position="right"></el-input-number>
                <el-input-number v-model="position.y" :disabled="disabled" size="mini"
                                 controls-position="right"></el-input-number>
                <el-input-number v-model="position.z" :disabled="disabled" size="mini"
                                 controls-position="right"></el-input-number>
            </div>
        </div>
        <!--Rotation-->
        <div class="tf-group">
            <div class="input-group">
                <label>Rotation</label>
                <el-input-number v-model="axis.x" @change="setAxisX" :disabled="disabled" size="mini"
                                 controls-position="right"></el-input-number>
                <el-input-number v-model="axis.y" @change="setAxisY" :disabled="disabled" size="mini"
                                 controls-position="right"></el-input-number>
                <el-input-number v-model="axis.z" @change="setAxisZ" :disabled="disabled" size="mini"
                                 controls-position="right"></el-input-number>
            </div>
        </div>
        <!--Scale-->
        <div class="tf-group">
            <div class="input-group">
                <label>Scale</label>
                <el-input-number v-model="scale.x" :step="0.1" :disabled="disabled" size="mini"
                                 controls-position="right"></el-input-number>
                <el-input-number v-model="scale.y" :step="0.1" :disabled="disabled" size="mini"
                                 controls-position="right"></el-input-number>
                <el-input-number v-model="scale.z" :step="0.1" :disabled="disabled" size="mini"
                                 controls-position="right"></el-input-number>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "V3deTransform",
        data() {
            return {
                handler: '',
                mode: 'translate',
                position: {x: 0, y: 0, z: 0},
                rotation: {x: 0, y: 0, z: 0},
                scale: {x: 1, y: 1, z: 1},
                axis: {x: 0, y: 0, z: 0},
                selected: null,
                disabled: true,
            }
        },
        created() {
            this.selected = this.$editor.selected;
            this.mode = this.$editor.control.mode;
        },
        watch: {
            "$editor.selected"(val) {
                if (val) {
                    this.selected = val;
                    this.handler = val.handler;
                    this.position = val.position;
                    this.rotation = val.rotation;
                    this.scale = val.scale;
                    this.disabled = false
                } else {
                    this.disabled = true
                }
            },
            position: {
                deep: true,
                handler(val, oldVal) {
                    if (!this.selected && val === oldVal) return;
                    this.position.x = parseFloat(val.x.toFixed(2));
                    this.position.y = parseFloat(val.y.toFixed(2));
                    this.position.z = parseFloat(val.z.toFixed(2));
                    this.sync();
                }
            },
            rotation: {
                deep: true,
                handler(val, oldVal) {
                    if (!this.selected && val === oldVal) return;
                    this.axis.x = Math.round((val.x * 180 / Math.PI));
                    this.axis.y = Math.round((val.y * 180 / Math.PI));
                    this.axis.z = Math.round((val.z * 180 / Math.PI));
                    this.sync();
                }
            },
            scale: {
                deep: true,
                handler(val, oldVal) {
                    if (!this.selected && val === oldVal) return;
                    this.scale.x = parseFloat(val.x.toFixed(2));
                    this.scale.y = parseFloat(val.y.toFixed(2));
                    this.scale.z = parseFloat(val.z.toFixed(2));
                    this.sync();
                }
            },
        },
        methods: {
            reset() {
                this.position.x = 0;
                this.position.y = 0;
                this.position.z = 0;
                this.rotation.x = 0;
                this.rotation.y = 0;
                this.rotation.z = 0;
                this.scale.x = 1;
                this.scale.y = 1;
                this.scale.z = 1;
            },
            setAxisX(n) {
                this.rotation.x = parseFloat((n * Math.PI / 180).toFixed(2));
                this.$editor.render();
            },
            setAxisY(n) {
                this.rotation.y = parseFloat((n * Math.PI / 180).toFixed(2));
            },
            setAxisZ(n) {
                this.rotation.z = parseFloat((n * Math.PI / 180).toFixed(2));
            },
            changeMode(mode) {
                this.$editor.control.setMode(mode)
            },
            sync() {
                this.$editor.render();
            }
        }
    }
</script>

<style scoped>
    #v3de-transform {
        position: relative;
        width: 100%;
    }

    .title {
        width: 100%;
        height: 50px;
        line-height: 30px;
        color: #666666;
    }

    .buttons {
        width: 100%;
        margin: 0 0 5px 0;
    }

    .tf-group {
        background-color: #F5F7FA;
        text-align: center;
        overflow: hidden;
        line-height: 10px;
        border-radius: 4px;
        border: 1px solid #d3d3d3;
        margin: 0 0 5px 0;
    }

    .tf-group label {
        display: block;
        height: 15px;
        width: 100%;
        font-size: 12px;
        line-height: 15px;
        color: #999999;
    }

    .el-input-number {
        width: 100px;
        margin: 0 1px 0 0;
    }

    .el-form-item {
        margin: 0 0 5px 0;
    }
</style>
<style>
    #v3de-transform .el-input-number.is-controls-right .el-input__inner {
        padding-left: 5px;
        padding-right: 35px;
    }
</style>
