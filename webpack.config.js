const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
//styles from html move,replace  to separate folder; we need it for production
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//get node variable and explicitly specify mode
//NODE_ENV === environment variable - it is passed to console when calling the module by npm run...
const mode = process.env.NODE_ENV || 'development';

//boolean
const devMode = mode === 'development';

//if devMode false, then building for browsers, taking into account prefixes
const target = devMode ? 'web' : 'browserslist';

const devtool = devMode ? 'source-map' : undefined;

module.exports = {
    mode,
    devtool,
    target,
    //allows to immediately open the page on port 3000 and show changes online
    devServer: {
        port: 3000,
        open: true,
        hot: true,
    },
    //connect babel/polyfill, connect index.js and style.css
    entry: ['@babel/polyfill',
        path.resolve(__dirname, 'src', 'index.js'),
        path.resolve(__dirname, 'src', 'css', 'style.css'),
        path.resolve(__dirname, 'src', 'css', 'owfont-regular.css')
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
//allow clean directory dist every time
        clean: true,
        filename: '[name].[contenthash].js',
        //create separate folder in dist for images
        assetModuleFilename: "assets/[name][ext]"
    },
    plugins: [
        //index.html appear in dist
        new HtmlWebpackPlugin({
            //write path to index.html
            template: path.resolve(__dirname, 'src', 'index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {targets: "defaults"}]
                        ]
                    }
                }
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            //for assets(fonts)
            {
                test: /\.(woff(2)?|eot|ttf|otf)$/i,
                type: 'asset/resource',
                //generate folder name for fonts in dist
                generator: {
                    filename: 'fonts/[name][ext]'
                }
            },
            // for assets(images)
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                use: devMode ?
                    []
                    : [
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: {
                                    progressive: true,
                                },
                                optipng: {
                                    enabled: false,
                                },
                                pngquant: {
                                    quality: [0.65, 0.9],
                                    speed: 4,
                                },
                                gifsicle: {
                                    interlaced: false,
                                },
                                webp: {
                                    quality: 75,
                                },
                            },
                        },
                    ],
                type: 'asset/resource',
            },
            {
                test: /\.css$/i,
                use: [
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader",
                    //for postcss-loader,
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                //connect package postcss-preset-env
                                plugins: [require('postcss-preset-env')],
                            },
                        },
                    },
                ],
            },
        ],
    },
};