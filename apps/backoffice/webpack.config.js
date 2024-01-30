const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const { SourceMapDevToolPlugin } = require('webpack');

dotenv.config({
    path: '../../.env',
});

module.exports = (env) => {
    return {
        entry: './app/index.js',
        mode: 'production',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    enforce: 'pre',
                    use: ['source-map-loader'],
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env'],
                    },
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
            alias: {
                apps: path.resolve(__dirname, '../'),
            },
        },
        output: {
            path: path.resolve(__dirname, 'public/js'),
            publicPath: '/js/',
            filename: 'bundle.js',
        },
        devServer: {
            contentBase: path.join(__dirname, 'public/js'),
            port: 3030,
            publicPath: 'http://localhost:3030/dist/',
            hotOnly: true,
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                PRODUCTION: JSON.stringify(true),
                'process.env': JSON.stringify(process.env),
            }),
            new SourceMapDevToolPlugin({
                filename: '[file].map',
            }),
        ],
        performance: {
            hints: 'error',
            maxEntrypointSize: 10240000,
            maxAssetSize: 10240000,
        },
    };
};
