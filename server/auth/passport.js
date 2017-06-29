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
  process.nextTick(() => {
    return knex('users').where('auth_id', profile.id)
    .then((user) => {
      if (user[0]) { return done(null, user[0]); }
      knex.insert({
        auth_id: profile._json.id,
        username: profile._json.name,
        first_name: profile._json.first_name,
        last_name: profile._json.last_name,
        auth_provider: profile.provider,
        img_url: profile._json.picture.data.url,
        email: profile._json.email,
        total_games: 0,
        win: 0,
        loss: 0,
      }).returning('*').into('users')
      .then((newUser) => {
        return done(null, newUser[0]);
      })
      // return done(null, newUser.id);

    })
    .catch(err => done(err));
  });
}));

// const processOauthUser = (knex, profile) => {
//   knex('users').where('auth_id', profile.id)
//   .then((user) => {
//     if (user[0]) { return done(null, user.id); }
//     return knex.insert({
//       auth_id: profile._json.id,
//       username: profile._json.name,
//       first_name: profile._json.first_name,
//       last_name: profile._json.last_name,
//       auth_provider: profile.provider,
//       img_url: profile._json.picture.data.url,
//       email: profile._json.email,
//       total_games: 0,
//       win: 0,
//       loss: 0,
//     }).returning('*').into('users')
//   })
// }

module.exports = passport;
