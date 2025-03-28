import React, { createContext, useState, useContext } from 'react';

const PostContext = createContext()

export const NewPostContext = () => {
  return useContext(PostContext)
}

export const NewPostHolder = ({ children }) => {
  const [newPost, setNewPost] = useState({})

  const updatePost = (updatedPost) => {
    setNewPost((prevPost) => ({ ...prevPost, ...updatedPost }))
  }

  return (
    <PostContext.Provider value={{ newPost, updatePost }}>
      {children}
    </PostContext.Provider>
  )
}
