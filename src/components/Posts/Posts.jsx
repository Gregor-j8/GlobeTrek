import { Link } from 'react-router-dom';
import { useLike } from '../../context/LikeContext';
import { FilledHeartIcon, UnFilledHeartIcon } from '../../Documents/Heart';

export const Posts = ({ post }) => {
    const { isLiked, toggleLike } = useLike();

    return (
    <div className="max-w-lg mx-auto min-w-[384px]">
        <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
            <div className="p-5">
                <Link to={`/posts/${post.id}`}>
                    <h1 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 cursor-pointer">{post.title}</h1>
                </Link>
                <button onClick={() => toggleLike(post.id)}>
                    {isLiked(post.id) ? <FilledHeartIcon /> : <UnFilledHeartIcon />}
                </button>
                <p className="font-normal text-gray-700 mb-3">{post.description}</p>
            </div>
        </div>
    </div>
    )
}
