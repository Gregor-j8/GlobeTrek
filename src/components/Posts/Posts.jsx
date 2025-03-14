import { Link } from "react-router-dom"
import { FilledHeartIcon, UnFilledHeartIcon } from "../../Documents/Heart"
import { useEffect, useState } from "react"
import { createUserLike, deleteUserLike, getLikes } from "../../services/likeService"

export const Posts = ({ post, currentUser }) => {
    const [isLiked, setIsLiked] = useState(false)
    const [userLikes, setUserLikes] = useState([])

    useEffect(() => {
        getLikes().then((res) => setUserLikes(res))
    }, [])

    useEffect(() => {
        const liked = userLikes.some(like => like.postId === post.id && like.userId === currentUser.id)
        setIsLiked(liked)
    }, [userLikes, post.id, currentUser.id])

    const handleButtonClick = (postId) => {
        if (isLiked) {
            const DeleteLike = userLikes.find(like => like.postId === postId && like.userId === currentUser.id)
            if (DeleteLike) {
                 deleteUserLike(DeleteLike.id)
                setUserLikes(user => user.filter(like => like.id !== likeToDelete.id))
            }} else {
                const newLike = {
                    userId: currentUser.id,
                    postId: postId
                }
            createUserLike(newLike)
            setUserLikes(likes => [...likes, newLike])
        }
        setIsLiked(!isLiked)
    }

    return (
        <div className="flex justify-center items-center w-2/3">
            <div className="w-full items-center md:w-1/2 lg:w-1/3 m-5 card-color-primary">
                <section className="flex justify-around">
                    <Link><h2 className="text-color-dark">{post.title}</h2></Link>
                    <button onClick={() => handleButtonClick(post.id)}>
                        {isLiked ? <FilledHeartIcon /> : <UnFilledHeartIcon />}
                    </button>
                </section>
                <h3 className="text-color-dark">{post.description}</h3>
                <h3 className="text-color-dark">{post.city.city}</h3>
            </div>
        </div>
    )}
