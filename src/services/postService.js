export const getPosts = () => {
    return fetch(`http://localhost:8088/posts?_expand=user&_expand=city`).then((res) => res.json())
  }

  export const deletePost = (id) => {
    return fetch(`http://localhost:8088/posts/${id}`, {
      method: "DELETE",
    })};

export const getPostsDetails = (postId) => {
    return fetch(`http://localhost:8088/posts?id=${postId}&_expand=user&_expand=city`).then((res) => res.json())
  }