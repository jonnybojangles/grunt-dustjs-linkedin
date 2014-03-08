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
    name: self.name,
    optimizers: {},
    wrapper: {
      format: false
    }
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

Builder.prototype.wrap = function(content, options) {
  var format = options.wrapper.format;
  var wrapped;
  var context = dust.makeBase({
    compiled: content
  });

  if(!format) return content;
  if(_.isFunction(format)) return format(content, options);

  format = format.toLowerCase().trim();

  dust.render(format, context, function(err, out) {
    if(err) self.grunt.fail.warn(err);
    wrapped = out;
  });

  return wrapped;
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