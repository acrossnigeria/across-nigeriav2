import Link from 'next/link';
import Image from 'next/image';

const Card = ( { title, image, link, date, isOpen } ) => {

  return (
    <div style={{ flexDirection:'column', borderTop:'none'}} className={'border-l-gray-300 border-b-gray-300 w-[100%] md:w-[402px] border-b-3 border-l-3 bg-gradient-to-br from-gray-100 to-white rounded-[20px]'}>
      <Link href={link}>
        <div className="relative px-6 h-[160px] md:h-[190px] w-[97%] md:w-[400px] container flex-col gap-0 items-center mx-auto rounded-lg md:max-w-xl hover:opacity-85 w-full md:w-200px] cursor-pointer bg-transparent">
        <Image className="rounded-[20px]" src={image} alt={title} fill quality={50}/>
        </div>
      </Link>
    
      <div className='justify-between px-[20px]' style={{ height:'55px', paddingBottom:'5px', paddingTop:'5px', display:'flex', flexDirection:'row'}}>
        <div className='flex flex-col'>
          <span className="w-full text-[14px] text-green-700 font-bold">{title}</span>
          <span style={{fontSize:'14px', color:'grey'}}>Starting: {date} </span>
        </div>
        <Link href={link} className={`${isOpen?'bg-gradient-to-r hover:border-l-0 hover:border-b-0 from-green-400 border-b-2 border-b-green-500 border-l-2 border-l-green-500 to-yellow-400':'bg-gray-300 hover:cursor-default'} h-[37px] md:h-[33px] flex justify-center items-center w-[90px] rounded-[18px] text-white font-bold`}>Join</Link>
      </div>
    </div>
  );

};

export default Card;
<div className=''></div>