const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const knex = require('../../postgres_db/knex');
const authHelpers = require('./helpers');

const options = {
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

module.exports = passport;
