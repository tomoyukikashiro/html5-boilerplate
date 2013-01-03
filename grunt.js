module.exports = function(grunt) {

  var staging = 'build/',
      output  = '/tmp/h5bp';

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
    /*
    copy: {
      target: {
        options: {
          cwd: './'
        },
        files: {
          '../': staging + '/**'
        }
      }
    },
    */
    usemin: {
      html: ['**/*.html']
    },
    html: {
      files: ['**/*.html']
    },
    img: {
      src: ['img/**/*']
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
      files: ['js/*.js', 'sass/*.scss'],
      tasks: 'default'
    }
  });

  // load Tasks
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('node-build-script');
  grunt.loadNpmTasks('grunt-compass');
  grunt.loadNpmTasks('grunt-growl');

  // regist
  grunt.registerTask('deploy', 'copy');
  grunt.registerTask('default', 'clean lint compass:dev growl:defaultTask');
  grunt.registerTask('prod', 'clean mkdirs lint concat min compass:prod usemin html img growl:prodTask');
};
