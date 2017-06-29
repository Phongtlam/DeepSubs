const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const knex = require('../../postgres_db/knex');
const authHelpers = require('./helpers');

const LocalOpts = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
  // session: false,
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  knex('users').where({ id }).first()
  .then((user) => { done(null, user); })
  .catch((err) => { done(err, null); });
});

passport.use('local-login', new LocalStrategy(LocalOpts, (req, username, password, done) => {
  // check to see if the username exists
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

passport.use('local-signup', new LocalStrategy(LocalOpts, (req, username, password, done) => {
  knex('users').where({ username }).first()
  .then((user) => {
    return (user) ? done(null, false) : authHelpers.createUser(req);
  })
  .then(user => done(null, user[0]))
  .catch(err => done(err));
}));

passport.use('facebook', new FacebookStrategy({
  clientID: process.env.FB_ID,
  clientSecret: process.env.FB_SECRET,
  callbackURL: process.env.FB_CALLBACK,
  passReqToCallback: true,
  enableProof: true,
  // session: false,
  profileFields: ['id', 'displayName', 'name', 'email', 'picture.type(large)'],
}, (req, token, refreshToken, profile, done) => {
  process.nextTick(() => authHelpers.processOauthUser(profile, done));
}));

passport.use('google', new GoogleStrategy({
  clientID: process.env.GOG_ID,
  clientSecret: process.env.GOG_SECRET,
  callbackURL: process.env.GOG_CALLBACK,
  passReqToCallback: true,
}, (req, token, refreshToken, profile, done) => {
  process.nextTick(() => authHelpers.processOauthUser(profile, done));
}));


module.exports = passport;
