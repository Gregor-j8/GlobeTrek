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
            <form className="flex flex-col h-5/7 items-center px-10 mx-5 justify-center bg-main-card">
                <fieldset>
                    <div className='p-1 flex flex-col'>
                        <label className="text-color-primary p-1">Title </label>
                        <textarea
                            type="text"
                            className="button-primary text-color-primary w-90"
                            value={editPost.title}
                            onChange={(event) => updateEditPost({ ...editPost, title: event.target.value })}
                        />
                    </div>
                    <div className='p-1 flex flex-col'>
                        <label htmlFor="textarea" className="text-color-primary p-1 ">Description </label>
                        <textarea
                            type="text"
                            className="button-primary w-90 text-color-primary"
                            value={editPost.description}
                            onChange={(event) => updateEditPost({ ...editPost, description: event.target.value })}
                            rows={5}
                        />
                        <div className='pt-2'>
                        <EditFilter newPost={editPost} setNewPost={updateEditPost} />
                        </div>
                        <EditImages setImage={setImage}/>
                    </div>
                    <div className='flex justify-around pb-3'>
                        <button className="w-35 mt-12 rounded-lg h-8 button-primary text-color-primary cursor-pointer" onClick={updatingPost}>
                            Save
                        </button>
                        <button className="w-35 mt-12 rounded-lg h-8 button-primary text-color-primary cursor-pointer" onClick={() => {navigate("/posts")}}>
                            Cancel
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}
