import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getPostsDetails, updatePosts } from "../../services/postService"

export const EditPosts = () => {
    const navigate = useNavigate()
    const { postId } = useParams()
    const [ newPost, setNewPost] = useState({})

    useEffect(() => {
        getPostsDetails(postId).then(res => {
            const chosenPost = res[0]
            setNewPost(chosenPost)
        })
    }, [])

    const updatingPost = (event) => {
        event.preventDefault()

        const AddPost = {
            id: postId,
            title: newPost.title,
            description: newPost.description,
            Name: newPost.Name, 
        }
        console.log(AddPost)
        if (!AddPost) {
            return 
        } else {
            updatePosts(AddPost).then(() => {
                navigate(`/posts`)   
})}
}

    return (
        <div className="flex items-center justify-center w-full h-screen">
            <form className="flex flex-col h-2/5 items-center w-full mx-5 justify-center bg-main-card">
                <fieldset >
                    <div>
                        <label className="text-color-primary">Title: </label>
                        <input type="text"
                        className="button-primary text-color-primary" value={newPost.title} onChange={(events) => {
                            const copy = {...newPost}
                            copy.title = events.target.value
                            setNewPost(copy)}}/>
                    </div>
                    <div>
                        <label className="text-color-primary">Location: </label>
                        <input type="text"
                            className="button-primary text-color-primary" value={newPost.location} onChange={(events) => {
                            const copy = {...newPost}
                            copy.location = events.target.value
                            setNewPost(copy)}}/>                   
                    </div>
                    <div>
                        <label className="text-color-primary">Description: </label>
                        <input type="text"
                                className="button-primary text-color-primary h-5"
                                 value={newPost.description} onChange={(events) => {
                                const copy = {...newPost}
                                copy.description = events.target.value
                                setNewPost(copy)}}/>                      
                    </div>
                    <button className="w-35 mt-22 rounded-lg h-8 button-primary text-color-primary cursor-pointer" onClick={updatingPost}>Save </button>
                </fieldset>
            </form>
        </div>
    )
}