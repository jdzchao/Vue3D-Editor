import Vue from 'vue'
import {TransformControls} from '../utils/TransformControls'

const core = {
    data() {
        return {
            v3d: null,

            canvas: null, // 编辑器画布
            scene: null, // 编辑器场景
            camera: null, // 编辑器像机
            renderer: null,

            orbit: null,
            control: null, // transform control
        }
    },
    computed: {
        selected: {
            get() {
                if (this.v3d.renderer.getPause()) return null;
                return this.v3d.capture_get();
            },
            set(obj) {
                return this.v3d.capture_set(obj)
            }
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
            this.$vue3d.on('capture', this.setAttach);
        },
        setAttach(editor, obj) {
            try {
                if (obj) {
                    this.control.attach(obj);
                } else {
                    this.control.detach();
                }
            } catch (err) {
                console.error(err);
            }
        },
        render() {
            this.renderer.render();
        }
    }
}

export default new Vue(core)
