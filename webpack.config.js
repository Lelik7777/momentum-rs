const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const devServer = (isDev) => !isDev ? {} : {
    devServer: {
        //open browser by default
        open: true,
        //reload page in browser
        hot: true,
        //open page on port 8080
        port: 5000,
        //если есть папка параллельно с srс,то ее указываем здесь
        // contentBase: path.join(__dirname, 'public')
    }
}
//чтобы ESLint запускался только для production
//проверять файлы с расширением ts and js
const esLintPlugin = (isDev) => isDev ? [] : [new ESLintPlugin({extensions: ['ts', 'js']})];

//develop поскольку наша ф-ция в качестве аргумента принимает env,а in package.json in script "dev":" webpack --env development" значение --env является develop
module.exports = ({develop}) => ({
    mode: develop ? 'development' : 'production',
    //source-map также нужно включить в tsconfig.json
    devtool: develop ? 'inline-source-map' : false,
    entry: ['./src/js/controller.js','./src/css/style.css'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        //filename: 'bundle.js',
        //можно filename через шаблон
        filename: "bundle.js",
        //это необходимо для того,чтобы картинки попадали в папку dist
        assetModuleFilename: "assets/[hash][ext]"
    },
    module: {
        //in rules add loaders
        rules: [
            //for css
            //это вставляет css in bundle.js
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            // for assets(images)
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                type: 'asset/resource',
            },
            //for assets(fonts)
            {
                test: /\.(woff(2)?|eot|ttf|otf)$/i,
                type: 'asset/resource',
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            //просто генeрит пустой index.html with title "Webpack App"
            //title: "Webpack App",
            //template - если есть готовый index.html,то указываем к нему путь
            template: "index.html"
        }),
        new CleanWebpackPlugin({
            //если картинки не изменились,то не перезаписывать их
            cleanStaleWebpackAssets: false,
        }),
        new MiniCssExtractPlugin({
            //так будет называться в dist bundle with styles
            filename: '[name].[contenthash].css'
        }),
        //проверять файлы с расширением ts and js
        // new ESLintPlugin({extensions: ['ts', 'js']})
        //...esLintPlugin(develop),
    ],
// это позволяет при импортах не указывать расширения данных файлов
//import {test} from "./test"; example this
    resolve: {
        extensions: ['.ts', '.js']
    }
    ,
    ...devServer(develop)
})
;