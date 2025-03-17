import { useEffect, useState } from "react"
import { getPosts } from "../../services/postService"
import { Posts } from "./Posts"

export const PostsList = ({currentUser}) => {
    const [posts, setPosts] = useState([])

        useEffect(() => {
            getPosts().then(data => {
                setPosts(data)
            })}, [])

    return (
        <div className="flex flex-col items-center w-full pt-16">
            {posts.map(post => {
                return <Posts post={post} key={post.id}/>
            })}
        </div>
    )}