export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/users?email=${email}`).then((res) => res.json())
}
export const GetUserById = (userId) => {
  return fetch(`http://localhost:8088/users?id=${userId}`).then((res) => res.json())
}
export const GetUserProfile = (userId) => {
  return fetch(`http://localhost:8088/users?id=${userId}`).then((res) => res.json())
}
export const GetEditProfile = (userId) => {
  return fetch(`http://localhost:8088/users?id=${userId}`).then((res) => res.json())
}

export const createUser = (user) => {
  return fetch("http://localhost:8088/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json())
}

export const updateUser = (user) => {
  return fetch(`http://localhost:8088/users/${user.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json())
}
export const deleteProfile = (userId) => {
  return fetch(`http://localhost:8088/users/${userId}`, {
    method: "Delete",
  }).then((res) => res.json())
}
