import { useNavigate } from "react-router-dom"
import { createPost } from "../../services/postService"
import { Filter } from "../Filter/Filter"
import {NewPostContext} from "../../context/NewPostContext"
import { UseCurrentUser } from "../../context/CurrentUserContext"
import { Images } from "../Images/Images"
import { useState } from "react"

export const NewPost = () => {
    const { currentUser } = UseCurrentUser()
    const navigate = useNavigate()
    const { newPost, updatePost } = NewPostContext()
    const [photoUrl, setPhotoUrl] = useState('')

    const AddNewPost = (event) => {
        event.preventDefault()
        const currentDate = new Date().toLocaleDateString()
    
        if (!newPost.cityName || !newPost.title || !newPost.description || !photoUrl) {
            alert("Please fill out all forms to make a post")
            return
        }
    
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(`${newPost.cityName}`)}`, {
            headers: {
              'User-Agent': 'GlobeTrek/1.0 (Gregor.johnson028@gmail.com)'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                const cityData = data[0]
                if (cityData) {
                    const post = {
                        userId: currentUser.id,
                        cityName: newPost.cityName,
                        geocode: [parseFloat(cityData.lat), parseFloat(cityData.lon)],
                        title: newPost.title,
                        description: newPost.description,
                        popup: `Marker at ${newPost.cityName}`,
                        date: currentDate,
                        photoUrl: photoUrl
                    }
    
                    createPost(post).then(() => {
                        photoUrl('')
                        updatePost({userId: 0, cityName: '', lon: 0, lat: 0, geocode: [0, 0], title: '', description: '', popup: '', date: 0 })
                        navigate("/home")
                    })}})}

    return (
        <div className="w-full flex items-center z-150 justify-center p-40">
            <form className="flex items-start bg-main-color p-10">
                <fieldset>
                    <section className="flex flex-col">
                        <label className="text-color-primary">Title </label>
                        <textarea rows={2} className="button-primary w-90" value={newPost.title}
                            onChange={(event) => updatePost({ title: event.target.value })}
                            />
                    </section>
                    <section className="flex flex-col pt-5">
                        <label className="text-color-primary">Description:</label>
                        <textarea rows={5} className="button-primary w-90" value={newPost.description}
                            onChange={(event) => updatePost({ description: event.target.value })}
                            />
                    </section>
                    <div className="pt-3">
                    <Filter newPost={newPost} />
                    </div>
                    <div className="pb-3">
                        <Images photoUrl={photoUrl} setPhotoUrl={setPhotoUrl}/>
                    </div>
                    <div className="flex justify-between">
                        <button className="button-primary p-2 cursor-pointer" onClick={AddNewPost}>Create Post</button>
                        <button className="button-primary p-2 cursor-pointer" onClick={() =>  {
                            navigate("/posts")
                            setPhotoUrl('')
                            updatePost({userId: 0, cityName: '', lon: 0, lat: 0, geocode: [0, 0], title: '', description: '', popup: '', date: 0 })
                        }}>Cancel</button>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}