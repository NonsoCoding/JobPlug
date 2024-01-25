import { createContext, useState } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
  const [email, setEmail] = useState("John@gmail.com");
  const [userUID, setUserUID] = useState("")
  const [postID, setPostID] = useState("")
  const [userInfo, setUserInfo] = useState("")
  const [password, setPassword] = useState(undefined);
  const [preloader, setPreloader] = useState(false);
  const [post, setPost] = useState("")

  return (
    <AppContext.Provider value={{ email, setEmail, password, setPassword, preloader, setPreloader, userInfo, setUserInfo, userUID, setUserUID, post, setPost, postID, setPostID  }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
