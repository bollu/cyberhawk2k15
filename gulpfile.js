var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    webserver = require('gulp-webserver'),
    react = require('gulp-react'),
    merge = require('merge-stream'),
    plumber = require('gulp-plumber');;


gulp.task('html', function() {
    return gulp.src("src/**/*.html")
        .pipe(gulp.dest("dist"))
        .pipe(notify({
            message: "html task complete"
        }));
});

gulp.task('fonts', function() {
    return gulp.src("src/css/fonts/*.*")
        .pipe(gulp.dest("dist/css/fonts"))
        .pipe(notify({
            message: "fonts task complete"
        }));
})

gulp.task('styles', function() {
    var sass_styles = sass('src/css/**/*.scss', {
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
            message: 'SCSS task complete'
        }));

    var css_styles = gulp.src('src/css/**/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'))
        .pipe(notify({
            message: 'CSS task complete'
        }));

    return merge(sass_styles, css_styles);

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

    var typedjs = gulp.src('bower_components/typed.js/dist/typed.min.js')
        .pipe(gulp.dest('dist/bower_components/typed.js'));

    var jquery = gulp.src('bower_components/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('dist/bower_components/jquery'));

    var react_motion = gulp.src("bower_components/react-motion/build/react-motion.js")
        .pipe(gulp.dest('dist/bower_components/react-motion'));

    return merge(react_with_addons, typedjs, jquery, react_motion);
})

gulp.task('react', function() {
    return gulp.src('src/jsx/**/*.jsx')
        .pipe(concat('react.js'))
        .pipe(plumber())
        .pipe(react())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({
            message: 'React task complete'
        }));
});

gulp.task('watch', function() {
    // Create LiveReload server
    livereload.listen();
    gulp.watch("src/**/*.html", ['html']);
    // Watch .scss files
    gulp.watch('src/css/**/*.scss', ['styles']);
    // Watch .js files
    //gulp.watch('src/js/**/*.js', ['scripts']);
    // Watch .jsx files
    gulp.watch('src/jsx/**/*.jsx', ['react']);
    //Watch font files
    gulp.watch('src/fonts/**/*.*', ['fonts']);
    //Watch bower_components
    gulp.watch('bower_components/', ['bower-components']);
    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);

});

gulp.task('default', ['watch']);


gulp.task('webserver', ['watch'], function() {
    gulp.src('dist')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true
        }));
});
