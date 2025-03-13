export const Posts = ({post}) => {
    return (
        <div className="flex justify-center items-center w-2/3 ">
            <div className=" w-full items-center md:w-1/2 lg:w-1/3 m-5 card-color-primary">
                    <h2 className="text-color-dark">{post.title}</h2>
                    <h3 className="text-color-dark">{post.description}</h3>
                    <h3 className="text-color-dark">{post.city.city}</h3>
            </div>
        </div>

    )
}