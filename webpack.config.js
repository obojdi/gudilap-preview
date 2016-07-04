var webpack = require('webpack');

module.exports = {
  entry: {
    app : ['./src/index.js']
  },
  output: {
    path: __dirname + '/build/',
    filename: 'gudilap-preview.user.js'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    /*new webpack.optimize.DedupePlugin(),*/
  ],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules|bower_components/, loader: 'babel-loader' },
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  },


  resolve: {
    modulesDirectories: ['node_modules'],
    extensions:         ['', '.js']
  },
  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates:    ['*-loader', '*'],
    extensions:         ['', '.js']
  },


  /*devtool: 'eval',
  debug: true,
  devServer: {
    contentBase: './build/',
    port: 1337,
    hot: true,
    inline: true
  },*/
  

  watchOptions: {
    aggregateTimeout: 100
  }
};