var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

var distEnv = new webpack.DefinePlugin({
    NODE_ENV: '"uat"',
    ENV_HOST: '"https://hms-uat.test-cignacmb.com"'
});

module.exports = {
    entry: {
        "akg_index": "./akg/view/index/index.js",
        "akg_my_order": "./akg/view/my_order/index.js",
        "my_follow": "./akg/view/my_follow/index.js",
        "akg_commodity_details": "./akg/view/commodity_details/index.js",
        "ReleaseGoods": "./akg/view/ReleaseGoods/index.js",
        "Essential_information": "./akg/view/Essential_information/index.js",
        "showpping_trolly": "./akg/view/showpping_trolly/index.js",
        "commodity_list": "./akg/view/commodity_list/index.js",



        "user_info": "./akg/view/user_info/index.js",

    },
    output: {
        path: path.join(__dirname, "../dist/local"),
        publicPath: "/",
        filename: "js/[name].js",
        chunkFilename: "js/[id].chunk.js"
    },
    module: {
        loaders: [
            //加载器
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style", "css")
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style", "css!sass") //这里用了样式分离出来的插件，如果不想分离出来，可以直接这样写 loader:'style!css!sass'
            },
            {test: /\.html$/, loader: "html"},
            {
                test: /\.(png|jpg|jpeg|pdf|gif)$/,
                loader: "url-loader?limit=8000&name=./img/[hash].[ext]"
            },
            {
                test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
                loader: "file-loader"
            }
        ]
    },
    plugins: [
        distEnv,

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "window.$": "jquery",
            avalon: "avalon2"
        }),
        new webpack.ProvidePlugin({
            //前端调试库
            eruda: "eruda",
            "window.eruda": "eruda",
            verify: "wufan_verify_lib"
        }),
        new ExtractTextPlugin("css/[name].css"), //单独使用style标签加载css并设置其路径
        new CommonsChunkPlugin({
            name: "common.js",
            minChunks: 10
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: ['common.js', 'akg_index'],
            template: './akg/view/index/index.html',
            inject: true,
            hash: true
        }),
        new HtmlWebpackPlugin({
            filename: 'commodity_details.html',
            chunks: ['common.js', 'akg_commodity_details'],
            template: './akg/view/commodity_details/index.html',
            inject: true,
            hash: true
        }),
        new HtmlWebpackPlugin({
            filename: 'my_order.html',
            chunks: ['common.js', 'akg_my_order'],
            template: './akg/view/my_order/index.html',
            inject: true,
            hash: true
        }),
        new HtmlWebpackPlugin({
            filename: 'Essential_information.html',
            chunks: ['common.js', 'Essential_information'],
            template: './akg/view/Essential_information/index.html',
            inject: true,
            hash: true
        }),
        new HtmlWebpackPlugin({
            filename: 'ReleaseGoods.html',
            chunks: ['common.js', 'ReleaseGoods'],
            template: './akg/view/ReleaseGoods/index.html',
            inject: true,
            hash: true
        }),
        new HtmlWebpackPlugin({
            filename: 'showpping_trolly.html',
            chunks: ['common.js', 'showpping_trolly'],
            template: './akg/view/showpping_trolly/index.html',
            inject: true,
            hash: true
        }),
        new HtmlWebpackPlugin({
            filename: 'user_info.html',
            chunks: ['common.js', 'user_info'],
            template: './akg/view/user_info/index.html',
            inject: true,
            hash: true
        }),
        new HtmlWebpackPlugin({
            filename: 'commodity_list.html',
            chunks: ['common.js', 'commodity_list'],
            template: './akg/view/commodity_list/index.html',
            inject: true,
            hash: true
        }),
        new HtmlWebpackPlugin({
            filename: 'my_follow.html',
            chunks: ['common.js', 'my_follow'],
            template: './akg/view/my_follow/index.html',
            inject: true,
            hash: true
        })
    ],
    devServer: {
        contentBase: "../dist/local",
        disableHostCheck: true,
        proxy: {
            "/gis_server/*": {
                target: "http://hms-uat.test-cignacmb.com",
                host: "hms-uat.test-cignacmb.com",
                secure: false,
                onProxyRes: function onProxyRes(proxyRes, req, res) {
                    if (proxyRes.headers.location) {
                        var address = getIPAdress();
                        proxyRes.headers.location =
                            "http://" + address + ":8018"; //重写重定向路径
                    }
                }
            }
        }
    }
};

var getIPAdress = function () {
    //获取ip地址
    var interfaces = require("os").networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (
                alias.family === "IPv4" &&
                alias.address !== "127.0.0.1" &&
                !alias.internal
            ) {
                return alias.address;
            }
        }
    }
};
