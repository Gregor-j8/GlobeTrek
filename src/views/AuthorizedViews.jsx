import { Outlet, Route, Routes } from "react-router-dom"
import { Navbar } from "../components/navbar/Navbar"
import { Home } from "../components/Home/Home"
import { useEffect, useState } from "react"
import { PostsList } from "../components/Posts/PostsList"

export const AuthorizedViews = () => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
      const localUser = localStorage.getItem("user")
      const UserObject = JSON.parse(localUser)
      setCurrentUser(UserObject)
    }, [])

    return <>
        <Routes>
        <Route path="/" element={
                <>
                    <Navbar />
                    <Outlet />
                </>}>
                <Route index element={<Home currentUser={currentUser}/>}/>
                <Route path="posts" element={<PostsList />}/>
            </Route>
        </Routes>
    </> 
}