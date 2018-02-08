
/*************************/

var themename = 'framemacz';

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
	
	ngrok = require('ngrok'),

	// Name of working theme folder
	root = '../' + themename + '/',
	scss = root + 'sass/',
	js = root + 'js/',
	img = root + 'images/',
	languages = root + 'languages/';

	vendor = root + 'vendor/';

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
	return gulp.src(scss + '*.scss')
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
	.pipe(gulp.dest(root))
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
gulp.task('watch', function() {
	
	browserSync.init({
		open: 'external',
		proxy: 'site3.net',
		watchTask: true,
		port: 8080,
             //  tunnel: 'framemacz'
				/*files: root+'*.css'  */
	}, function (err, browserSync) {
	ngrok.connect({
		proto: 'http',		
	    authtoken: '7MXpQW1Hc9dnSyStagbuo_4SeninzmbhKYQ1ZguVbvw',
 	 //  configPath: 'C:\Users\admin\.ngrok2\ngrok.yml',
		port:browserSync.options.get('port') 
	}, function (err, url) {
			// https://a4ede18d.ngrok.io/ -> 127.0.0.1:8080  
	   }); 
   });
  	gulp.watch([root + '**/*.css', root + '**/*.scss' ], ['css']);
	gulp.watch(js + '**/*.js', ['javascript']);
	gulp.watch(img + 'RAW/**/*.{jpg,JPG,png}', ['images']);
	gulp.watch(root + '**/*').on('change', browserSync.reload);
});

// Default task (runs at initiation: gulp --verbose)
gulp.task('default', ['watch']);





