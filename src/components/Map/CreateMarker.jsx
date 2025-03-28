import { createPost } from "../../services/postService"
import { Filter } from "../Filter/Filter"
import {NewPostContext} from "../../context/NewPostContext"  
import { UseCurrentUser } from "../../context/CurrentUserContext"
import { Images } from "../Images/Images"
import { useState } from "react"

export const CreateMarker = ({onClose}) => {
            const { currentUser } = UseCurrentUser()
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
                                lat: cityData.lat,
                                lon: cityData.lon,
                                geocode: [parseFloat(cityData.lat), parseFloat(cityData.lon)],
                                title: newPost.title,
                                description: newPost.description,
                                popup: `Marker at ${newPost.cityName}`,
                                date: currentDate,
                                photoUrl: photoUrl
                            }
            
                            createPost(post).then(() => {
                                photoUrl('')
                                updatePost({userId: 0, cityName: '', lon: 0, lat: 0, geocode: [0, 0], title: '', description: '', popup: '', date: 0, photoUrl: '' })
                                onClose
                            })}})}
            
            return (
                <div className="w-full flex items-center justify-center pt-50">
                    <form className="flex z-10000  bg-main-color p-10">
                        <fieldset>
                            <section>
                                <label className="text-color-primary">Title: </label>
                                <input className="button-primary" value={newPost.title}
                                    onChange={(event) => updatePost({ title: event.target.value })}
                                    />
                            </section>
                            <section>
                                <label className="text-color-primary">Description:</label>
                                <input className="button-primary" value={newPost.description}
                                    onChange={(event) => updatePost({ description: event.target.value })}
                                    />
                            </section>
                            <Filter newPost={newPost} />
                            <Images photoUrl={photoUrl} setPhotoUrl={setPhotoUrl}/>
                            <div className="flex justify-between pt-4">
                                <button className="button-primary p-2 cursor-pointer" onClick={AddNewPost}>Create Post</button>
                                <button className="button-primary p-2 cursor-pointer" onClick={() =>  {
                                    photoUrl('')
                                    updatePost({userId: 0, cityName: '', lon: 0, lat: 0, geocode: [0, 0], title: '', description: '', popup: '', date: 0 })
                                    onClose
                                }}>Cancel</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            )
        }
