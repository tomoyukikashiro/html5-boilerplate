module.exports = function(grunt) {

  "use strict";

  var lintFiles = [
    "coffee/A.coffee",
    "coffee/B.coffee"
  ];
  var OUTPUT_JS   = '../js/app_concat.js'; //Gruntfile.js からみた出力ファイル名
  var TARGET_HTML = '../index.html'; //Gruntfile.js からみた対象HTMLのパス
  var TARGET_JS   = 'js/app_min.js'; //TARGET_HTML からみた出力ファイルのパス
  var TARGET_SRC  = 'src/'; //TARGET_HTML からみた Gruntfile.js ディレクトリ

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
        jshintrc: '.jshintrc'
      }
    },
    concat: {
      dev: {
        src: lintFiles,
        dest: '../js/app_min.js'
      },
      prod: {
        src: lintFiles,
        dest: '../js/app_concat.js'
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
    styleguide:{
      styledocco: {
        options: {
          framework: {
            name:'styledocco'
          },
          name: 'Style Guide',
          template: {
            include: ['plugin.css', 'app.js']
          }
        },
        files: {
          'docs': 'sass/**/*.scss'
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
    },
    "unite-coffee": {
      dev: {
        temp   : '.coffee-tmp/',
        source : TARGET_SRC,
        src    : lintFiles,
        target : TARGET_HTML
      },
      app: {
        temp   : '.coffee-tmp/',
        source : TARGET_SRC,
        src    : lintFiles,
        output : OUTPUT_JS,
        target : TARGET_HTML,
        include: TARGET_JS
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        runnerPort: 9999,
        singleRun: true,
        browsers: ['PhantomJS']
      }
    }
  });

  // load Tasks
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-unite-coffee');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-styleguide');

  // regist for js
  //grunt.registerTask('default', ['jshint', 'compass', 'concat:dev']);
  //grunt.registerTask('prod', ['jshint', 'compass', 'concat:prod', 'uglify']);
  // regist for coffee
  grunt.registerTask('default', ['unite-coffee:dev', 'compass']);
  grunt.registerTask('prod', ['unite-coffee:app', 'compass', 'uglify']);
};
