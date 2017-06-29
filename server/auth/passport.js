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
  clientID: '1375653399178909',
  clientSecret: '1426301145db3400ff43f01649c3f950',
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
  passReqToCallback: true,
  enableProof: true,
  // session: false,
  profileFields: ['id', 'displayName', 'name', 'email', 'picture.type(large)'],
}, (req, token, refreshToken, profile, done) => {
  process.nextTick(() => {
    knex('users').where('auth_id', profile.id)
    .then((user) => {
      console.log('NEWW USR', refreshToken)
      if (user[0]) { return done(null, user.id); }
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
        console.log('NEW USERRRRR', newUser)
        return done(null, newUser[0]);
      })
      // return done(null, newUser.id);

    })
    .catch(err => done(err));
  });
}));

const getOrSaveUser = () => {

}

module.exports = passport;
