/**
 * webpack配置文件
 * @type {{}}
 */
const baseConfig = require('./webpack.config.base')
const webpackMerge = require('webpack-merge')
module.exports = webpackMerge(baseConfig, {
    mode: 'production'
})
