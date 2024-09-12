const UserModel = require("../models/user.model")
const { generateHashedPassword, generateToken, compareHashedPassword } = require("../utils/common.helper")

const signIn = async ({ username, password, confirmPassword, gender }) => {
    if (password !== confirmPassword) {
        return { success: false, message: "Confirm Password not Matched" }
    }
    const checkUserExist = UserModel.findOne({ username })
    if (checkUserExist) {
        return { success: false, message: "Username Already Exist" }
    }
    let avatar = ""
    if (gender == "male") {
        avatar = `https://avatar.iran.liara.run/public/boy?username=${username}`
    } else if (gender == "female") {
        avatar = `https://avatar.iran.liara.run/public/girl?username=${username}`
    }
    const hashedPassword = generateHashedPassword(password)
    const createdUser = await UserModel.create({
        gender,
        password: hashedPassword,
        profileAvatar: avatar,
        username
    })
    if (createdUser) {
        const token = generateToken({
            id: createdUser._id || createdUser.id,
            username,
        })
        return { success: true, message: "User Created", token }
    } else {
        return { success: false, message: "Error while creating User" }
    }
}

const login = async ({ username, password }) => {
    const checkUserExist = await UserModel.findOne({ username })
    if (!checkUserExist) {
        return { success: false, message: "Invalid Username and Password" }
    }
    const checkValidPassword = compareHashedPassword(checkUserExist.password, password)
    if (!checkValidPassword) {
        return { success: false, message: "Invalid Username and Password" }
    }
    const token = generateToken({
        id: checkUserExist._id || checkUserExist.id,
        username,
    })
    return { success: true, message: "User loggedIn", token }
}

module.exports = {
    signIn,
    login
}