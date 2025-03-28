import { useEffect, useState } from "react"
import { GetFavoritePosts } from "../../services/likeService"
import { useLike } from "../../context/LikeContext"
import { FilledHeartIcon, UnFilledHeartIcon } from "../../Documents/Heart"
import { Link } from "react-router-dom"
import { UseCurrentUser } from "../../context/CurrentUserContext"

export const Favorite = () => {
    const { currentUser } = UseCurrentUser()
    const { isLiked, toggleLike } = useLike()
    const [favoritePosts, setFavoritePosts] = useState([])

    useEffect(() => {
        GetFavoritePosts(currentUser.id).then(posts => {
            setFavoritePosts(posts)
        })}, [currentUser])

    return (
            <div className="max-w-lg mx-auto min-w-[384px] my-22">
                {favoritePosts.map(post => (
            <div key={post.post.id} className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mx-auto m-2">
                <div className="p-5">
                    <Link to={`/posts/${post.post.id}`}>
                        <h1 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 cursor-pointer">{post.post.title}</h1>
                    </Link>
                    <button onClick={() => toggleLike(post.post.id)}>
                        {isLiked(post.post.id) ? <FilledHeartIcon /> : <UnFilledHeartIcon />}
                    </button>
                    <p className="font-normal text-gray-700 mb-3">{post.post.description}</p>
                </div>
            </div>
            ))}
        </div>
    )
}
