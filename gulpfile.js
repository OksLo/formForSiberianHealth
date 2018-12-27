let { src, dest, series  } = require('gulp'),
		less = require('gulp-less'),
		pug = require('gulp-pug'),
		browserSync = require('browser-sync');

function html() {
	return src('app/*.pug')
		.pipe(pug({pretty: true}))
		.pipe(dest('dist'))
};

function css() {
	return src('app/css/less/*.less')
		.pipe(less())
		.pipe(dest('dist/css'))
};

function js() {
	return src('app/js/*.js')
		.pipe(dest('dist/js'))
};

function fonts() {
	return src('app/fonts/*')
		.pipe(dest('dist/fonts'))
};

function images() {
	return src('app/img/*')
		.pipe(dest('dist/img'))
};

function brwsrSync () {
		browserSync({
				server: {
						baseDir: 'dist' 
				},
				notify: false 
		});
};

exports.default = series(html, css, js, fonts, images, brwsrSync);