const mongoose = require('mongoose');
const bookingScema = new mongoose.Schema({
    showTime: {
        type: String,
        required: true
    },
    showDate: {
        type: Date,
        required: true
    },
    movieid: {
        type: mongoose.Schema.ObjectId,
        ref: 'Movie',
        required: true
    },
    theaterid: {
        type: mongoose.Schema.ObjectId,
        ref: 'Screen',
        required: true
    },
    seats: [
        {
            sead_id: {
                type: String,
                required: true
            },

            type: String,
            status: String
        }

    ],
    totalPrice: {
        type: Number,
        required: true
    }

});
const Booking = mongoose.model('Booking', bookingScema);

module.exports = Booking;

