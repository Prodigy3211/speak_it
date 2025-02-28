import { useState, useNavigate } from "react";
import supabase from "../../server/supabaseClient";

const AddComment = ({ claimId, onCommentAdded}) => {
    const [comment, setComment] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        //Check User Authentification
        const { data: {user} } = await supabase.auth.getUser();

        if(!user) {
            navigate('/login');
            return;
        }

        //Inserts comment into Database
        const { error } = await supabase
        .from("comments")
        .insert([{
            claim_id: claimId, 
            id: user.id, 
            content: comment
        }]);
        if (error) {
            setComment(""); //Clears input after a successful comment post
            onCommentAdded(); //Refresh the comments
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Comment on this Claim"
                required
                />
                <button type="submit">Post</button>
        </form>
    );
};

export default AddComment;