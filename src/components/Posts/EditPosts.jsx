import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostsDetails, updatePosts } from '../../services/postService';
import { EditFilter } from '../Filter/EditFilter';
import { useEditPost } from '../../context/EditPostContext';

export const EditPosts = () => {
    const navigate = useNavigate()
    const { postId } = useParams()
    const { editPost, updateEditPost } = useEditPost()

    useEffect(() => {
        getPostsDetails(postId).then(res => {
            const chosenPost = res[0]
            updateEditPost(chosenPost)
        });
    }, []);

    useEffect(() => {
        if (editPost.cityName) {
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(editPost.cityName)}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data[0]) {
                        updateEditPost({
                            lat: data[0].lat,
                            lon: data[0].lon,
                            geocode: [parseFloat(data[0].lat), parseFloat(data[0].lon)],
                        })
                    }
                })
        }
    }, []);

    const updatingPost = (event) => {
        event.preventDefault()
        if (!editPost.cityName || !editPost.title || !editPost.description) {
            alert('Please fill out all forms to make a post');
            return;
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
                            onChange={(event) => updateEditPost({ title: event.target.value })}
                        />
                    </div>
                    <div>
                        <label className="text-color-primary">Description: </label>
                        <input
                            type="text"
                            className="button-primary text-color-primary h-5"
                            value={editPost.description || ''}
                            onChange={(event) => updateEditPost({ description: event.target.value })}
                        />
                        <EditFilter newPost={editPost} setNewPost={updateEditPost} />
                    </div>
                    <button className="w-35 mt-22 rounded-lg h-8 button-primary text-color-primary cursor-pointer" onClick={updatingPost}>
                        Save
                    </button>
                </fieldset>
            </form>
        </div>
    )
}
