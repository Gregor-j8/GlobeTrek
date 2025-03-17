import { Link } from 'react-router-dom';
import { useLike } from '../../context/LikeContext';
import { FilledHeartIcon, UnFilledHeartIcon } from '../../Documents/Heart';

export const Posts = ({ post }) => {
    const { isLiked, toggleLike } = useLike();

    return (
        <div className="flex justify-center items-center w-2/3">
            <div className="w-full items-center md:w-1/2 lg:w-1/3 m-5 card-color-primary">
                <section className="flex justify-around">
                    <Link to={`/posts/${post.id}`}>
                        <h2 className="text-color-dark">{post.title}</h2>
                    </Link>
                    <button onClick={() => toggleLike(post.id)}>
                        {isLiked(post.id) ? <FilledHeartIcon /> : <UnFilledHeartIcon />}
                    </button>
                </section>
                <h3 className="text-color-dark">{post.description}</h3>
                <h3 className="text-color-dark">{post.city.city}</h3>
            </div>
        </div>
    )
}
