import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const SendMsgTextBox = () => {
  const { SendMessage, loading } = useSendMessage();
  const [message, SetMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission
    if (!message.trim()) return; // Check if message is not empty
    await SendMessage(message);
    SetMessage(""); // Clear the input field
  };

  // Handle keydown events in the input field
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default form submission
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>); // Call handleSubmit
    }
  };

  return (
    <form className="my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a Message"
          value={message}
          onChange={(e) => SetMessage(e.target.value)} // Update message state
          onKeyDown={handleKeyDown} // Handle key down event
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  );
};

export default SendMsgTextBox;
