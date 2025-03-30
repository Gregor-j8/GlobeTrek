import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteNotes, GetUserNotes, GetUserNotesDetails } from "../../services/NotesService"

export const NotesDetails = () => {
    const { notesId } = useParams()
    const navigate = useNavigate()
    const [notesDetails, setNotesDetails] = useState({})

    useEffect(() => {
        GetUserNotesDetails(notesId).then(data => {
            const post = data[0]
            setNotesDetails(post)
        })}, [notesId ])

    return (
        <div className="w-full h-screen flex  items-center justify-center ">
            <div className="flex w-2/4 flex-col bg-main-card p-10">
                <section className=" flex flex-col items-center justify-between">
                    <Link to={`/profile/${notesDetails}`}>
                        <h1 className="flex justify-center text-color-primary">{notesDetails.toVisit}</h1>
                    </Link> 
                    <h2 className="flex pt-10 text-color-primary">{notesDetails.toDoList}</h2>
                    <img src={`${notesDetails.photoUrl}`} className="flex items-center w-3/4 pt-10 text-color-primary"/>
                </section>
                    <p className="items-center text-color-primary p-7"></p>
                    <footer className="flex flex-col text-l p-2">
                        <div className="flex justify-around">
                            <button className="cursor-pointer text-color-primary p-2 button-primary" onClick={() => {navigate("edit")}}>Edit</button> 
                            <button className="cursor-pointer text-color-primary p-2 button-primary" onClick={() => {navigate("/notes")}}>return</button> 
                            <button className="button-primary cursor-pointer p-2 text-color-primary" value={notesDetails.id}
                             onClick={(event) => {deleteNotes(event.target.value).then(() => {navigate("/notes")})}}>Delete</button>
                        </div>
                    </footer>
            </div>
        </div>
    )
}