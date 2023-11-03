const mongoose = require('mongoose');
const movieScema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    potraitUrl: {
        type: String,
        required: true
    },
    landscapeUrl: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    genre: {
        type: [String],
        required: true

    },
    duration: {
        type: Number,
        required: true
    },
    cast: [
        {
            actionName: String,
            role: String,
            imgUrl: String
        }
    ],
    crew: [
        {
            memberName: String,
            role: String,
            imgUrl: String
        }
    ]

});
const Movie = mongoose.model('Movie', movieScema);

module.exports = Movie;

