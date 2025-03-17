import { useEffect, useState } from "react";
import { GetFavoritePosts } from "../../services/likeService";
import { useLike } from "../../context/LikeContext";
import { FilledHeartIcon, UnFilledHeartIcon } from "../../Documents/Heart";
import { Link } from "react-router-dom";

export const Favorite = ({ currentUser }) => {
    const { isLiked, toggleLike } = useLike();
    const [favoritePosts, setFavoritePosts] = useState([]);

    useEffect(() => {
        GetFavoritePosts(currentUser.id).then(posts => {
            setFavoritePosts(posts);
        })}, [currentUser])

    return (
        <div className="pt-20 flex flex-col w-full items-center justify-center  text-white">
            {favoritePosts.map(post => (
                <div className="flex items-center justify-center m-4 bg-gray-700 w-1/3" key={post.post.id}>
                    <section className="flex flex-col items-center w-1/4">
                        <Link to={`/posts/${post.id}`}>
                            <h1>{post.post.title}</h1>
                        </Link>
                        <h2>{post.post.description}</h2>
                        <button onClick={() => toggleLike(post.post.id)}>
                            {isLiked(post.post.id) ? <FilledHeartIcon /> : <UnFilledHeartIcon />}
                        </button>
                    </section>
                </div>
            ))}
        </div>
    );
};
