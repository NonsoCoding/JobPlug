import { createContext, useState } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
  const [email, setEmail] = useState("John@gmail.com");
  const [userUID, setUserUID] = useState("");
  const [postID, setPostID] = useState("");
  const [userInfo, setUserInfo] = useState({image: null});
  const [password, setPassword] = useState(undefined);
  const [preloader, setPreloader] = useState(false);
  const [post, setPost] = useState("");
  const [docID, setDocID] = useState("");
  const [allJobs, setAllJobs] = useState([])

  return (
    <AppContext.Provider value={{ email, setEmail, password, setPassword,
     preloader, setPreloader, userInfo, setUserInfo, userUID, setUserUID,
      post, setPost, postID, setPostID, docID, setDocID, allJobs, setAllJobs }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
