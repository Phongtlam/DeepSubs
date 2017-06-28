const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const session = require('express-session');
const flash = require('connect-flash');

const webpackConfig = require('../webpack.config');

const indexPath = path.join(__dirname, '../public/index.html');
const publicPath = express.static(path.join(__dirname, '../public'));

const app = express();

app.use(middleware.bodyParser.urlencoded({ extended: false }));
app.use(middleware.bodyParser.json());
app.use(session({
  secret: 'iizphong',
  resave: true,
  saveUninitialized: true,
}));
app.use(flash());
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

if (process.env.NODE_ENV !== 'production') {
  const compiler = middleware.webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath,
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

// WORKING
const passport = require('./auth/passport');

app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local-login', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true,
}));

app.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/home',
  failureRedirect: '/signup',
  failureFlash: true,
}));
// WORKING

// prod environment
app.use('/public', publicPath);
// app.use(publicPath);
app.get('/home', (req, res) => { res.sendFile(indexPath); });

require('./routes.js')(app, passport);


const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
};

app.use(allowCrossDomain);

module.exports = app;
