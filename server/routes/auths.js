const express = require('express');
const middleware = require('../middleware');
const authHelpers = require('../auths/helpers');

const router = express.Router();

router.route('/').get((req, res) => { res.render('index.ejs'); });
router.route('/signup')
  .get((req, res) => {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  })
  .post(middleware.passport.authenticate('local-signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
  }));

router.route('/login')
  .get((req, res) => {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  })
  .post(middleware.passport.authenticate('local-login', {
    successRedirect: '/home',
    failureRedirect: '/login',
  }));

router.route('/auth/facebook')
  .get(middleware.passport.authenticate('facebook', { scope: 'email' }));

router.route('/auth/facebook/callback')
  .get(middleware.passport.authenticate('facebook', {
    successRedirect: '/home',
    failureRedirect: '/',
  }));

router.route('/auth/google')
  .get(middleware.passport.authenticate('google', { scope: ['profile', 'email'] }));

router.route('/auth/google/callback')
  .get(middleware.passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/',
  }));

router.route('/profile')
  .get(authHelpers.isLoggedIn, (req, res) => {
    // res.render('profile.ejs', {
    //   gameId: '',
    //   user: req.user, // get the user out of session and pass to template
    // });
    res.redirect('/home');
  });

router.route('/logout')
  .get((req, res) => {
    req.logout();
    res.redirect('/');
  });

module.exports = router;
