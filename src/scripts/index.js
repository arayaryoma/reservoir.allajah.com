import { renderPosts } from './posts';
import * as fm from 'front-matter';
import '../styles/main.styl';

const getPosts = () => {
    const files = require.context('../posts/', true, /\.md$/).keys();
    const posts = [];
    for (let file of files) {
        const p = /\.\/(.*)/.exec(file)[1];
        const data = require(`!raw-loader!../posts/${p}`);
        const content = fm.default(data);
        posts.push(content.attributes);
    }
    return posts
};

const posts = getPosts();
renderPosts(posts);

