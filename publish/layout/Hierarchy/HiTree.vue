<template>
    <el-tree class="tree"
             ref="tree"
             node-key="uuid"
             default-expand-all
             draggable
             :data="objects"
             :props="defaultProps"
             :expand-on-click-node="false"
             :highlight-current="true"
             @current-change="changeTarget"
             @node-drop="handleDrop"
             :allow-drop="allowDrop"
             :allow-drag="allowDrag">
                 <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.label }}</span>
                    <span>
                        <el-button type="text" size="mini" @click="() => rename(data)">
                            <vue-icon type="pen"></vue-icon>
                        </el-button>
                    </span>
                  </span>
    </el-tree>
</template>

<script>
    export default {
        name: "HiTree",
        data() {
            return {
                defaultProps: {
                    children: 'children',
                    label: (data, node) => {
                        if (!data.hasOwnProperty('vComponent')) {
                            node.visible = false
                        }
                        return data.name
                    }
                },
            }
        },
        computed: {
            scenes: {
                get() {
                    return this.$editor.core.scenes.manager
                }
            },
            scene: {
                get() {
                    return this.$editor.core.scenes.index
                },
                set(val) {
                    this.$editor.core.scenes.change(val)
                    this.$editor.core.render();
                }
            },
            objects: {
                get() {
                    if (this.scenes.length > 0) {
                        return this.scenes[this.scene].children
                    } else {
                        return []
                    }
                }
            }
        },
        mounted() {
            this.$vue3d.on('capture', this.onCaptured)
        },
        methods: {
            changeTarget(obj) {
                this.$editor.selected = obj
            },
            rename(data) {
                console.log(data)
            },
            handleDrop(draggingNode, dropNode, dropType, ev) {
                let obj = draggingNode.data
                let node = null
                if (dropType === 'inner') {
                    node = dropNode.data
                } else {
                    node = dropNode.data.parent
                }
                node.add(obj)
                this.$editor.render()
                // console.log(node, obj)
                // console.log(this.$editor.scene.children[2].children)
            },
            allowDrop(draggingNode, dropNode, type) {
                return true;
            },
            allowDrag(draggingNode) {
                return true;
            },
            onCaptured(editor, obj) {
                if (obj) {
                    this.$refs.tree.setCurrentKey(obj.uuid)
                } else {
                    if (this.$refs.tree.getCurrentKey()) {
                        this.$refs.tree.setCurrentKey(null)
                    }
                }
            },
        }
    }
</script>

<style scoped>
    .tree {
        height: calc(100% - 100px);
        overflow-y: scroll;
        padding: 10px;
    }

    .tree::-webkit-scrollbar-track {
        display: none;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #F5F5F5;
    }

    .tree::-webkit-scrollbar {
        width: 3px;
        background-color: #F5F5F5;
    }

    .tree::-webkit-scrollbar-thumb {
        background-color: #545c64;
    }

    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>
