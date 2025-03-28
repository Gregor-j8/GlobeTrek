import { Outlet, Route, Routes } from "react-router-dom"
import { Navbar } from "../components/navbar/Navbar"
import { Home } from "../components/Home/Home"
import { PostsList } from "../components/Posts/PostsList"
import { PostDetails } from "../components/Posts/PostDetails"
import { EditPosts } from "../components/Posts/EditPosts"
import { Favorite } from "../components/Favorite/Favorite"
import { Profile } from "../components/Profile/Profile"
import { EditProfile } from "../components/Profile/EditProfile"
import { NewPost } from "../components/Posts/NewPost"
import { World } from "../components/Map/World"
import { NotesList } from "../components/Notes/NotesList"
import { NotesDetails } from "../components/Notes/NotesDetails"
import { EditNotes } from "../components/Notes/EditNotes"
import { NewNotes } from "../components/Notes/NewNotes"

export const AuthorizedViews = () => {
    return <>
        <Routes>
        <Route path="/" element={
                <>
                    <Navbar/>
                    <Outlet />
                </>}>
                <Route index element={<Home/>}/>
                    <Route path="posts">
                        <Route index element={<PostsList/>}/>
                        <Route path=":postId" element={<PostDetails/>}/>
                        <Route path=":postId/edit" element={<EditPosts/>}/>
                    </Route>
                        <Route path="/newpost" element={<NewPost/>}/>
                        <Route path="/favorites" element={<Favorite/>}/>
                        <Route path="/map" element={<World />}/>
                        <Route path="/profile/:userId" element={<Profile/>}/>
                        <Route path="/profile/edit" element={<EditProfile/>}/>
                    <Route path="notes">
                        <Route index element={<NotesList/>}/>
                        <Route path=":notesId" element={<NotesDetails/>}/>
                        <Route path=":notesId/edit" element={<EditNotes/>}/>
                    </Route>
                    <Route path="/newnote" element={<NewNotes/>}/>
                </Route>
        </Routes>
    </> 
}