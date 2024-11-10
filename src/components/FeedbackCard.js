// src/components/FeedbackCard.jsx

import Image from "next/image";

const FeedbackCard = ({ content, name, title, img }) => (
  <div className="flex justify-between  flex-col  px-16 pb-12 rounded-[20px]  max-w-[370px]  mx-auto my-0 feedback-card">
    {/* <Image 
        src={"https://i.imgur.com/rx3eOUo.png"}
      alt="double_quotes"
      height={27.6} width={42.6}
      className="w-[42.6px] h-[27.6px] object-contain"
    /> */}
    <p className="font-poppins font-normal text-[20px] italic leading-[32.4px] h-40 text-gray-900 my-1">
      {content}
    </p>

    <div className="flex mb-0 bottom-0 mt-10 flex-row">
    {/*   <Image width={50} height={50} src={img} alt={name} className=" rounded-full" /> */}
      <div className="flex flex-col mb-0 ml-4">
        <h4 className="font-poppins font-semibold text-[20px] leading-[32px] text-gray-900">
          {name}
        </h4>
        <p className="font-poppins font-normal text-[16px] leading-[24px] text-gray-600">
          {title}
        </p>
      </div>
    </div>
  </div>
);

export default FeedbackCard;