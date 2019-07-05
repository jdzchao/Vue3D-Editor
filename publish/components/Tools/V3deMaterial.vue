<template>
    <div id="v3de-material">
        <div class="title">
            <el-col :span="8">
                <vue-icon type="panel"></vue-icon>
                <span> MATERIAL </span>
            </el-col>

            <el-col :span="16">
                <el-button-group>
                    <el-select size="medium" v-model="name" placeholder="Select Material" :disabled="disabled"
                               style="width: 163px">
                        <template v-for="item,index in materials">
                            <!--                            <el-option :key="item" :label="item"-->
                            <!--                                       :value="item"></el-option>-->
                        </template>
                    </el-select>
                </el-button-group>
                <el-button-group>
                    <el-button size="small" @click="createMaterial">
                        <vue-icon type="add"></vue-icon>
                    </el-button>
                </el-button-group>
            </el-col>
        </div>

        <template v-if="!disabled">
            <component :is="material.type" :material="material"></component>
        </template>
    </div>
</template>

<script>
    import MeshStandardMaterial from './materials/MeshStandardMaterial'

    export default {
        name: "V3deMaterial",
        components: {MeshStandardMaterial},
        data() {
            return {
                handler: '',
                selected: null,
                name: '', // 当前操作的材质名称(name)
                material: {}, // 当前材质对象

                disabled: true,
            }
        },
        created() {
            this.selected = this.$editor.selected;
        },
        computed: {
            materials() {
                return this.$editor.materials
            }
        },
        watch: {
            "$editor.selected"(val) {
                if (val && val.material) {
                    this.selected = val;
                    this.material = val.material;
                    this.handler = val.handler;
                    this.disabled = false
                } else {
                    this.material = {}
                    this.disabled = true
                }
            },
        },
        methods: {
            createMaterial() {
                // this.$prompt('请输入材质名称', '提示', {
                //     confirmButtonText: '确定',
                //     cancelButtonText: '取消',
                //     inputValidator: this.validMaterialName,
                // }).then(({value}) => {
                //     let mtl = {id: value, name: value, type: 'phong'};
                //     this.$store.dispatch('AddMaterial', mtl).then(() => {
                //         this.$forceUpdate();
                //     });
                // })
            },
            validMaterialName(name) {
                if (validateName(name)) {
                    if (this.materials.hasOwnProperty(name)) {
                        return '当前材质名称已存在';
                    } else {
                        return true;
                    }
                } else {
                    return '请输入中文、英文或数字'
                }
            },
        }
    }
</script>

<style scoped>
    #v3de-material {
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
