import { useEffect, useState } from "react"
import { deleteProfile, GetEditProfile, updateUser } from "../../services/userService"
import { useNavigate } from "react-router-dom"
import { UseCurrentUser } from "../../context/CurrentUserContext"
import { Images } from "../Images/Images"

export const EditProfile = () => {
    const { currentUser } = UseCurrentUser()
    const Navigate = useNavigate()
    const [profile, setProfile] = useState({})
    const [photoUrl, setPhotoUrl] = useState('')
    useEffect(() => {
        GetEditProfile(currentUser.id).then(data => {
            const currentProfile = data[0]
            setProfile(currentProfile)
        })
    }, [currentUser])
    const handleUpdateName = (event) => {
            event.preventDefault()
            if (!profile.fullName || photoUrl === '') {
                return 
            } else {
            const updateuserProfile = {
                id: currentUser.id,
                fullName: profile.fullName, 
                photoUrl: photoUrl
        }
        updateUser(updateuserProfile).then(() => {
            Navigate(`/profile/${currentUser.id}`)
        })
    }
            }

    return (
    <div className="flex pt-40 w-full ">
        <form className="flex flex-col items-center justify-center pt-20 pb-5 mx-10 w-full bg-main-card">
            <fieldset>
                <h1 className="flex text-color-primary text-4xl justify-center pb-10">Edit Profile</h1>
                <label className="text-color-primary">UserName: </label>
                <input className="button-primary text-color-primary"
                value={profile?.fullName} 
                onChange={(event) => {
                    const copy = {...profile}
                    copy.fullName = event.target.value
                    setProfile(copy)}}/>
            </fieldset>
            <Images setPhotoUrl={setPhotoUrl}/>
            <div className="flex items-center pt-10">
                <button className="text-color-primary px-2 py-3 mx-10 button-primary cursor-pointer" onClick={(event) => handleUpdateName(event)}>Save</button>
                <button className="text-color-primary px-2 py-3 mx-10 button-primary cursor-pointer" onClick={() => Navigate(`/profile/${currentUser.id}`)}>Cancel</button> 
            </div>
            <footer className="text-color-primary w-full flex items-center justify-center pt-10">
                <button  className="px-2 py-3 button-primary cursor-pointer" onClick={() => {
                    deleteProfile(currentUser.id)
                    localStorage.removeItem("user")
                    }}>Delete Profile</button>                
            </footer>
        </form>
    </div>
    )
}