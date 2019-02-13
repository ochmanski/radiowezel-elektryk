const path = require('path');
const common = require('./webpack/common');
const webpackMerge = require('webpack-merge');

// const envName = process.env.IS_PRODUCTION === 'true' ? 'prod' : 'dev';
const envName = 'dev';
const configBasedOnEnv = path.resolve(`./webpack/${envName}.js`);
const envConfig = require(configBasedOnEnv);

module.exports = webpackMerge(common, envConfig);
