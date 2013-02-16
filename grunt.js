module.exports = function(grunt) {

  var staging = 'build/',
      output  = 'output', //fake
      deploy = '../htdocs', // 
      stgPort = 3000,
      opPort = 3001;

  // Project configuration.
  grunt.initConfig({

    // temporary and build directory (required)
    staging: staging,
    output : output,

    // make directory for build
    mkdirs: {
      staging: '.'
    },

    // lint javascript file
    lint: {
      files: [
        'js/main.js'
      ]
    },
    jshint: {
      globals: {
        window: true,
        setTimeout: true,
        setInterval: true
      }
    },
    concat: {
      dist: {
        src: '<config:lint.files>',
        dest: 'js/main-concat.js'
      }
    },
    min: {
      dist: {
        src: ['js/main-concat.js'],
        dest: 'js/main-min.js'
      }
    },
    compass: {
        dev: {
            src: 'sass',
            dest: 'css',
            outputstyle: 'expanded',
            linecomments: true,
            forcecompile: true,
            debugsass: false,
            images: 'img',
            relativeassets: true
        },
        prod: {
            src: 'sass',
            dest: 'css',
            outputstyle: 'compressed',
            linecomments: false,
            forcecompile: true,
            debugsass: false,
            images: 'img',
            relativeassets: true
        }
    },
    usemin: {
      html: ['**/*.html']
    },
    html: {
      files: ['**/*.html']
    },
    img: {
      src: ['img/**/*']
    },
    server: {
      staging: {
        port : stgPort,
        base : staging
      },
      output: {
        port : opPort,
        base : output
      }
    },
    growl : {
        defaultTask : {
            title : "Grunt default task",
            message : "Complete Task !!"
        },
        prodTask : {
            title : "Grunt prod task",
            message : "Complete Task !!"
        }
    },
    watch: {
      sass: {
        files: ['sass/**/*.scss'],
        tasks: 'compass:dev'
      },
      js: {
        files: ['js/**/*.js'],
        tasks: 'lint'
      },
      all: {
        files: ['js/**/*.js', 'sass/**/*.scss'],
        tasks: 'defalut'
      }
    }
  });

  grunt.task.registerTask('refresh', 'reload Google Chrome (OS X)', function(){
      var exec = require('child_process').exec,
          cmd = 'osascript -e \'tell application "Google Chrome" to reload active tab of window 1\'';
      exec(cmd);
  });

  // load Tasks
  grunt.loadNpmTasks('node-build-script');
  grunt.loadNpmTasks('grunt-compass');
  grunt.loadNpmTasks('grunt-growl');

  // regist
  grunt.registerTask('default', 'clean mkdirs lint compass:dev growl:defaultTask refresh');
  grunt.registerTask('prod', 'clean mkdirs lint concat min compass:prod usemin img growl:prodTask refresh');
};
