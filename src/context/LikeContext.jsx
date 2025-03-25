import { createContext, useContext, useEffect, useState } from 'react'
import { getLikes, createUserLike, deleteUserLike } from '../services/likeService'

const LikeContext = createContext()

export const HandleLikes = ({ children }) => {
    const currentUser = JSON.parse(localStorage.getItem("user"))
    const [userLikes, setUserLikes] = useState([])

    useEffect(() => {
        getLikes().then(data => {
            setUserLikes(data)})
    }, [])

    const isLiked = (postId) => {
        return userLikes.find(like => like.postId === postId && like.userId === currentUser.id)
    };

    const toggleLike = (postId) => {
        if (isLiked(postId)) {
            const deleteLike = userLikes.find(like => like.postId === postId && like.userId === currentUser.id)
            if (deleteLike) {
                deleteUserLike(deleteLike.id)
                }
        } else {
            if (!isLiked(postId)) {
                const newLike = {
                    userId: currentUser.id,
                    postId,
                    isLiked: true
                }
            createUserLike(newLike)
            }}}

    return (
        <LikeContext.Provider value={{ userLikes, isLiked, toggleLike }}>
            {children}
        </LikeContext.Provider>
    )}

export const useLike = () => useContext(LikeContext)
