import { Link } from "react-router-dom";
import { categoryImages } from "./ImageData.js";
import TopNavigation from "../TopNavigation.js";
import BottomNavigation from "../BottomNavigation.js";

const Categories = () => {
    const images = categoryImages;

    return (
        <div>
            <TopNavigation />
            <h1 className='text-2xl font-bold mt-4 text-center'>Categories</h1>
            <ul className="flex flex-wrap gap-8 text-center text-lg text-bold md:flex-row">
                {images.map((image) => (
                    <li key={image.category}>
                        <div className="bg-gray-200 rounded-lg p-4 border-2 border-gray-300">
                        <Link to={`/category/${image.category}`}>{image.category}
                        <img src={image.url} alt={image.alt} className="bg-white md:h-[1024px] w-[1024px] object-cover"/>
                        </Link>
                        </div>
                    </li>
                        ))}
            </ul>
            <BottomNavigation />
        </div>
    
    );
};

export default Categories;