const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    profileAvatar: {
        type: String,
        default: ""
    }
})

const UserModel = mongoose.model("User", userSchema)

module.exports = UserModel