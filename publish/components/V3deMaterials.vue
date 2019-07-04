<template>
    <div id="v3de-materials">
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

        <div id="item-materials">
            <template v-if="!disabled">
                <el-form label-width="100px" v-if="material.type==='MeshStandardMaterial'">
                    <el-divider>{{material.type}}</el-divider>

                    <el-form-item label="Color">
                        <el-col :span="6">
                            <el-form-item>
                                <el-color-picker color-format="rgb" :value="colorToString(material.color)"
                                                 @input="changeColor"></el-color-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="Emissive">
                                <el-color-picker color-format="rgb" :value="colorToString(material.emissive)"
                                                 @input="changeEmissive"></el-color-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="Transparent">
                        <el-switch :value="valueToBool(material.transparent)"
                                   @input="changeTransparent"></el-switch>
                    </el-form-item>

                    <el-form-item label="Opacity">
                        <div class="block">
                            <el-slider :value="Number(material.opacity)" @input="changeOpacity" :min="0" :max="1"
                                       :step="0.01"></el-slider>
                        </div>
                    </el-form-item>

                    <el-form-item label="Map">
                        <el-col :span="8">
                            <el-tooltip class="item" effect="dark" content="Map" placement="top">
                                <image-uploader :value="textureToSrc(material.map)"
                                                :width="60"
                                                :height="60"
                                                @input="changeMap">
                                </image-uploader>
                            </el-tooltip>
                        </el-col>
                        <el-col :span="8">
                            <el-tooltip class="item" effect="dark" content="Normal Map" placement="top">
                                <image-uploader :value="textureToSrc(material.normalMap)"
                                                :width="60"
                                                :height="60"
                                                @input="changeNormalMap">
                                </image-uploader>
                            </el-tooltip>
                        </el-col>
                        <el-col :span="8">
                            <el-tooltip class="item" effect="dark" content="Emissive Map" placement="top">
                                <image-uploader :value="textureToSrc(material.emissiveMap)"
                                                :width="60"
                                                :height="60"
                                                @input="changeEmissiveMap">
                                </image-uploader>
                            </el-tooltip>
                        </el-col>
                    </el-form-item>
                    <!--<el-form-item label="flatShading">-->
                    <!--<el-switch v-model="mtl.flatShading"></el-switch>-->
                    <!--</el-form-item>-->

                </el-form>
            </template>

        </div>
    </div>
</template>

<script>
    import * as THREE from 'three'
    import ImageUploader from './ImageUploader'

    export default {
        name: "V3deMaterials",
        components: {ImageUploader},
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
                    console.log(val.material)
                } else {
                    this.material = {}
                    this.disabled = true
                }
            },
        },
        methods: {
            colorToString(color) {
                return color.getStyle()
            },
            valueToBool(value) {
                return value === true || value === "1" || value === 1;
            },
            textureToSrc(texture) {
                if (texture && texture.hasOwnProperty('image')) {
                    return texture.image.src
                }
                return null
            },
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
            changeColor(val) {
                const color = new THREE.Color(val);
                if (this.material.color.equals(color)) return;
                this.material.color = color;
                this.$editor.core.render();
            },
            changeEmissive(val) {
                const color = new THREE.Color(val);
                if (this.material.emissive.equals(color)) return;
                this.material.emissive = color;
                this.$editor.core.render();
            },
            changeShininess(val) {
                if (this.material.data.shininess === val) return;
                this.material.data.shininess = val;
                this.material.mtl.shininess = val;
                this.$editor.core.render();
            },
            changeTransparent(val) {
                if (this.material.transparent === val) return;
                this.material.transparent = val;
                this.$editor.core.render();
            },
            changeOpacity(val) {
                if (this.material.opacity === val) return;
                this.material.opacity = val;
                this.$editor.core.render();
            },
            changeMap(val) {
                console.log(val)
                new THREE.TextureLoader().load(
                    // this.$config.image_loader(val),
                    val,
                    res => {
                        this.material.map = res;
                        this.material.map.needsUpdate = true;
                        this.$editor.core.render();
                    },
                    null,
                    err => {
                        console.log(err)
                        this.material.map = null;
                        this.$editor.core.render();
                    }
                );
            },
            changeNormalMap(val) {
                new THREE.TextureLoader().load(
                    // this.$config.image_loader(val),
                    val,
                    res => {
                        res.name = val;
                        this.material.normalMap = res;
                        this.material.normalMap.needsUpdate = true;
                        this.$editor.core.render();
                    },
                    null,
                    err => {
                        this.material.normalMap = null;
                        this.$editor.core.render();
                    }
                );
            },
            changeEmissiveMap(val) {
                new THREE.TextureLoader().load(
                    // this.$config.image_loader(val),
                    val,
                    res => {
                        res.name = val;
                        this.material.emissiveMap = res;
                        this.material.emissiveMap.needsUpdate = true;
                        this.$editor.core.render();
                    },
                    null,
                    err => {
                        this.material.emissiveMap = null;
                        this.$editor.core.render();
                    }
                );
            },

        }
    }
</script>

<style scoped>
    #v3de-materials {
        position: relative;
        width: 100%;
    }

    .title {
        width: 100%;
        height: 50px;
        line-height: 30px;
        color: #666666;
    }

    .el-form-item {
        margin-bottom: 0;
    }
</style>
