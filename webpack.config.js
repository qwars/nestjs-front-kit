const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require("dotenv-webpack");

const MetaTags = { author: 'Alexandr Selunin; selunin@dev.vtb.ru' };

module.exports = (env, argv) => {
  return {
    context: __dirname + '/develop',
    entry: ['./index.tsx'],
    target: 'web',
    watchOptions: {
      poll: true,
    },
    devServer: {
      compress: true,
      devMiddleware: {
        writeToDisk: true
      },
      historyApiFallback: true,
    },
    optimization: {
      runtimeChunk: 'single',
      mangleWasmImports: true,
      moduleIds: 'deterministic',
      minimize: true,
      minimizer: [new TerserPlugin({ parallel: true })],
    },
    performance: {
      maxEntrypointSize: 3_145_728,
      maxAssetSize: 6_291_456,
    },
    output: {
      path: __dirname + '/public',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      targets: { browsers: ['> 0.5%, not dead'] },
                      debug: env.debug,
                      corejs: '3.26.1',
                      useBuiltIns: 'entry',
                    },
                  ],
                  '@babel/preset-react',
                  '@babel/preset-typescript',
                ],
                plugins: [
                  require.resolve('react-refresh/babel'),
                  'babel-plugin-styled-components'
                ].filter(Boolean),
              },
            },
          ],
        },
        {
          test: /\.[ps]?css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|ico)$/i,
          type: 'asset/resource',
        },
        {
          test: /.(woff2?|eot|[ot]tf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(svg)$/i,
          resourceQuery: /source/,
          type: 'asset/source',
        },
        {
          test: /\.(html|md)$/i,
          type: 'asset/source',
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          resourceQuery: { not: /source/ },
          use: ['@svgr/webpack', 'url-loader'],
        },
      ],
    },
    plugins: [
      process.env.npm_lifecycle_event.includes("build")
        ? new Dotenv()
        : new webpack.DefinePlugin({
          "process.env": JSON.stringify({
            ...argv,
            ...Object.fromEntries(
              Object.entries(process.env).filter((item) =>
                item[0].match(/^[A-Z]/)
              )
            ),
          }),
        }),

      new HtmlWebpackPlugin({
        title: '',
        favicon: './favicon.ico',
        meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no', ...MetaTags },
      }),

      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      }),
      !!env.stats && new BundleAnalyzerPlugin(),
      new ReactRefreshWebpackPlugin({ overlay: false }),
      new webpack.LoaderOptionsPlugin({ minimize: true }),
    ].filter(Boolean),
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
      alias: {
        '@components': __dirname + '/develop/components'
      },
    },
  };
};
