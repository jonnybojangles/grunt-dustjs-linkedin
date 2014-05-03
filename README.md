grunt-dustjs-linkedin [![Build Status](https://travis-ci.org/coryroloff/grunt-dustjs-linkedin.png?branch=master)](https://travis-ci.org/coryroloff/grunt-dustjs-linkedin)
=====================

> Compile DUST files to JS.



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-dustjs-linkedin --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-dustjs-linkedin');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4).*


## Dust task
_Run this task with the `grunt dust` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.
### Options

#### name
Type: `String|Function`

Specifies the name to be used for the compiled dust template's register function. Defaults to using the destination path with no extension. If a function is provided, then the arguments: data and options will be provided. Data will contain `file`. Options are a copy of the options given to the task.

#### resolve
Type: `Boolean|Function`

Resolves a module path based on a template name. Resolve is used to resolve templates included via the partial feature in DustJS. Defaults to using the default name function to resolve partial templates. If a function is provided, then the arguments: data and options will be provided. Data will contain `file`. Options are a copy of the options given to the task. Returning false will tell the task to ignore that partial.

#### optimizers
Type: `Object`

Default: `{}`

Specifies custom optimizers to configure the dust compiler with.

#### wrapper
Type: `Boolean|String|Function`

Default: `false`

Specifies if and how to wrap the compiled dust template. Allowed values: `amd` and `commonjs`. If you provide a function, then the arguments: data and options will be provided. Data will contain `file`, `name`, `helper`, `compiled` and `dependencies`. Options are a copy of the options given to the task. The string you return will be used as the final compiled output.

#### helper
Type: `Boolean|String|Function`

Default: `false`

Specifies if and what exports to use for the wrapper. Allowed values: `dust`, `q` and `bluebird`. If you provide a function, then the arguments: data and options will be provided. Data will contain `file`, `name`, `compiled` and `dependencies`. The string you return will be used inside the wrapper. The dust helper will return exports with the methods `render` and `renderSync`.

#### dependencies
Type: `Object`

Default: `{}`

Specifies dependencies to include in the wrapper. Keys are used as the variable names and values are used as the paths for requiring.

#### banner
Type: `String`

Default: empty string

Specifies a string that will be prepended to the compiled output. Template strings (e.g. <%= config.value %> will be expanded automatically.

#### footer
Type: `String`

Default: empty string

Specifies a string that will be appended to the compiled output. Template strings (e.g. <%= config.value %> will be expanded automatically.

### Usage Examples

**Basic Grunt configuration**
```js
dust: {
  options: {
    wrapper: "amd",
    helper: "dust",
    dependencies: {
      dust: "dust"
    },
    optimizers: {
      format: function(ctx, node) { return node; }
    }
  },
  build: {
    expand: true,
    cwd: "src",
    src: "**/*.dust",
    dest: "dist",
    ext: ".js",
    filter: "isFile"
  }
}
```

**Rendering a template with the AMD wrapper and the Dust helper**
```js
define(["./templates/my-template"], function(MyTemplate) {
  MyTemplate.render({key: "value"}, function(error, output) {

  });

  try {
    var output = MyTemplate.renderSync({key: "value"});
  }
  catch(error) {

  }
});
```

**Rendering a template with the CommonJS wrapper and the Q helper**
```js
var MyTemplate = require("./templates/my-template");

MyTemplate.render({key: "value"})
.then(function(output) {

})
.catch(function(error) {

})
.done();

Q.fcall(MyTemplate.renderSync, {key: "value"})
.then(function(output) {

})
.catch(function(error) {

})
.done();
```

## RequireJS Plugin

A plugin for RequireJS is included for compiling Dust templates into the same format as the AMD wrapper. Note: The following dependencies are required: dust-full (dustjs-linkedin), text (requirejs) and optionally, q.

### Options

#### url
Type: `String`

Default: empty string

Specifies a URL to prepend to the template's module path before requiring.

#### ext
Type: `String`

Default: `.dust`

Specifies the extension used for your Dust templates.

#### helper
Type: `Boolean|String|Function`

Default: `false`

Specifies if and what exports to use for the wrapper. Allowed values: `dust`, `q` and `bluebird`. If you provide a function, then the arguments: name will be provided. The object you return will be used inside the wrapper. The dust helper will return exports with the methods `render` and `renderSync`.

#### name
Type: `Function`

Specifies the name to be used for the compiled dust template's register function. Defaults to using the destination path with no extension. If a function is provided, then the arguments: name will be provided.

#### resolve
Type: `Boolean|Function`

Resolves a module path based on a template name. Resolve is used to resolve templates included via the partial feature in DustJS. Defaults to using the default name function to resolve partial templates. If a function is provided, then the arguments: name will be provided. Returning false will tell the task to ignore that partial.

### Usage Examples

**Basic Require configuration**
```js
require.config({
  config: {
    dustc: {
      url: '',
      ext: '.dust',
      helper: 'dust'
    }
  }
});
```

**Rendering a template with the AMD wrapper and the Dust helper**
```js
define(["dustc!./templates/my-template"], function(MyTemplate) {
  MyTemplate.render({key: "value"}, function(error, output) {

  });

  try {
    var output = MyTemplate.renderSync({key: "value"});
  }
  catch(error) {

  }
});
```