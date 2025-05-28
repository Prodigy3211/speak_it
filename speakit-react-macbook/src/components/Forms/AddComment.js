import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../server/supabaseClient";

const AddComment = ({ claimId, onCommentAdded}) => {
    const [comment, setComment] = useState("");
    const [isAffirmative, setIsAffirmative] = useState(null);
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        //Check User Authentification
        const { data: {user} } = await supabase.auth.getUser();

        if(!user) {
            navigate('/login');
            return;
        }

        if (isAffirmative === null) {
            alert("Please select whether your comment is positive or negative");
            return;
        }
        
        //Inserts comment into Database
        const { error } = await supabase
        .from("comments")
        .insert([{
            claim_id: claimId, 
            user_id: user.id,
            content: comment,
            affirmative: isAffirmative,
            parent_comment_id: null
        }]);
        
        if (error) {
            console.error("Error adding comment:", error);
        } else {
            setComment(""); //Clears input after a successful comment post
            setIsAffirmative(null); // Reset sentiment selection
            if (onCommentAdded) {
                onCommentAdded(); //Refresh the comments
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Comment on this Claim"
                    required
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="flex gap-4">
                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="sentiment"
                        checked={isAffirmative === true}
                        onChange={() => setIsAffirmative(true)}
                        className="form-radio"
                    />
                    <span className="text-blue-700">For</span>
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="sentiment"
                        checked={isAffirmative === false}
                        onChange={() => setIsAffirmative(false)}
                        className="form-radio"
                    />
                    <span className="text-orange-700">Against</span>
                </label>
            </div>
            <button 
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Post
            </button>
        </form>
    );
};

export default AddComment;