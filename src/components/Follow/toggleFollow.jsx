import { useEffect, useState } from "react"

export const ToggleFollow = ({bool}) => {
    const [isFollowing, setIsFollowing] = useState(false)
    useEffect(() => {
        setIsFollowing(bool)
    }, [bool])

    return (isFollowing ? "unfollow" : "follow")
}