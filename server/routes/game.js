const express = require('express');
const authHelpers = require('../auths/helpers');

const router = express.Router();

router.route('/')
  .get(authHelpers.isLoggedIn, (req, res) => {
    const gameId = authHelpers.createId(req.query.id);
    res.redirect(`/home?gameId=${gameId}`);
    // res.render('profile.ejs', {
    //   gameId,
    //   // user: req.user,
    // });
  });

router.route('/join')
  .post((req, res) => {
    res.redirect(`/home?gameId=${req.body.gameId}`);
  });

module.exports = router;
