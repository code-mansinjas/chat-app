import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/message/MessageContainer";

const HomeData = [
  { message: "Sample Message", senderMessage: true },
  { message: "Sample Message", senderMessage: false },
  { message: "Sample Message", senderMessage: true },
  { message: "Sample Message", senderMessage: false },
  { message: "Sample Message", senderMessage: true },
  { message: "Sample Message", senderMessage: true },
  { message: "Sample Message", senderMessage: false },
  { message: "Sample Message", senderMessage: true },
  { message: "Sample Message", senderMessage: false },
  { message: "Sample Message", senderMessage: true },
];

const Home = () => {
  return (
    <div className="flex max-w-4xl border p-3 input-bordered w-full h-4/5">
      <div className="w-1/3">
        <Sidebar />
      </div>
      <div className="w-2/3 px-4">
        <MessageContainer chats={HomeData} reciever="Sample Recierver" />
      </div>
    </div>
  );
};

export default Home;
