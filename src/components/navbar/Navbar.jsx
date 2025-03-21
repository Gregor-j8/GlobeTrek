import { Link, useNavigate } from "react-router-dom"
import { UseCurrentUser } from "../../context/CurrentUserContext"

export const Navbar = () => {
    const navigate = useNavigate()
    const { currentUser } = UseCurrentUser()
    return (
        <nav>
            <ul className="bg-main-color flex justify-evenly p-4 fixed w-full top-0">
                <Link to={"/"}><li className="text-color-primary">Home</li></Link>
                <Link to={"/posts"}><li className="text-color-primary">Posts</li></Link>
                <Link to={"/map"}><li className="text-color-primary">World Map</li></Link>
                <Link to={"/favorites"}><li className="text-color-primary">Favorites</li></Link>
                <Link to={`/profile/${currentUser.id}`}><li className="text-color-primary">Profile</li></Link>
                {localStorage.getItem("user") ? (
                <Link to="" onClick={() => {
                    localStorage.removeItem("user")
                    navigate("/login", { replace: true })
                    }}><li className="text-color-primary">Logout</li>
                </Link> ) : ("")}
            </ul>
        </nav>
    )
}