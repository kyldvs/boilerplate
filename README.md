# kad-boilerplate

Some simple boiler plate so I don't have to rewrite build scripts every damn project.

## Usage

This boilerplate relies on `gulp` being installed. So first run:

```
npm install --save-dev gulp kad-boilerplate
```

Then create `gulpfile.js` where you can configure the boilerplate:

```javascript
require('kad-boilerplate')({
  paths: {
    dest: 'lib',
    src: [
      'src/**/*.js',
      '!src/**/__tests__/**/*.js',
      '!src/**/__mocks__/**/*.js',
    ],
  },
});
```

Then in order to build your project simply run `gulp` from the command line.

## Commands

### `build`

Builds your project according to the `src`, `dest`, and `babel` options specified.

### `clean`

Cleans the project based on `dest` option.

### `default`

Alias for the `build` step so that `gulp` will work without any arguments.
