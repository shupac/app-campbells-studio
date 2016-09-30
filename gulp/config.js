var dist = 'app/';
var src = 'app/src/';

module.exports = {
    webpack: {
        entry: src + 'app.js',
        dist: dist
    },
    serve: {
        open: false,
        server: {
            baseDir: dist
        }
    },
    paths: {
        dist: dist,
        src: src
    }
};
