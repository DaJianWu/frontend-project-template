// https://webpack.docschina.org

/* eslint-disable */

const path = require('path');

const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');

/**
 * @description 开发环境配置
 * @type {import('webpack').Configuration}
 */
const developmentConfig = {
  // 模式
  mode: 'development',
  // 调试
  devtool: 'source-map',
  // 开发服务器
  devServer: {
    // static: path.resolve(__dirname, 'public'),
    port: 8888,
    open: true,
    hot: true,
    historyApiFallback: true,
    proxy: {},
  },
  // 插件
  plugins: [
    new webpack.ProgressPlugin(),
  ],
};

/**
 * @description 生产环境配置
 * @type {import('webpack').Configuration}
 */
const productionConfig = {
  // 模式
  mode: 'production',
  // 调试
  devtool: false,
  // 插件
  plugins: [
    new BundleAnalyzerPlugin.BundleAnalyzerPlugin(),
  ],
};

/**
 * @description 调试环境配置
 * @type {import('webpack').Configuration}
 */
const debuggerConfig = {
  // 模式
  mode: 'development',
  // 调试
  devtool: 'source-map',
};

/**
 * @description 公共配置
 * @returns {import('webpack').Configuration}
 */
function getCommonConfig(env) {
  return {
    // 构建目标
    target: 'browserslist',
    // 入口
    entry: path.resolve(__dirname, 'src/index.js'),
    // 出口
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].[chunkhash].js',
      assetModuleFilename: 'assets/[hash][ext]',
      clean: true,
      publicPath: '/',
    },
    // 缓存
    cache: {
      type: 'filesystem',
      cacheDirectory: path.resolve(__dirname, 'node_modules/.cache/webpack'),
    },
    // 解析
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.ts'],
      alias: {
        src: path.resolve(__dirname, 'src'),
      },
    },
    // 优化
    optimization: {
      // 分块策略
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          // defaultVendors: {
          //   test: /[\\/]node_modules[\\/]/,
          //   priority: -10,
          //   reuseExistingChunk: true,
          // },
          // default: {
          //   minChunks: 2,
          //   priority: -20,
          //   reuseExistingChunk: true,
          // },
          // styles: {
          //   test: /\.css$/,
          //   minSize: 0,
          //   minChunks: 2,
          // }
        },
      },
    },
    // 模块
    module: {
      // 规则
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.less$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
        },
        {
          test: /\.s[ac]ss$/,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        },
        {
          test: /\.(js|ts)$/,
          exclude: /node_modules/,
          use: ['thread-loader', 'babel-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 4 * 1024,
            },
          },
        },
      ],
    },
    // 插件
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, 'public/index.html'),
      }),
      new webpack.DefinePlugin({
        'process.env.APP_ENV': JSON.stringify(env.APP_ENV),
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css',
        chunkFilename: 'css/common.[hash].css',
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'public'),
            to: path.resolve(__dirname, 'dist'),
            toType: 'dir',
            globOptions: {
              ignore: ['**/index.html'],
            },
          },
        ],
      }),
    ],
    // 日志
    stats: {
      colors: true,
    },
  }
};

/**
 * @returns {import('webpack').Configuration}
 */
module.exports = (env, argv) => {
  // console.log(env, argv, process.env.NODE_ENV);

  switch (env.APP_ENV) {
    case 'dev':
      return merge(getCommonConfig(env), developmentConfig);
    case 'prod':
      return merge(getCommonConfig(env), productionConfig);
    case 'debug':
      return merge(getCommonConfig(env), debuggerConfig);
    default:
      throw new Error('No matching configuration was found!');
  }
};
