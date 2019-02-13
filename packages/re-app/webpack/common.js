const webpack = require('webpack');
const paths = require('./paths');

module.exports = {
  target: 'web',
  entry: {
    main: paths.src + '/index.tsx'
  },
  module: {
    rules: [
      // TSLint
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader',
            options: {
              configFile: paths.tslintConfig
            }
          }
        ]
      },
      
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  output: {
    path: paths.output,
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.mjs', '*', '.js', '.jsx', '.ts', '.tsx', '.scss', '.css', '.svg']
  },
  plugins: [
    new webpack.ProgressPlugin()
  ]
};
