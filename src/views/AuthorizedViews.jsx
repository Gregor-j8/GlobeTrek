import { Outlet, Route, Routes } from "react-router-dom"
import { Navbar } from "../components/navbar/Navbar"
import { Home } from "../components/Home/Home"
import { useEffect, useState } from "react"
import { PostsList } from "../components/Posts/PostsList"
import { PostDetails } from "../components/Posts/PostDetails"
import { EditPosts } from "../components/Posts/EditPosts"
import { Favorite } from "../components/Favorite/Favorite"


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
                    <Route path="posts">
                        <Route index element={<PostsList currentUser={currentUser}/>}/>
                        <Route path=":postId" element={<PostDetails currentUser={currentUser}/>}/>
                        <Route path=":postId/edit" element={<EditPosts currentUser={currentUser}/>}/>
                    </Route>
                        <Route path="/favorites" element={<Favorite currentUser={currentUser}/>}/>
                </Route>
        </Routes>
    </> 
}