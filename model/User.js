const { mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 3
    },
    roles: {
        type: [String],
        default: ['STUDENT'],
        required: true
    },
    accountStatus: {
        type: String,
        enum: ['PENDING', 'ACTIVE', 'REJECTED'],
        default: 'PENDING'
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User