import { useState } from "react";
import supabase from "../../server/supabaseClient";

const EditProfile = ({userProfile, setProfile, setEditing}) => {
    const [displayname , setDisplayName] = useState(userProfile?.displayName || " ");
    const [bio, setBio] = useState(userProfile?.bio || "");
    const [loading, setLoading] = useState(false);
    const [error, setError] =useState(null);
    if (error){
        console.log("Error!");
    }
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading (true);
        
        //Check if user is logged in
        const {
            data:{user}
        } = await supabase.auth.getUser();

        if (!user){
            setError ('Not Logged In');
            setLoading(false);
            return;
        }
        

        const user_Id = user.id;


        const { data, error } = await supabase
        .from('profiles')
        .update({displayname: displayname, bio:bio})
        .eq("user_id", user.id)
        .single();
    if (error) {
        console.error("Error updating profile: ", error.message);
        console.log(user_Id);
    } else {
        setProfile (data); //update the sate of each field
        setEditing(false);
    }
    setLoading(false);
    };
        return(
            <form onSubmit={handleProfileUpdate}>
                <label>
                Display name:
                <input type="varchar" value={displayname} onChange={(e)=> setDisplayName(e.target.value)}></input>
                </label>
                <label>
                Bio:
                <input type="varchar" value={bio} onChange={(e)=> setBio(e.target.value)}></input>
                </label>
                <button type="submit" disabled={loading}>
                {loading? "Updating..." : "Save"}
                </button>
                <button type="button" onClick={() => setEditing(false)}>
                Cancel
                </button>
            </form>
);

};


export default EditProfile;