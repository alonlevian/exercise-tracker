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

exerciseSchema.methods.toJSON = function() {
    const exercise = this.toObject();

    delete exercise.__v;
    delete exercise._id;
    delete exercise.owner;
    exercise.date = exercise.date.toDateString();

    return exercise;
}

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;