<template>
    <el-upload class="image-uploader"
               :style="style"
               :action="imgUploadUrl"
               :show-file-list="false"
               :on-success="handleImageSuccess"
               :before-upload="beforeImageUpload">
        <div class="image" v-if="name" :path="imgPath" :style="background(name)">
            <div class="delete" @click="del">x</div>
        </div>
        <i v-else class="el-icon-plus image-uploader-icon" :style="style"></i>
    </el-upload>
</template>

<script>
    export default {
        name: "ImageUploader",
        props: {
            value: "",
            size: {type: Number, default: 0},
            width: {type: Number, default: 178},
            height: {type: Number, default: 178},
        },
        data() {
            return {
                imgUploadUrl: this.$config.upload_image,
                name: "",
                style: {}
            }
        },
        mounted() {
            this.name = this.value;
            this.style = {
                "width": this.width + "px",
                "height": this.height + "px",
                "line-height": this.height + "px"
            }
        },
        watch: {
            value(val) {
                this.name = val;
            }
        },
        computed: {
            imgPath() {
                this.$emit("input", this.$config.image_loader(this.name));
                return this.$config.image_loader(this.name);
            }
        },
        methods: {
            handleImageSuccess(res, file) {
                if (res.code === 20000) {
                    this.$message.success('上传成功');
                    this.name = res.data.name;
                } else {
                    this.$message.error('上传失败');
                }
            },
            beforeImageUpload(file) {
                const ValidType = file.type.indexOf("image") >= 0;
                const ValidSize = this.size === 0 || file.size < this.size;
                if (!ValidType) {
                    this.$message.error('只允许上传图片文件!');
                }
                if (!ValidSize) {
                    this.$message.error('上传图片大小不能超过' + this.size);
                }
                return ValidType && ValidSize;
            },
            background(name) {
                return {
                    'background-image': 'url("' + this.$config.image_loader(name, 360) + '")',
                    "width": this.width + 'px',
                    "height": this.height + 'px'
                };
            },
            del(evt) {
                let e = evt || window.event;
                window.event ? e.returnValue = false : e.preventDefault();//默认事件
                window.event ? e.cancelBubble = true : e.stopPropagation();
                this.$confirm('是否删除？').then(_ => {
                    this.name = "";
                    this.$emit("input", this.name);
                }).catch(err => {
                })
            }
        }
    }
</script>

<style>
    .image-uploader .el-upload {
        min-width: 20px;
        min-height: 20px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .image-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .image-uploader-icon {
        font-size: 14px;
        color: #8c939d;
        text-align: center;
    }

    .image {
        background-size: contain;
        background-position: 50%;
        display: block;
    }

    .delete {
        width: 20px;
        height: 20px;
        line-height: 20px;
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: 14px;
        color: #fff;
        background: #f00;
        border-top-left-radius: 10px;
    }
</style>
