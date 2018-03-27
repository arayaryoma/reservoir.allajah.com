const path = require('path');
const fs = require('fs');
const htmlWebpackPlugin = require('html-webpack-plugin')

const config = {
    entry: path.resolve(__dirname, './src/scripts/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.md$/,
                use: [
                    {loader: 'html-loader'},
                    {loader: 'markdown-loader'}
                ]
            },
        ]
    },
    plugins: []
};

const generatePages = (posts) => {
    const res = [];
    for (let post of posts) {
        const name = /(.*)\.md$/.exec(post)[1];
        res.push(
            new htmlWebpackPlugin({
                template: './src/layout/post.html',
                title: name,
                filename: `posts/${name}.html`,
                post: post
            })
        );
    }
    return res;
};


const validatePosts = posts => {
    const res = [];
    for (let post of posts) {
        if (postRegex.exec(post) !== null) {
            res.push(post);
        }
    }
    return res;
};

const postRegex = /\.md$/;
const posts = fs.readdirSync(path.resolve('./src/posts'), {encoding: 'utf8'});
const validPosts = validatePosts(posts);

config.plugins.push(...generatePages(validPosts));
module.exports = config;
