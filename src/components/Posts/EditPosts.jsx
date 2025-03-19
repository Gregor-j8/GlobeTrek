import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getPostsDetails, updatePosts } from "../../services/postService"
import { EditFilter } from "../Filter/EditFilter"

export const EditPosts = () => {
    const navigate = useNavigate()

    const { postId } = useParams()
    const [ newPost, setNewPost] = useState({})
    console.log(newPost)

    useEffect(() => {
        getPostsDetails(postId).then(res => {
            const chosenPost = res[0]
            setNewPost(chosenPost)
        })
    }, [])

    useEffect(() => {
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(newPost.cityName)}`)
        .then((res) => res.json())
        .then((data) => {
            const cityData = data[0]
            {
                newPost.lat = cityData.lat
                newPost.lon = cityData.lon
            }
    })}, [newPost])

    const updatingPost = (event) => {
        event.preventDefault()
            if (!newPost.cityName || !newPost.title || !newPost.description) {
                alert("Please fill out all forms to make a post")
                return
            }
            const post = {
                id: postId,
                lat:newPost.lat,
                lon:newPost.lon,
                cityName: newPost.cityName,
                geocode: [parseFloat(newPost.lat), parseFloat(newPost.lon)],
                title: newPost.title,
                description: newPost.description,
            }
                updatePosts(post).then(() => {
                navigate(`/posts`)   
            })}

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
                        <label className="text-color-primary">Description: </label>
                        <input type="text"
                                className="button-primary text-color-primary h-5"
                                 value={newPost.description} onChange={(events) => {
                                const copy = {...newPost}
                                copy.description = events.target.value
                                setNewPost(copy)}}/>
                                <EditFilter newPost={newPost} setNewPost={setNewPost} />                 
                    </div>
                    <button className="w-35 mt-22 rounded-lg h-8 button-primary text-color-primary cursor-pointer" onClick={updatingPost}>Save </button>
                </fieldset>
            </form>
        </div>
    )
}