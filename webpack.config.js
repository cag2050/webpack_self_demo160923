/**
 * Created by chenag on 2016/9/14.
 */
var fs = require("fs"),
    path = require("path"),
    jspage = "/js/page/";
// 获得js/page文件夹下的js文件
var getEntry = function () {
    var jsPath = path.resolve("src" + jspage);
    var dirs = fs.readdirSync(jsPath);
    var matchs = [],
        files = {},
        all = [];
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        var _path = '';
        if (matchs) {
            _path = path.resolve("src" + jspage, item);
            files[matchs[1]] = _path;
            all.push(_path);
        }
    });
    return files;
};

var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");
var IgnorePlugin = require("webpack/lib/IgnorePlugin");
// 样式不被打包到脚本中，而是独立出来作为.css，然后在页面中以<link>标签引入
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
    // 开发调试信息
    devtool: "source-map",
    // 页面入口文件
    entry: getEntry(),
    //entry:'./src/js/page/Person_use.js',
    // 打包后输出文件配置
    output: {
        path: path.join(__dirname, "build" + jspage), //文件输出目录
        // publicPath: 'http://localhost:63342/webpack_self_demo160914/build/',
        filename: "[name].js",
        sourceMapFilename: "[file].map"
    },
    // 文件后缀名自动补全
    //resolve: {
    //    alias: {},
    //    extensions: ['', '.js', '.jsx']
    //},
    // 处理文件的加载器loader配置
    module: {
        loaders: [
            // 样式被打包到脚本中
            // {test: /\.css$/, loader: 'style!css'},
            /* 样式不被打包到脚本中，而是独立出来作为.css，
             * 然后在页面中以<link>标签引入
             */
            // 可与gulp配合使用，页面中引用gulp处理好的css
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.scss$/, loader: "style!css!sass"},
            {test: /\.(png|jpg)$/, loader: 'url'},
            {
                //test: path.join(__dirname, 'js/page'),
                //test: /\.js$/,
                test: /\.js|jsx$/,
                exclude: "/node_modules/",
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
            //,
            //{
            //    test: /\.jsx$/,
            //    exclude: "/node_modules/",
            // 还未安装react-hot
            //    loaders: ['react-hot', 'babel'],
            //    query: {
            //        presets: ['es2015']
            //        //presets: ['es2015','react']
            //    }
            //}
        ]
    },
    // 插件配置
    plugins: [
        //new IgnorePlugin(/jquery/),
        // 此处开启，html页面必须引入公用js
        //new CommonsChunkPlugin({
        //    filename: "common.js",
        //    name: "common"
        //}),
        new UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin("[name].css")
    ]
};

// console.log(config);
module.exports = config;