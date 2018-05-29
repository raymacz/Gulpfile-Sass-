


/*************************/
// 1. replace themename
// 2.  replace proxy
// 3. update Name of working theme folder
// 4. edit  gulp.src(scss + '{style.scss,rtl.scss}')

// 'use strict';

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
	rootz = root + 'assets/css/',
	scss = root + 'assets/sass/',
	js = root + 'assets/js/',
	img = root + 'assets/images/',
	languages = root + 'assets/languages/';


// CSS via Sass and Autoprefixer
gulp.task('css', function() {
	// debugz
	// return gulp.src(scss + '{style.scss,rtl.scss}')
	// return gulp.src(scss + '*.scss')
	return gulp.src(scss + 'main.scss')
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
	// .pipe(gulp.dest(root));
	.pipe(gulp.dest(rootz));
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
gulp.task('watch', function() {
	browserSync.init({
		open: 'external',
		proxy: 'site1.net',
		port: 8080,
                tunnel: 'auberge-child'
				/*files: root+'*.css'  */

	});
	gulp.watch([root + '**/*.css', root + '**/*.scss' ], ['css']);
	gulp.watch(js + '**/*.js', ['javascript']);
	gulp.watch(img + 'RAW/**/*.{jpg,JPG,png}', ['images']);
	gulp.watch(root + '**/*').on('change', browserSync.reload);
});


// Default task (runs at initiation: gulp --verbose)
gulp.task('default', ['watch']);
