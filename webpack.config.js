const path = require('path')

const resolve = dir => {
    return path.join(__dirname, dir)
}

module.exports = {
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@c': path.resolve(__dirname, 'src/components'),
            '@edt': path.resolve(__dirname, 'publish')
        }
    },
    module: {
        rules: []
    }
};
