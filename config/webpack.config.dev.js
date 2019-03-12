const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html模板

const resolve = (dir) => path.join(__dirname, '..', dir)

module.exports = {
    mode: 'development', //webpack4新增属性，默认返回production
    devtool: 'cheap-module-eval-source-map',
    entry: {
        index: './src/index.js', // 设置入口文件
    },
    output: {
        filename: '[name].js', // 生成的js文件的名字
        path: resolve('dist'), // 生成的js存放目录
    },
    module: { // 配置loader
        rules: [
            {
                test: /\.m?js$/,
                include: resolve('src'), // 只解析src下面的文件，不推荐使用exclude
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    devServer: { // 配置webpack-dev-server，在本地启动一个服务器运行
        host: 'localhost', // 服务器的ip地址
        port: 8088, // 端口
        open: true, // 自动打开页面
        hot: true, // 设置热更新
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: resolve('/dist/index.html'), // 生成的html文件存放的地址和文件名
            template: resolve('/index.html'), // 基于index.html模板进行生成html文件
        }),
        new webpack.HotModuleReplacementPlugin(), // 引入热更新插件（引用react热更新必须配置）
    ]
}