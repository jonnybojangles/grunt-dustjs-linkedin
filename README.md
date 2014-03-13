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

#### optimizers
Type: `Object`

Default: `{}`

Specifies custom optimizers to configure the dust compiler with.

#### wrapper
Type: `Boolean|String|Function`

Default: `false`

Specifies if and how to wrap the compiled dust template. Allowed values: `amd`. If you provide a function, then the arguments: data and options will be provided. Data will contain `file`, `name`, `helper`, `compiled` and `dependencies`. Options are a copy of the options given to the task. The string you return will be used as the final compiled output.

#### helper
Type: `Boolean|String|Function`

Default: `false`

Specifies if and what exports to use for the wrapper. Allowed values: `dust`. If you provide a function, then the arguments: data and options will be provided. Data will contain `file`, `name`, `compiled` and `dependencies`. The string you return will be used inside the wrapper. The dust helper will return exports with the methods `render`, `renderSync` and `stream`.

#### dependencies
Type: `Object`

Default: `{}`

Specifies dependencies to include in the wrapper. Keys are used as the variable names and values are used as the paths for requiring.

### Usage Examples

**Basic Grunt configuration**
```js
dust: {
  options: {
    wrapper: 'amd',
    helper: 'dust',
    dependencies: {
      dust: 'dust'
    },
    optimizers: {
      format: function(ctx, node) { return node; }
    }
  },
  build: {
    expand: true,
    cwd: 'src',
    src: '**/*.dust',
    dest: 'dist',
    ext: '.js',
    filter: 'isFile'
  }
}
```

**Rendering a template with the AMD wrapper and the Dust helper**
```js
define(['./templates/my-template'], function(MyTemplate) {
  /*
   * asynchronous
   */
  MyTemplate.render({key: 'value'}, function(error, output) {

  });

  /*
   * synchronous
   */
  try {
    var output = MyTemplate.renderSync({key: 'value'});
  }
  catch(error) {

  }

  /*
   * stream
   */
  MyTemplate.stream({key: 'value'}, function(error, output) {

  });
});
```
