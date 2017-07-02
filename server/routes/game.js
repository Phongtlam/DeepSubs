const express = require('express');
const authHelpers = require('../auths/helpers');
const createIdController = require('../controllers').createId;

const router = express.Router();

router.route('/')
  .get(authHelpers.isLoggedIn, (req, res) => {
    const gameId = createIdController.createId(req.query.id);
    res.redirect(`/home?gameId=${gameId}`);
  });

router.route('/join')
  .post(authHelpers.isLoggedIn, (req, res) => {
    res.redirect(`/home?gameId=${req.body.gameId}`);
  });

module.exports = router;
