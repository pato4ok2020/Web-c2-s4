import {useState} from "react";
import {AppContext} from "./AppContext";

export const AppProvider = ({children}) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const setUserPersist = (newUser) => {
    if (newUser && newUser.id) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }
    setUser(newUser);
  };

  return <AppContext.Provider
    value={{
      user,
      setUser: setUserPersist
    }}
  >{children}</AppContext.Provider>;
};
