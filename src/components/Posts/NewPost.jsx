import { useEffect, useState } from "react"
import { GetCities } from "../../services/CityServices"
import { useNavigate } from "react-router-dom"
import { createPost } from "../../services/postService"

export const NewPost = ({currentUser}) => {
    const navigate = useNavigate()
    const [cities, setCities] = useState([])
    const [newPost, setNewPost] = useState({cityId: 0, title: '', description: '',})

    useEffect(() => {
        GetCities().then(data => {
            setCities(data)
        })
    }, [])

    const AddNewPost = (event) => {
        event.preventDefault()
        const currentDate = new Date().toLocaleDateString()

        const post = {
            userId: currentUser.id,
            cityId: newPost.cityId,
            title: newPost.title,
            description: newPost.description,
            date: currentDate
        }
        if (newPost.cityId === 0 || newPost.title === '' || newPost.description === '') {
            return alert("please fill out all forms to make a post")
        } else {
            createPost(post).then(() => {
            navigate("/posts")})
        }
    }
    
    return (
    <div className="w-full flex items-center justify-center p-20">
        <form className="flex items-start bg-main-color p-10">
            <fieldset>
                <section>
                    <label className="text-color-primary">Title: </label>
                    <input className="button-primary" onChange={(event) => {
                    const copy = {...newPost}
                    copy.title = event.target.value
                    setNewPost(copy)
                    }} required/>
                </section>
                <section>
                    <label className="text-color-primary">description:</label>
                    <input className="button-primary" onChange={(event) => {
                    const copy = {...newPost}
                    copy.description = event.target.value
                    setNewPost(copy)
                    }} required/>
                </section>
                <select className="button-primary" onChange={(event) => {
                    const copy = {...newPost}
                    copy.cityId = event.target.value
                    setNewPost(copy)
                }} required>
                <option className="button-primary" value={0}>Choose A city</option>
                    {cities.map(city => {
                        return <option className="button-primary" key={city.id} value={city.id}>{city.city}</option>})}
                    </select>
                    <div className="flex justify-between">
                        <button className="button-primary p-2 cursor-pointer" onClick={(event) => AddNewPost(event)}>Create Post</button>
                        <button className="button-primary p-2 cursor-pointer" onClick={() => navigate("/posts")}>Cancel</button> 
                    </div>
            </fieldset>
        </form>
    </div>
    )
}