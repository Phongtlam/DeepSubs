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
const passport = require('passport');
const knex = require('../postgres_db/knex');
const LocalStrategy = require('passport-local');

const authHelpers = require('./auth/helpers');

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  knex('users').where({ id }).first()
  .then((user) => { done(null, user); })
  .catch((err) => { done(err, null); });
});

const options = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
  // session: false,
};

passport.use('local-login', new LocalStrategy(options, (req, username, password, done) => {
  // check to see if the username exists
  console.log(username, password);
  knex('users').where({ username }).first()
  .then((user) => {
    if (!user) return done(null, false);
    if (!authHelpers.comparePass(password, user.password)) {
      return done(null, false);
    } else {
      return done(null, user);
    }
  })
  .catch(err => done(err));
}));

passport.use('local-signup', new LocalStrategy(options, (req, username, password, done) => {
  knex('users').where({ username }).first()
  .then((user) => {
    if (user) {
      return done(null, false);
    } else {
      return authHelpers.createUser(req);
    }
  })
  .then(user => done(null, user[0]))
  .catch(err => done(err));
}));

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
