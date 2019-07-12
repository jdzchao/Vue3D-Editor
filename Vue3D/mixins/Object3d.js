/**
 * 所有mixins需要在mounted之前创建Object3d对象
 */
export default {
    name: "Object3d",
    props: {
        inTree: {type: Boolean, default: true}, // 是否挂载在树节点上。当设置为false时直接挂载在scene根节点上
        name: {type: String, default: ''},
        position: {type: Object},
        rotation: {type: Object},
        scale: {type: Object},
        target: {
            type: Object,
            default: () => {
                return {x: 0, y: 0, z: 0}
            }
        },
    },
    data() {
        return {
            vue3d: null, // Vue3D component
            scene: null, // mounted scene
            parent: null, // 父级三维对象
            object3d: null, // 当前三维对象

            slot: false, // 是否挂载子节点
            visible: true, // 是否可见
        }
    },
    created() {
        if (!this.$parent) {
            console.error(this.$options.name + " must slot in Vue3D-Component");
            return;
        }
        // check Vue3D component parent
        if (!this.parent) {
            this._recursion(this.$parent)
        }
    },
    mounted() {
        this.vue3d.on("update", this.render);
        if (this.object3d) this.init();
    },
    updated() {
        this.render();
    },
    beforeDestroy() {
        this.$emit('remove', this.object3d);
        this.slot = false;
        this.removeObject3d(this.object3d);
    },
    methods: {
        init() {
            this.object3d.vComponent = this;
            this.object3d.name = this.name || this.$options.name;

            this.addObject3d(this.object3d);

            /** Watch Position Prop **/
            this.$watch(
                function () {
                    if (this.position
                        && this.position.hasOwnProperty('x')
                        && this.position.hasOwnProperty('y')
                        && this.position.hasOwnProperty('z')
                    ) {
                        return this.position.x === this.object3d.position.x
                            && this.position.y === this.object3d.position.y
                            && this.position.z === this.object3d.position.z
                    }
                    return true
                },
                function (bool) {
                    if (!bool) {
                        this.setPosition();
                    }
                },
                {
                    immediate: true
                }
            );

            /** Watch Rotation Prop **/
            this.$watch(
                function () {
                    if (this.rotation && this.rotation.hasOwnProperty('x') && this.rotation.hasOwnProperty('y') && this.rotation.hasOwnProperty('z')) {
                        return this.rotation.x === this.object3d.rotation.x
                            && this.rotation.y === this.object3d.rotation.y
                            && this.rotation.z === this.object3d.rotation.z
                    } else {
                        return true
                    }
                },
                function (bool) {
                    if (!bool) {
                        this.setRotation();
                    }
                },
                {
                    immediate: true
                }
            );

            /** Watch Scale Prop **/
            this.$watch(
                function () {
                    if (this.scale && this.scale.hasOwnProperty('x') && this.scale.hasOwnProperty('y') && this.scale.hasOwnProperty('z')) {
                        return this.scale.x === this.object3d.scale.x
                            && this.scale.y === this.object3d.scale.y
                            && this.scale.z === this.object3d.scale.z
                    } else {
                        return true
                    }

                },
                function (bool) {
                    if (!bool) {
                        this.setScale();
                    }
                },
                {
                    immediate: true
                }
            );

            this.slot = true;
            this.$emit('ready', this.object3d);
            this.render();
        },
        // 根据vue组件递归查询scene节点
        _recursion(parent) {
            if (parent.$options.name === 'Vue3d') { // 当前挂载于Vue3D 根节点
                this.scene = parent.scenes.activated();
                this.vue3d = parent;
                this.parent = parent;
            } else if (parent.$options.name === 'V3dScene') { // 当前挂载于 V3dScene 子节点
                this.scene = parent.scene;
                this.vue3d = parent.vue3d;
                this.parent = parent;
            } else if (parent.hasOwnProperty("scene") && parent.hasOwnProperty('object3d')) { // 当前挂载于 其他 子节点
                this.scene = parent.scene;
                this.vue3d = parent.vue3d;
                this.parent = parent;
            } else {
                this._recursion(parent.$parent);
            }
        },
        addObject3d(object3d) {
            if (this.inTree && this.parent.hasOwnProperty('object3d')) {
                this.parent.object3d.add(object3d);
            } else {
                this.scene.add(object3d);
            }
        },
        removeObject3d(object3d) {
            if (this.inTree && this.parent.hasOwnProperty('object3d')) {
                this.parent.object3d.remove(object3d);
            } else {
                this.scene.remove(object3d);
            }
            this.vue3d.off("update", this.onRender);
        },
        setPosition() {
            this.object3d.position.set(this.position.x, this.position.y, this.position.z);
            this.render();
        },
        setRotation() {
            this.object3d.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
            this.render();
        },
        setScale() {
            this.object3d.scale.set(this.scale.x, this.scale.y, this.scale.z);
            this.render();
        },
        setTarget() {
            this.object3d.lookAt(this.target.x, this.target.y, this.target.z);
            this.render();
        },
        // 渲染
        render() {
            this.vue3d.render();
        },
        onRender() {
            this.$emit('update', this.object3d);
        },
        updatePosition(position) {
            this.$emit("update:position", position)
            const data = {attr: 'position', value: position}
            this.$emit('update', data)
        },
        updateRotation(rotation) {
            this.$emit("update:rotation", rotation)
            const data = {attr: 'rotation', value: rotation}
            this.$emit('update', data)
        },
        updateScale(scale) {
            this.$emit("update:scale", scale)
            const data = {attr: 'scale', value: scale}
            this.$emit('update', data)
        }
    },
    watch: {
        name(val, oldVal) {
            if (val === oldVal) return;
            this.object3d.name = val;
        },
        target(val, oldVal) {
            if (val === oldVal) return;
            this.setTarget();
        },
        "object3d.position.x"(val, oldVal) {
            if (val === oldVal) return;
            this.updatePosition({
                x: this.object3d.position.x,
                y: this.object3d.position.y,
                z: this.object3d.position.z
            })
        },
        "object3d.position.y"(val, oldVal) {
            if (val === oldVal) return;
            this.updatePosition({
                x: this.object3d.position.x,
                y: this.object3d.position.y,
                z: this.object3d.position.z
            })
        },
        "object3d.position.z"(val, oldVal) {
            if (val === oldVal) return;
            this.updatePosition({
                x: this.object3d.position.x,
                y: this.object3d.position.y,
                z: this.object3d.position.z
            })
        },
        "object3d.rotation.x"(val, oldVal) {
            if (val === oldVal) return;
            this.updateRotation({
                x: this.object3d.rotation.x,
                y: this.object3d.rotation.y,
                z: this.object3d.rotation.z
            })
        },
        "object3d.rotation.y"(val, oldVal) {
            if (val === oldVal) return;
            this.updateRotation({
                x: this.object3d.rotation.x,
                y: this.object3d.rotation.y,
                z: this.object3d.rotation.z
            })
        },
        "object3d.rotation.z"(val, oldVal) {
            if (val === oldVal) return;
            this.updateRotation({
                x: this.object3d.rotation.x,
                y: this.object3d.rotation.y,
                z: this.object3d.rotation.z
            })
        },
        "object3d.scale.x"(val, oldVal) {
            if (val === oldVal) return;
            this.updateScale({
                x: this.object3d.scale.x,
                y: this.object3d.scale.y,
                z: this.object3d.scale.z
            })
        },
        "object3d.scale.y"(val, oldVal) {
            if (val === oldVal) return;
            this.updateScale({
                x: this.object3d.scale.x,
                y: this.object3d.scale.y,
                z: this.object3d.scale.z
            })
        },
        "object3d.scale.z"(val, oldVal) {
            if (val === oldVal) return;
            this.updateScale({
                x: this.object3d.scale.x,
                y: this.object3d.scale.y,
                z: this.object3d.scale.z
            })
        },
    },
}
