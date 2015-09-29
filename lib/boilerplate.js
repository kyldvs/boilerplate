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
}

exports['default'] = boilerplate;
module.exports = exports['default'];