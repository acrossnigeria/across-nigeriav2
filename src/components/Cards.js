import Link from 'next/link';
import Image from 'next/image';

const Card = ( { title, image, link, date, isOpen } ) => {

  return (
    <div style={{ flexDirection:'column', borderTop:'none'}} className={'border-green-300 w-[100%] shadow-lg md:w-[360px] md:h-[230px] h-fit border-1 bg-gradient-to-br from-gray-100 to-white rounded-[5px]'}>
      <Link href={link}>
        <div className="relative px-6 h-[160px] w-[100%] container flex-col gap-0 items-center mx-auto rounded-[6px] md:max-w-xl hover:opacity-85 md:w-200px] cursor-pointer bg-transparent">
          <Image className="rounded-t-[6px]" src={image} alt={title} fill quality={50}/>
        </div>
      </Link>
    
      <div className='px-[20px] flex flex-row justify-between py-2 items-start' >
        <div className='flex flex-col'>
          <span className="w-full text-[14px] underline text-green-700 font-bold">{title}</span>
          <span style={{fontSize:'12px', color:'black'}}>Starting: {date} </span>
        </div>
        <Link href={link} className={`${isOpen?'bg-green-600 hover:bg-green-500':'bg-gray-300 hover:cursor-default'} h-[39px] md:h-[33px] flex justify-center items-center text-[18px] w-[120px] rounded-[5px] text-white`}>Join</Link>
      </div>
    </div>
  );

};

export default Card;