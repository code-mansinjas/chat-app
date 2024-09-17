import { useEffect, useRef } from "react";
import SendMsgTextBox from "./SendMsgTextBox";
import Message from "./Message";
import NoChatSelected from "./NoChatSelected";
import useConversation from "../../zustand/useConversation";
import useGetMessages from "../../hooks/useGetMessages";
import { useAuthContext } from "../../context/AuthContext";
import useListenMessages from "../../hooks/useListenMessages";

const MessageContainer = () => {

  const { selectedConversation, setSelectedConversation } = useConversation()
  const { messages } = useGetMessages()
  const { authUser } = useAuthContext()
  useListenMessages()
  const lastMessageRef = useRef<any>()

  useEffect(()=>{
    return setSelectedConversation(null)
  },[setSelectedConversation])

  useEffect(()=>{
    setTimeout(()=>{
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  },[messages])

  return (
    <div className="w-full h-full flex flex-col">
      {selectedConversation ? (
        <>
          <div className="text-start mb-3 text-2xl flex gap-3 items-center border-b-2 pb-1 input-bordered">
            <img
              className="w-10 rounded-full"
              src={selectedConversation?.profileAvatar}
              alt=""
            />
            <h3>{selectedConversation.username}</h3>
          </div>
          <div className="overflow-y-auto flex-1">
            {messages.length ? (
              messages.map((chat) => (
                <div key={chat._id} ref={lastMessageRef}>
                  <Message
                  senderMessage={chat?.receiverId == selectedConversation?._id}
                  message={chat?.message}
                  profileAvatar={chat?.receiverId == selectedConversation?._id ? selectedConversation.profileAvatar : authUser?.profileAvatar}
                  time={chat?.createdAt}
                  shouldShake={chat?.shouldShake || false}
                />
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
          <SendMsgTextBox />
        </>
      ) : (
        <NoChatSelected />
      )}
    </div>
  );
};

export default MessageContainer;
