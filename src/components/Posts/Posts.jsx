import { Link } from 'react-router-dom'
import { useLike } from '../../context/LikeContext'
import { FilledHeartIcon, UnFilledHeartIcon } from '../../Documents/Heart'

export const Posts = ({ post }) => {
    const { isLiked, toggleLike } = useLike()

    return (
    <div className="max-w-lg mx-auto min-w-[384px]">
        <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
            <div className="p-5">
                <div className='flex'>
                    <img src={`${post?.user.photoUrl}`} className="w-1/7 mt-2 rounded-4xl"/>
                    <Link to={`/posts/${post.id}`}>
                        <h1 className="text-gray-900 pl-2 pt-3 font-bold text-xl tracking-tight mb-2 cursor-pointer">{post.title}</h1>
                    </Link>
                </div>
                <p className="font-normal text-gray-700 mt-3">{post.description}</p>
                <div className='flex justify-around mt-2'>
                    <button onClick={() => toggleLike(post.id)}>
                        {isLiked(post.id) ? <FilledHeartIcon /> : <UnFilledHeartIcon />}
                    </button>
                    <p className="font-normal text-gray-700 mt-3">{post.date}</p>
                </div>
            </div>
        </div>
    </div>
    )
}
