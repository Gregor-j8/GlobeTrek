import { useEffect, useState } from "react"
import { GetFavoritePosts } from "../../services/likeService"
import { Posts } from "../Posts/Posts"

export const Favorite = ({currentUser}) => {
    const [favoritePosts, setFavoritePosts] = useState([])
    useEffect(() => {
        GetFavoritePosts(currentUser.id).then(posts => {
            setFavoritePosts(posts)
        })
    }, [currentUser]) 
    
    return ( 
    <div className="pt-20">
        {favoritePosts.map(post => {
                 return <div><Posts post={post} key={post.id}/></div>
        })}
    </div>
            
    )
}