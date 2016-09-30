var gulp   = require('gulp');
var config = require('../config');

gulp.task('watch', function() {
    var paths = config.paths;
    var blobs = [
        paths.dist + '/index.html',
        paths.src + '**/*.js',
        paths.src + '**/*.styl',
        paths.src + '**/*.html'
    ];
    gulp.watch(blobs, ['webpack']);
});
