import Vue from 'vue'

const core = {
    data() {
        return {
            selected: null
        }
    },
    created() {
        this.$vue3d.on('capture', this.onSelected)
    },
    methods: {
        onSelected(editor, obj) {
            this.selected = obj;
        },
        render(){
            // this.$vue3d.
        }
    }
}

export default new Vue(core)
