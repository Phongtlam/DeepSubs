const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');
require('dotenv').load();

const webpackConfig = require('../webpack.config');

const indexPath = path.join(__dirname, '../public/index.html');
const publicPath = express.static(path.join(__dirname, '../public'));

const app = express();

app.use(middleware.cors());
app.use(middleware.flash());
app.use(middleware.bodyParser.urlencoded({ extended: false }));
app.use(middleware.bodyParser.json());
app.use(middleware.session({
  secret: 'iizphong',
  resave: true,
  saveUninitialized: true,
}));
app.use(middleware.cookieParser());
app.use(middleware.passport.initialize());
app.use(middleware.passport.session());
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

if (process.env.NODE_ENV !== 'production') {
  const compiler = middleware.webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath,
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

app.use('/', routes.auths);
// app.use('/game', routes.game);
app.use('/get-profile', routes.profile);
// prod environment
app.use('/public', publicPath);
// app.use(publicPath);
app.get('*', (req, res) => { res.sendFile(indexPath); });

module.exports = app;
