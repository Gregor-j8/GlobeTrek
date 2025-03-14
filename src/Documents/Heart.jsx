export const FilledHeartIcon = () => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 512 512" width="23" height="40" className="fill-red-500 cursor-pointer"
        >
            <path d="M462.3 62.7C407.5 8.6 324.8 24 272 76.6 219.2 24 136.5 8.6 81.7 62.7c-56.2 55.4-57.4 144.6-3.7 201.5l175.2 178.3c12.5 12.7 
            32.8 12.7 45.3 0L466 264.2c53.7-56.9 52.5-146.1-3.7-201.5z"/>
        </svg>
    );
};
export const UnFilledHeartIcon = () => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 512 512" width="23" height="40" 
            className="stroke-red-500 cursor-pointer hover:fill-red-500 hover:stroke-none transition-colors duration-300"
            fill="none" stroke="red" strokeWidth="40"
        >
            <path d="M462.3 62.7C407.5 8.6 324.8 24 272 76.6 219.2 24 136.5 8.6 81.7 62.7c-56.2 55.4-57.4 144.6-3.7 201.5l175.2 178.3c12.5 12.7 
            32.8 12.7 45.3 0L466 264.2c53.7-56.9 52.5-146.1-3.7-201.5z"/>
        </svg>
    );
};
