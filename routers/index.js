const express = require('express');
const home = require('./home');

const router = express.Router();

router.use('/home', home);

module.exports = router;