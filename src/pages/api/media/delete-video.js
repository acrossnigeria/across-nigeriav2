import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    api_secret: process.env.CLOUDINARY_SECRET,
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
})

const Handler = async (req, res) => {
   if (req.method === 'PATCH') {
        const { publicId } = req.body;

        try {
            await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });
            res.status(200).json({ success: true });
        } catch (err) {
            res.status(500).json({ success: false, error: 'something went wrong when deleting video'});
        }
   } else {
    res.status(405).jsom( { error: 'Method ot allowed'} );
   }
};

export default Handler;