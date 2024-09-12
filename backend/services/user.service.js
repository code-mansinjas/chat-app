const UserModel = require("../models/user.model")

const getAllUserExceptSender = async ({ senderId: loggedUser }) => {
    const result = await UserModel.find({
        _id: { $ne: loggedUser }
    })
    if (result && result.length) {
        return { success: true, data: result }
    }
    return { success: false, message: "No User Found", data: result }
}

const getLoggedUser = async ({ senderId: loggedUser }) => {
    const result = await UserModel.findOne({
        _id: loggedUser 
    })
    if (result) {
        return { success: true, data: result }
    }
    return { success: false, message: "No User Found", data: result }
}

module.exports = {
    getAllUserExceptSender,
    getLoggedUser
}