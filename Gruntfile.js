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

      amd: {
        options: {
          wrapper: 'amd'
        },
        files: {
          'tmp/amd/fixtures/test.js': ['test/fixtures/test.js.dust']
        }
      },

      amd_dynamic: {
        options: {
          wrapper: 'amd'
        },
        expand: true,
        cwd: 'test',
        src: '**/*.js.dust',
        dest: 'tmp/amd_dynamic',
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