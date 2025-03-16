// pages/api/thumbnail.js
import cloudinary from 'cloudinary';
const cldName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apikey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const apiSec = process.env.CLOUDINARY_SECRET;


const Handler = async (req, res) => {
    if ( req.method === 'GET' ) {
        const { videoId } = req.query;
        cloudinary.config({
          cloud_name: cldName,
          api_key: apikey, 
          api_secret: apiSec, 
          secure:true
        });
      
        if (!videoId) {
          return res.status(400).json({ error: 'Video ID is required' });
        }
      
        const thumbnailUrl = cloudinary.v2.url(videoId, {
            resource_type: 'video',
            format: 'jpg',
            transformation: [
              { width: 400, height: 100, crop: 'fill' },
              { video_sampling: 10 } // Use the 10th frame
            ]
          });
      
        res.status(200).json({ thumbnailUrl });
    } else {
        res.status(401).json({ success:false, error:'method not allowed'})
    }
}

export default Handler;