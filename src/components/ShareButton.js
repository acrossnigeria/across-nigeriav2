import React from 'react';
import { FacebookShare, InstapaperShare, TelegramShare, TwitterShare, WhatsappShare } from 'react-share-kit';

const Share = ({ title, url}) => {
  const titleToShare = `Vote for ${title} and win amazing prices`;
  const shareUrl = url; // Ensure you define the shareUrl variable

  return (
    <div className='mb-4'>
      <h1 className='text-sm font-semibold mb-2 text-center'>Share {title.toLocaleUpperCase()} to your social media</h1>
      {/* Facebook Share Button */}
      <div className='h-fit w-fit mx-auto'>
      <FacebookShare url={shareUrl}size={40} quote={titleToShare} />
      <TwitterShare url={shareUrl} size={40} quote={titleToShare} />
      <WhatsappShare url={shareUrl} size={40} quote={titleToShare} />
      <TelegramShare url={shareUrl} size={40} quote={titleToShare}/></div>
    </div>
  );
};

export default Share;
 