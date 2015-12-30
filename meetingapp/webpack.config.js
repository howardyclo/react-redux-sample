/* Webpack configuration */

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
  entry: {
    app: getEntrySources([
      path.resolve(__dirname, 'app/index.js')
    ]),
    vendors: [
      'react',
      'redux',
      'react-dom',
      'react-redux',
      'react-router',
      'classnames',
      'parse'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { 
        test: /\.jsx?$/, 
        loaders: ['babel-loader'], 
        include: path.resolve(__dirname, 'app'),
        exclude: path.resolve(__dirname, 'node_modules'),
        plugins: ['object-assign']
      },
      { 
        test: /\.css$/, 
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]') 
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css', {
        allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ],
  devServer: {
    historyApiFallback: true /* Need this to work with react router */
  }
}

/* We won't deploy our webpack dev server in production */
function getEntrySources(sources) {

    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack-dev-server/client?http://localhost:8080');
    }

    return sources;
}

module.exports = config;