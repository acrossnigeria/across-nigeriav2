// pages/api/thumbnail.js
import cloudinary from 'cloudinary';
const cldName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apikey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const apiSec = process.env.CLOUDINARY_SECRET;


const Handler = async (req, res) => {
    if ( req.method === 'GET' ) {
        const { videoId, crop } = req.query;
        cloudinary.config({
          cloud_name: cldName,
          api_key: apikey, 
          api_secret: apiSec, 
          secure:true
        });
      
        if (!videoId) {
          return res.status(400).json({ error: 'Video ID is required' });
        }
        let dim ;
        if (crop) {
          dim = { width: 800, height: 450, crop: "fill" };
        } else {
          dim = { width: 800, height: 450, fit: "scale" };
        }
      
        let initialUrl = cloudinary.v2.url(encodeURIComponent(videoId), {
          resource_type: 'video',
          format: 'jpg',
          transformation: [
            { start_offset: "5.0" },  // Safer offset
            dim,
            { quality: "auto:good" },  // Slightly faster than "auto:best"
            { fetch_format: "auto" }
          ]
        }); 
        const thumbnailUrl = initialUrl.replace('.mov', ''); // Ensure the URL ends with .jpeg
          
      
        res.status(200).json({ thumbnailUrl });
    } else {
        res.status(401).json({ success:false, error:'method not allowed'})
    }
}

export default Handler;