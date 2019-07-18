<template>
    <el-dialog id="HdAdd" title="Add Object3D" :modal="false" :fullscreen="true" :visible.sync="opening">
        <el-row>
            <drag-uploader/>
        </el-row>
        <el-row>
            <el-col :span="4" v-for="(o, index) in 2" :key="o">
                <el-card :body-style="{ padding: '2px' }" shadow="hover">
                    <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                         class="image">
                    <div style="padding: 10px;">
                        <span>上传OBJ模型</span>
                    </div>
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
                currentDate: new Date()
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
</style>
