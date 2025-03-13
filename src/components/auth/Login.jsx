import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "../../App.css"
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
    <main className="flex flex-col h-screen bg-main-color">
      <section className="flex w-full flex-col  justify-center items-center min-h-3/4">
        <form className="flex flex-col card-color-secondary w-full h-6/12 p-5" onSubmit={handleLogin}>
          <h1 className="flex items-start justify-center text-5xl  text-color-primary p-2">Globe Trek</h1>
          <h2 className="flex justify-center text-1xl text-color-secondary font-bold ">Please sign in</h2>
          <fieldset className="flex flex-col items-center p-4"> 
              <input
                type="email"
                value={email}
                className="flex secondary-color w-fit"
                onChange={(evt) => set(evt.target.value)}
                placeholder="Email address"
                required
                autoFocus
              />
          </fieldset>
          <fieldset className="flex flex-col items-center">
              <button className="button-primary" type="submit">Log In</button>
          </fieldset>
        </form>
      </section>
      <section className="flex items-center justify-center">
        <Link className="button-secondary" to="/register">Not a user? Register Here</Link>
      </section>
    </main>
  )
}

