const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;