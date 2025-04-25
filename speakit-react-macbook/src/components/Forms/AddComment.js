import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

        console.log("Inserting comment with claimId:", claimId);
        
        //Inserts comment into Database
        const { data, error } = await supabase
        .from("comments")
        .insert([{
            claim_id: claimId, 
            user_id: user.id,
            content: comment
        }]);
        
        if (error) {
            console.error("Error adding comment:", error);
        } else {
            console.log("Comment added successfully:", data);
            setComment(""); //Clears input after a successful comment post
            if (onCommentAdded) {
                onCommentAdded(); //Refresh the comments
            }
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