import { useEffect, useState } from "react"
import { getPosts } from "../../services/postService"
import { Posts } from "./Posts"
import { useNavigate } from "react-router-dom"

export const PostsList = () => {
    const navigate = useNavigate()
    const [originalPosts, setOriginalPosts] = useState([])
    const [posts, setPosts] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        getPosts().then(data => {
            setOriginalPosts(data)
            setPosts(data)
        })
    }, [])

    useEffect(() => {
        if (search) {
            const foundPosts = originalPosts.filter((post) =>
                post.description.toLowerCase().includes(search.toLowerCase()))
            setPosts(foundPosts)
        } else {
            setPosts(originalPosts)
        }
    }, [search, originalPosts])
    return (
        <div className="flex flex-col items-center w-full pt-16">
            <div className="pt-4 pb-5">
                <input 
                    onChange={(event) => {setSearch(event.target.value)}}
                    type="text" placeholder="Search Posts" className="button-primary rounded-lg mr-1 p-2" value={search}/>
                <button className="button-primary cursor-pointer p-2 ml-1 rounded-lg" onClick={() => navigate("/newpost")}>New Post</button>
            </div>
            <div className="flex flex-col justify-center mt-5 h-200 overflow-y-scroll pt-50">
                {posts.map(post => (
                    <Posts post={post} key={post.id}/>
                ))}  
            </div>

        </div>
    )
}
