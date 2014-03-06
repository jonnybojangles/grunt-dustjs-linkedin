var _ = require('lodash');
var dust = require('dustjs-linkedin');
var path = require('path');
var util = require('util');

function Builder(grunt) {
  this.grunt = grunt;
}

Builder.prototype.build = function(task) {
  var self = this;
  var files = task.files;
  var options = task.options({
    name: self.name,
    optimizers: {}
  });

  _.each(files, function(file) {
    self.grunt.file.write(file.dest, self.compile(file, options));
  });
};

Builder.prototype.compile = function(file, options) {
  var grunt = this.grunt;
  var src = file.src;
  var dest = file.dest;
  var source = grunt.file.read(src);
  var name = this.resultInContext(options.name, file, file, options);
  var dustOptimizers = dust.optimizers;

  dust.optimizers = _.extend(dustOptimizers, options.optimizers);

  return dust.compile(source, name);
};

Builder.prototype.name = function(file, options) {
  var out = path.join(
    path.dirname(file.dest),
    path.sep,
    path.basename(file.dest, path.extname(file.dest))
  );

  return path.relative(file.orig.dest, out);
};

Builder.prototype.resultInContext = function(value, context) {
  if(_.isFunction(value)) {
    var args = Array.prototype.slice.call(arguments, 2);
    return value.apply(context, args);
  }

  return value;
};

module.exports = function(grunt) {
  var builder = new Builder(grunt);
  grunt.registerMultiTask('dust', function() {
    builder.build(this);
  });
};