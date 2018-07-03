import webpack from 'webpack';
import path from 'path';
import Dashboard from 'webpack-dashboard';

// Webpack Plugins
import LivereloadPlugin from 'webpack-livereload-plugin';
import DashboardPlugin from 'webpack-dashboard/plugin';

const babelPlugins = [
  'angular2-annotations',
  'transform-decorators-legacy',
  'transform-class-properties',
  'transform-flow-strip-types'
];

const isProduction = process.env.NODE_ENV === 'prod';

const dashboard = new Dashboard();

const devPlugins = [
  new DashboardPlugin(dashboard.setData),
  new webpack.DefinePlugin({ ENVIRONMENT: JSON.stringify('development') }),
  new LivereloadPlugin({ appendScriptTag: true }),
  new webpack.optimize.CommonsChunkPlugin(
    'vendor', 'vendor.js'
  )
];

const prodPlugins = [
  new webpack.DefinePlugin({ ENVIRONMENT: JSON.stringify('production') }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.CommonsChunkPlugin(
    'vendor', 'vendor.js'
  ),
  new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    mangle: { screw_ie8: true },
    compress: { screw_ie8: true },
    comments: false
  })
];

export default {
  entry: {
    boot: './client/root.js',
    vendor: './client/vendor.js'
  },

  debug: isProduction,

  output: {
    path: './build',
    filename: '[name].js'
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
      loaders: ['style', 'css', 'autoprefixer-loader?browsers=last 2 versions', 'sass']
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

  plugins: isProduction ? prodPlugins : devPlugins,

  devtool: isProduction ? '' : 'eval'
};
