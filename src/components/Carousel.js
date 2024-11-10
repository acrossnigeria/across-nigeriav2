import React, { useState } from 'react';
const feedbacks = [
  {
    id: 1,
    name: 'Joseph Mbah',
    comment: 'Great product! Very easy to use. I dont beg for Urgent 2k again',
    rating: 5,
  },
  {
    id: 2,
    name: 'Jane Smith',
    comment: 'Excellent customer service. Highly recommended!',
    rating: 4,
  },
  {
    id: 3,
    name: 'Alice Johnson',
    comment: 'The product exceeded my expectations. Will buy again!',
    rating: 5,
  },
  {
    id: 4,
    name: 'Bob Brown',
    comment: 'Good value for money. Works as described.',
    rating: 4,
  },
  {
    id: 5,
    name: 'Emma Wilson',
    comment: 'Had a minor issue, but customer support was quick to resolve it.',
    rating: 3,
  },
];

const Carousel = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex === feedbacks.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? feedbacks.length - 1 : prevIndex - 1));
  };

  return (
    <div className="relative h-200 overflow-hidden">
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full z-10"
        onClick={prevSlide}
      >
        {'<'}
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full z-10"
        onClick={nextSlide}
      >
        {'>'}
      </button>
      {feedbacks.map((feedback, idx) => (
        <div
          key={idx}
          className={`relative top-0 left-full w-full h-200 transform transition-transform ${
            idx === index ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="h-full flex items-center justify-center">
            <p className="text-black">{feedback.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
