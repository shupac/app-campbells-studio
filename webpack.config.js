var webpack = require('webpack');

module.exports = {
    output: {
        filename: 'bundle.js',
        path: __dirname + '/app/src'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'ng-annotate!babel', exclude: /node_modules/ },
            { test: /\.html$/, loader: 'raw', exclude: /node_modules/ },
            { test: /\.styl$/, loader: 'style!css!stylus', exclude: /node_modules/ },
            { test: /\.css$/, loader: 'style!css' }
        ]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin()
    ]
};
