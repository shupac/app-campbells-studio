var gulp        = require('gulp');
var browserSync = require('browser-sync');
var config      = require('../config').serve;

gulp.task('serve', [], function() {
    browserSync(config);

      // add browserSync.reload to the tasks array to make
      // all browsers reload after tasks are complete.
});


// // use default task to launch Browsersync and watch JS files
// gulp.task('serve', ['js'], function () {

//     // Serve files from the root of this project
//     browserSync({
//         server: {
//             baseDir: "./"
//         }
//     });

// });
