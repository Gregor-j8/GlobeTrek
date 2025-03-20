import { useEffect } from "react"
import { useEditPost } from "../../context/EditPostContext"
import { EditFilter } from "../Filter/EditFilter"
import { deletePost, updatePosts } from "../../services/postService"

export const MapModal = ({ marker, onClose }) => {
  const { editPost, updateEditPost, handleSave } = useEditPost()
    useEffect(() => {
        if (marker && marker.id !== editPost.id) {
            updateEditPost(marker)
        }
    }, [marker, editPost.id]) 

const onSave = (event) => {
    event.preventDefault()
    handleSave(updatePosts)
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
                        value={editPost.title || ""}
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
                        value={editPost.description || ""}
                        onChange={(event) =>
                            updateEditPost({ description: event.target.value })
                        }
                    />
                </div>
                <EditFilter newPost={editPost} setNewPost={updateEditPost} />
                <button className="button-primary" onClick={onSave}>
                    Save
                </button>                
                <button className="button-primary" onClick={onClose}>
                    Cancel
                </button>
                <button className="button-primary" onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </div>
    )
}
