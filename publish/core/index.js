import Vue from 'vue'

const core = {
    data() {
        return {
            v3d: null,
            selected: null
        }
    },
    created() {
        this.$nextTick(() => {
            this.$vue3d.on('capture', this.onSelected)
        })
    },
    methods: {
        onSelected(editor, obj) {
            this.selected = obj;
        },
        render() {
            // this.$vue3d.
        }
    }
}

export default new Vue(core)
