const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 1,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    messages: [{
        type: Schema.Types.ObjectId, ref: 'Message',
    }]
});

const User = mongoose.model('User', schema);

module.exports =  User ;