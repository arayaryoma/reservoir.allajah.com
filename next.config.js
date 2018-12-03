const stylusConfigs = {
    cssModules: true,
    cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: "[local]__[hash:base64:5]",
    }
};
const withTypeScript = require('@zeit/next-typescript');
const withStylus = require ('@zeit/next-stylus');
module.exports = withTypeScript(withStylus(stylusConfigs));
