import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deleteNotes, GetUserNotes, updateNotes } from "../../services/NotesService"

export const EditNotes = () => {
    const navigate = useNavigate()
    const { notesId } = useParams()
    const [editNotes, setEditNotes] = useState({ toVisit: "", toDoList: "" })

    useEffect(() => {
        GetUserNotes(notesId).then(res => {
            const notes = res[0]
            setEditNotes(notes)
        })
    }, [notesId])

    const handleUpdateNotes = (event) => {
        event.preventDefault()
        if (!editNotes.toVisit || !editNotes.toDoList) {
            alert("Please fill out all fields to make a note.")
            return
        }
        const note = {
            id: notesId,
            ...editNotes
        }
        updateNotes(note).then(() => navigate("/notes"))
    }

    return (
        <div className="flex items-center justify-center w-full h-screen">
            <form className="flex flex-col h-2/5 items-center w-full mx-5 justify-center bg-main-card">
                <fieldset>
                    <div>
                        <label className="text-color-primary">City To Visit: </label>
                        <input type="text" className="button-primary text-color-primary" value={editNotes.toVisit}
                            onChange={(event) => setEditNotes({ ...editNotes, toVisit: event.target.value })}/>
                    </div>
                    <div>
                        <label className="text-color-primary">To-Do List: </label>
                        <input type="text" className="button-primary text-color-primary h-5"value={editNotes.toDoList} 
                            onChange={(event) => setEditNotes({ ...editNotes, toDoList: event.target.value })}/>
                    </div>
                    <button 
                        className="w-35 mt-22 rounded-lg h-8 button-primary text-color-primary cursor-pointer" 
                        onClick={handleUpdateNotes}>Save</button>
                    <button  className="w-35 mt-22 rounded-lg h-8 button-primary text-color-primary cursor-pointer" 
                        onClick={() => {navigate("/notes")}}>Cancel</button>
                    <button className="w-35 mt-22 rounded-lg h-8 button-primary text-color-primary cursor-pointer" 
                        onClick={() => {deleteNotes(editNotes.id).then(() => navigate("/notes"))}}>Delete</button>
                </fieldset>
            </form>
        </div>
    )}
