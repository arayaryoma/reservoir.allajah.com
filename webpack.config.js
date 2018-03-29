const path = require('path');
const fs = require('fs');
const fm = require('front-matter');
const htmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    context: path.resolve(__dirname, './src'),
    entry: path.resolve(__dirname, './src/scripts/index.js'),
    resolve: {
        extensions: ['.jsx', '.js', '.json'],
        symlinks: false,

    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /.(js|jsx)?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.md$/,
                use: [
                    {loader: 'markdown-loader'}
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {loader: 'html-loader'}
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {loader: 'stylus-loader'}
                ]
            }
        ]
    },
    plugins: [],
    devtool: "cheap-module-eval-source-map"
};

const readPostMeta = (post) => {
    const data = fs.readFileSync(path.resolve(__dirname, `src/posts/${post}`));
    const content = fm(data.toString());
    return content.attributes;
};

const generatePages = (posts) => {
    const res = [];
    const postList = [];
    for (let post of posts) {
        const name = /(.*)\.md$/.exec(post)[1];
        const meta = readPostMeta(post);
        postList.push({
            title: meta.title,
            url: `/posts/${name}.html`,
        });
        res.push(
            new htmlWebpackPlugin({
                template: './layout/post.html',
                title: meta.title,
                filename: `posts/${name}.html`,
                post: post
            })
        );
    }
    res.push(
        new htmlWebpackPlugin({
            template: './layout/index.html',
            filename: `index.html`,
            posts: postList,
        }));
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
