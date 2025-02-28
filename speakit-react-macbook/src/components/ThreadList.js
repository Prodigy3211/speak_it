import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import supabase from "../server/supabaseClient";




const ThreadList = () => {
    const [category, setCategory] = useState("");
    const [claims , setClaims] = useState([]);
    const navigate = useNavigate();

    //Fetch Data from Supabase
    useEffect( () => {
        const fetchClaims = async () => {
            const {data , error } = await supabase
                .from("claims")
                .select("*")
                .eq("category", category) //Filter by Category
                .order("created_at", {ascending: false});

            if (error) {
                console.error("Error Fetching claims: ", error);
            } else {
                setClaims(data);
                setCategory(category);
            }
        };
        fetchClaims();
    }, [category]);
   

    return (
        <div>
            {/* pull in category name */}
            <h1>{category} and the Claims We've Made</h1>
            <p><button type="button" onClick={navigate('/create-claim')}></button></p>
            <ul>
                {/* Map out the threads from the API call sorting by claim.id */}
                {claims.map(claim => (
                    <li key={claim.id}>
                        {/* Link to the Dynamic Route */}
                        <Link to = {`/category/${category}/thread/${claim.id}`}> 
                            {claim.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ThreadList;
