/**
 * webpack配置文件
 * @type {{}}
 */
// 生成html的URL
module.exports = {
    appDir: '../src',
    HTMLDir: [
        {path: 'index/index', title: '首页'},
        {path: 'about/about', title: '关于'}
    ],
    // css是否压缩
    minCss: false,
    // 图片输出路径
    imgOutputPath: 'images/',
    // css 输出路径
    cssOutputPath: './css/style.css',
    // 开发模式输出目录
    devServerOutput:'../dist'
}
