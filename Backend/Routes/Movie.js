const express = require('express');
const router = express.Router();
const User = require('../Models/UserScema');
const Book = require('../Models/BookingScema');
const Movie = require('../Models/MovieScrema');
const Screen = require('../Models/ScreenScrema');


router.get('/test', (req, res) => {
    res.json({
        message: 'Movie roter is woking fine'
    })
})


module.exports = router;