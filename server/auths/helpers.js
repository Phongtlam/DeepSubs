const bcrypt = require('bcryptjs');
const knex = require('../../postgres_db/knex');

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

const createId = (id) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(id, salt);
}

const createUser = (req, res) => {
  console.log('req', req.body)
  return handleErrors(req)
  .then(() => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);
    return knex('users')
    .insert({
      username: req.body.username,
      password: hash,
      auth_provider: 'no_auth',
      total_games: 0,
      win: 0,
      loss: 0,
    })
    .returning('*');
  })
  .catch((err) => {
    res.status(400).json({ status: err.message });
  });
}

function loginRequired(req, res, next) {
  if (!req.user) return res.status(401).json({ status: 'Please log in' });
  return next();
}

function adminRequired(req, res, next) {
  if (!req.user) res.status(401).json({ status: 'Please log in' });
  return knex('users').where({ username: req.user.username }).first()
  .then((user) => {
    if (!user.admin) res.status(401).json({ status: 'You are not authorized' });
    return next();
  })
  .catch((err) => {
    res.status(500).json({ status: 'Something bad happened' });
  });
}

function loginRedirect(req, res, next) {
  if (req.user) return res.status(401).json(
    { status: 'You are already logged in' });
  return next();
}

function handleErrors(req) {
  return new Promise((resolve, reject) => {
    if (req.body.username.length < 6) {
      reject({
        message: 'Username must be longer than 6 characters'
      });
    }
    else if (req.body.password.length < 6) {
      reject({
        message: 'Password must be longer than 6 characters'
      });
    } else {
      resolve();
    }
  });
}

const processOauthUser = (profile, done) => knex('users')
  .where('auth_id', profile.id)
  .then((user) => {
    if (user[0]) { return done(null, user[0]); }
    return knex.insert({
      auth_id: profile.id,
      username: profile.displayName,
      first_name: profile.name.givenName,
      last_name: profile.name.familyName,
      auth_provider: profile.provider,
      img_url: profile.photos[0].value,
      email: profile.emails[0].value,
      total_games: 0,
      win: 0,
      loss: 0,
    }).returning('*').into('users')
    .then(newUser => done(null, newUser[0]))
    .catch(err => done(err));
  });

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
  return null;
}

module.exports = {
  comparePass,
  createUser,
  loginRequired,
  adminRequired,
  loginRedirect,
  processOauthUser,
  isLoggedIn,
  createId,
};
