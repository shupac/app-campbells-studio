var gulp        = require('gulp');
var browserSync = require('browser-sync');
var config      = require('../config').index;

gulp.task('index', function() {
    console.log('index change');
    return gulp.src(config.src)
        .pipe(browserSync.reload({stream:true}));
});
