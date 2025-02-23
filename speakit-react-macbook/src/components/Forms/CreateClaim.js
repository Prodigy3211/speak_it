import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../../server/supabaseClient";

const CreateClaim = () => {
    const { categoryName } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content , setContent] = useState("");

    const handleSubmit =  async (e) => {
        e.preventDefault();

        const { data: { user } } = await supabase.auth.getUser();

        if (!user){
            navigate('/login');
            return;
        }

        const { error } = await supabase
            .from ("claims")
            .insert([{ title, content, category: categoryName, user_id: user.id}]);
        
        if (error) {
            console.error("Error creating claim: ", error);
        } else {
            navigate(`/category/${categoryName}`);
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <h2>Create a new Claim in {categoryName}</h2>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Claim Title" required />
            <input value={content} onChange={(e) => setContent(e.target.value)} placeholder="Make Your Claim" required />
            <button type="submit">Create Claim</button>
        </form>
    );
};

export default CreateClaim;