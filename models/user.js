const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    }
});

userSchema.virtual('exercises', {
    ref: 'Exercise',
    localField: '_id',
    foreignField: 'owner'
});

userSchema.methods.toJSON = function() {
    const user = this.toObject();

    delete user.__v;

    return user;
}

const User = mongoose.model('User', userSchema);

module.exports = User;