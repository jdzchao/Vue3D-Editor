<template>
    <el-form label-width="100px">
        <el-divider>{{material.type}}</el-divider>

        <el-form-item label="FlatShading">
            <el-switch v-model="material.flatShading"></el-switch>
        </el-form-item>

        <el-form-item label="Color">
            <el-col :span="6">
                <el-form-item>
                    <el-color-picker
                            color-format="rgb"
                            :value="colorToString(material.color)"
                            @input="changeColor">
                    </el-color-picker>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="Emissive">
                    <el-color-picker
                            color-format="rgb"
                            :value="colorToString(material.emissive)"
                            @input="changeEmissive">
                    </el-color-picker>
                </el-form-item>
            </el-col>
        </el-form-item>

        <el-form-item label="Transparent">
            <el-switch
                    :value="valueToBool(material.transparent)"
                    @input="changeTransparent">
            </el-switch>
        </el-form-item>

        <el-form-item label="Opacity">
            <div class="block">
                <el-slider
                        :value="Number(material.opacity)"
                        :min="0"
                        :max="1"
                        :step="0.01"
                        @input="changeOpacity">
                </el-slider>
            </div>
        </el-form-item>

        <el-form-item label="Map">
            <el-col :span="8">
                <el-tooltip class="item" effect="dark" content="Map" placement="top">
                    <image-uploader
                            :value="textureToSrc(material.map)"
                            :width="60"
                            :height="60"
                            @input="changeMap">
                    </image-uploader>
                </el-tooltip>
            </el-col>
            <el-col :span="8">
                <el-tooltip class="item" effect="dark" content="Normal Map" placement="top">
                    <image-uploader
                            :value="textureToSrc(material.normalMap)"
                            :width="60"
                            :height="60"
                            @input="changeNormalMap">
                    </image-uploader>
                </el-tooltip>
            </el-col>
            <el-col :span="8">
                <el-tooltip class="item" effect="dark" content="Emissive Map" placement="top">
                    <image-uploader
                            :value="textureToSrc(material.emissiveMap)"
                            :width="60"
                            :height="60"
                            @input="changeEmissiveMap">
                    </image-uploader>
                </el-tooltip>
            </el-col>
        </el-form-item>

    </el-form>
</template>

<script>
    import * as THREE from 'three'
    import ImageUploader from '../../../components/Uploader/ImageUploader'

    export default {
        name: "MeshStandardMaterial",
        components: {ImageUploader},
        props: {material: {type: Object}},
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
                new THREE.TextureLoader().load(
                    val,
                    res => {
                        this.material.map = res;
                        this.material.map.needsUpdate = true;
                        this.material.needsUpdate = true;
                        this.$editor.core.render();
                    },
                    null,
                    err => {
                        this.material.map = null;
                        this.material.needsUpdate = true;
                        this.$editor.core.render();
                    }
                );
            },
            changeNormalMap(val) {
                new THREE.TextureLoader().load(
                    val,
                    res => {
                        res.name = val;
                        this.material.normalMap = res;
                        this.material.normalMap.needsUpdate = true;
                        this.material.needsUpdate = true;
                        this.$editor.core.render();
                    },
                    null,
                    err => {
                        this.material.normalMap = null;
                        this.material.needsUpdate = true;
                        this.$editor.core.render();
                    }
                );
            },
            changeEmissiveMap(val) {
                new THREE.TextureLoader().load(
                    val,
                    res => {
                        res.name = val;
                        this.material.emissiveMap = res;
                        this.material.emissiveMap.needsUpdate = true;
                        this.material.needsUpdate = true;
                        this.$editor.core.render();
                    },
                    null,
                    err => {
                        this.material.emissiveMap = null;
                        this.material.needsUpdate = true;
                        this.$editor.core.render();
                    }
                );

            }
        }
    }
</script>

<style scoped>
    .el-form-item {
        margin-bottom: 0;
    }
</style>
