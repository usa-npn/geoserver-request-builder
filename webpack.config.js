module.exports = {
    entry: {
        polyfills: ['es6-shim/es6-shim.js', 'reflect-metadata/Reflect.js', 'zone.js/dist/zone.js'],
        app: "./app/boot.ts"
    },
    output: {
        path: __dirname + '/dist',
        filename: "[name].js"
    },
    resolve: {
        extensions: ['', '.js', '.ts']
    },
    module: {
        loaders: [{
            test: /\.ts$/,
            loaders: ['ts-loader'],
            exclude: /node_modules/
        }]
    }
};