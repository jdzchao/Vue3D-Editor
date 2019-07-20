<template>
    <el-dialog id="HdAdd" title="Add Object3D" :modal="false" :fullscreen="true" :visible.sync="opening">
        <el-row>
            <drag-uploader @success="onUploaded"/>
        </el-row>
        <el-row>
            <el-col style="cursor: pointer" :span="4" v-for="(item,index) in objects" :key="item.key">
                <el-card :body-style="{ padding: '2px' }" shadow="hover">
                    <img :src="item.thumbnail" class="image">
                    <el-divider>{{item.name}}</el-divider>
                </el-card>
            </el-col>
        </el-row>
    </el-dialog>
</template>

<script>
    import ImageUploader from "@edt/components/Uploader/ImageUploader";
    import DragUploader from "@edt/components/Uploader/DragUploader";

    export default {
        name: "HdAdd",
        components: {DragUploader, ImageUploader},
        props: {
            visible: {type: Boolean, default: false}
        },
        data() {
            return {
                objects: [
                    {
                        key: 'V3dBoxGeomBox',
                        name: 'Cube',
                        thumbnail: '/logo.png'
                    }
                ]
            }
        },
        computed: {
            opening: {
                get() {
                    return this.visible
                },
                set(val) {
                    this.$emit("update:visible", val)
                }
            }
        },
        methods: {
            onUploaded(obj) {
                console.log(obj)
            }
        }
    }
</script>
<style>
    #HdAdd .image {
        width: 100%;
        display: block;
    }

    #HdAdd .el-dialog__header {
        background-color: #409EFF;

    }

    #HdAdd .el-dialog__title {
        color: #ffffff;
    }

    #HdAdd .el-dialog__close {
        color: #ffffff
    }

    #HdAdd .el-divider__text {
        font-weight: bold;
    }
</style>
