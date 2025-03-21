import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { GetUserProfile } from "../../services/userService"
import { getUserPosts } from "../../services/postService"
import { Posts } from "../Posts/Posts"
import { UseCurrentUser } from "../../context/CurrentUserContext"

export const Profile = () => {
    const { currentUser } = UseCurrentUser()
    const navigate = useNavigate()
     const { userId } = useParams()
    const [profile, setProfile] = useState({})
    const [userPosts, setUserPosts] = useState([])

    useEffect(() => {
        GetUserProfile(userId).then(data => {
            const profile = data[0]
            setProfile(profile)
        })
    }, [userId])
    useEffect(() => {
        getUserPosts(userId).then(data => {
            setUserPosts(data)
        })
    }, [userId])

    const editProfile = () => {
        navigate("/profile/edit")
    }

    return ( currentUser?.id == userId ? (
    <div className="flex flex-col w-full items-center pt-20">
        <header>
            <h1 className="text-3xl text-color-primary">{profile.fullName}</h1>
            <h2 className="text-color-primary">{profile.email}</h2>
        </header>
        <div>
            <p className="text-color-primary">{userPosts.length}</p>
        </div>
            <button className="py-3 px-4 button-primary text-color-primary cursor-pointer" onClick={editProfile}>Edit</button>
        {userPosts.map(post => {
           return <Posts post={post} key={post.id}/>
        })}
    </div>) : (<div className="flex flex-col w-full items-center pt-20">
        <header>
            <h1>{profile.fullName}</h1>
            <h2>{profile.email}</h2>
        </header>
        <div>
            <p>{userPosts.length}</p>
        </div>
        {userPosts.map(post => {
           return <Posts post={post} key={post.id}/>
        })}
    </div>
    )
)
}