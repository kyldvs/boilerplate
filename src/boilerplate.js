'use babel';
/* @flow */

import type {Options} from './types/options';

import babel from 'gulp-babel';
import babelPluginDEV from 'fbjs-scripts/babel/dev-expression';
import babelPluginModules from 'fbjs-scripts/babel/rewrite-modules';
import del from 'del';
import gulpUtil from 'gulp-util';
import webpackStream from 'webpack-stream';

const EMPTY_OBJ = {};

// Construct some sane defaults for babel options.
const DEFAULT_BABEL_OPTIONS = {
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
    'spec.functionName',
  ],
  loose: true,
  plugins: [babelPluginDEV, babelPluginModules],
  _moduleMap: {},
};

/**
 * Entry point into boilerplate. This accepts some options and then sets up
 * appropriate gulp tasks. Note that you will still need to have a gulpfile.js
 * that calls this function in order to set up each project.
 */
function boilerplate(gulp: any, options: Options): void {
  let {paths} = options;

  // Construct babel options based on defaults and input.
  let babelOptions = {
    ...DEFAULT_BABEL_OPTIONS,
    ...(options.babel || EMPTY_OBJ),
  };

  gulp.task('build', () => {
    return gulp
      .src(paths.src)
      .pipe(babel(babelOptions))
      .pipe(gulp.dest(paths.dest));
  });

  gulp.task('clean', (cb) => {
    del([paths.dest], cb);
  });

  gulp.task('default', ['build']);

  gulp.task('dist', ['build'], () => {
    return gulp
      .src(paths.entry)
      .pipe(buildDist({
        debug: true,
        name: paths.name,
      }))
      .pipe(gulp.dest(paths.dist));
  });
}

function buildDist(opts) {
  var webpackOpts = {
    debug: opts.debug,
    module: {
      loaders: [
        {test: /\.js$/, loader: 'babel'}
      ],
    },
    output: {
      filename: opts.name + '.js',
      libraryTarget: 'umd',
      library: opts.name,
    },
    plugins: [
      new webpackStream.webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(
          opts.debug ? 'development' : 'production'
        ),
      })
    ]
  };
  if (!opts.debug) {
    webpackOpts.plugins.push(
      new webpackStream.webpack.optimize.UglifyJsPlugin({
        compress: {
          hoist_vars: true,
          screw_ie8: true,
          warnings: false
        }
      })
    );
  }
  return webpackStream(webpackOpts, null, function(err, stats) {
    if (err) {
      throw new gulpUtil.PluginError('webpack', err);
    }
    if (stats.compilation.errors.length) {
      gulpUtil.log('webpack', '\n' + stats.toString({colors: true}));
    }
  });
};

export default boilerplate;
