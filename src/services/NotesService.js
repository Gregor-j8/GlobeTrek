export const GetUserNotes = (userId) => {
    return fetch(`http://localhost:8088/notes?userId=${userId}`).then((res) => res.json())
  }

  export const updateNotes = async(note) => {
    return fetch(`http://localhost:8088/notes/${note.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      }).then((res) => res.json())}

      export const deleteNotes = (id) => {
        return fetch(`http://localhost:8088/notes/${id}`, {
          method: "DELETE",
        })};