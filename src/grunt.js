module.exports = function(grunt) {

  var staging = 'build/',
      output  = 'output/',
      deploy = '../',
      stg_port = 3000,
      dep_port = 3001;

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
    server: {
      staging: { 
        port: stg_port, 
        base: staging 
      },
      output: { 
        port: dep_port,
        base: deploy 
      }
    },
    connect: {
      intermediate: {
        port: stg_port,
        logs: 'dev',
        dirs: true
      },
      publish: {
        port: dep_port,
        logs: 'dev',
        dirs: true
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

  // TODO how to copy to parent directory...
  /*
  grunt.task.registerTask('deploy-copy', 'copy for deploy', function(){
    var cb = this.async(),
        dest = 'TODO',
        ignores = ['.gitignore', '.git', '.buildignore', '.svn', '.svnignore'];

    grunt.file.setBase(process.cwd());

    grunt.task.helper('copy', staging, dest, ignores, function(e){
      if(e) {
         grunt.log.error(e.stack || e.message);
      } else {
        grunt.log.ok();
      }
      cb(!e);
    });
  });
  */

  // load Tasks
  grunt.loadNpmTasks('node-build-script');
  grunt.loadNpmTasks('grunt-compass');
  grunt.loadNpmTasks('grunt-growl');

  // regist
  grunt.registerTask('default', 'clean lint compass:dev growl:defaultTask');
  grunt.registerTask('prod', 'clean mkdirs lint concat min compass:prod usemin html img growl:prodTask');
};
