import { useEffect, useState } from "react"
import { useEditPost } from "../../context/EditPostContext"
import { EditFilter } from "../Filter/EditFilter"
import { deletePost } from "../../services/postService"
import { EditImages } from "../Images/EditImages"

export const MapModal = ({ marker, onClose, setIsModalOpen }) => {
    const { editPost, updateEditPost, handleSave } = useEditPost()
    const [image, setImage] = useState('')

    useEffect(() => {
        if(image !== '') {
            updateEditPost({
                photoUrl: image
            })}
    }, [image])
  
    useEffect(() => {
        if (marker && marker.id !== editPost.id) {
            updateEditPost(marker)
        }
    }, [marker, updateEditPost ,editPost.id]) 

const onSave = (event) => {
    event.preventDefault()
    handleSave().then(() => {
        setIsModalOpen(false)
    })
}

    const handleDelete = () => {
        deletePost(editPost.id)
    }
    
    return (
        <div className="fixed inset-0 flex items-center justify-center z-10000 bg-opacity-50">
            <div className="bg-white p-5 rounded-lg shadow-lg">
                <h2>Edit Post</h2>
                <div>
                    <label>Title: </label>
                    <input
                        className="button-primary"
                        type="text"
                        value={editPost.title}
                        onChange={(event) =>
                            updateEditPost({ title: event.target.value })
                        }
                    />
                </div>
                <div>
                    <label>Description: </label>
                    <input
                        className="button-primary"
                        type="text"
                        value={editPost.description}
                        onChange={(event) =>
                            updateEditPost({ description: event.target.value })
                        }
                    />
                </div>
                <EditFilter newPost={editPost} setNewPost={updateEditPost} />
                <EditImages setImage={setImage} />
                 <div className="flex justify-around p-2">
                    <button className="button-primary p-2 rounded-lg" onClick={onSave}>
                        Save
                    </button>                
                    <button className="button-primary p-2 rounded-lg" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="button-primary p-2 rounded-lg" onClick={handleDelete}>
                        Delete
                    </button>                    
                 </div>

            </div>
        </div>
    )
}
