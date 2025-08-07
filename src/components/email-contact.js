import React from 'react';

export const EmailTemplate = ({heading, content}) => (
  <div>
    <h1 className='font-semibold underline text-center text-3xl'>{heading}</h1>
    <p className='left-0 font-sans'>{content}</p>
  </div>
);
