import { useEffect, useState } from "react"
import { deleteFollow, FollowUser, GetAllFollowing, GetFollowering, GetFollowers } from "../../services/followService"
import { FollowerModal } from "./FollowerModal"
import { FollowingModal } from "./FollowingModal"
import { GetUserById } from "../../services/userService"
import { UseCurrentUser } from "../../context/CurrentUserContext"

export const Follow = ({userId}) => {
   const { currentUser} = UseCurrentUser()
    const [follower, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    const [filteringFollowers, setfilteringFollowers] = useState([])
    const [UserId, setUserId] = useState([])
    const [isFollowerModalOpen, setIsFollowerModalOpen] = useState(false)
    const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false)
    const [isfollowing, setIsFollowing] = useState(false)

    useEffect(() => {
        GetFollowers(userId).then(data => {
            setFollowers(data)
        })
    }, [userId])
    useEffect(() => {
        GetAllFollowing().then(data => {
            setfilteringFollowers(data)
        })
    }, [following])

    useEffect(() => {
        GetFollowering(userId).then(data => {
            setUserId(data)
        })
    }, [userId])

    useEffect(() => {
        const getUser = async () => {
                const userPromises = UserId.map(id =>
                    GetUserById(id.follow.userId).then())
                const userData = await Promise.all(userPromises)
                setFollowing(userData.flat())
            } 
            getUser()
    }, [UserId])

    useEffect(() => {
        const checkFollowingStatus = () => {
            const isCurrentlyFollowing = filteringFollowers.some(
                follow => follow.userId === currentUser.id && follow.followId === parseInt(userId))
            setIsFollowing(isCurrentlyFollowing)
        }
        checkFollowingStatus()
    }, [filteringFollowers, userId, currentUser.id])
    
    const SaveFollow = (checkID, event) => {
        event.preventDefault()
        const isAlreadyFollowing = filteringFollowers.find(follow => 
            follow.userId == currentUser.id && follow.followId === parseInt(checkID))
        if (isAlreadyFollowing) {
            deleteFollow(isAlreadyFollowing.id)
        } else {
            if(currentUser.id == parseInt(checkID)) {
                alert("You can not follow yourself")
            } else {
                FollowUser({
                    userId: currentUser.id,
                    followId: parseInt(checkID),
                })  
            }
        }
    }
    
    return (
        <div className="flex flex-col">
            <section className="flex">
                <div className="flex flex-col m-2">
                    <button className="cursor-pointer" onClick={() => {setIsFollowerModalOpen(true)}}>Followers</button>
                    <p className="flex justify-center">{follower.length}</p>                
                </div>
                <div className="flex flex-col m-2">
                    <button className="cursor-pointer" onClick={() => {setIsFollowingModalOpen(true)}}>Following</button>
                    <p className="flex justify-center">{following.length}</p>                     
                </div>
            </section>
           <button className="cursor-pointer bg-amber-400" value={userId} onClick={(event) => {
            SaveFollow(event.target.value, event)}}>
            {isfollowing ? "unfollow" : "follow"}</button>         
           {isFollowerModalOpen && (
                      <FollowerModal
                        isOpen={isFollowerModalOpen} 
                        onClose={() => setIsFollowerModalOpen(false)} 
                        follower={follower}
                      />
                    )} 
           {isFollowingModalOpen && (
                      <FollowingModal
                        isOpen={isFollowingModalOpen} 
                        onClose={() => setIsFollowingModalOpen(false)} 
                        following={following}
                      />
                    )} 
        </div>
    )
}