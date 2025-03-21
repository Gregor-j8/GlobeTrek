import { useEffect, useState } from "react"
import {  Link, useNavigate, useParams } from "react-router-dom"
import { deletePost, getPostsDetails } from "../../services/postService"
import { UseCurrentUser } from "../../context/CurrentUserContext"

export const PostDetails = () => {
    const { currentUser } = UseCurrentUser()
    const navigate = useNavigate()
    const { postId } = useParams()
    const [PostDetail, setPostDetail] = useState({})

    useEffect(() => {
        getPostsDetails(postId).then(data => {
            const post = data[0]
            setPostDetail(post)
        })}, [postId])

        const HandleDelete = (id) => {
            deletePost(id).then(() => {
               navigate("/posts") 
            })
        }

    return (
        <div className="w-full h-screen flex  items-center justify-center ">
            <div className="flex flex-col bg-main-card p-10">
                <section className=" flex justify-between">
                    <Link to={`/profile/${PostDetail?.user?.id}`}>
                        <h1 className="text-color-primary">{PostDetail.user?.fullName}</h1>
                    </Link> 
                    <h2 className="text-color-primary">{PostDetail.title}</h2>          
                </section>
                    <p className="items-center text-color-primary p-15">{PostDetail.description}</p>
                    {currentUser.id !== PostDetail.user?.id
                        ? <footer className="flex justify-between">
                            <p className="text-color-primary">{PostDetail.date}</p> 
                            </footer>
                        : <footer className="flex  flex-col text-l p-2">
                            <div className="flex justify-between">
                                <p className="text-color-primary">{PostDetail.date}</p> 
                                <button className="cursor-pointer text-color-primary p-2 button-primary" onClick={() => {navigate("edit")}}>Edit</button> 
                            </div>
                            <div className="flex items-center justify-center pt-8 font-bold">
                                <button className="button-primary cursor-pointer p-2 text-color-primary" value={PostDetail.id} onClick={(event) => HandleDelete(event.target.value)}>Delete</button>
                            </div>
                        </footer>}
            </div>
        </div>
    )
}