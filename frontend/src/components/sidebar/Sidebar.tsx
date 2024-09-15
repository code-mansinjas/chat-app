import React, { useRef, useState } from "react";

const ListData = [
  { profile: "https://avatar.iran.liara.run/public/boy", username: "Sample one" },
  { profile: "https://avatar.iran.liara.run/public/boy", username: "Sample Two" },
  { profile: "https://avatar.iran.liara.run/public/boy", username: "Sample Three" },
  { profile: "https://avatar.iran.liara.run/public/boy", username: "Sample Four" },
  { profile: "https://avatar.iran.liara.run/public/boy", username: "Sample one" },
  { profile: "https://avatar.iran.liara.run/public/boy", username: "Sample Two" },
  { profile: "https://avatar.iran.liara.run/public/boy", username: "Sample Three" },
  { profile: "https://avatar.iran.liara.run/public/boy", username: "Sample Four" },
];

const Sidebar = () => {
  return (
    <div className="w-full h-full flex flex-col gap-9 border-r border-slate-500 p-4">
      <SearchUserInput />
      <UserListing listData={ListData} />
    </div>
  );
};

const SearchUserInput = () => {
  const [search, SetSearch] = useState("");
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
        defaultValue={search}
        onChange={(e) => SetSearch(e.target.value)}
        className="grow"
        placeholder="Username"
      />
    </label>
  );
};

const UserListing = ({
  listData,
}: {
  listData: Array<{ username: string; profile: string }>;
}) => {
  return (
    <div className="overflow-y-auto">
      {listData?.map((user) => (
        <UserList userData={user} />
      ))}
    </div>
  );
};

const UserList = ({
  userData,
}: {
  userData: { username: string; profile: string };
}) => {
  return (
    <div className="flex my-4 ">
      <img className="w-10 rounded-full" src={userData?.profile} alt={userData.username} />
      <div className="items-center flex ps-5"><h3 className="">{userData?.username}</h3></div>
    </div>
  );
};

export default Sidebar;
