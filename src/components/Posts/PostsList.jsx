import { useEffect, useState } from "react"
import { getPosts } from "../../services/postService"
import { Posts } from "./Posts"
import { useNavigate } from "react-router-dom"

export const PostsList = () => {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])

        useEffect(() => {
            getPosts().then(data => {
                setPosts(data)
            })}, [])

    return (
        <div className="flex flex-col items-center w-full pt-16">
            <div>
               <button onClick={() => navigate("/newpost")}>New Post</button> 
            </div>
            {posts.map(post => {
                return <Posts post={post} key={post.id}/>
            })}
        </div>
    )}