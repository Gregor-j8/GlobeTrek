import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { GetCities } from "../../services/CityServices"
import { getPostsDetails, updatePosts } from "../../services/postService"

export const EditPosts = () => {
    const navigate = useNavigate()
    const { postId } = useParams()
    const [ cities, setCities] = useState([])
    const [ newPost, setNewPost] = useState({})

    useEffect(() => {
        GetCities().then(res => {
            setCities(res)
        })
    }, [])

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
            cityId: newPost.cityId, 
        }
        console.log(AddPost)
        if (!AddPost.cityId) {
            return 
        } else {
            updatePosts(AddPost).then(() => {
                navigate(`/posts`)   
})}
}

    return (
        <div className="flex items-center justify-center w-full h-screen">
            <form className="flex flex-col h-2/5 items-center justify-center bg-main-color">
                <fieldset >
                    <div>
                        <label>Title</label>
                        <input type="text"
                        className="bg-white" value={newPost.title} onChange={(events) => {
                            const copy = {...newPost}
                            copy.title = events.target.value
                            setNewPost(copy)}}/>
                    </div>
                    <div>
                        <label>Location</label>
                        <input type="text"
                            className="bg-white" value={newPost.location} onChange={(events) => {
                            const copy = {...newPost}
                            copy.location = events.target.value
                            setNewPost(copy)}}/>                   
                    </div>
                    <div>
                        <label>Description</label>
                        <input type="text"
                                className="bg-white" value={newPost.description} onChange={(events) => {
                                const copy = {...newPost}
                                copy.description = events.target.value
                                setNewPost(copy)}}/>                      
                    </div>
                        <select onChange={(events) => {
                            const copy = {...newPost}
                            copy.cityId = parseInt(events.target.value)
                            setNewPost(copy)}}>
                        <option className=" text-black" value={0}>Choose A City</option>{cities.map(city => {
                        return <option className="text-black" value={city.id} key={city.id}>{city.city}</option>
                    })}</select> 
                    <button className="w-35 mt-22 rounded-lg h-8 bg-gray-400 cursor-pointer" onClick={updatingPost}>Save </button>
                </fieldset>
            </form>
        </div>
    )
}