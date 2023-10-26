const mongoose = require('mongoose')
const { Schema } = mongoose

const noteSchema = new Schema({
    title: String,
    description: String,
})

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    notes: [noteSchema],
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel;