var gulp         = require('gulp'),
	budo         = require('budo'),
	sass         = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	uglify       = require('gulp-uglify'),
	rename       = require('gulp-rename'),
	swPrecache   = require('sw-precache'),
	packageJson  = require('./package.json');

const config = {
	js : {
		in: 'src/js/main.js',
		out: './',
		name: 'bundle.js',
		watch: 'src/js/*.js'
	},
	css : {
		in: 'src/css/main.scss',
		out: './',
		name: 'bundle.css',
		watch: 'src/css/*.scss'
	}
}

function writeServiceWorkerFile(callback) {
	swConfig = {
		cacheId: packageJson.name,
		runtimeCaching: [{
			urlPattern: /^https:\/\/cdn\.rawgit\.com\//,
			handler: 'cacheFirst'
		},{
			urlPattern: /^https:\/\/aframe\.io\//,
			handler: 'cacheFirst'
		},{
			urlPattern: /\/assets\/sounds\//,
			handler: 'cacheFirst'
		}],
		staticFileGlobs: [
			'assets/fonts/fabrica-webfont.woff',
			'assets/images/bg.jpg',
			'assets/images/tree_icon.png',
			'assets/models/**.dae',
			'bundle.css',
			'bundle.js',
			'index.html'
		]
	}
	swPrecache.write('service-worker.js', swConfig, callback);
}

gulp.task('generate-service-worker', ['scripts', 'styles'], function(callback) {
	writeServiceWorkerFile(callback);
});

gulp.task('scripts', () =>{
	return gulp.src(config.js.in)
			.pipe(uglify())
			.pipe(rename(config.js.name))
			.pipe(gulp.dest(config.js.out))
})

gulp.task('styles', () => {
	return sass(config.css.in,{style: 'compressed'})
		.on('error',sass.logError)
		.pipe(rename(config.css.name))
		.pipe(autoprefixer({
			browsers: ['> 1%','last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest(config.css.out))
})

gulp.task('watch', () =>{
	gulp.watch(config.css.watch,['styles'],function(){
		budo.reload()
	})

	budo(config.js.in,{
		serve: 'bundle.js',
		live: true,
		port: 3000,
		open: true,
		verbose: true,
		dir: './',
		verbose: true
	}).on('connect', function (ev) {
	  console.log('Server running on %s', ev.uri)
	  console.log('LiveReload running on port %s', ev.livePort)
	}).on('update', function (buffer) {
	  console.log('bundle - %d bytes', buffer.length)
	})
})

gulp.task('deploy',['scripts','styles','generate-service-worker'])
gulp.task('default',['deploy','watch'])
