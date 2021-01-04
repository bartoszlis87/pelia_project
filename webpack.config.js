const Html = require('html-webpack-plugin');
const MiniCSS = require('mini-css-extract-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const path = require("path");
const Compression = require("compression-webpack-plugin");


module.exports = {
    entry: {
        'app.js' : './src/js/app.js',
        'css' : './src/css/styles.css'
    },

    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "./build")
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
                test: /\.css$/i,
                exclude: /node_modules/,
                use: [
                    'style-loader', 'MiniCSS.loader', 'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: () => [
                                    require('autoprefixer')(),

                                ],
                            },
                        },
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            postcssOptions: {
                                plugins: () => [
                                    require('syntax-dynamic-import'),

                                ],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCSS.loader,
                    'css-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            implementation: () => [
                                require('css-loader')(),
                        ]
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            postcssOptions: {
                                plugins: () => [
                                        require('autoprefixer'),
                                ],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|webp|awif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            sourceMap: true,
                            context: 'public',
                            name: '/images/[name]-[hash].[ext]',
                            publicPath: '/',
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        new MiniCSS({
            filename: "./styles.css",
        }),
        new Html({
            filename: "index.html",
            template: "src/index.html"
        }),
        new Compression({
            threshold: 0,
            minRatio: 0.8
        })

    ]
}