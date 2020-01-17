module.exports = {
    plugins: {
        'autoprefixer': {
            browsers: [ 'last 5 version', 'Android >= 4.0' ],
            // 是否美化属性
            cascade: true,
            // 是否去掉不必要的前缀
            remove: true
        }
    }
}
