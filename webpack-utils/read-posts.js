const fs = require("fs");
const path = require("path");
const showdown = require("showdown");

const readPostsSync = () => {
  return fs.readdirSync(path.resolve(__dirname, "../src/assets/posts/"));
};

const getPostMeta = filename => {
  const converter = new showdown.Converter();
  converter.setOption("metadata", true);
  const buffer = fs.readFileSync(
    path.resolve(__dirname, `../src/assets/posts/${filename}`)
  );
  converter.makeHtml(buffer.toString());
  const metadata = converter.getMetadata();
  return metadata;
};

const posts = readPostsSync();
getPostMeta(posts[0]);
module.exports = { readPostsSync, getPostMeta };
