/**
 * webpack配置文件
 * @type {{}}
 */
const webpackBase = require('./webpack.config.base')
// 合并插件
const webpackMerge = require('webpack-merge')
// 配置
const config = require('./config')

module.exports = webpackMerge(webpackBase, {
    devServer: {
        contentBase: config.devServerOutput,
        compress: false,
        port: 9000
    }
})
