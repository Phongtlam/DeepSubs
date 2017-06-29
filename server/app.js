const express = require('express');
const path = require('path');
const middleware = require('./middleware');
require('dotenv').config();

const webpackConfig = require('../webpack.config');

const indexPath = path.join(__dirname, '../public/index.html');
const publicPath = express.static(path.join(__dirname, '../public'));

const app = express();

app.use(middleware.bodyParser.urlencoded({ extended: false }));
app.use(middleware.bodyParser.json());
app.use(middleware.session({
  secret: 'iizphong',
  resave: true,
  saveUninitialized: true,
}));
app.use(middleware.cookieParser());
app.use(middleware.flash());
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

if (process.env.NODE_ENV !== 'production') {
  const compiler = middleware.webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath,
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(middleware.passport.initialize());
app.use(middleware.passport.session());

app.post('/login', middleware.passport.authenticate('local-login', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true,
}));

app.post('/signup', middleware.passport.authenticate('local-signup', {
  successRedirect: '/home',
  failureRedirect: '/signup',
  failureFlash: true,
}));

app.get('/auth/facebook', middleware.passport.authenticate('facebook', { scope: 'email' }));

// handle the callback after facebook has authenticated the user
app.get('/auth/facebook/callback', middleware.passport.authenticate('facebook', {
  successRedirect: '/home',
  failureRedirect: '/',
  failureFlash: true,
}));

app.get('/auth/google', middleware.passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', middleware.passport.authenticate('google', {
  successRedirect: '/home',
  failureRedirect: '/',
  failureFlash: true,
}));

// app.get('/auth/google/callback',
// (req, res, next) => {
//   return middleware.passport.authenticate('google', {
//     successRedirect: '/home',
//     failureRedirect: '/login',
//     failureFlash: true,
//     session: false,
//   },
//   (err, user, info) => {
//     if (err) {
//       console.log('err', err);
//     } else {
//       next();
//     }
//   })(req, res, next);
// });

// prod environment
app.use('/public', publicPath);
// app.use(publicPath);
app.get('/home', (req, res) => { res.sendFile(indexPath); });

require('./routes.js')(app);


const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
};

app.use(allowCrossDomain);

module.exports = app;
