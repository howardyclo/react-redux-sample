/* Webpack configuration */

var path = require('path');
var webpack = require('webpack');

var config = {
  entry: getEntrySources([
    path.resolve(__dirname, 'app/index.js')
  ]),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { 
        test: /\.jsx?$/, 
        loader: 'babel', 
        include: path.resolve(__dirname, 'app'),
        exclude: path.resolve(__dirname, 'node_modules'),
        plugins: ['object-assign']
      },
      { 
        test: /\.css$/, 
        loader: "style!css" 
      }
    ]
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