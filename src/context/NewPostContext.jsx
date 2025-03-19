import React, { createContext, useState, useContext } from 'react';

const PostContext = createContext();

export const NewPostContext = () => {
  return useContext(PostContext)
}

export const NewPostHolder = ({ children }) => {
  const [newPost, setNewPost] = useState({
    userId: 0,
    cityName: '',
    lon: 0,
    lat: 0,
    geocode: [0, 0],
    title: '',
    description: '',
    popup: '',
    date: 0
  })

  const updatePost = (updatedPost) => {
    setNewPost((prevPost) => ({ ...prevPost, ...updatedPost }))
  }

  return (
    <PostContext.Provider value={{ newPost, updatePost }}>
      {children}
    </PostContext.Provider>
  )
}
