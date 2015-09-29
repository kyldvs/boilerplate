
// This is necessary so we can use the src version of this package before it is
// built in lib.
require('nuclide-node-transpiler');

var gulp = require('gulp');

require('./src/boilerplate')(gulp, {
  paths: {
    dest: 'lib',
    src: [
      'src/**/*.js',
    ],
  },
});
