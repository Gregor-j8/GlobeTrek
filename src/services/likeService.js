export const getLikes = () => {
    return fetch(`http://localhost:8088/userLikes`).then((res) => res.json())
  }
  
  export const createUserLike = async(user) => {
    return fetch(`http://localhost:8088/userLikes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => res.json())
  }

  export const deleteUserLike = (id) => {
    return fetch(`http://localhost:8088/userLikes/${id}`, {
      method: "DELETE",
    })};
  
  