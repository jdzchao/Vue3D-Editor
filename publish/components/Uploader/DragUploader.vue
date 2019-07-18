<template>
    <el-upload
            class="drag-uploader"
            drag
            :action="$config.upload_model.action"
            :data="$config.upload_model.data"
            :headers="$config.upload_model.headers"
            :on-success="uploadSuccess">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
</template>

<script>
    export default {
        name: "DragUploader",
        methods: {
            uploadSuccess(res, file) {
                if (res.code === 20000) {
                    this.$message.success('上传成功');
                    this.$emit("input", this.$config.image_loader(res.data.name));
                } else {
                    this.$message.error('上传失败');
                }
            },
        }
    }
</script>

<style>
    .drag-uploader .el-upload{
        width: 100%;
    }

    .drag-uploader .el-upload-dragger {
        width: 100%;

    }
</style>
