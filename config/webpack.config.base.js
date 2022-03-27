/**
 * webpack基础配置文件
 * @type {{}}
 */
const path = require('path')
const fs = require('fs')
// html插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 清理dist
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// css压缩
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// gzip压缩
const CompressionWebpackPlugin = require('compress-webpack-plugin')

// vue后缀文件识别
const VueLoaderPlugin = require('vue-loader/lib/plugin')

//不打包直接输出
const config = require('./config')
// 通过html-webpack-plugin生成的html
let HTMLPlugins = []
// 入口文件
let entriesFiles = {}

// 遍历配置内的页面列表，并生成对应html和js
for (let page of config.HTMLDir) {
	const htmlPlugin = new HtmlWebpackPlugin({
		title: page.title,
		filename: `${page.path}.html`,
		template: path.resolve(__dirname, `${config.appDir}/pages/${page.path}/${page.path}.html`),
		chunks: [page.path, 'common'],
		minify: true,
		hash: true
	})
	HTMLPlugins.push(htmlPlugin)
	// 如果存在这个html对应的js文件，则写入入口文件集
	if (fs.existsSync(path.resolve(__dirname, `${config.appDir}/pages/${page.path}/${page.path}.js`))) {
		entriesFiles[page.path] = path.resolve(__dirname, `${config.appDir}/pages/${page.path}/${page.path}.js`)
	}
}

// 插件
let plugins = [
	new CleanWebpackPlugin({
		cleanAfterEveryBuildPatterns: ['images', 'js', 'css']
	}),
	new VueLoaderPlugin(),
	// 清理dist文件夹
	new CleanWebpackPlugin(),
	// 使用html生成插件生成的html路径
	...HTMLPlugins,
]
if (process.env.NODE_ENV === 'production') {
	plugins.push(new CompressionWebpackPlugin({
		algorithm: 'gzip',
		test: new RegExp('\\.(js|css)$'),
		// 只处理大于xx字节 的文件，默认：0
		threshold: 10240,
		// 示例：一个1024b大小的文件，压缩后大小为768b，minRatio : 0.75
		minRatio: 0.8, // 默认: 0.8
		// 是否删除源文件，默认: false
		deleteOriginalAssets: false
	}))
}
// 导出所有配置
module.exports = {
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
	entry: entriesFiles,
	devtool: "source-map",
	output: {
		filename: "static/js/[name].bundle.[hash].js",
		path: path.resolve(__dirname, '../dist')
	},
	externals: {
		// vue: 'Vue'
	},
	resolve: {
		extensions: ['.js', '.vue'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': path.resolve('src'),
			'@assets': path.resolve('src/assets'),
			'@pages': path.resolve('src/pages'),
			'@components': path.resolve('src/components'),
		}
	},
	module: {
		rules: [
			// css-loader
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'style-loader',
					'css-loader',
					'postcss-loader',
				]
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'style-loader',
					'css-loader',
					'postcss-loader',
					'sass-loader',
					{
						loader: "sass-resources-loader",
						options: {
							resources: path.resolve(__dirname, "../src/assets/css/basic-style/basic/_mixins.config.scss")
						}
					}
				]
			},
			// js加载器
			{
				test: /\.js$/,
				exclude: /node-modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			// 配置图片加载器
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/,
				use: [
					{
						loader: "url-loader",
						options: {
							outputPath: config.imgOutputPath,
							esModule: false,
							limit: 8096,
						}
					},
				]
			},
			// 自定义字体
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ["url-loader"],
				exclude: /(node_modules)/,
				options: {
					limit: 20000,
					outputPath: config.iconfontOutputPath,
					name: '[name].[hash].[ext]'
				}
			},
			{
				test: /\.html$/,
				loader: "underscore-template-loader",
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			}
		]
	},
	plugins
}

