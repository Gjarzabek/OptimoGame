const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

function srcPath(subdir) {
    return path.join(__dirname, "src", subdir);
}

module.exports = {

    mode: 'production',

    entry: './main.ts',
    
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },

    resolve: {
        extensions: [ '.ts', '.js' ],
        alias: {
            BoardObjects: srcPath('BoardObjects'),
            Gameplay: srcPath('Gameplay'),
            Helpers: srcPath('Helpers'),
            UI: srcPath('UI'),
            UserInputs: srcPath('UserInputs'),
        },
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
    },
    performance: {
        hints: false
    }
};
