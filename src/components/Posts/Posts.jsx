import { Link } from 'react-router-dom';
import { useLike } from '../../context/LikeContext';
import { FilledHeartIcon, UnFilledHeartIcon } from '../../Documents/Heart';

export const Posts = ({ post }) => {
    const { isLiked, toggleLike } = useLike();

    return (
        <div className="flex justify-center items-center w-full">
            <div className="w-full items-center m-5 bg-main-card">
                <section className="flex justify-around">
                    <Link to={`/posts/${post.id}`}>
                        <h2 className="text-color-primary">{post.title}</h2>
                    </Link>
                    <button onClick={() => toggleLike(post.id)}>
                        {isLiked(post.id) ? <FilledHeartIcon /> : <UnFilledHeartIcon />}
                    </button>
                </section>
                <h3 className="text-color-primary">{post.description}</h3>
            </div>
        </div>
    )
}
