var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    webserver = require('gulp-webserver'),
    react = require('gulp-react');


gulp.task('html', function() {
    return gulp.src("src/**/*.html")
        .pipe(gulp.dest("dist"))
        .pipe(notify({
            message: "html task complete"
        }));
});

gulp.task('styles', function() {
    return sass('src/css/**/*.scss', {
            style: 'expanded'
        })
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'))
        .pipe(notify({
            message: 'Styles task complete'
        }));
});

//
//gulp.task('scripts', function() {
//    return gulp.src('src/js/**/*.js')
//        .pipe(jshint('.jshintrc'))
//        .pipe(jshint.reporter('default'))
//        .pipe(concat('main.js'))
//        .pipe(gulp.dest('dist/js'))
//        .pipe(uglify())
//        .pipe(gulp.dest('dist/js'))
//        .pipe(notify({
//            message: 'Scripts task complete'
//        }));
//});


gulp.task("bower-components", function() {
    var react_with_addons = gulp.src('bower_components/react/react-with-addons.js')
        .pipe(gulp.dest('dist/bower_components/react'));

    return react_with_addons;
})

gulp.task('react', function() {
    return gulp.src('src/jsx/**/*.jsx')
        .pipe(concat('react.js'))
        .pipe(react())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({
            message: 'React task complete'
        }));
});

gulp.task('watch', function() {
    gulp.watch("src/**/*.html", ['html']);
    // Watch .scss files
    gulp.watch('src/css/**/*.scss', ['styles']);
    // Watch .js files
    //gulp.watch('src/js/**/*.js', ['scripts']);
    // Watch .jsx files
    gulp.watch('src/jsx/**/*.jsx', ['react']);
    //Watch bower_components
    gulp.watch('bower_components/', ['bower-components']);

    // Create LiveReload server
    livereload.listen();
    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);

});

gulp.task('webserver', function() {
    gulp.src('dist')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true
        }));
});


gulp.task('default', ['html', 'styles', 'bower-components', 'react', 'watch', 'webserver']);
