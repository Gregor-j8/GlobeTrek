import { useEffect, useState } from "react"
import { GetUserById } from "../../services/userService"
import { Globe } from "../../Documents/Globe"
import { UseCurrentUser } from "../../context/CurrentUserContext"
export const Home = () => {
    const { currentUser } = UseCurrentUser()
    const [user, setUser] = useState({})
    useEffect(() => {
        GetUserById(currentUser?.id).then(res => {
            const userData = res[0]
            setUser(userData)
        })
    }, [currentUser])

    return (
        <div className="w-full">
            <div className=" flex flex-col items-center pt-16">
                <h1 className="pt-5 pb-10 text-2xl text-color-primary">Welcome {user?.fullName}</h1>
                <section>
                    <video loop autoPlay muted width="900" src={Globe()}></video>
                </section>
            </div>
        </div>
    )
}
