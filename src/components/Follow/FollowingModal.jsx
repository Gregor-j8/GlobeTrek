import { Link } from "react-router-dom"

export const FollowingModal = ({ following, onClose }) => {    
    return (
        <div className="fixed inset-0 flex items-center justify-center z-10000 bg-opacity-50 flex-col">
            <div className="w-1/4 bg-amber-500">
            <button onClick={onClose}>x</button>
                {following.map(follow => {
                return (
                    <div key={follow.id} >
                        <div className="bg-white p-5 rounded-lg shadow-lg">
                            <Link to={`/profile/${follow.id}`}><button className="cursor-pointer" onClick={onClose}>{follow.fullName}</button></Link>                  
                        </div>
                    </div>
                        )
                    })}  
            </div>
        </div>
    )
}