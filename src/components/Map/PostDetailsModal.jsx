import { Navigate } from "react-router-dom"
import { UseCurrentUser } from "../../context/CurrentUserContext"
import { useEffect, useState } from "react"
import { GetUserProfile } from "../../services/userService"
import { deletePost } from "../../services/postService"

export const PostDetailsModal = ({marker, onClose, setIsModalOpen}) => {
    const { currentUser } = UseCurrentUser()
    const [ user, setUser] = useState({})

    useEffect(() => {
        GetUserProfile(marker.userId).then(data => {
            const userData = data[0]
            setUser(userData)
        })
    }, [marker.userId])

            const HandleDelete = (id) => {
                deletePost(id).then(() => {
                    onClose
                })
            }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-10000 bg-opacity-50">
            <div className="flex sm:w-4/12 flex-col bg-main-card">            
              <button className="flex justify-end text-color-primary cursor-pointer pt-1 pr-2"
              onClick={onClose}>X</button>
              <div className="pt-5"></div>
                <section className=" flex justify-between">
                        <h1 className="text-color-primary text-lg">{user.fullName}</h1>
                        <h2 className="text-color-primary text-lg">{marker.title}</h2>          
                </section>
                <div className="flex flex-col items-center">
                    <p className="items-center text-lg text-color-primary p-15">{marker.description}</p>
                    <img src={`${marker.photoUrl}`} className="w-1/2 items-center justify-center text-color-primary"/>                        
                </div>
                        {currentUser.id !== marker.userId
                            ? <footer className="flex justify-between">
                                <p className="text-color-primary text-lg">{marker.date}</p> 
                            </footer>
                                : <footer className="flex  flex-col text-l p-2">
                                    <div className="flex justify-between">
                                        <p className="text-color-primary text-lg">{marker.date}</p> 
                                        <button className="cursor-pointer rounded-lg text-color-primary mr-3 p-2 button-primary"
                                            onClick={() => {
                                                onClose
                                                setIsModalOpen(true)
                                            }}>Edit
                                        </button> 
                                    </div>
                                    <div className="flex items-center justify-center pt-8 font-bold">
                                        <button className="button-primary cursor-pointer rounded-lg mb-2 p-2 text-color-primary" value={marker.id} 
                                        onClick={(event) => {
                                            HandleDelete(event.target.value)
                                        }}
                                        >Delete</button>
                                    </div>
                            </footer>}
                    </div>
                </div>
    )
}