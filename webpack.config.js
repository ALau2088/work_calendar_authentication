const path = require('path');

module.exports = {
  module: {
    rules: [
      { test: /\.js$||\.jsx/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] }
    ]
  },
  entry: './client/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public')
  }
};
