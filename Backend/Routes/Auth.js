// This is the file where we are going to do all the auth work
const express = require("express");
const router = express.Router();
const User = require('../Models/UserScema');
const errorHandler = require('../Middlewares/errorMiddlewares');
const authTokenHandler = require('../Middlewares/checkAuthToken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
// Just to test an API

router.get('/test', (req, res) => {
    res.json({
        message: 'Test API is woking fine'
    })
})

// This is just a format to give the message

function createResponse(ok, message, data) {
    return {
        ok,
        message,
        data
    };
}
router.post('/register', async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json(createResponse(false, 'Email already exits'));
        }
        const newUser = new User({
            name,
            email,
            password
        })
        await newUser.save();
        return res.status(200).json(createResponse(ok, 'User Created Sucessfully'));
    } catch (error) {
        next(error);
    }
})

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(409).json(createResponse(false, 'User Not Exists, Please Register'));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(409).json(createResponse(false, 'Invalid Credentials'));
    }
    const authToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '10m' });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '30m' });
    res.cookie('authToken', authToken, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true });
    res.status(200).json(createResponse(true, 'Login Successful', {
        authToken,
        refreshToken
    }))
})



router.get('/checklogin', authTokenHandler, (req, res) => {
    res.json({
        userId: req.userId,
        ok: true,
        message: "User authenticated Successfully"

    })
})
// router.post('/sendotp', (req, res) => {

// })




router.use(errorHandler);
module.exports = router;