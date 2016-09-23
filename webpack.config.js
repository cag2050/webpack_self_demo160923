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
}

var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");
var IgnorePlugin = require("webpack/lib/IgnorePlugin");
// 样式不被打包到脚本中，而是独立出来作为.css，然后在页面中以<link>标签引入
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
    devtool: "source-map",
    //entry: getEntry(),
    entry:'./src/js/page/person_use.js',
    output: {
        path: path.join(__dirname, "build" + jspage), //文件输出目录
        // publicPath: 'http://localhost:63342/webpack_self_demo160914/build/',
        filename: "[name].js",
        sourceMapFilename: "[file].map"
    },
    // resolve: {
    //     alias: {},
    //     extensions: ['', '.js', '.jsx']
    // },
    module: {
        loaders: [
            // {test: /\.css$/, loader: 'style!css'},
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.scss$/, loader: "style!css!sass"},
            {test: /\.(png|jpg)$/, loader: 'url'},
            {
                //test: path.join(__dirname, 'js/page'),
                test: /\.js|jsx$/,
                exclude: "/node_modules/",
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        //new IgnorePlugin(/jquery/),
        //此处开启，html页面必须引入公用js
        //new CommonsChunkPlugin({
        //    filename: "common.js",
        //    name: "common"
        //}),
        // new UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        new ExtractTextPlugin("[name].css")
    ]
}

// console.log(config);
module.exports = config;