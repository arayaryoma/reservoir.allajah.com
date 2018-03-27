const path = require('path');
const fs = require('fs');
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/scripts/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.md$/,
                use: [
                    { loader: 'html-loader'},
                    { loader: 'markdown-loader' }
                ]
            },
        ]
    }
};

const getPosts = () => {
    fs.readdirSync()
};