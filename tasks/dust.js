var _ = require('lodash');
var dust = require('dustjs-linkedin');
var path = require('path');
var util = require('util');

function Builder(grunt) {
  this.grunt = grunt;
  var amd = dust.compile(grunt.file.read(path.join(__dirname, 'amd.dust')), 'amd');
  dust.loadSource(amd);
}

Builder.prototype.build = function(task) {
  var self = this;
  var files = task.files;
  var options = task.options({
    templateName: self.name,
    moduleName: self.name,
    optimizers: {},
    wrapper: false,
    helper: 'dust',
    dependencies: {}
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
  var name = this.result(options.templateName, this, file, options);
  var dustOptimizers = dust.optimizers;

  dust.optimizers = _.extend(dustOptimizers, options.optimizers);
  var out = dust.compile(source, name);
  dust.optimizers = dustOptimizers;

  return this.wrap(out, options);
};

Builder.prototype.name = function(file, options) {
  var out = path.join(
    path.dirname(file.dest),
    path.sep,
    path.basename(file.dest, path.extname(file.dest))
  );

  return path.relative(file.orig.dest, out);
};

Builder.prototype.wrap = function(compiled, options) {
  var format = options.wrapper;
  var result = this.result(format, this, compiled, options) || compiled;

  switch(result) {
    case 'amd': return this.wrapper('amd', compiled, options);
    default: return result;
  }
};

Builder.prototype.wrapper = function(format, compiled, options) {
  var wrapped;
  var context = dust.makeBase({
    compiled: compiled
  });

  dust.render(format, context, function(err, out) {
    if(err) self.grunt.fail.warn(err);
    wrapped = out;
  });

  return wrapped;
};

Builder.prototype.result = function(value, context) {
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