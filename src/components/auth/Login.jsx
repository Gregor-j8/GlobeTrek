import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { getUserByEmail } from "../../services/userService"

export const Login = () => {
  const [email, set] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    return getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0]
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: user.id,
          })
        )
        navigate("/")
      } else {
        window.alert("Invalid login")
      }
    })
  }

  return (
  <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <h1 className="font-bold text-center text-2xl mb-5 text-white">GlobeTrek</h1>
      <div className="flex flex-col p-10 w-full min-w-[200px] lg:w-1/3  mx-auto">
      <form className="bg-white shadow w-full rounded-lg items-center" onSubmit={handleLogin}>
        <fieldset className="flex px-5 py-7">
          <label className="font-semibold  text-gray-600 pb-2 mt-1 mr-2">E-mail:</label>
          <input type="email"
                  value={email}
                  className="flex mb-1 w-fit border-2"
                  onChange={(evt) => set(evt.target.value)}
                  placeholder="Email address"
                  required
                />
            </fieldset>     
            <div className="flex items-center justify-center m-3 ">
          <button type="submit"
          className="flex bg-blue-500 hover:bg-blue-600 text-white w-1/3 items-center 
          justify-center py-2.5 rounded-lg text-sm font-semibold text-center cursor-pointer">Login</button>
            </div>
        </form>
      <div className="py-5">
          <Link className="text-white" to="/register">Not a user? Register Here</Link>
        </div>
    </div>
  </div>
  )
}

