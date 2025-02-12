const cloudinary = require('cloudinary').v2;

export default function signature(req, res) {
  console.log(req.query);
  if (req.query.type === 'quizShow') {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
        folder: 'quiz_show_uploads',
      },
      process.env.CLOUDINARY_SECRET
    );
  
    res.statusCode = 200;
    res.json({ signature, timestamp });
  } else if (req.query.type === 'shoutOutImage') {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
        folder: 'shoutout_image_uploads',
      }, 
      process.env.CLOUDINARY_SECRET
    );
  
    res.statusCode = 200;
    res.json({ signature, timestamp });
  }

}
