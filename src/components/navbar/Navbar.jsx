import { Link } from "react-router-dom"

export const Navbar = () => {
    return (
        <nav>
            <ul className="bg-main-color flex justify-evenly text-color-primary p-4">
                <Link to={"/home"}><li>Home</li></Link>
                <Link to={"/posts"}><li>Posts</li></Link>
                <Link to={"/notes"}><li>Notes</li></Link>
                <Link to={"/profile"}><li>Profile</li></Link>
                {localStorage.getItem("user") ? (
                <Link to="" onClick={() => {
                    localStorage.removeItem("user")
                    navigate("/login", { replace: true })
                    }}><li>Logout</li>
                </Link> ) : ("")}
            </ul>
        </nav>
    )
}