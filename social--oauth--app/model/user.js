const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    // not required though
    googleId: String,
    // might require some form of validation
    email: String
});

module.exports = mongoose.model('User', userSchema);