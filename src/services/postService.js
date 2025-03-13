export const getPosts = () => {
    return fetch(`http://localhost:8088/posts?_expand=user&_expand=city`).then((res) => res.json())
  }