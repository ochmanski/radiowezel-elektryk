const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');
const AutoDllPlugin = require('autodll-webpack-plugin');
const Jarvis = require('webpack-jarvis');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const Dotenv = require('dotenv-webpack');

console.log(paths);

module.exports = {
  mode: 'development',
  watch: true,
  devtool: 'eval',
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    usedExports: false,
    mergeDuplicateChunks: true,
    minimize: false
  },
  watchOptions: {
    aggregateTimeout: 1,
    ignored: /node_modules/,
    poll: 10 // Dla VirtualBoxa (Dockera, Vagranta)
  },
  output: {
    filename: '[name].bundle.js',
    path: paths.output,
    publicPath: '/',
  },
  resolve: {
    mainFields: ['browser', 'main', 'module'],
    modules: [
      '../node_modules',
      paths.src,
      './node_modules'
    ],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: paths.tsConfig
      }),
    ]
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
      
      // TypeScript
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [/*{
          loader: 'thread-loader'
        }, */{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            cacheCompression: false
          }
        }]
      },
      // SCSS z CSS Modules
      {
        test: /\.(scss|sass)$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            importLoader: 1,
            modules: true,
            sourceMap: false,
            localIdentName: '[name]__[local]___[hash:base64:5]',
            minimize: false
          }
        }, {
          loader: 'fast-sass-loader'
        }]
      },
      // Obrazy
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: false,
              name: '[name].[ext]',
              publicPath: 'images/'
            }
          }
        ]
      },
      // SVG
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  
  // Webpack dev server
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 5000,
    hot: true,
    inline: true,
    overlay: true,
    compress: false,
    contentBase: [
      paths.output,
      paths.assets
    ],
  },
  
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      path: paths.configEnv,
      safe: paths.configEnvExample
    }),
    new FriendlyErrorsWebpackPlugin(),
    new CheckerPlugin(),
    new CleanWebpackPlugin(paths.output, {
      watch: true,
      root: paths.root
    }),
    new HardSourceWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      title: 'Serwer deweloperski – Radiowęzeł Elektryk',
      template: paths.template
    }),
    new AutoDllPlugin({
      debug: true,
      inject: true,
      filename: '[name]_[hash].js',
      path: './dll',
      context: paths.root,
      entry: {
        vendor: [
          'react',
          'react-dom',
          'react-router',
          'react-router-dom',
          'react-tippy',
          'react-transition-group',
          'react-hot-loader',
          'react-svg-inline',
          'react-facebook-login',
          'react-helmet',
          'react-apollo',
          'apollo-boost',
          'apollo-cache-inmemory',
          'apollo-client',
          'graphql-tag',
          'graphql',
          'html-entities',
          'formik',
          'yup',
          'axios',
          'history',
          'gsap',
          'sockjs-client',
          'apollo-cache-inmemory/lib/bundle.umd.js',
          'apollo-client/bundle.umd.js',
          'apollo-utilities/lib/bundle.umd.js',
          'gsap/umd/TweenMax.js',
          'sockjs-client/dist/sockjs.js',
          'react-icons',
          'react-icons/fa',
          'react-icons/io',
          'react-icons/ti',
          'react-icons/md',
          'react-icons/go',
          '@material-ui/core',
          '@material-ui/core/index.js',
        ],
      },
    }),
    new Jarvis({
      host: '0.0.0.0',
      port: '5001'
    })
  ]
};
