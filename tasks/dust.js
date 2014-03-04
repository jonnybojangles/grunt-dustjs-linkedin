var _ = require('lodash');
var dust = require('dustjs-linkedin');
var path = require('path');
var util = require('util');

_.mixin({
  'resultInContext': function(value, context) {
    if(_.isFunction(value)) {
      var args = Array.prototype.slice.call(arguments, 2);
      return value.apply(context, args);
    }
    return value;
  }
});

module.exports = function(grunt) {
  grunt.registerMultiTask('dust', function() {
    var files = this.files;
    var options = this.options({
      name: function(file, options) {
        var out = path.join(
          path.dirname(this.dest),
          path.sep,
          path.basename(this.dest, path.extname(this.dest))
        );

        return path.relative(file.orig.dest, out);
      },
      optimizers: {}
    });

    _.each(files, function(file) {
      var src = file.src;
      var dest = file.dest;
      var source = grunt.file.read(src);
      var name = _.resultInContext(options.name, file, file, options);

      dust.optimizers = _.extend(dust.optimizers, options.optimizers);

      var out = dust.compile(source, name);

      grunt.file.write(dest, out);
    });
  });
};