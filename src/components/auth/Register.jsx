import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../../App.css"
import { createUser, getUserByEmail } from "../../services/userService"

export const Register = (props) => {
  const [user, setUser] = useState({
    email: "",
    fullName: "",
  })
  let navigate = useNavigate()

  const registerNewUser = () => {
    const newUser = {
      ...user,
    }

    createUser(newUser).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: createdUser.id,
          })
        )
        navigate("/")
      }
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        window.alert("Account with that email address already exists")
      } else {
        registerNewUser()
      }
    })
  }

  const updateUser = (evt) => {
    const copy = { ...user }
    copy[evt.target.id] = evt.target.value
    setUser(copy)
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-main-color">
      <form className="flex flex-col items-center justify-center card-color-secondary w-full h-6/12 p-5" onSubmit={handleRegister}>
        <h1 className="flex items-start justify-center text-5xl  text-color-primary p-2">Globe Trek</h1>
        <h2 className="flex justify-center text-1xl text-color-secondary font-bold ">Please Register</h2>
        <fieldset className="flex flex-col items-center p-4">
          <div>
            <input onChange={updateUser} type="text" id="fullName"
              className="flex secondary-color w-fit"
              placeholder="Enter your UserName" required autoFocus
            />
          </div>
        </fieldset>
        <fieldset className="flex flex-col items-center p-4">
          <div>
            <input onChange={updateUser} type="email" id="email"
              className="flex secondary-color w-fit" placeholder="Email address" required/>
          </div>
        </fieldset>
        <fieldset className="flex flex-col items-center p-4">
          <div><button className="main-colors" type="submit">Register</button></div>
        </fieldset>
      </form>
    </main>
  )
}
