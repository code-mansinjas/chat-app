const ConversationModel = require("../models/converstion.model")
const MessageModel = require("../models/message.model")
const { getReceiverSocketId, io } = require("../socket/socket")

const sendMessage = async ({ senderId, receiverId, message }) => {
    let conversation = await ConversationModel.findOne({
        participants: { $all: [senderId, receiverId] }
    })
    if (!conversation) {
        conversation = await ConversationModel.create({
            participants: [senderId, receiverId]
        })
    }
    const newMessage = new MessageModel({ senderId, receiverId, message })
    if (newMessage) {
        conversation.messages.push(newMessage._id)
    }

    await conversation.save()
    const messageSaved = await newMessage.save()

    const receiverSocketId = getReceiverSocketId(receiverId)
    if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage",newMessage)
    }

    return { success: true, message: "Message Sended", data: messageSaved }
}

const getMessage = async ({ senderId, receiverId }) => {
    const conversation = await ConversationModel
    .findOne({
        participants: { $all: [senderId, receiverId] }
    })
    .populate("messages")

    if (conversation) {
        return { success: true, data: conversation }
    }
    return { success: false, data: conversation, message: "Message Not Found" }
}


module.exports = {
    sendMessage,
    getMessage
}