import path from 'path';
import webpack from 'webpack';

export default {
    devtools: 'eval-sourse-map',
    entry: [
        path.join(__dirname, '/client/index.js'),
        'webpack-hot-middleware/client'
    ],
    output: {
        path: '/',
        publicPath: '/'
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'client'),
                loaders: ['babel']
            }
        ]
    },
    resolve: {
        extentions: ['', '.js']
    }
}