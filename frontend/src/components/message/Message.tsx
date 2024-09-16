const Message = ({
    senderMessage = true,
    message,
    profileAvatar,
    time
  }: {
    senderMessage: boolean;
    message: string;
    profileAvatar: string;
    time: string;
  }) => {

    const dateTime = new Date(time)
    const timeInHHMM = `${dateTime.getHours()}:${dateTime.getMinutes()}`

  return (
    <div className={`chat ${senderMessage ? "chat-end" : "chat-start"} `}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profileAvatar} alt="" />
        </div>
      </div>
      <div className="chat-bubble text-white bg-blue-500">{message}</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">{timeInHHMM}</div>
    </div>
  )
}

export default Message