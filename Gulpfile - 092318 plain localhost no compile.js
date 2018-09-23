
/*
NOTE: Sorry this JS file can't be created by atom's smart template. Just manually copy & paste it instead.
*/

// 1. replace themename;
// 2.  replace proxy
// 3. update Name of working theme folder
// 4. edit  	return gulp.src([scss + 'main.scss',scss + 'custom.scss'])
// 5. edit .pipe(gulp.dest(rootcss))
// https://gist.github.com/wesbos/12413f4684ac5e64f232
/*- GULP DEBUGGING
			- node --inspect-brk ./node_modules/gulp/bin/gulp.js --verbose
			- trace until you reach gulpfile.js file
			  - https://www.screencast.com/t/b1jkQEZvYPUI  https://www.screencast.com/t/1UvxZG8djw
			  - https://stackoverflow.com/questions/40033298/how-to-debug-a-gulp-task/51375041#51375041
              - https://stackoverflow.com/questions/49194978/including-bootstrap-js-with-gulp-causing-errors
			  - https://gist.github.com/torgeir/8507130
			  - https://gist.github.com/tmslnz/1d025baaa7557a2d994032aa88fb61b3
        */

 'use strict';

//======================

var themename = 'flash';

var gulp = require('gulp'),
	autoprefixer = require('autoprefixer'), // parse CSS and add vendor prefixes to CSS rules using values
	browserSync = require('browser-sync').create(),
	image = require('gulp-image'), // Optimize PNG, JPEG, GIF, SVG images with gulp task.
  imageMin = require('gulp-imagemin'), // Minify PNG, JPEG, GIF and SVG images with imagemin
	jshint = require('gulp-jshint'),
	postcss = require('gulp-postcss'), //  pipe CSS through several plugins, but parse CSS only once
	sass = require('gulp-sass'), // Sass plugin for Gulp
	sourcemaps = require('gulp-sourcemaps'),
	newer = require('gulp-newer'), // Only work with new or updated files
  plumber = require('gulp-plumber'), // Prevent pipe breaking caused by errors from gulp plugins
  notify = require('gulp-notify'), // notification plugin for gulp (paired w/ plumber)
  concat = require('gulp-concat'), // Files will be concatenated
  rename = require('gulp-rename'), // a gulp plugin to rename files easily
  uglify = require('gulp-uglify'), // Minify JavaScript with UglifyJS
  cleanCSS = require('gulp-clean-css'), // plugin to minify CSS, using clean-css

	// Name of working theme folder
	root = '../' + themename + '/',
	rootcss = root + 'assets/css/',
	scss = root + 'assets/sass/',
  rootscss = scss + 'mycustom/',
  rootjs = root + 'assets/js/customjs/',
	img = root + 'assets/img/',
	languages = root + 'assets/languages/',
	vendor = root + 'assets/js/vendor/';

	// Copy third party libraries from /node_modules into /vendor
	gulp.task('vendor', function() {

	});


// Watch everything
gulp.task('serve', function() {

	browserSync.init({
		open: 'external',
		proxy: 'site4.net', // baseDir: "./"
		watchTask: true,
		port: 8080,
		browser: 'chrome'
    // tunnel: 'flash'
				/*files: root+'*.css'  */
	});

 // gulp.watch([root + '**/*.css', root + '**/*.scss' ], ['css']);
	//gulp.watch([rootjs + '**/*.js'], ['scripts']);
	//gulp.watch(img + 'RAW/**/*.{jpg,JPG,png}', ['images']);
	//gulp.watch(root + '**/*').on('change', browserSync.reload);
});

// Default task (runs at initiation: gulp --verbose)
gulp.task('default', ['serve']);
// gulp.task('default', ['css','scripts','images','serve']);
