const express = require('express');
const hotel = require('./hotel');
const router = express.Router();

router.get('/', function(req, res) {
    res.redirect('/hotel/');
});

router.use('/hotel/', hotel);

module.exports = router;
