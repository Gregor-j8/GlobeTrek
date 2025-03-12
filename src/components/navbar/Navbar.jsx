import { Link } from "react-router-dom"

export const Navbar = () => {
    return (
        <nav>
            <ul>
                <Link><li>Home</li></Link>
                <Link><li>Posts</li></Link>
                <Link><li>Notes Page</li></Link>
                <Link><li>Profile</li></Link>
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