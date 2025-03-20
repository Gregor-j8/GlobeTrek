import { createContext, useContext, useState } from 'react';

const EditPostContext = createContext();

export const EditPostProvider = ({ children }) => {
    const [editPost, setEditPost] = useState({});

    const updateEditPost = (updatedPost) => {
        setEditPost((prevPost) => ({
            ...prevPost,
            ...updatedPost,
        }));
    };

    const handleSave = async (event, updatePosts) => {
        event.preventDefault();

        if (editPost.cityName) {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(editPost.cityName)}`
                )
                const data = await response.json()
                if (data[0]?.lat && data[0]?.lon) {
                    setEditPost((prevPost) => {
                        const updatedPost = {
                            ...prevPost,
                            lat: data[0].lat,
                            lon: data[0].lon,
                            geocode: [parseFloat(data[0].lat), parseFloat(data[0].lon)],
                        }

                        setTimeout(() => {
                            updatePosts(updatedPost)
                        }, 100)

                        return updatedPost
                    })}}}

    return (
        <EditPostContext.Provider value={{ editPost, updateEditPost, handleSave }}>
            {children}
        </EditPostContext.Provider>
    );
};

export const useEditPost = () => {
    return useContext(EditPostContext);
};
