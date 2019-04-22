import Vue from 'vue'
import * as THREE from 'three'
import capture from './capture'
import debug from './debug'
import delegation from './delegation'
import event from './event'
import scenes from './scenes'
import orbit from './orbit'

/**
 * 渲染总线
 */
export default class {
    constructor(width, height) {
        return new Vue({
            mixins: [capture, debug, delegation, event, scenes, orbit],
            data: {
                // option
                _$auto: false, // 是否自动逐帧渲染
                _$pause: false, // 是否暂停渲染
                _$play: false, // 是否开启运行模式
                // renderer
                _$renderer: null, // 渲染器
                _$rendering: null, // 渲染器正在渲染当前帧
                _$status: 0, // 渲染器状态 0:awake; 1:start; 2:render;
                // scene
                _$canvas: null, // The <canvas> dom
                _$scene: null, // Base Scene
                _$camera: null, // God's Perspective Camera

                width: width | 100, // renderer width
                height: height | 100, // renderer height
                ratio: 1, // renderer ratio
                clearColor: "rgb(25,25,25)", // renderer clear color
                clearAlpha: 1, // renderer clear alpha
            },
            watch: {},
            methods: {
                init(id, canvas, params, callback) {
                    params['canvas'] = canvas;
                    this.$data._$canvas = canvas;
                    this.$data._$scene = new THREE.Scene();
                    this.$data._$camera = new THREE.PerspectiveCamera(45, this.width / this.height);
                    this.$data._$renderer = new THREE.WebGLRenderer(params);

                    // set name
                    this.$data._$scene.name = id;
                    this.$data._$camera.name = id;

                    this.$data._$scene.add(this.$data._$camera);

                    this.scenes_init();
                    this.orbit_init();
                    this.capture_init();

                    this.render();

                    callback && callback({
                        _$scene: this.$data._$scene,
                        _$camera: this.$data._$camera,
                        scene: this.scene,
                        cameras: this.cameras,
                    });
                },
                // 渲染一帧
                render() {
                    if (this.$data._$status === 0) {
                        this.setStatus("start"); // 切换渲染器状态
                        this.on("render", this.render); // 【兼容】监听 render 事件
                    }
                    if (this.$data._$rendering || this.$data._$pause) return;
                    this.$data._$rendering = requestAnimationFrame(() => {
                        this.setStatus('render'); // 切换渲染器状态
                        this.delegationCall(); // 调用委托中的方法

                        // 当 pure 为真时，则仅渲染 standard scene
                        this.$data._$play ?
                            this.$data._$renderer.render(this.scene, this.cameras) :
                            this.$data._$renderer.render(this.$data._$scene, this.$data._$camera);

                        this.emit("update"); // 正常来讲只有这里能触发update事件

                        this.$data._$rendering = null; // 当前帧渲染完成，释放掉

                        if (this.$data._$auto) {
                            // 当 auto 为真时，进入递归循环 渲染
                            this.render();
                        }
                    })
                },
                // 刷新渲染器
                refresh() {
                    this.$data._$camera.aspect = this.width / this.height;
                    this.$data._$camera.updateProjectionMatrix();// 摄像机参数改变后必须执行生效
                    this.$data._$renderer.setSize(this.width, this.height);
                    this.$data._$renderer.setPixelRatio(this.ratio);
                    this.$data._$renderer.setClearColor(new THREE.Color(this.clearColor).getHex(), this.clearAlpha);
                    this.render();
                },
                // 设置渲染状态
                setStatus(status) {
                    const status_enum = ['awake', 'start', 'render'];
                    if (status_enum.indexOf(status) >= 0) {
                        status = status_enum.indexOf(status);
                    }
                    if (status <= this.$data._$status) return; // 不允许小于当前状态
                    switch (status) {
                        case  1:
                            this.$data._$status = 1;
                            this.info("ლ(´ڡ`ლ) Vue3D Status => Start");
                            break;
                        case  2:
                            this.$data._$status = 2;
                            this.info("ლ(´ڡ`ლ) Vue3D Status => Render");
                            break;
                        default:
                            return;
                    }
                },
                setAuto() {
                    this.$data._$auto = !this.$data._$auto;
                    this.emit("auto", this.$data._$auto);
                    this.info("ლ(´ڡ`ლ) Vue3D Auto => " + this.$data._$auto);
                },
                setPause() {
                    this.$data._$pause = !this.$data._$pause;
                    this.emit("pause", this.$data._$pause);
                    this.info("ლ(´ڡ`ლ) Vue3D Pause => " + this.$data._$pause);
                },
                setPlay() {
                    this.$data._$play = !this.$data._$play;
                    this.emit("play", this.$data._$play);
                    this.render();
                },
                setSize(width, height, refresh) {
                    this.width = width;
                    this.height = height;
                    if (refresh) this.refresh();
                    // this.$data._$renderer.setSize(width, height);
                },
                setPixelRatio(ratio, refresh) {
                    this.ratio = ratio;
                    if (refresh) this.refresh();
                    // this.$data._$renderer.setPixelRatio(ratio);
                },
                setClearColor(clearColor, clearAlpha, refresh) {
                    this.clearColor = clearColor;
                    this.clearAlpha = clearAlpha;
                    if (refresh) this.refresh();
                    // this.$data._$renderer.setClearColor(new THREE.Color(clearColor).getHex(), clearAlpha);
                },
                getBaseScene() {
                    return this.$data._$scene;
                },
                getBaseCamera() {
                    return this.$data._$camera;
                },
            }
        });
    }
};
