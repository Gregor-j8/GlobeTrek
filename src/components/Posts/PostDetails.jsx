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
        <div className="w-full h-screen flex items-center justify-center ">
            <div className="flex w-2/5 flex-col bg-main-card p-8">
                <section className=" flex justify-around">
                    <Link to={`/profile/${PostDetail?.user?.id}`}>
                        <h1 className="text-color-primary">{PostDetail.user?.fullName}</h1>
                    </Link> 
                    <h2 className="text-color-primary">{PostDetail.title}</h2>          
                </section>
                <div className="flex flex-col items-center">
                    <p className="items-center text-color-primary p-15">{PostDetail.description}</p>
                    <img alt={"user image"} src={`${PostDetail.photoUrl}`} className="w-3/4 pb-4 items-center justify-center text-color-primary"/>                 
                </div>

                    {currentUser.id !== PostDetail.user?.id
                        ? <footer className="flex justify-around">
                            <p className="text-color-primary">{PostDetail.date}</p>
                                <button className="button-primary rounded-lg p-2" onClick={() => {navigate("/posts")}}>Return</button>
                            </footer>
                        : <footer className="flex  flex-col text-l p-2">
                            <div className="flex justify-between">
                                <p className="text-color-primary">{PostDetail.date}</p> 
                            </div>
                            <div className="flex items-center justify-around pt-8 font-bold">
                                <button className="cursor-pointer rounded-lg text-color-primary p-2 button-primary" onClick={() => {navigate("edit")}}>Edit</button> 
                                <button className="button-primary rounded-lg p-2" onClick={() => {navigate("/posts")}}>Return</button>
                                <button className="button-primary rounded-lg cursor-pointer p-2 text-color-primary" value={PostDetail.id} onClick={(event) => HandleDelete(event.target.value)}>Delete</button>
                            </div>
                        </footer>}
            </div>
        </div>
    )
}