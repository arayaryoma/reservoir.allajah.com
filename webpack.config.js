const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const yaml = require("js-yaml");
const fs = require("fs");
const PRODUCTION = process.env.NODE_ENV === "production";
const readPosts = require("./webpack-utils/read-posts");

const languages = {
  ja: yaml.safeLoad(fs.readFileSync("./src/assets/i18n/ja.yml"), "utf8")
};

const defaultLang = "ja";

const internationalize = lang => {
  return nestedKey => {
    let local = languages[lang];
    const keys = nestedKey.replace(/^\./, "").split(".");
    for (let i = 0, length = keys.length; i < length; ++i) {
      const key = keys[i];
      if (!(key in local)) {
        return nestedKey;
      }
      local = local[key];
    }
    return local;
  };
};

/*
{
  filename: string;
  title: string;
  date: string;
  abstract: string;
}[]
 */
let posts = [];
for (const file of readPosts.readPostsSync()) {
  posts.push(readPosts.getPostMeta(file));
}
const postsHtmlPluginInstances = [];
for (post of posts) {
  postsHtmlPluginInstances.push(
    new HtmlPlugin({
      template: "src/templates/post.pug",
      filename: `posts/${post.filename}.html`,
      post
    })
  );
}

const config = lang => {
  return {
    entry: ["babel-polyfill", "./src/scripts/index.js"],
    resolve: {
      extensions: [".js", ".json"]
    },
    output: {
      path: path.join(__dirname, "dist", lang === defaultLang ? "" : lang),
      filename:
        lang === defaultLang ? "[name].[hash].js" : `[name]-${lang}.[hash].js`
    },
    plugins: [
      new HtmlPlugin({
        template: "src/templates/index.pug",
        filename: "index.html",
        i18n: internationalize(lang),
        posts
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      new OptimizeCSSAssetsPlugin({}),
      new CopyWebpackPlugin([
        {
          from: "public/*",
          to: ""
        }
      ]),
      ...postsHtmlPluginInstances
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["babel-preset-env"]
            }
          }
        },
        {
          test: /\.(styl)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "stylus-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"]
        },

        {
          test: /\.(png|jpg|ico|svg|gif|woff|woff2|ttf|eot)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "assets/[name]-[hash].[ext]"
              }
            }
          ]
        },
        {
          test: /\.pug$/,
          use: [
            {
              loader: "pug-loader"
            }
          ]
        },
        {
          test: /\.md$/,
          use: ["html-loader", "markdown-loader"]
        }
      ]
    },
    devServer: {
      contentBase: path.resolve(__dirname, "dist"),
      port: 4000
    }
  };
};

module.exports = Object.keys(languages).map(lang => {
  return config(lang);
});
