import express from 'express';
import path from 'path';

import configServer from './config/server';

import apiRouter from './routers/api';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev'

let app = express();
let api = express();

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

app.use('/api/v1', api);
apiRouter(api);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './', 'index.html'));
})


app.listen(configServer.port, () => {
    console.log('App. is running on port ' + configServer.port);
})