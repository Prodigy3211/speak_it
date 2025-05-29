import { supabase } from "../utils/supabase";

const uploadImage = async (req, res) => {
    try{
        const [file, commentId] = req.body;
        const {data: {user} } = await supabase.auth.getUser();

        if(!user){
            return res.status(401).json({error: "Unauthorized"})
        }

        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const {data, error} = await supabase.storage
        .from('comment-images')
        .upload(fileName, file);

        // Public URL
        if (error) throw error;
        const {data: {publicUrl} } = supabase.storage
        .from('comment-images')
        .getPublicUrl(fileName);
// Save Image metadata to the database
        const { data: imageData, error: dbError} = await supabase
        .from('images')
        .insert([{
            comment_id: commentId,
            user_id: user.id,
            image_url: publicUrl,
            file_name: file.name,
            file_size: file.size,
            contnet_type: file.type
        }]);

        if (dbError) throw dbError;

        res.json({
            success:true,
            imageUrl: publicUrl,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Failed to upload image"
        });
    }



};

const processImage = async (file) => {
    const sharp = require('sharp');
    
    // Resize image to max dimensions
    const processedImage = await sharp(file.buffer)
      .resize(1200, 1200, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: 80 })
      .toBuffer();
  
    return processedImage;
  };

      // Add these constants to backend
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

// Add validation to upload image
const validateImage = (file) => {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size too large. Maximum size is 5MB');
  }
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    throw new Error('Invalid file type. Allowed types: JPEG, PNG, GIF');
  }
};

// Create a scheduled function to clean up unused images
const cleanupUnusedImages = async () => {
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .is('comment_id', null);
  
    if (error) throw error;
  
    for (const image of data) {
      // Delete from storage
      await supabase.storage
        .from('comment-images')
        .remove([image.file_name]);
  
      // Delete from database
      await supabase
        .from('images')
        .delete()
        .eq('id', image.id);
    }
  };


module.exports = { 
    uploadImage,
    validateImage,
    processImage,
    cleanupUnusedImages
};