import Vue from 'vue'
import {TransformControls} from '../utils/TransformControls'

const core = {
    data() {
        return {
            v3d: null,
            selected: null,
            canvas: null, // 编辑器画布
            scene: null, // 编辑器场景
            camera: null, // 编辑器像机
            control: null, // transform control

        }
    },
    methods: {
        init(ref) {
            this.v3d = ref;
            this.canvas = ref.$data.$_canvas;
            this.scene = ref.$data.$_scene;
            this.camera = ref.$data.$_camera;
            this.camera.position.z = 10;
            let orbit = ref.renderer.orbit_get()
            // set TransformControls
            this.control = new TransformControls(this.camera, this.canvas);
            this.control.addEventListener('change', this.renderControl);
            this.control.update = this.renderControl;
            this.control.addEventListener('dragging-changed', function (event) {
                orbit.enabled = !event.value;
            });
            this.scene.add(this.control);
            this.$vue3d.on('capture', this.setAttach)
        },
        setAttach(editor, obj) {
            try {
                if (obj) {
                    this.selected = obj.object;
                    this.control.attach(obj.object);
                } else {
                    this.selected = null;
                    this.control.detach();
                }
            } catch (err) {
                console.error(err);
            }

        },
        renderControl() {
            // this.control.update(); // 死循环了开始
            this.$editor.v3d.renderer.render();
        },
        render() {
            this.v3d.renderer.render();
        }
    }
}

export default new Vue(core)
