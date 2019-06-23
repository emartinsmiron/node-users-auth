const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    name: String,
    email: {
        type: String, 
        required: true, 
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    }, 
    password: {type: String, required: true},
    profilePhoto: String
});

module.exports = mongoose.model('User', documentSchema);