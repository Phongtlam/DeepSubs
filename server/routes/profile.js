const express = require('express');
const authHelpers = require('../auths/helpers');

const router = express.Router();

router.route('/')
  .get(authHelpers.isLoggedIn, (req, res) => {
    res.end(JSON.stringify(req.user));
  });

module.exports = router;
