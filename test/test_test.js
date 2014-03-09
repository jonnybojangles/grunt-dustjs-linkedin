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