import webpack from 'webpack';
import path from 'path';

// Webpack Plugins
import livereloadPlugin from 'webpack-livereload-plugin';

const babelPlugins = [
  'angular2-annotations',
  'transform-decorators-legacy',
  'transform-class-properties',
  'transform-flow-strip-types'
];

const isProduction = process.env.NODE_ENV === 'prod';
      
const plugins = isProduction ?
    [
      new webpack.DefinePlugin({ENVIRONMENT: JSON.stringify('production')}),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
          beautify: false,
          mangle: { screw_ie8 : true },
          compress : { screw_ie8 : true },
          comments: false
      })
    ] :
    [new webpack.DefinePlugin({ENVIRONMENT: JSON.stringify('development')}), new livereloadPlugin({appendScriptTag: true})]

export default {
  entry: {
    boot: './client/root.js'
  },

  debug: isProduction ? false: true,

  output: {
    path: './build',
    filename: 'app.bundle.js'
  },

  module: {
    loaders: [{
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules)/,
        query: {
          presets: ['es2015'],
          plugins: babelPlugins
        }
      }, {
        test: /\.scss$/,
        loaders: [ 'style', 'css', 'autoprefixer-loader?browsers=last 2 versions', 'sass']
      }, {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }, {
        test: /\.html$/,
        loader: 'html'
      }]
  },

  htmlLoader: {
    minimize: true,
    removeAttributeQuotes: false,
    caseSensitive: true,
    customAttrSurround: [
      [/#/, /(?:)/],
      [/\*/, /(?:)/],
      [/\[?\(?/, /(?:)/]
    ],
    customAttrAssign: [/\)?\]?=/]
  },

  sassLoader: {
    includePaths: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'styles')]
  },

  resolve: {
    root: path.resolve(__dirname),
    extensions: ['', '.js', '.json']
  },

  plugins: plugins,

  devtool: isProduction ? '' : 'eval'
};
