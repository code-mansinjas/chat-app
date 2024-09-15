import { useState } from "react";
import { BsSend } from "react-icons/bs";
import { FiMessageSquare } from "react-icons/fi";

const MessageContainer = ({
  reciever = "",
  chats = [],
}: {
  reciever: string;
  chats: Array<any>;
}) => {
  const [person, SetPerson] = useState<any | null>(null);
  return (
    <div className="w-full h-full flex flex-col">
      {person ? (
        <>
          <div className="text-start mb-3 text-2xl flex gap-3 items-center border-b-2 pb-1 input-bordered">
            <img
              className="w-10 rounded-full"
              src="https://avatar.iran.liara.run/public"
              alt=""
            />
            <h3>{reciever}</h3>
          </div>
          <div className="overflow-y-auto">
            {chats.length ? (
              chats.map((chat) => (
                <Message
                  senderMessage={chat?.senderMessage}
                  message={chat?.message}
                />
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

const NoChatSelected = () => {
  return <div className="flex items-center w-full h-full justify-center text-3xl">
    Welcome To Our Chat {" "}<FiMessageSquare className="ms-3"/>
  </div>;
};

const Message = ({
  senderMessage = true,
  message = "Sample Chat",
}: {
  senderMessage: boolean;
  message: string;
}) => {
  return (
    <div className={`chat ${senderMessage ? "chat-end" : "chat-start"} `}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src="https://avatar.iran.liara.run/public" alt="" />
        </div>
      </div>
      <div className="chat-bubble text-white bg-blue-500">{message}</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        03:56
      </div>
    </div>
  );
};

const SendMsgTextBox = ({}) => {
  return (
    <form className="px-4 my-3">
      <div className="w-full relative">
        <input
          type="text"
          className=" border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white "
          placeholder="Send a Message"
        />
        <button
          type="submit"
          className="absolute  inset-y-0 end-0 flex items-center pe-3"
        >
          <BsSend />
        </button>
      </div>
    </form>
  );
};

export default MessageContainer;
