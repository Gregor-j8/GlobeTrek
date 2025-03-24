export const GetUserNotes = (userId) => {
    return fetch(`http://localhost:8088/notes?userId=${userId}`).then((res) => res.json())
  }