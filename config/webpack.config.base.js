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
// 抽取css
const extractTextPlugin = require('extract-text-webpack-plugin')

const config = require('./config')
// 通过html-webpack-plugin生成的html
let HTMLPlugins = []
// 入口文件
let entriesFiles = {}

// 遍历配置内的页面列表，并生成对应html和js
config.HTMLDir.forEach(page => {
    const htmlPlugin = new HtmlWebpackPlugin({
        title: page.title,
        filename: `pages/${page.path}.html`,
        template: path.resolve(__dirname, `${config.appDir}/pages/${page.path}.ejs`),
        chunks: [ page.path, 'common' ],
        minify: true,
        hash: true
    })
    HTMLPlugins.push(htmlPlugin)
    // 如果存在这个html对应的js文件，则写入入口文件集
    if (fs.existsSync(path.resolve(__dirname, `${config.appDir}/pages/${page.path}.js`))) {
        entriesFiles[ page.path ] = path.resolve(__dirname, `${config.appDir}/pages/${page.path}.js`)
    }
})

// 导出所有配置
module.exports = {
    entry: entriesFiles,
    devtool: "cheap-modules-source-map",
    output: {
        filename: "js/[name].bundle.[hash].js",
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            // css-loader
            {
                test: /\.css$/,
                exclude: /node-modules/,
                use: [ {
                    loader: 'css-loader',
                    options: {
                        // 开启压缩
                        minimize: config.minCss
                    }
                }, {
                    loader: 'postcss-loader'
                }, {
                    loader: "style-loader"
                }, {
                    loader: "sass-loader"
                } ]
            },
            // js加载器
            {
                test: /\.js$/,
                exclude: /node-modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [ 'env' ]
                    }
                }
            },
            // 配置图片加载器
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        outputPath: config.imgOutputPath
                    }
                }
            },
            // 自定义字体
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [ "file-loader" ]
            },
            // ejs加载器
            {
                test: /\.ejs$/,
                loader:'ejs-loader'
            }

        ]
    },
    plugins: [
        // 清理dist文件夹
        new CleanWebpackPlugin(),
        // 抽取css文件
        new extractTextPlugin(config.cssOutputPath),
        // 使用html生成插件生成的html路径
        ...HTMLPlugins
    ]
}

