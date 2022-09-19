const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {

    mode: 'production',

    entry: './src/main.ts',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },

    resolve: {
        extensions: [ '.ts', '.js' ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: 'body'
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    }
};