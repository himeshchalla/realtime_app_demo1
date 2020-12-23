// const path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        // path: path.resolve(__dirname),
        path: __dirname,
        filename: 'dist/bundle.js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            // modules: true
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
                // exclude: [
                //     // path.resolve(__dirname, 'node_modules')
                //     __dirname+'node_modules'
                // ]
            }
        ],
        noParse: [
            // path.resolve(__dirname, 'node_modules')
            __dirname+'node_modules'
        ]
    },
    devServer: {
        watchContentBase: true,
        // contentBase: path.join(__dirname, '/'),
        contentBase: __dirname,
        proxy: { // proxy URLs to backend development server
            '/api': {
                target: 'http://localhost:9001',
                bypass: function(req, res, proxyOptions) {
                    if (req.headers.accept.indexOf('html') !== -1) {
                        console.log('Skipping proxy for browser request.');
                        return '/index.html';
                        // return 'hello';
                    }
                }
            }
        },
        // contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
        compress: true, // enable gzip compression
        // historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: false, // hot module replacement. Depends on HotModuleReplacementPlugin
        // https: false, // true for self-signed, object for cert authority
        // noInfo: true, // only errors & warns on hot reload
        // hotOnly: true,
        // index: path.resolve(__dirname, 'index.html'),
        liveReload: true,
        port: 9000,
        // open: {
        //     app: ['google-chrome', '--incognito']
        // },
        watchOptions: {
            poll: true,
            ignored: [
                // path.resolve(__dirname, 'dist'),
                // path.resolve(__dirname, 'node_modules')
                __dirname+'dist',
                __dirname+'node_modules'
            ]
        },
        // lazy: true,
        // filename: 'bundle.js',
        stats: 'verbose',
        overlay: {
            warnings: true,
            errors: true
        },
        onListening: function(server) {
            const port = server.listeningApp.address().port;
            console.log('Listening on port:', port);
        }
    }
}
