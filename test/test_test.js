var grunt = require('grunt');

exports.test = {
  default_options: function(test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/default_options/fixtures/test.js');
    var expected = grunt.file.read('test/expected/default_options.js');
    test.equal(actual, expected);
    test.done();
  },

  default_options_dynamic: function(test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/default_options_dynamic/fixtures/test.js');
    var expected = grunt.file.read('test/expected/default_options_dynamic.js');
    test.equal(actual, expected);
    test.done();
  },

  name: function(test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/name/fixtures/test.js');
    var expected = grunt.file.read('test/expected/name.js');
    test.equal(actual, expected);
    test.done();
  },

  optimizers: function(test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/optimizers/fixtures/test.js');
    var expected = grunt.file.read('test/expected/optimizers.js');
    test.equal(actual, expected);
    test.done();
  },

  optimizers_dynamic: function(test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/optimizers_dynamic/fixtures/test.js');
    var expected = grunt.file.read('test/expected/optimizers_dynamic.js');
    test.equal(actual, expected);
    test.done();
  },

  wrapper: function(test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/wrapper/fixtures/test.js');
    var expected = grunt.file.read('test/expected/wrapper.js');
    test.equal(actual, expected);
    test.done();
  },

  wrapper_dynamic: function(test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/wrapper_dynamic/fixtures/test.js');
    var expected = grunt.file.read('test/expected/wrapper_dynamic.js');
    test.equal(actual, expected);
    test.done();
  },

  amd: function(test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/amd/fixtures/test.js');
    var expected = grunt.file.read('test/expected/amd.js');
    test.equal(actual, expected);
    test.done();
  },

  amd_dynamic: function(test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/amd_dynamic/fixtures/test.js');
    var expected = grunt.file.read('test/expected/amd_dynamic.js');
    test.equal(actual, expected);
    test.done();
  }
};