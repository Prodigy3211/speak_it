import { useState } from "react";
import supabase from "../../server/supabaseClient";

const EditProfile = ({userProfile, setProfile, setEditing}) => {
    const [username , setUserName] = useState(userProfile?.username || " ");
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
        .update({username:username,
             bio:bio})
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
            <div className='mx-8 rounded-md p-8 border-2 border-black border-solid'>
            <form onSubmit={handleProfileUpdate}>
                <div className="p-4">
                <div>
                <label className="flex flex-col">
                Username
                <input type="varchar" 
                value={username} 
                onChange={(e)=> setUserName(e.target.value)} 
                className='my-2 border-2 border-black bg-white rounded-md'
                >
                </input>
                </label>
                </div>
                <div>
                <label className="flex flex-col">
                Bio
                <textarea
                value={bio} 
                onChange={(e)=> setBio(e.target.value)} 
                className='border-2 border-black bg-white rounded-md h-32 w-full resize-none'
                placeholder={bio}
                />
                </label>
                </div>
                <div>
                <button type="submit" disabled={loading}
                className='bg-blue-500 text-white rounded-md p-2 w-full mt-4'
                >
                {loading? "Updating..." : "Save"}
                </button>
                </div>
                <div>
                <button className="bg-gray-500 text-white rounded-md p-2 w-full mt-4" type="button" onClick={() => setEditing(false)}>
                Cancel
                </button>
                </div>
                </div>
            </form>
            </div>
);

};


export default EditProfile;