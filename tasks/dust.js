var _ = require('lodash');
var dust = require('dustjs-linkedin');
var helpers = require('dustjs-helpers').helpers;
var path = require('path');
var util = require('util');

function Builder(grunt) {
  this.grunt = grunt;
  dust.helpers = helpers;
  this.dustOptimizers = _.clone(dust.optimizers);
  this.load();
}

Builder.prototype = {
  load: function() {
    var self = this;
    dust.optimizers.format = function(ctx, node) { return node; };
    _.each([
      'amd-wrapper',
      'commonjs-wrapper',
      'dust-helper',
      'q-helper',
      'bluebird-helper'
    ], function(name) {
      var file = path.join(__dirname, name + '.dust');
      var source = self.grunt.file.read(file);
      dust.loadSource(dust.compile(source, name));
    });
  },

  build: function(task) {
    var self = this;
    var files = task.files;
    var options = task.options({
      name: self.name,
      optimizers: {},
      wrapper: false,
      helper: false,
      dependencies: {},
      banner: '',
      footer: ''
    });
    _.each(files, function(file) {
      self.grunt.file.write(file.dest, self.compile(file, options));
    });
  },

  compile: function(file, options) {
    var grunt = this.grunt;
    var src = file.src;
    var dest = file.dest;
    var source = grunt.file.read(src);
    var name = this.result(options.name, this, {file: file}, options);
    this.reset();
    dust.optimizers = _.extend(dust.optimizers, options.optimizers);
    var data = {
      file: file,
      name: name,
      compiled: dust.compile(source, name)
    };
    var wrapped = this.wrap(data, options);
    return options.banner + wrapped + options.footer;
  },

  wrapper: function(format, data, options) {
    var self = this;
    var wrapped;
    var context = dust.makeBase({
      compiled: data.compiled,
      name: data.name,
      helper: data.helper,
      dependencies: _.map(options.dependencies, function(value, key) {
        return {
          key: key,
          value: value
        };
      })
    });
    dust.render(format + '-wrapper', context, function(err, out) {
      if(err) self.grunt.fail.warn(err);
      wrapped = out;
    });
    return wrapped;
  },

  name: function(data, options) {
    var file = data.file;
    var out = path.join(
      path.dirname(file.dest),
      path.sep,
      path.basename(file.dest, path.extname(file.dest))
    );

    return out.replace(file.orig.dest + path.sep, '');
  },

  wrap: function(data, options) {
    var helper = this.result(options.helper, this, data, options) || '';
    var helperOutput;
    switch(helper) {
      case 'dust':
      case 'q':
      case 'bluebird':
        helperOutput = this.helper(helper, data, options);
        break;
      default:
        helperOutput = helper;
    }
    data = _.extend(data, {
      helper: helperOutput
    });
    var result = this.result(options.wrapper, this, data, options);
    var wrapper = result || data.compiled;
    var wrapperOutput;
    switch(wrapper) {
      case 'amd':
      case 'commonjs':
        wrapperOutput = this.wrapper(wrapper, data, options);
        break;
      default:
        wrapperOutput = wrapper;
        break;
    }
    return wrapperOutput;
  },

  helper: function(format, data, options) {
    var self = this;
    var wrapped;
    var context = dust.makeBase({
      name: data.name,
      compiled: data.compiled,
      dependencies: _.map(options.dependencies, function(value, key) {
        return {
          key: key,
          value: value
        };
      })
    });
    dust.render(format + '-helper', context, function(err, out) {
      if(err) self.grunt.fail.warn(err);
      wrapped = out;
    });
    return wrapped;
  },

  result: function(value, context) {
    if(_.isFunction(value)) {
      var args = Array.prototype.slice.call(arguments, 2);
      return value.apply(context, args);
    }
    return value;
  },

  reset: function() {
    _.each(this.dustOptimizers, function(optimizer, name) {
      dust.optimizers[name] = optimizer;
    });
  }
};

module.exports = function(grunt) {
  var builder = new Builder(grunt);
  grunt.registerMultiTask('dust', function() {
    builder.build(this);
  });
};