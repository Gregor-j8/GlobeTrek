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

return (currentUser?.id == userId ? (
        <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md mt-50 flex flex-col items-center justify-center mb-15">
            <h2 className="text-center text-2xl font-semibold mt-3">{profile.fullName}</h2>
            <p className="text-center text-gray-600 mt-1">{profile.email}</p>
            <p className="text-center text-gray-600 mt-1">Posts: {userPosts.length}</p>
            <button className="cursor-pointer button-primary">Follow</button>            
            <div className="flex flex-col justify-center mt-5 h-80 overflow-y-scroll pt-8">
                {userPosts.map(post => {
                    return <Posts post={post} key={post.id} />
                })}
            </div>
            <div className="mt-5">
                <button className="py-3 px-4 button-primary text-color-primary cursor-pointer" onClick={editProfile}>Edit</button>
            </div>
        </div>
    ) : (
        <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md mt-50 flex flex-col items-center justify-center mb-15">
            <h2 className="text-center text-2xl font-semibold mt-3">{profile.fullName}</h2>
            <p className="text-center text-gray-600 mt-1">{profile.email}</p>
            <p className="text-center text-gray-600 mt-1">Posts: {userPosts.length}</p>    
            <button>Follow</button>             
            <div className="flex flex-col justify-center mt-5 h-80 overflow-y-scroll pt-8">
                {userPosts.map(post => {
                    return <Posts post={post} key={post.id} />
                })}
            </div>
        </div>
    ))}