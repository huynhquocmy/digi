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

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			css: {
				files: 'content/css/scss/*.scss',
				tasks: ['sass'],
				options: {
					spawn: false,
					livereload: true
				}
			},
			js: {
				files: ['<%= setting.app %>/app/{,*/}*.js'],
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
						'libs/jquery/dist/jquery.js',
						'libs/jquery-ui/jquery-ui.js',
						'libs/angular/angular.js',
						'libs/angular-ui-router/release/angular-ui-router.js',
						'libs/angular-ui-sortable/sortable.js',
						'libs/restangular/dist/restangular.js',
						'libs/moment/moment.js',
						'libs/lodash/lodash.js',
						'js/vendor/**/*.js',
						'js/app.js',

						'js/controllers/**/*.js',
						'js/states/**/*.js',
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
						'css/libs/**/*.css',
						'css/*.css'
					]
				}
			},
		}
	});

	var localDevTasks = [
		'asset-linker:devJs',
		'asset-linker:devCss',
		'watch'
	];

	grunt.registerTask('serve', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		if (target === 'dev') {
			return grunt.task.run([
				'ngconstant:dev',
				'clean:dist',
				'clean:assets',
				'bowerInstall',
				'clean:css', 'sass', 'autoprefixer',
				'asset-linker:devJs', 'asset-linker:devCss',
				'concat',
				'copy:dist',
				'rev',
				'connect:dev:keepalive'
			]);
		}

		if (target === 'local-api') {
			return grunt.task.run(_.flatten(['ngconstant:localApi', localDevTasks]));
		}

		return grunt.task.run(_.flatten(['ngconstant:dev', localDevTasks]));
	});


	var buildTasks =[
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
