var _ = require('lodash');
var dust = require('dustjs-linkedin');
var helpers = require('dustjs-helpers').helpers;
var path = require('path');
var util = require('util');

function Builder(grunt) {
  this.grunt = grunt;
  dust.helpers = helpers;
  this.dustOptimizers = _.clone(dust.optimizers);
  dust.optimizers.format = function(ctx, node) { return node; };
  var amd = dust.compile(grunt.file.read(path.join(__dirname, 'amd.dust')), 'amd');
  dust.loadSource(amd);
}

Builder.prototype.build = function(task) {
  var self = this;
  var files = task.files;
  var options = task.options({
    name: self.name,
    optimizers: {},
    wrapper: false,
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
  var name = this.result(options.name, this, file, options);
  this.reset();
  dust.optimizers = _.extend(dust.optimizers, options.optimizers);
  return this.wrap(dust.compile(source, name), options);
};

Builder.prototype.name = function(file, options) {
  var out = path.join(
    path.dirname(file.dest),
    path.sep,
    path.basename(file.dest, path.extname(file.dest))
  );

  return out.replace(file.orig.dest + path.sep, '');
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
    quote: options.quote,
    compiled: compiled,
    dependencies: _.map(options.dependencies, function(value, key) {
      return {
        key: key,
        value: value
      };
    })
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

Builder.prototype.reset = function() {
  _.each(this.dustOptimizers, function(optimizer, name) {
    dust.optimizers[name] = optimizer;
  });
};

module.exports = function(grunt) {
  var builder = new Builder(grunt);
  grunt.registerMultiTask('dust', function() {
    builder.build(this);
  });
};