const { Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {
        type:String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        trim: true, // no espacios en blanco
        unique: true
    },
    email: {
        type: String,
        required: true,
        tirm: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = model('User', userSchema);