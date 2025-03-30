import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../../App.css"
import { createUser, getUserByEmail } from "../../services/userService"
import {Images} from "../Images/Images"

export const Register = () => {
  const [photoUrl, setPhotoUrl] = useState("")
  const [user, setUser] = useState({
    email: "",
    fullName: "",
  })
  let navigate = useNavigate()

  const registerNewUser = () => {
    const newUser = {
      photoUrl: photoUrl,
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
<div className="min-h-screen w-full flex flex-col items-center justify-center">
      <h1 className="font-bold text-center text-2xl mb-5 text-white">GlobeTrek</h1>  
      <h1 className="font-bold text-center text-lg mb-5 text-white">Please Register</h1>  
      <div className="flex flex-col p-10 w-full min-w-[200px] lg:w-1/3 mx-auto">
      <form className="bg-white shadow w-full rounded-lg" onSubmit={handleRegister}>
        <fieldset className="flex px-5 py-7">
          <label className="font-semibold  text-gray-600 pb-2 mt-1 mr-2">UserName:</label>
          <input onChange={updateUser} type="text" id="fullName"
              className="flex mb-1 w-fit border-2"
              placeholder="Enter your UserName" required autoFocus/>
            </fieldset>     
        <fieldset className="flex px-5 py-7">
          <label className="font-semibold  text-gray-600 pb-2 mt-1 mr-2">E-mail: </label>
          <input onChange={updateUser} type="email" id="email"
              className="flex mb-1 w-fit border-2" placeholder="Email address" required/>
              </fieldset>     
              <div>
              <Images photoUrl={photoUrl} setPhotoUrl={setPhotoUrl} />
              </div>
            <div className="flex items-center justify-center m-3 ">
            <button className="flex bg-blue-500 hover:bg-blue-600 text-white w-1/3 items-center 
          justify-center py-2.5 rounded-lg text-sm font-semibold text-center cursor-pointer" type="submit">Register</button>
            </div>
        </form>
    </div>
  </div>
  )
}

