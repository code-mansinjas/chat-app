import { createContext, useContext, useEffect, useState } from "react";
import useGetLoggedUser from "../hooks/useGetLoggedUser";

export const AuthContext = createContext<{ authUser: any; SetAuthUser: any }>({
  authUser: null,
  SetAuthUser: null,
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: any }) => {
  const storedUser = localStorage.getItem("chat-app-user");
  const initialUser = storedUser ? storedUser : null;
  const [authUser, SetAuthUser] = useState<any>({ token: initialUser });

  useEffect(()=>{
    const getLoggedUser = async () => {
      const loggedUser = await useGetLoggedUser(initialUser || "")
      SetAuthUser({ ...loggedUser.data, token: initialUser || "", isVerified: loggedUser.success })
    }
    getLoggedUser()
  },[])

  return (
    <AuthContext.Provider value={{ authUser, SetAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
