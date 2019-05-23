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
            renderer: null,

            orbit: null,
            control: null, // transform control
        }
    },
    methods: {
        init(ref) {
            this.v3d = ref;
            this.canvas = ref.$data.$_canvas;
            this.scene = ref.$data.$_scene;
            this.camera = ref.$data.$_camera;
            this.renderer = ref.$data.renderer;
            this.camera.position.z = 10;
            this.orbit = ref.orbit;
            // set TransformControls
            this.control = new TransformControls(this.camera, this.canvas);
            this.control.addEventListener('change', this.render);
            this.control.update = this.render;
            this.control.addEventListener('dragging-changed', (event) => {
                this.orbit.control.enabled = !event.value;
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
        render() {
            this.v3d.renderer.render();
        }
    }
}

export default new Vue(core)
