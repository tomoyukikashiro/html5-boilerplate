module.exports = function(grunt) {

  var lintFiles = [
  ];

  // Project configuration.
  grunt.initConfig({

    // lint javascript file
    lint: {
      dev: lintFiles,
      prod: lintFiles
    },
    jshint: {
      files: lintFiles,
      options: {
        globals: {
          console: true,
          "debugger": true,
          window: true,
          setTimeout: true,
          setInterval: true,
          Global: true,
          Backbone: true
        }
      }
   },
    concat: {
      other: {
        src: lintFiles,
        dest: '../js/app_concat.js'
      },
      main: {
        src: ['js/main.js'],
        dest: '../js/main.js'
      }
    },
    uglify: {
      dist: {
        files: {
          "../js/app_min.js":['../js/app_concat.js']
        }
      }
    },
    compass: {
      dev: {
        options: {
          config:'./config.rb'
        }
      }
   },
    watch: {
      sass: {
        files: ['sass/**/*.scss'],
        tasks: 'compass'
      },
      js: {
        files: ['js/**/*.js'],
        tasks: 'lint'
      },
      all: {
        files: ['js/**/*.js', 'sass/**/*.scss'],
        tasks: 'default'
      }
    }
  });

  // load Tasks
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // regist
  grunt.registerTask('default', ['jshint', 'compass', 'concat']);
  grunt.registerTask('prod', ['jshint', 'compass', 'concat', 'uglify']);
};
