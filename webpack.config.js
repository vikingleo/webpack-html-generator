/**
 * webpack配置文件
 * @type {{}}
 */
const env = (process.env.NODE_ENV || '').trim().replace(/(\s*$)|(^\s*)/ig, '')
module.exports = require(`./config/webpack.config.${env}.js`)
