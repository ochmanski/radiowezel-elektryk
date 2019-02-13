const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const paths = require('./paths');
const AutoDllPlugin = require('autodll-webpack-plugin');
const Jarvis = require('webpack-jarvis');
const { GenerateSW, InjectManifest } = require('workbox-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  watch: true,
  devtool: 'eval',
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
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
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            cacheCompression: false
          }
        },*/
        'thread-loader',
        {
          loader: 'awesome-typescript-loader',
          options: {
            useTranspileModule: true,
            forceIsolatedModules: true,
            transpileOnly: true,
            useCache: true,
            useBabel: paths.babelrc,
            babelCore: '@babel/core',
            configFileName: paths.tsConfig,
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
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 5000,
    overlay: true,
    compress: false,
    contentBase: [
      paths.output,
      paths.assets
    ],
  },
  
  plugins: [
    new CheckerPlugin(),
    new CleanWebpackPlugin(paths.output, {
      watch: true,
      root: path.resolve('../'),
    }),
    new HardSourceWebpackPlugin(),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static'
    // }),
    new Dotenv({
      path: '/config/.env',
      safe: '/config/.env.example'
    }),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      title: 'Serwer deweloperski – Radiowęzeł Elektryk',
      serviceWorker: '<script></script>',
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
          'apollo-client/bundle.umd.js',
          'graphql-tag',
          'graphql',
          'formik',
          'yup',
          'gsap',
          'gsap/umd/TweenMax.js',
          'sockjs-client',
          'sockjs-client/dist/sockjs.js',
          'react-icons',
          'react-icons/fa',
          'react-icons/io',
          'react-icons/ti',
          'react-icons/md',
          'react-icons/go',
          '@material-ui/core',
        ],
      },
    }),
    new Jarvis({
      host: '0.0.0.0',
      port: '5001'
    }),
    new GenerateSW({
      runtimeCaching: [
        {
          urlPattern: /images/,
          handler: 'cacheFirst'
        },
        {
          urlPattern: new RegExp('^https://fonts.(?:googleapis|gstatic).com/(.*)'),
          handler: 'cacheFirst'
        },
        {
          urlPattern: "http://localhost:3001/socket.io/?EIO=3&transport=polling&t=MR_V-op",
          handler: 'networkOnly'
        },
        {
          urlPattern: /.*/,
          handler: 'networkFirst'
        }
      ],
      swDest: '../dist/re-worker.js',
      clientsClaim: true,
      skipWaiting: true,
    })
    // new InjectManifest({
    //   swSrc: '../dist/re-worker.js',
    //   swDest: '../dist/re-worker-built.js',
    //   include: [/\.html$/, /\.js$/, /\.svg$/, /\.css$/, /\.png$/, /\.ico$/]
    // })
  ]
};
