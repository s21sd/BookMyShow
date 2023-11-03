const mongoose = require('mongoose');
const screenScema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    screenType: {
        type: String,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    movieSchedules: [
        {
            movieId: {
                type: mongoose.Schema.ObjectId,
                ref: 'Movie',
                required: true
            },
            showTime: String,
            notavailableseats: [String],
            showDate: Date
        }
    ]

});
const Screen = mongoose.model('Screen', screenScema);

module.exports = Screen;

