// This is the file where we are going to do all the auth work
const express = require("express");
const router = express.Router();
const Admin = require("../Models/AdminScrema");
const bcrypt = require('bcrypt');
const adminTokenHandler = require("../Middlewares/checkAdminToken");
const errorHandler = require('../Middlewares/errorMiddlewares');
const jwt = require('jsonwebtoken');

require('dotenv').config();

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
        const existingUser = await Admin.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json(createResponse(false, 'Email Already Exists'));
        }
        const newAdmin = new Admin({
            name,
            email,
            password
        })
        await newAdmin.save();
        res.status(200).json(createResponse(true, 'User Register Successfully'));
    } catch (error) {
        next(error)
    }
})

router.post('/login', async (req, res, next) => {
    try {


        const { email, password } = req.body;
        const admin = Admin.findOne({ email});
        if (!admin) {
            return res.status(401).json(createResponse(false, 'User Not Found'));
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json(createResponse(false, 'Password Not Match'));
        }
        const adminAuthToken = jwt.sign({ adminId: admin._id }, process.env.JWT_ADMIN_SECRET_KEY, { expiresIn: '10m' });
        res.cookie('adminAuthToken', adminAuthToken, { httpOnly: true });
        res.status(200).json(createResponse(true, 'Admin Login Successful', { adminAuthToken }));

    } catch (error) {
        next(error)
    }
})
router.get('/checkadminlogin', adminTokenHandler, (req, res) => {
    res.json({
        adminId: req.adminId,
        ok: true,
        message: "Admin authenticated Successfully"

    })
})


router.use(errorHandler);
module.exports = router;