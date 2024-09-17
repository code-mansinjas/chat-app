import { useState } from "react";
import useGetConversation from "../../hooks/useConversation";
import { ConversationInterface } from "../../interfaces/common";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const Sidebar = () => {
  const { conversations, loading } = useGetConversation();
  const [_, SetSearchData] = useState("");

  return (
    <div className="w-full h-full flex flex-col gap-9 border-r border-slate-500 p-4">
      <SearchUserInput handleSearch={SetSearchData} />
      <UserListing conversations={conversations} />
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};

const SearchUserInput = ({
  handleSearch,
}: {
  handleSearch: (search: string) => void;
}) => {
  return (
    <label className="input input-bordered flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="h-4 w-4 opacity-70"
      >
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
      </svg>
      <input
        type="text"
        defaultValue={""}
        onChange={(e) => handleSearch(e.target.value)}
        className="grow"
        placeholder="Username"
      />
    </label>
  );
};

const UserListing = ({
  conversations,
}: {
  conversations: ConversationInterface[];
}) => {
  return (
    <div className="overflow-y-auto">
      {conversations?.map((user, index) => (
        <UserList userData={user} lastIdx={index == conversations.length - 1} />
      ))}
    </div>
  );
};

const UserList = ({
  userData,
  lastIdx,
}: {
  userData: ConversationInterface;
  lastIdx: boolean;
}) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id == userData?._id;
  const { onlineUser  } = useSocketContext()
  const isOnline = onlineUser?.includes(userData._id)

  return (
    <>
      <div
        className={`py-2 flex my-2 ${isSelected ? "bg-sky-500" : ""}`}
        onClick={() => setSelectedConversation(userData)}
      >
        <div className={` w-10 avatar ${isOnline ? "online" : ""}`}>
        <img
          className={`w-10 rounded-full ms-2`}
          src={userData?.profileAvatar}
          alt={userData.username}
        />
        </div>
        
        <div className="items-center flex ps-5">
          <h3 className="">{userData?.username}</h3>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1"></div>}
    </>
  );
};

export default Sidebar;
