const fs = require("fs");
const path = require("path");
const showdown = require("showdown");
const dayjs = require("dayjs");

const readPostsSync = () => {
  return fs.readdirSync(path.resolve(__dirname, "../src/assets/posts/"));
};

/*
{
  filename: string;
  title: string;
  date: string;
  abstract: string;
}[]
 */

const getPostMeta = filename => {
  const converter = new showdown.Converter();
  converter.setOption("metadata", true);
  const buffer = fs.readFileSync(
    path.resolve(__dirname, `../src/assets/posts/${filename}`)
  );
  converter.makeHtml(buffer.toString());
  const metadata = converter.getMetadata();
  metadata.filename = filename.split(".md")[0];
  metadata.date = parseDate(metadata.date);
  return metadata;
};

const parseDate = date => {
  return dayjs(date).format("YYYY-MM-DD");
};

module.exports = { readPostsSync, getPostMeta };
