require('dotenv').config();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

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

passport.use('local-signup', new LocalStrategy(LocalOpts, (req, username, password, done) => {
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

passport.use('facebook', new FacebookStrategy({
  clientID: '1375653399178909',
  clientSecret: '1426301145db3400ff43f01649c3f950',
  callbackURL: '/auth/facebook/callback',
  passReqToCallback: true,
  enableProof: true,
  session: false,
  profileFields: ['id', 'name', 'first_name', 'last_name', 'email', 'picture'],
}, (req, token, refreshToken, profile, done) => {
  console.log('profile', req.body, req.user, profile)
  process.nextTick(() => {
    knex('users').where('auth_id', profile.id)
    .then((user) => {
      return (user) ? done(null, user) :
      knex('users').insert({
        auth_id: profile.id,
        username: profile.name,
        first_name: profile.first_name,
        last_name: profile.last_name,
        auth_token: profile.provider,
        img_url: profile.picture,
        email: profile.email,
      }).returning('*');
    })
    .then(newUser => done(null, newUser))
    .catch(err => done(err));
  });
}));

module.exports = passport;
