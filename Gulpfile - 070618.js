// 1. replace themename;
// 2.  replace proxy
// 3. update Name of working theme folder
// 4. edit  	return gulp.src([scss + 'main.scss',scss + 'custom.scss'])
// 5. edit .pipe(gulp.dest(rootcss))

// 'use strict';


/*************************/


var themename = 'auberge-child';

var gulp = require('gulp'),
	// Prepare and optimize code etc
	autoprefixer = require('autoprefixer'),
	browserSync = require('browser-sync').create(),
	image = require('gulp-image'),
	jshint = require('gulp-jshint'),
	postcss = require('gulp-postcss'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),

	// Only work with new or updated files
	newer = require('gulp-newer'),

	// Name of working theme folder
	root = '../' + themename + '/',
	rootcss = root + 'assets/css/',
	scss = root + 'assets/sass/',
	js = root + 'assets/js/',
	img = root + 'assets/images/',
	languages = root + 'assets/languages/';

	vendor = root + 'assets/js/vendor/';

	// Copy third party libraries from /node_modules into /vendor
	gulp.task('vendor', function() {

	  // Bootstrap
	  // gulp.src([
	  //     './node_modules/bootstrap/dist/**/*',
	  //     '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
	  //     '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
	  //   ])
	  //   .pipe(gulp.dest(vendor+'bootstrap'))

	  // Font Awesome
	  gulp.src([
	      './node_modules/font-awesome/**/*',
	      '!./node_modules/font-awesome/{less,less/*}',
	      '!./node_modules/font-awesome/{scss,scss/*}',
	      '!./node_modules/font-awesome/.*',
	      '!./node_modules/font-awesome/*.{txt,json,md}'
	    ])
	    .pipe(gulp.dest(vendor+'font-awesome'))

	  // jQuery
	  // gulp.src([
	  //     './node_modules/jquery/dist/*',
	  //     '!./node_modules/jquery/dist/core.js'
	  //   ])
	  //   .pipe(gulp.dest(vendor+'jquery'))

	  // jQuery Easing
	  gulp.src([
	      './node_modules/jquery.easing/*.js'
	    ])
	    .pipe(gulp.dest(vendor+'jquery-easing'))

	});

// CSS via Sass and Autoprefixer
gulp.task('css', function() {
	// return gulp.src(scss + '*.scss')  // if all files need to be converted
	return gulp.src([scss + 'main.scss',scss + 'custom.scss']) // if only specific files need to be converted
	.pipe(sourcemaps.init())
	.pipe(sass({
		outputStyle: 'expanded',
		indentType: 'tab',
		indentWidth: '1'
	}).on('error', sass.logError))
	.pipe(postcss([
		autoprefixer('last 2 versions', '> 1%')
	]))
	.pipe(sourcemaps.write(scss + 'maps'))
	.pipe(gulp.dest(rootcss)) // destination to write from scss to compiled css files
	.pipe(browserSync.stream());
});

// Optimize images through gulp-image
gulp.task('images', function() {
	return gulp.src(img + 'RAW/**/*.{jpg,JPG,png}')
	.pipe(newer(img))
	.pipe(image())
	.pipe(gulp.dest(img));
});

// JavaScript
gulp.task('javascript', function() {
	return gulp.src([js + '*.js'])
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(gulp.dest(js));
});


// Watch everything
gulp.task('serve', function() {

	browserSync.init({
		open: 'external',
		proxy: 'site1.net', // baseDir: "./"
		watchTask: true,
		port: 8080,
		browser: 'chrome',
    // tunnel: 'auberge-child'
				/*files: root+'*.css'  */
	});

  gulp.watch([root + '**/*.css', root + '**/*.scss' ], ['css']);
	gulp.watch(js + '**/*.js', ['javascript']);
	gulp.watch(img + 'RAW/**/*.{jpg,JPG,png}', ['images']);
	gulp.watch(root + '**/*').on('change', browserSync.reload);
});

// Default task (runs at initiation: gulp --verbose)
gulp.task('default', ['serve']);
