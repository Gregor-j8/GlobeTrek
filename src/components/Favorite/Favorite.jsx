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
        <div className="pt-20 flex flex-col w-full items-center justify-center text-color-primary">
            {favoritePosts.map(post => (
                <div className="w-full flex items-center justify-center m-4 bg-main-card" key={post.post.id}>
                    <section className="flex flex-col items-center w-full">
                        <Link to={`/posts/${post.post.id}`}>
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
