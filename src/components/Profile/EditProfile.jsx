import { useEffect, useState } from "react"
import { deleteProfile, GetEditProfile, updateUser } from "../../services/userService"
import { useNavigate } from "react-router-dom"

export const EditProfile = ({currentUser}) => {
    const Navigate = useNavigate()
    const [profile, setProfile] = useState({})
    useEffect(() => {
        GetEditProfile(currentUser.id).then(data => {
            const currentProfile = data[0]
            setProfile(currentProfile)
        })
    }, [])
    const handleUpdateName = (event) => {
            event.preventDefault()
        const updateuserProfile = {
                id: currentUser.id,
                fullName: profile.fullName 
        }

        updateUser(updateuserProfile).then(() => {
            Navigate(`/profile/${currentUser.id}`)
        })
    }
    return (
    <div className="flex pt-50 w-full ">
        <form className="flex flex-col items-center justify-center pt-20 w-full">
            <fieldset>
                <label>UserName: </label>
                <input className="bg-gray-500 text-amber-50"
                value={profile?.fullName} 
                onChange={(event) => {
                    const copy = {...profile}
                    copy.fullName = event.target.value
                    setProfile(copy)}}/>
            </fieldset>
            <div className="flex items-center pt-10">
                <button className="px-2 py-3 mx-10 bg-gray-400 cursor-pointer" onClick={(event) => handleUpdateName(event)}>Save</button>
                <button className="px-2 py-3 mx-10 bg-gray-400 cursor-pointer" onClick={() => Navigate(`/profile/${currentUser.id}`)}>Cancel</button> 
            </div>
            <footer className="w-full flex items-center justify-center pt-10">
                <button  className="px-2 py-3 bg-gray-400 cursor-pointer" onClick={() => {
                    deleteProfile(currentUser.id)
                    localStorage.removeItem("user")
                    }}>Delete Profile</button>                
            </footer>
        </form>
    </div>
    )
}