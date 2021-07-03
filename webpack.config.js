const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/demo/ts/Demo.ts',
  devtool: 'source-map',
  mode: 'development',
  target: [ 'web', 'es5' ],

  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [
      new TsConfigPathsPlugin({
        extensions: [ '.ts', '.js' ]
      })
    ]
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        resolve: {
          fullySpecified: false
        }
      },

      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre'
      },

      {
        test: /\.ts$/,
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }]
      }
    ]
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: true
    })
  ],

  output: {
    filename: 'demo.js',
    path: path.resolve(__dirname, './scratch/compiled')
  }
};
