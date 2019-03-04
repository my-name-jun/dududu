var path = require('path');
var config = require('./webpack.config');
var webpack = require('webpack');
var publicPathName = require('./config');

config.output.path = path.join(__dirname, '../dist/uat');
config.output.publicPath = '/igi/'+publicPathName+'_uat/';
config.plugins[0] = new webpack.DefinePlugin({
    'NODE_ENV': '"uat"',
    'ENV_HOST': '"https://hms-uat.test-cignacmb.com"'
});
module.exports = config;
