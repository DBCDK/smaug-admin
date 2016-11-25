var babel = require('babel-core');

module.exports = function(wallaby) {
  return {
    files: [
      'package.json',
      'src/**/*.js',
      '!src/**/*.test.js'
    ],

    tests: [
      'src/**/*.test.js'
    ],

    compilers: {
      '**/*.js': wallaby.compilers.babel({
        babel: babel,
        presets: ["react"],
        plugins: [
          "transform-es2015-modules-commonjs",
          "transform-async-to-generator",
          "transform-class-properties",
          "transform-object-rest-spread",
          "transform-object-rest-spread",
          "transform-es2015-destructuring"
        ]
      })
    },

    env: {
      type: 'node',
      runner: 'node',
    },
    setup: function () {
      require('./src/utils/test.util');
    },

    testFramework: 'mocha@2.1.0'
  };
};
