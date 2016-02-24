module.exports = function (grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	var path = require('path');

	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project settings
		setting: {
			// configurable paths
			app: '.',
			dist: 'www',
			assets: 'assets'
		},
		'sass': {
			dev: {
				files: [{
					expand: true,
					src: ['*.scss'],
					cwd: 'css/scss',
					dest: 'css',
					ext: '.css'
				}]
			}
		},

		coffee: {
			app: {
				src: ['coffee/**/*.coffee'],
				dest: 'js'
			}
		},

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			css: {
				files: 'css/scss/*.scss',
				tasks: ['sass', 'asset-linker:devCss'],
				options: {
					spawn: false,
					livereload: true
				}
			},
			js: {
				files: 'js/**/*.js',
				tasks: ['asset-linker:devJs'],
				options: {
					spawn: false,
					livereload: true
				}
			},
			html: {
				files: 'views/**/*.html',
				options: {
					spawn: false,
					livereload: true
				}
			},
			bower: {
				files: ['bower.json'],
				tasks: ['bowerInstall']
			}
		},
		'asset-linker': {
			devJs: {
				options: {
					start: '<!--SCRIPTS-->',
					end: '<!--SCRIPTS END-->',
					template: '<script src="/%s"></script>',
					root: '../'
				},
				files: {
					'<%= setting.app %>/index.html': [
						'bower_components/jquery/dist/jquery.js',
						'bower_components/jquery-ui/jquery-ui.js',
						'bower_components/angular/angular.js',
						'bower_components/angular-ui-router/release/angular-ui-router.js',
						'bower_components/angular-ui-sortable/sortable.js',
						'bower_components/restangular/dist/restangular.js',
						'bower_components/bxslider-4/dist/vendor/jquery.easing.1.3.js',
						'bower_components/bxslider-4/dist/vendor/jquery.fitvids.js',
						'bower_components/bxslider-4/dist/jquery.bxslider.min.js',
						'bower_components/moment/moment.js',
						'bower_components/lodash/lodash.js',
						'js/vendor/**/*.js',
						'js/app.js',

						'js/controllers/**/*.js',
						'js/states/**/*.js',
						'js/directives/*.js',
						'js/main.js'
					]
				}
			},

			devCss: {
				options: {
					start: '<!--STYLES-->',
					end: '<!--STYLES END-->',
					template: '<link rel="stylesheet" href="/%s">',
					root: '../'
				},
				files: {
					'<%= setting.app %>/index.html': [
						'bower_components/bootstrap/dist/css/bootstrap.min.css',
						'bower_components/components-font-awesome/css/font-awesome.min.css',
						'bower_components/bxslider-4/dist/jquery.bxslider.min.css',
						'css/libs/**/*.css',
						'css/*.css'
					]
				}
			},
		}
	});


	var buildTasks =[
		'sass', 'grunt-coffee',
		'asset-linker:devJs', 'asset-linker:devCss',
		'watch'
	];

	grunt.registerTask('build', function (target) {
		return grunt.task.run(buildTasks);
	});

	grunt.registerTask('default', [
	  //'newer:jshint',
	  'build'
	]);
};
