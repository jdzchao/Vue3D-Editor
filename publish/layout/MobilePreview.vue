<template>
    <div id="mobile-preview">
        <div class="btn" :class="{opened:opened}" @click="openDialog">
            <vue-icon type="mobile" :size="24"></vue-icon>
        </div>
        <el-dialog
                v-el-drag-dialog
                title="Mobile Preview"
                custom-class="dialog"
                :visible.sync="opened"
                :modal="false"
                :width="width+2+'px'"
                top="60px"
                :close-on-click-modal="false"
                :modal-append-to-body="true"

                @dragDialog="handleDrag"
                @opened="handleOpened">
            <canvas id="preview" ref="preview"></canvas>
        </el-dialog>
    </div>
</template>

<script>
    import * as THREE from 'three'
    import elDragDialog from '../directive/el-drag-dialog' // base on element-ui

    export default {
        name: "MobilePreview",
        directives: {elDragDialog},
        data() {
            return {
                renderer: null,
                opened: false,
                width: 375,
                height: 667,
            }
        },
        mounted() {

        },
        methods: {
            openDialog() {
                this.opened = !this.opened
            },
            handleDrag() {
            },
            handleOpened() {
                if (this.renderer) return
                this.renderer = new THREE.WebGLRenderer({
                    canvas: this.$refs.preview,
                    alpha: true,
                    antialias: true,
                    preserveDrawingBuffer: true,
                });
                this.renderer.setPixelRatio(window.devicePixelRatio);
                this.renderer.setSize(this.width, this.height);
                this.renderer.setClearColor(new THREE.Color('rgb(25,25,25)').getHex(), 1)

                this.$vue3d.delegationAdd(this.render);
                this.$editor.render();
            },
            render() {
                if (!this.opened) return;
                this.setAspect(this.$editor.core.scenes.activated().arrayCamera)
                this.renderer.render(this.$editor.core.scenes.activated(), this.$editor.core.scenes.activated().arrayCamera);
            },
            setAspect(cameras) {
                if (!this.opened) return;
                if (cameras.hasOwnProperty('cameras')) {
                    cameras.cameras.forEach(camera => {
                        camera.fov = 50
                        camera.viewport.set(0, 0, this.width, this.height)
                        camera.aspect = this.width / this.height;
                        camera.updateProjectionMatrix();// 摄像机参数改变后必须执行生效
                    })
                    return cameras;
                }
            }
        }
    }
</script>

<style scoped>
    #mobile-preview {
        position: absolute;
        top: 10px;
        right: 360px;
    }

    .btn {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        cursor: pointer;
        line-height: 40px;
        text-align: center;
        color: #ffffff;
        background-color: #F56C6C;
    }

    .opened {
        background-color: #409EFF;
    }

</style>
<style>
    #mobile-preview .el-dialog__wrapper {
        pointer-events: none;
    }

    #mobile-preview .dialog {
        pointer-events: visible;
        border: 1px solid #ffffff;
    }

    #mobile-preview .dialog > .el-dialog__body {
        padding: 0;
        background-color: rgb(25, 25, 25);
    }
</style>
