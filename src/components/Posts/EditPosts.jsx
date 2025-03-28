/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { editPosts, updatePosts } from '../../services/postService'
import { EditFilter } from '../Filter/EditFilter'
import { EditImages } from '../Images/EditImages'
import { useEditPost } from '../../context/EditPostContext'

export const EditPosts = () => {
    const navigate = useNavigate()
    const { postId } = useParams()
    const { editPost, updateEditPost } = useEditPost()
    const [geocode, setGeocode] = useState(null)
    const [image, setImage] = useState('')

    useEffect(() => {
        editPosts(postId).then(res => {
            const data = res[0]
            updateEditPost(data)
        })
    }, [postId])

    useEffect(() => {
        if (editPost.cityName) {
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(editPost.cityName)}`,
                {
                    headers: {
                        'User-Agent': 'GlobeTrek/1.0 (Gregor.johnson028@gmail.com)',
                    },
                }).then((res) => res.json())
                .then((data) => {
                    if (data[0]) {
                        setGeocode({
                            lat: parseFloat(data[0].lat),
                            lon: parseFloat(data[0].lon),
                            geocode: [parseFloat(data[0].lat), parseFloat(data[0].lon)],
                        })
                    }
                })
        }
    }, [editPost.cityName])

    useEffect(() => {
        if (geocode) {
            updateEditPost(data => ({
                ...data,
                photoUrl: image,
                lat: geocode.lat,
                lon: geocode.lon,
                geocode: geocode.geocode,
            }))
        }
    }, [geocode, image])

    const updatingPost = (event) => {
        event.preventDefault()
        if (!editPost.cityName || !editPost.title || !editPost.description) {
            alert('Please fill out all forms to make a post')
            return
        }
        const post = {
            id: postId,
            ...editPost
        }
        updatePosts(post).then(() => {
            navigate(`/posts`)
        })
    }

    return (
        <div className="flex items-center justify-center w-full h-screen">
            <form className="flex flex-col h-2/5 items-center w-full mx-5 justify-center bg-main-card">
                <fieldset>
                    <div>
                        <label className="text-color-primary">Title: </label>
                        <input
                            type="text"
                            className="button-primary text-color-primary"
                            value={editPost.title}
                            onChange={(event) => updateEditPost({ ...editPost, title: event.target.value })}
                        />
                    </div>
                    <div>
                        <label className="text-color-primary">Description: </label>
                        <input
                            type="text"
                            className="button-primary text-color-primary h-5"
                            value={editPost.description}
                            onChange={(event) => updateEditPost({ ...editPost, description: event.target.value })}
                        />
                        <EditFilter newPost={editPost} setNewPost={updateEditPost} />
                        <EditImages setImage={setImage}/>
                    </div>
                    <button className="w-35 mt-22 rounded-lg h-8 button-primary text-color-primary cursor-pointer" onClick={updatingPost}>
                        Save
                    </button>
                </fieldset>
            </form>
        </div>
    )
}
