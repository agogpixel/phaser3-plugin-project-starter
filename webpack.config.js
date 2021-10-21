/* eslint-disable @typescript-eslint/no-var-requires */

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');

const { resolve } = require('path');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const srcPath = resolve(__dirname, 'src');
const dstPath = resolve(__dirname, 'dist');

module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? 'hidden-source-map' : 'source-map',
  entry: {
    main: `${srcPath}/index.ts`
  },
  output: {
    filename: 'main.bundle.js',
    path: dstPath,
    library: {
      name: 'Phaser3PluginProjectStarter',
      type: 'umd'
    }
  },
  externals: {
    phaser: {
      commonjs: 'phaser',
      commonjs2: 'phaser',
      amd: 'phaser',
      root: 'Phaser'
    }
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.build.json'
            }
          },
          'source-map-loader'
        ],
        include: srcPath,
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: isProd
            }
          }
        ]
      },
      {
        test: /\.s?css$/,
        use: [
          isProd ? { loader: MiniCssExtractPlugin.loader } : { loader: 'style-loader' },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    isProd ? new CleanWebpackPlugin() : undefined,
    isProd ? new MiniCssExtractPlugin() : undefined,
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv)
      }
    }),
    new CopyWebpackPlugin({
      patterns: ['package.json', 'README.md', 'LICENSE']
    })
  ].filter(Boolean)
};
