const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserScema = new mongoose.Schema({
    // Here I will Define my user Schrema
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bookings: {     // This Screma I am making here for the bookings
        type: Array,
        default: []
    }



}, {
    timestamps: true
})
// Here I am modifing my user Password and providing the hashed password
UserScema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next();
});

const user = mongoose.model('User', UserScema);
module.exports = user;