const Html = require('html-webpack-plugin');
const MiniCSS = require('mini-css-extract-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const path = require("path");
const Compression = require("compression-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    entry: [
        "./src/js/app.js",
    //     './src/js/app.js',
    //     './src/js/jquery.appear.min.js',
    // './src/js/jquery.easing.1.3.js',
    // './src/js/jquery.flexslider-min.js',
    // './src/js/jquery.magnific-popup.js',
    // './src/js/jquery.quicksand.js',
    // './src/js/jquery.smooth-scroll.js',
    //     './src/js/jquery.timer.js',
    //    '/src/js/jquery-1.9.1.min.js',
    //    './src/js/jquery-migrate-1.2.1.js',
    //    './src/js/modernizr.custom.js',
    //     './src/js/Placeholders.min.js',
    //     './src/js/script.js',
    ],
    output: {
        filename: "out.min.js",
        path: path.resolve(__dirname, "./build")
    },
    mode: "development",
    devtool: "source-map",
    watch: true,
    devServer: {
        contentBase: path.join(__dirname, "./build/"),
        // inline: true, //automatyczny update
        publicPath: "/build/",
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
                                    require('autoprefixer'),

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
        new CleanWebpackPlugin(),
        new MiniCSS({
            filename: "app.css",
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