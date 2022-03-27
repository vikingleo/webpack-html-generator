/**
 * webpack配置文件
 * @type {{}}
 */
const webpackBase = require('./webpack.config.base')
// 合并插件
const webpackMerge = require('webpack-merge')
// 配置

module.exports = webpackMerge(webpackBase,{
	mode:'development'
})
