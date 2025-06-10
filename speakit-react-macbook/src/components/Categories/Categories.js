import { Link } from "react-router-dom";
import { categoryImages } from "./ImageData.js";

const Categories = () => {
    const images = categoryImages;

    return (
        <div>
            <h1 className='text-2xl font-bold mt-4 text-white'>Categories</h1>
            <ul className="flex flex-wrap gap-8 text-center text-lg text-bold">
                {images.map((image) => (
                    <li key={image.category}>
                        <div className="bg-gray-900 rounded-lg p-4 border-2 border-gray-300 text-white">
                        <Link to={`/category/${image.category}`}>{image.category}
                        <img src={image.url} alt={image.alt} className="bg-white"/>
                        </Link>
                        </div>
                    </li>
                        ))}
            </ul>
        </div>
    
    );
};

export default Categories;