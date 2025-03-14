import { useEffect, useState } from "react"
import {  useNavigate, useParams } from "react-router-dom"
import { deletePost, getPostsDetails } from "../../services/postService"

export const PostDetails = ({currentUser}) => {
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
        <div className="w-full h-screen flex  items-center justify-center">
            <div className="flex flex-col  pb-10">
                <section className=" flex justify-between">
                    <h1>{PostDetail.user?.fullName}</h1>
                    <h1>{PostDetail.title}</h1>          
                </section>
                    <p className="items-center p-15">{PostDetail.description}</p>
                    {currentUser.id !== PostDetail.user?.id
                        ? <footer className="flex justify-between">
                            <p>{PostDetail.city?.city}</p>
                            <p>{PostDetail.date}</p> 
                            </footer>
                        : <footer className="flex flex-col text-l p-2">
                            <div className="flex justify-between">
                                <p>{PostDetail.city?.city}</p>
                                <p>{PostDetail.date}</p> 
                                <button className="cursor-pointer" onClick={() => {navigate("edit")}}>Edit</button> 
                            </div>
                            <div className="flex items-center justify-center pt-8 font-bold">
                                <button className="cursor-pointer" value={PostDetail.id} onClick={(event) => HandleDelete(event.target.value)}>Delete</button>
                            </div>
                        </footer>}
            </div>
        </div>
    )
}