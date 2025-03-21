import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const CurrentUserContext = ({ children }) => {
        const [currentUser, setCurrentUser] = useState({})
    
    useEffect(() => {
          const localUser = localStorage.getItem("user")
          const UserObject = JSON.parse(localUser)
          setCurrentUser(UserObject)
        }, [])

        return (
            <UserContext.Provider value={{ currentUser }}>
                {children}
            </UserContext.Provider>
        )
}

export const UseCurrentUser = () => {
    return useContext(UserContext)
}