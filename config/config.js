/**
 * webpack配置文件
 * @type {{}}
 */
// 生成html的URL
module.exports = {
	appDir: '../src',
	HTMLDir: [
		{path: 'index', title: '首页'},
		{path: 'about', title: '关于'}
	],
	// css是否压缩
	minCss: false,
	// 图片输出路径
	imgOutputPath: 'static/images/',
	// iconfont的字体文件输出
	iconfontOutputPath:'static/css/fonts/',
	// css 输出路径
	cssOutputPath: 'static/css/style.css',
	// 开发模式输出目录
	devServerOutput: '../dist',
	// 静态资源
	staticPath: '../src/assets',
}
