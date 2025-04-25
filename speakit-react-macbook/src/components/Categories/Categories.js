import { Link } from "react-router-dom";
import { categoryImages } from "./ImageData.js";

const Categories = () => {
    const images = categoryImages;

    return (
        <div>
            <h1>Categories</h1>
            <ul>
                {images.map((image) => (
                    <li key={image.category}>
                        <Link to={`/category/${image.category}`}>{image.category}
                        <img src={image.url} alt={image.alt} />
                        </Link>
                    </li>
                        ))}
            </ul>
        </div>
    
    );
};

export default Categories;