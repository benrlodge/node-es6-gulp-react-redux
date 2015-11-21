var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var concatCss = require('gulp-concat-css');
var gulpCopy = require('gulp-copy');

// set variable via $ gulp --type prod
var environment = $.util.env.type || 'staging';
var isProduction = environment === 'prod';
var webpackConfig = require('./webpack.config.js').getConfig(environment);

var app = 'static-assets/';
var dist = 'public/';

// https://github.com/ai/autoprefixer
var autoprefixerBrowsers = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 6',
  'opera >= 23',
  'ios >= 6',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('scripts', function() {
  return gulp.src(webpackConfig.entry)
    .pipe($.webpack(webpackConfig))
    .pipe(isProduction ? $.uglifyjs() : $.util.noop())
    .pipe(gulp.dest(dist + 'js/'))
    .pipe($.size({ title : 'js' }))
});

gulp.task('lint', function () {
  return gulp.src([app + '/scripts/**/*.{js, jsx}'])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failOnError());
});

// fonts
gulp.task('fonts', function() {
  return gulp.src([
    './node_modules/font-awesome/fonts/fontawesome-webfont.*'
  ]).pipe(gulp.dest(dist + 'css/fonts/'));
});


gulp.task('vendor-styles', function () {
  var files = [
    './node_modules/bootstrap/dist/css/bootstrap.css',
    './node_modules/font-awesome/css/font-awesome.css'
  ];
  return gulp.src(files)
    .pipe(concatCss('vendor.css'))
    .pipe(gulp.dest(dist + 'css'));
});

gulp.task('styles',function(cb) {
  console.log('styles!');
  // convert stylus to css
  return gulp.src(app + 'stylus/main.styl')
    .pipe($.stylus({
      // only compress if we are in production
      compress: isProduction,
      // include 'normal' css into main.css
      'include css' : true
    }))
    // .pipe($.autoprefixer({browsers: autoprefixerBrowsers}))
    .pipe(gulp.dest(dist + 'stylesheets/'))
    .pipe($.size({ title : 'css' }))

});


// copy images
gulp.task('images', function(cb) {
  return gulp.src(app + 'images/**/*.{png,jpg,jpeg,gif,svg}')
    .pipe($.size({ title : 'images' }))
    .pipe(gulp.dest(dist + 'images/'));
});

// watch styl, html and js file changes
gulp.task('watch', function() {
  gulp.watch(app + 'images/**/*.{png,jpg,jpeg,gif,svg}', ['images']);
  gulp.watch(app + 'stylus/**/*.styl', ['styles']);
  gulp.watch(app + 'scripts/**/*.jsx', ['scripts', 'lint']);
  gulp.watch(app + 'scripts/**/*.js', ['scripts', 'lint']);
});

// remove bundles
gulp.task('clean', function(cb) {
  del([dist], cb);
});

// by default build project and then watch files in order to trigger livereload
gulp.task('default', ['build', 'watch']);

// waits until clean is finished then builds the project
gulp.task('build', ['clean'], function(){
  console.log('hi!');
  gulp.start(['images', 'fonts', 'lint', 'scripts', 'vendor-styles', 'styles']);
});
