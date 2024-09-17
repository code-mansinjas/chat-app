import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { Socket, io } from "socket.io-client";

export const SocketContext = createContext<{
  onlineUser: any[];
  socket: Socket | null;
}>({
  onlineUser: [],
  socket: null
});

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }: { children: any }) => {
  const [socket, SetSocket] = useState<Socket | null>(null);
  const [onlineUser, SetOnlineUser] = useState<any[]>([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    const fun = () => {
      if (authUser?.isVerified || authUser?.token) {
        const socket = io("/", {
          query: {
            userId: authUser?._id,
          },
        });
        SetSocket(socket);

        socket.on("getOnlineUsers", (users) => {
          SetOnlineUser(users);
        });

        return () => socket.close();
      } else {
        if (socket) {
          socket.close();
          SetSocket(null);
        }
      }
    };
    fun();
  }, [authUser?.token]);

  return (
    <SocketContext.Provider value={{ onlineUser, socket }}>
      {children}
    </SocketContext.Provider>
  );
};
