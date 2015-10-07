'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _gulpBabel = require('gulp-babel');

var _gulpBabel2 = _interopRequireDefault(_gulpBabel);

var _fbjsScriptsBabelDevExpression = require('fbjs-scripts/babel/dev-expression');

var _fbjsScriptsBabelDevExpression2 = _interopRequireDefault(_fbjsScriptsBabelDevExpression);

var _fbjsScriptsBabelRewriteModules = require('fbjs-scripts/babel/rewrite-modules');

var _fbjsScriptsBabelRewriteModules2 = _interopRequireDefault(_fbjsScriptsBabelRewriteModules);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _webpackStream = require('webpack-stream');

var _webpackStream2 = _interopRequireDefault(_webpackStream);

'use babel';

var EMPTY_OBJ = {};

// Construct some sane defaults for babel options.
var DEFAULT_BABEL_OPTIONS = {
  stage: 1,
  blacklist: [
  /**
   * This transform converts
   *
   *   var foo = function() {}
   *
   *  Into
   *
   *    var foo = function foo() {}
   */
  'spec.functionName'],
  loose: true,
  plugins: [_fbjsScriptsBabelDevExpression2['default'], _fbjsScriptsBabelRewriteModules2['default']],
  _moduleMap: {}
};

/**
 * Entry point into boilerplate. This accepts some options and then sets up
 * appropriate gulp tasks. Note that you will still need to have a gulpfile.js
 * that calls this function in order to set up each project.
 */
function boilerplate(gulp, options) {
  var paths = options.paths;

  // Construct babel options based on defaults and input.
  var babelOptions = _extends({}, DEFAULT_BABEL_OPTIONS, options.babel || EMPTY_OBJ);

  gulp.task('build', function () {
    return gulp.src(paths.src).pipe(_gulpBabel2['default'](babelOptions)).pipe(gulp.dest(paths.dest));
  });

  gulp.task('clean', function (cb) {
    _del2['default']([paths.dest], cb);
  });

  gulp.task('default', ['build']);

  gulp.task('dist', ['build'], function () {
    return gulp.src(paths.entry).pipe(buildDist({
      debug: true,
      name: paths.name
    })).pipe(gulp.dest(paths.dist));
  });
}

function buildDist(opts) {
  var webpackOpts = {
    debug: opts.debug,
    module: {
      loaders: [{ test: /\.js$/, loader: 'babel' }]
    },
    output: {
      filename: opts.name + '.js'
    },
    plugins: [new _webpackStream2['default'].webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(opts.debug ? 'development' : 'production')
    })]
  };
  if (!opts.debug) {
    webpackOpts.plugins.push(new _webpackStream2['default'].webpack.optimize.UglifyJsPlugin({
      compress: {
        hoist_vars: true,
        screw_ie8: true,
        warnings: false
      }
    }));
  }
  return _webpackStream2['default'](webpackOpts, null, function (err, stats) {
    if (err) {
      throw new _gulpUtil2['default'].PluginError('webpack', err);
    }
    if (stats.compilation.errors.length) {
      _gulpUtil2['default'].log('webpack', '\n' + stats.toString({ colors: true }));
    }
  });
};

exports['default'] = boilerplate;
module.exports = exports['default'];