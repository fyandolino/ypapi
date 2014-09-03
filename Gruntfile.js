//var path = require('path');

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: '/* END FILE */\n'
      },

    	libraries: {
			src: [
				'public/js/lib/jquery.min.js'
				
				/* DO NOT CONCATENATE MINIFIED FILES */
				//'!js/src/*.min.js'			
			],
			
			dest: 'public/js/lib/concat/all.js'
		},

      	dist: {
	        src: [
	        	//'js/src/**/*.js'
	        	'public/js/src/global.js',
	        	'public/js/src/main.js'
	        	],
	        dest: 'public/js/src/max/<%= pkg.name %>.js'
	    },

	    css: {
	    	src: [
	    		'public/css/normalize.min.css',
	    		'public/css/main.css'
	    	],
	    	dest: 'public/css/combined/all.css'
	    }
    },

    /** Sass */
	sass: {
	  dev: {
	    options: {
	      //style: 'expanded',
	      style: 'compressed',
	      compass: true
	    },
	    files: {
	      'public/css/main.css': 'sass/main.scss'
	    }
	  },
	  dist: {
	    options: {
	      style: 'compressed',
	      compass: true
	    },
	    files: {
	      'public/css/main.css': 'sass/main.scss'
	    }
	  }
	},

	express: {
      defaults: {
        options: {
	        port: 9999,
	        hostname: 'base',
	        bases: 'public',
	        livereload: true
	    }
      },
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'public/js/src/min/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    jshint: {
      files: ['Gruntfile.js', 'public/js/src/*.js'],
      options: {
      	force: true,
		bitwise: true,
		camelcase: false,
		curly: true,
		eqeqeq: true,
		immed: true,
		newcap: true,
		quotmark: 'single',
		undef: true,
		jquery: true,
		'-W099': true,
		'-W065': true,
		'-W030': true,

        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          setTimeout: true,
          setInterval: true,
          Modernizr: true,
          clearTimeout: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'concat', 'uglify:dist'],
      options: { livereload: true },
      sass: {
	    files: 'sass/{,*/}*.{scss,sass}',
	    tasks: ['sass:dev','concat:css']
	  }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('default', ['express','watch']);
};




























