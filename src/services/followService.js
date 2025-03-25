export const GetFollowering = (userId) => {
    return fetch(`http://localhost:8088/followRelationships?userId=${userId}&_expand=follow&_expand=user`).then((res) => res.json())
}
export const GetFollowers = (userId) => {
    return fetch(`http://localhost:8088/followRelationships?followId=${userId}&_expand=follow&_expand=user`).then((res) => res.json())
}
export const GetAllFollowing = () => {
    return fetch(`http://localhost:8088/followRelationships`).then((res) => res.json())
}

export const FollowUser = async(follow) => {
    return fetch(`http://localhost:8088/followRelationships`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(follow),
      }).then((res) => res.json())}

      export const deleteFollow = (id) => {
        return fetch(`http://localhost:8088/followRelationships/${id}`, {
          method: "DELETE",
        })}