import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import session from 'express-session';
import passport from 'passport';

import configServer from './config/server';
import configDB from './config/database';

import apiRouter from './routers/api';
import apiUserRouter from './routers/api/user';

import mongoose from 'mongoose';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev'

let app = express();
let api = express();

mongoose.connect(configDB.mongo.uri);

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(methodOverride());
app.use(session({
	saveUninitialized: true,
	resave: true,
	secret: 'xxx'
}));
// app.use(passport.initialize());
// app.use(passport.session());

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

app.use('/api', api);

apiRouter(api);
apiUserRouter(api)

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './', 'index.html'));
})


app.listen(configServer.port, () => {
    console.log('App. is running on port ' + configServer.port);
})