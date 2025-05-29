import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import supabase from "../../server/supabaseClient";

const AddComment = ({ claimId, onCommentAdded, parentCommentId = null}) => {
    const [comment, setComment] = useState("");
    const [isAffirmative, setIsAffirmative] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [setError] = useState(null);
    const fileInputRef = useRef(null);

    const navigate = useNavigate();

    //File Selection
    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if(file) {
            try{
                if (file.size > 5 * 1024 * 1024) {
                    setError("File size exceeds 5MB limit");
                    return;
                }
    
                //validate file type
                if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
                    setError("Invalid file type. Allowed types: JPEG, PNG, GIF");
                    return;
                }
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
            } catch(error) {
                console.error("Error selecting image:", error);
            }
        }
    };

    const handleFileButtonClick = () => {
        fileInputRef.current.click();
    };

   
    
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

        setIsUploading(true);
        try{
        
        //Inserts comment into Database
        const { error: commentError, data: newComment } = await supabase
        .from("comments")
        .insert([{
            claim_id: claimId, 
            user_id: user.id,
            content: comment,
            affirmative: isAffirmative,
            parent_comment_id: null
        }])
        .select()
        .single();

        if (commentError) throw commentError;

        if (imageFile) {
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;

            //Upload to supabase storage
            const {error: uploadError} = await supabase.storage
            .from('comment-images')
            .upload(fileName, imageFile);

            if (uploadError) throw uploadError;

            //Get public URL
            const {data: {publicUrl}} = supabase.storage
            .from('comment-images')
            .getPublicUrl(fileName);
            console.log('Public URL:', publicUrl);

            //Save image metadata to the database
            const {error: imageError} = await supabase
            .from('images')
            .insert([{
                comment_id: newComment.id,
                user_id: user.id,
                image_url: publicUrl,
                file_name: fileName,
                file_size: imageFile.size,
                content_type: imageFile.type
            }]);

            if (imageError) throw imageError;
        }

        //Clear form fields
        setComment("");
        setIsAffirmative(null);
        setImageFile(null);
        setImagePreview(null);

       // Reset sentiment selection
            if (onCommentAdded) {
                onCommentAdded(); //Refresh the comments
            }
        } catch(error) {
            console.error("Error submitting comment:", error);
        } finally {
            setIsUploading(false);
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
            {/* image upload */}
            <div className="mt-2">
                <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg, image/png, image/gif"
                onChange={handleFileSelect}
                style={{display: 'none'}}
                />
                <button
                type="button"
                onClick={handleFileButtonClick}
                className="inline-flex items-center px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
                >
                    <FontAwesomeIcon icon={faImage} className="mr-2" />
                    <span>Upload Image</span>
                </button>
            </div>

            {/* image preview */}
            {imagePreview && (
                <div className="mt-2">
                    <img 
                    src={imagePreview}
                    alt="Preview" 
                    className="w-full h-auto rounded-md"
                    />
                    <button
                    type="button"
                    onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                    }}
                    className="mt-2 px-3 py-1 text-sm text-gray-600 bg-gray-100 hover:text-gray-700 rounded-md"
                    >
                        Cancel
                    </button>
                </div>
            )}


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
                disabled={isUploading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                {isUploading ? 'Posting...' : 'Post'}
            </button>
        </form>
    );
};

export default AddComment;