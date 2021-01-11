const Html = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const path = require("path");
const Compression = require("compression-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


const config = {
    entry: { main: ['./src/js/app.js', './src/css/styles.css']
    },

    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "./build"),
        publicPath: "dist/"
    },
    mode: "development",
    devtool: "source-map",
    watch: true,
    devServer: {
        contentBase: path.join(__dirname, "./src/"),
        inline: true, //automatyczny update
        publicPath: "/src/",
        compress: true,
        progress: true,
        overlay: true,
        port: 3002
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
                exclude: /\.module\.css$/
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true
                        }
                    }
                ],
                include: /\.module\.css$/
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                use: 'file-loader'
            }
        ]
    },

    plugins: [
        new CopyPlugin({
            patterns: [{ from: 'src/index.html' }],
        }),
        new MiniCssExtractPlugin({
            filename: "./styles.css",
        }),
        new Html({
            filename: "index.html",
            template: "src/index.html"
        }),
        new Compression({
            threshold: 0,
            minRatio: 0.8
        }),
        new CleanWebpackPlugin()

    ]
}

module.exports = config;
