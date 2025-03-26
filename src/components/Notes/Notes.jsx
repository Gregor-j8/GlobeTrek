import { Link } from "react-router-dom"
import { Chat } from "../Chat/Chat"

export const Notes = ({note}) => {
    return (
      <div className="max-w-lg mx-auto min-w-[384px] mt-25">
            <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
                <div className="p-5">
                        <Link to={`/notes/${note.id}`}><h1 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 cursor-pointer">{note.toVisit}</h1></Link>
                    <p className="font-normal text-gray-700 mb-3">{note.toDoList}</p>
                    <Chat />
                </div>
            </div>
        </div>
    )
}