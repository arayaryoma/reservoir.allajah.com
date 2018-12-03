const path = require('path');
const fs = require('fs');
const frontMatter = require('front-matter');
const marked = require('marked');
const {promisify} = require('util');

const postsDir = path.resolve(__dirname, '..', '_posts');

const readFile = (filePath) => {
    return promisify(fs.readFile)(filePath);
};

const readPosts = async () => {
    let posts = [];
    const files = fs.readdirSync(postsDir);
    const mdFiles = files.filter(filename => {
        const matched = /\.md$/.exec(filename);
        return !!matched;
    });
    for (const filename of mdFiles) {
        const file = path.resolve(postsDir, filename);
        const postData = await readFile(file).then(data => {
            const str = data.toString();
            const {attributes, body} = frontMatter(str);
            const res = marked(body);
            return {
                title: attributes.title || 'No title',
                tags: attributes.tags || [],
                date: attributes.date,
                category: attributes.category || '',
                body: res,
            }
        });
        posts.push(postData);
    }
    return posts;
};
readPosts().then(posts => {
 fs.writeFileSync(path.resolve(postsDir, 'posts.json'), JSON.stringify(posts));
});
