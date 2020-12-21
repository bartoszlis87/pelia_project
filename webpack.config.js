const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require("path");

module.exports = {
    entry: "./src/js/app.js",
    output: {
        filename: "bundle.min.js",
        path: path.resolve(__dirname, "./dist")
    },
    watch: false,
    mode: "development",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "autoprefixer",
                                    ],
                                ],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "autoprefixer",
                                    ],
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
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            title: "My App",
            filename: "index.html",
            template: "src/index.html"
        })
    ]
}








// const path = require("path");
// const entryPath = "object";
// const entryFile = "app.js";
// const autoprefixer = require('autoprefixer');
// const Html = require('html-webpack-plugin');
// const MiniCSS = require("mini-css-extract-plugin");
// const Compression = require("compression-webpack-plugin");
//
//
// module.exports = {
//     entry: ["whatwg-fetch", `./${entryPath}/${entryFile}`],
//     output: {
//         filename: "out.js",
//         path: path.resolve(__dirname, `${entryPath}/build/`)
//     },
//     mode: 'development',
//     devtool: "source-map",
//     watch: true,
//     devServer: {
//         contentBase: path.join(__dirname, `${entryPath}`),
//         publicPath: "/build/",
//         compress: true,
//         port: 3010
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 loader: "babel-loader",
//             },
//             {
//                 test: /\.css$/,
//                 use: ['style-loader', MiniCSS.loader,
//                     {
//                         loader: 'css-loader',
//                         options: {
//                             sourceMap: true
//                         }
//                     },
//                     {
//                         loader: 'postcss-loader',
//                         options: {
//                             plugins: () => [autoprefixer()]
//                         }
//                 }],
//             },
//             {
//                 test: /\.(jpe?g|gif|png|svg)$/,
//                 loader: "file-loader",
//                 options: {
//                     name: "[name].[ext]",
//                     publicPath: "/images/",
//                     outputPath: "/images/"
//                 }
//             }
//         ]
//     },
//     plugins: [
//         new Html({
//             filename: "index.html",
//             template: "./index.html"
//         }),
//         new MiniCSS({
//             filename: "app.css",
//         }),
//         new Compression({
//             threshold: 0,
//             minRatio: 0.8
//         })
//     ]
//
//
// };