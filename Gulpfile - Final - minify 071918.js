
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
			  - https://stackoverflow.com/questions/40033298/how-to-debug-a-gulp-task/51375041#51375041 */

 'use strict';

//======================

var themename = 'auberge-child';

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
  rootjs = root + 'assets/js/customjs/',
	img = root + 'assets/img/',
	languages = root + 'assets/languages/',
	vendor = root + 'assets/js/vendor/';

	// Copy third party libraries from /node_modules into /vendor
	gulp.task('vendor', function() {

	});

// CSS via Sass and Autoprefixer
gulp.task('css', function() {
	// return gulp.src(scss + '*.scss')  // if all files need to be converted
	return gulp.src([scss + 'main.scss',scss + 'custom.scss']) // if only specific files need to be converted
  .pipe(plumber({
		  errorHandler: notify.onError("Error: <%= error.message %>")
		}))
	.pipe(sourcemaps.init())
	.pipe(sass({
		outputStyle: 'expanded',
		indentType: 'tab',
		indentWidth: '1'
	}).on('error', sass.logError))
  .pipe(cleanCSS())
  .pipe(concat('main-style.min.css'))
	.pipe(postcss([
		autoprefixer('last 2 versions', '> 1%')
	]))
	// .pipe(sourcemaps.write(scss + 'maps'))
	.pipe(sourcemaps.write('../../assets/css/maps'))
	.pipe(gulp.dest(rootcss)) // destination to write from scss to compiled css files
	.pipe(browserSync.stream());
});

// Optimize images through gulp-image
gulp.task('images', function() {
	return gulp.src(img + 'RAW/**/*.{jpg,JPG,png}')
	.pipe(newer(img))
	.pipe(image())
  .pipe(imageMin())
	.pipe(gulp.dest(img));
});

// scripts
gulp.task('scripts', function() {
	return gulp.src([rootjs + '*.js'])
	// return gulp.src([rootjs + 'myfunctions.js'])
  .pipe(jshint({"asi" : true, expr: true}))
  .pipe(jshint.reporter('default'))
  .pipe(plumber({
		  errorHandler: notify.onError("Error: <%= error.message %>")
		}))
  .pipe(sourcemaps.init())
  // .pipe(concat('main-concat.js')) // temporarily removed
  // .pipe(gulp.dest(rootjs)) // temporarily removed
  .pipe(rename('main.min.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write('../../assets/js/customjs'))
  .pipe(gulp.dest(rootjs))
});


// Watch everything
gulp.task('serve', function() {

	browserSync.init({
		open: 'external',
		proxy: 'site1.net', // baseDir: "./"
		watchTask: true,
		port: 8080,
		browser: 'chrome'
    // tunnel: 'auberge-child'
				/*files: root+'*.css'  */
	});

  gulp.watch([root + '**/*.css', root + '**/*.scss' ], ['css']);
	gulp.watch([rootjs + '**/*.js'], ['scripts']);
	gulp.watch(img + 'RAW/**/*.{jpg,JPG,png}', ['images']);
	gulp.watch(root + '**/*').on('change', browserSync.reload);
});

// Default task (runs at initiation: gulp --verbose)
gulp.task('default', ['serve']);
// gulp.task('default', ['css','scripts','images','serve']);
