import { Link } from "react-router-dom"

export const FollowerModal = ({ follower, onClose }) => {

    return (
        <div className="fixed inset-0 flex items-center justify-center z-10000 bg-opacity-50">
            <div className="w-1/4 bg-amber-500">
                <button onClick={onClose}>x</button>
                {follower.map(follow => {
                return (
                    <div key={follow.user.id} >
                        <div className="bg-white p-5 rounded-lg shadow-lg">
                            <div >
                                <Link to={`/profile/${follow.user.id}`}><button className="cursor-pointer" onClick={onClose}>{follow.user.fullName}</button></Link>                   
                            </div>
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}