import { useEffect, useState } from "react"
import { Globe } from "../../Documents/Globe"
import { GetUserById } from "../../services/userService"

export const Home = ({currentUser}) => {
    const [user, setUser] = useState({})
    useEffect(() => {
        GetUserById(currentUser?.id).then(res => {
            const userData = res[0]
            setUser(userData)
        })
    }, [currentUser])

    return (
        <div className="w-full">
            <div className="mt-10 flex flex-col items-center">
                <h1 className="pt-5 pb-10 text-2xl">Welcome {user.fullName}</h1>
                <section>
                    <video loop autoPlay muted width="900" src={Globe()}></video>
                </section>
            </div>
        </div>
    )
}
