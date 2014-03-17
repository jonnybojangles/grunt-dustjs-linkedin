module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%=nodeunit.tests%>'
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    clean: {
      tests: ['tmp'],
    },

    nodeunit: {
      tests: ['test/*_test.js'],
    },

    dust: {
      default_options: {
        files: {
          'tmp/default_options/fixtures/test.js': ['test/fixtures/test.js.dust']
        }
      },

      default_options_dynamic: {
        expand: true,
        cwd: 'test',
        src: '**/*.js.dust',
        dest: 'tmp/default_options_dynamic',
        ext: '.js',
        filter: 'isFile'
      },

      name: {
        options: {
          name: function(file, options) {
            return 'hello_world';
          }
        },
        files: {
          'tmp/name/fixtures/test.js': ['test/fixtures/test.js.dust']
        }
      },

      optimizers: {
        options: {
          optimizers: {
            format: function(ctx, node) {
              return node;
            }
          }
        },
        files: {
          'tmp/optimizers/fixtures/test.js': ['test/fixtures/test.js.dust']
        }
      },

      optimizers_dynamic: {
        options: {
          optimizers: {
            format: function(ctx, node) {
              return node;
            }
          }
        },
        expand: true,
        cwd: 'test',
        src: '**/*.js.dust',
        dest: 'tmp/optimizers_dynamic',
        ext: '.js',
        filter: 'isFile'
      },

      wrapper: {
        options: {
          wrapper: function(data, options) {
            return '[TEST=' + data.compiled + '=TEST]';
          }
        },
        files: {
          'tmp/wrapper/fixtures/test.js': ['test/fixtures/test.js.dust']
        }
      },

      wrapper_dynamic: {
        options: {
          wrapper: function(data, options) {
            return '[TEST=' + data.compiled + '=TEST]';
          }
        },
        expand: true,
        cwd: 'test',
        src: '**/*.js.dust',
        dest: 'tmp/wrapper_dynamic',
        ext: '.js',
        filter: 'isFile'
      },

      helper: {
        options: {
          wrapper: 'amd',
          helper: function(data, options) {
            return 'function testHelper() {}';
          }
        },
        files: {
          'tmp/helper/fixtures/test.js': ['test/fixtures/test.js.dust']
        }
      },

      helper_dynamic: {
        options: {
          wrapper: 'amd',
          helper: function(data, options) {
            return 'function testHelper() {}';
          }
        },
        expand: true,
        cwd: 'test',
        src: '**/*.js.dust',
        dest: 'tmp/helper_dynamic',
        ext: '.js',
        filter: 'isFile'
      },

      amd: {
        options: {
          wrapper: 'amd',
          helper: 'dust',
          dependencies: {
            dust: 'dust',
            dustHelpers: 'dust-helpers'
          }
        },
        files: {
          'tmp/amd/fixtures/test.js': ['test/fixtures/test.js.dust']
        }
      },

      amd_dynamic: {
        options: {
          wrapper: 'amd',
          helper: 'dust',
          dependencies: {
            dust: 'dust',
            dustHelpers: 'dust-helpers'
          }
        },
        expand: true,
        cwd: 'test',
        src: '**/*.js.dust',
        dest: 'tmp/amd_dynamic',
        ext: '.js',
        filter: 'isFile'
      },

      commonjs: {
        options: {
          wrapper: 'commonjs',
          helper: 'dust',
          dependencies: {
            dust: 'dust',
            dustHelpers: 'dust-helpers'
          }
        },
        files: {
          'tmp/commonjs/fixtures/test.js': ['test/fixtures/test.js.dust']
        }
      },

      commonjs_dynamic: {
        options: {
          wrapper: 'commonjs',
          helper: 'dust',
          dependencies: {
            dust: 'dust',
            dustHelpers: 'dust-helpers'
          }
        },
        expand: true,
        cwd: 'test',
        src: '**/*.js.dust',
        dest: 'tmp/commonjs_dynamic',
        ext: '.js',
        filter: 'isFile'
      }
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', ['clean', 'dust', 'nodeunit']);
  grunt.registerTask('default', ['jshint', 'test']);
};