const express = require('express');
const shortid = require('shortid');
const authHelpers = require('../auths/helpers');
const createIdController = require('../controllers').createId;

const router = express.Router();

router.route('/')
  .get(authHelpers.isLoggedIn, (req, res) => {
    // const gameId = shortid.generate();
    console.log('gameid', gameId)
    res.end(gameId);
  });

router.route('/join')
  .post(authHelpers.isLoggedIn, (req, res) => {
    res.redirect(`/home?gameId=${req.body.gameId}`);
  });

module.exports = router;
