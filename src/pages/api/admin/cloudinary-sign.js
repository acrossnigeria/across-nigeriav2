const cloudinary = require('cloudinary').v2;

export default function signature(req, res) {
  const { type } = req.query;

  if (!type) {
    return res.status(400).json({ error: 'Type query parameter is required' });
  }

  const timestamp = Math.round(new Date().getTime() / 1000);

  const sign = ( folder ) => {
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
        folder: folder,
      },
      process.env.CLOUDINARY_SECRET
    );

    return signature;
  }

  if ( type === 'quizShow' ) {

    const signature = sign('quiz_show_uploads');
    res.status(200).json({ signature, timestamp });

  } else if ( type === 'shoutOutImage' ) {

    const signature = sign('shoutout_image_uploads');
    res.status(200).json({ signature, timestamp });

  } else if ( type === 'advertImage' ) {
  
    const signature = sign('advert_image_uploads');
    res.status(200).json({ signature, timestamp });

  } else if ( type === 'theaterSkitCompetition' ) {
  
    const signature = sign('theater_skit_uploads');
    res.status(200).json({ signature, timestamp });

  } else if ( type === 'SKIT_ACROSS_NIGERIA' ) {
  
    const signature = sign('skit_across_nigeria_uploads');
    res.status(200).json({ signature, timestamp });

  } else {
    res.status(400).json({ error: 'Invalid type query parameter' });
  }

};
