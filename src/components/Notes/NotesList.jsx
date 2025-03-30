import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Notes } from "./Notes"
import { UseCurrentUser } from "../../context/CurrentUserContext"
import { GetUserNotes } from "../../services/NotesService"

export const NotesList = () => {
    const {currentUser} = UseCurrentUser()
    const navigate = useNavigate()
    const [notes, setNotes] = useState([])

    useEffect(() => {
        GetUserNotes(currentUser.id).then(data => {
            setNotes(data)
        })
    }, [currentUser])

    return (
        <div className="flex flex-col items-center w-full pt-20">
            <div>
               <button className="button-primary cursor-pointer p-2 rounded-lg " onClick={() => navigate("/newnote")}>New Note</button> 
            </div>
            {notes.map(note => {
                return <Notes note={note} key={note.id}/>
            })}
        </div>
    )}