module.exports = function(grunt){
	grunt.initConfig({
		sass: {
			dev: {
				options: {
					style: 'expanded'
				},
				files: {
					'src/css/main.css': 'src/scss/main.scss'
				}
			}
		},
		autoprefixer: {
			dev: {
				src: 'src/css/*.css'
			},
			options: {
				browsers: ['last 2 version']
			}
		},
		cssmin: {
		  options: {
		    shorthandCompacting: false,
		    roundingPrecision: -1
		  },
		  target: {
		    files: {
		      'build/css/main.css': ['src/css/main.css'],
		      'build/css/font-awesome.css': ['src/css/font-awesome.css']
		    }
		  }
		},
		 uglify: {
		    my_target: {
		      files: {
		        'build/js/scripts.js': ['src/js/*.js']
		      }
		    }
		  },
		imagemin: {
		    dynamic: {
		      files: [{
		        expand: true,
		        cwd: 'src/img',
		        src: ['**/*.{png,jpg,gif}'],
		        dest: 'build/img'
		      }]
		    }
		  },
		watch: {
			options: {
				livereload: true
			},
			dev: {
				files: ['src/scss/style.scss', 'src/scss/slicknav.scss', 'src/*.html'],
				tasks: ['compileSass']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-cssmin');



	grunt.registerTask('compileSass', ['sass', 'autoprefixer']);
	grunt.registerTask('build', ['sass', 'autoprefixer', 'uglify', 'imagemin', 'cssmin']);


};