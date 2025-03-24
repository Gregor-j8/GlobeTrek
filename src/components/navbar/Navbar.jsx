import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UseCurrentUser } from "../../context/CurrentUserContext"
import { LogoutIcon } from "../../Documents/LogoutIcon"
import { ProfileIcon } from "../../Documents/ProfileIcon"
import { MenuIcon } from "../../Documents/MenuIcon"

export const Navbar = () => {
const { currentUser } = UseCurrentUser()
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const logOut = () => {
        localStorage.removeItem("user") 
        navigate("/login", { replace: true })
    }

  return (
    <div className=" flex-wrap fixed top-0 place-items-center w-full z-[100000]">
      <section className="mx-auto w-full z-[100000]">
        <nav className="flex justify-between bg-gray-900 text-white w-full">
          <div className="px-5 xl:px-12 py-6 flex w-full items-center justify-between"> 
            <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
              <Link to="/"><li className="text-color-primary">Home</li></Link>
              <Link to="/posts"><li className="text-color-primary">Posts</li></Link>
              <Link to="/map"><li className="text-color-primary">World Map</li></Link>
              <Link to="/favorites"><li className="text-color-primary">Favorites</li></Link>
              <Link to="/notes"><li className="text-color-primary">Notes</li></Link>
            </ul>
            <div className="hidden xl:flex space-x-5 items-center">
              <button className="hover:text-gray-200 cursor-pointer" onClick={logOut}>
                <LogoutIcon />
              </button>
              <Link className="flex items-center hover:text-gray-200" to={`/profile/${currentUser?.id}`}>
                <ProfileIcon />
              </Link>
            </div>
            <button className="navbar-burger self-center xl:hidden" onClick={() => setIsOpen(!isOpen)}>
                <MenuIcon />
            </button>
          </div>
        </nav>
        {isOpen && (
          <div className="bg-gray-900 text-white w-full flex flex-col items-center py-4 xl:hidden">
            <Link to="/" className="py-2" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/posts" className="py-2" onClick={() => setIsOpen(false)}>Posts</Link>
            <Link to="/map" className="py-2" onClick={() => setIsOpen(false)}>World Map</Link>
            <Link to="/favorites" className="py-2" onClick={() => setIsOpen(false)}>Favorites</Link>
            <Link to={`/profile/${currentUser?.id}`} className="py-2" onClick={() => setIsOpen(false)}>Profile</Link>
            <Link to={`/notes`} className="py-2" onClick={() => setIsOpen(false)}>Notes</Link>
            {localStorage.getItem("user") ? (
              <button className="py-2" onClick={() => {
                  localStorage.removeItem("user")
                  navigate("/login", { replace: true })
                  setIsOpen(false)
                }}>Logout
              </button>
            ) : ''}
          </div>
        )}
      </section>
    </div>
  )
}