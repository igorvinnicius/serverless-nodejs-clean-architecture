const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: slsw.lib.entries,
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  node: false,
  optimization: {
    minimize: false,
  },
  devtool: 'inline-cheap-module-source-map',
};