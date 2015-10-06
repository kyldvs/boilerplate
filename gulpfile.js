
// This is necessary so we can use the src version of this package before it is
// built in lib.
require('nuclide-node-transpiler');

var gulp = require('gulp');

require('./src/boilerplate')(gulp, {
  paths: {
    // For compiling src to lib.
    dest: 'lib',
    src: [
      'src/**/*.js',
    ],

    // For webpack.
    dist: './dist/',
    entry: './index.js',
    name: 'index',
  },
});
