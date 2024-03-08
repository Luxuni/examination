const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'source-map',
  entry: ['./webpack-hot-dev-server.js', './src/view/index.tsx'],
  devServer: {
    port: 4000,
    client: {
      webSocketURL: {
        protocol: 'ws',
        hostname: 'localhost',
        pathname: 'ws',
      },
    },
    compress: false,
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, './src/view/public'),
    },
    watchFiles: ['src/view/**/*'],
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
});
