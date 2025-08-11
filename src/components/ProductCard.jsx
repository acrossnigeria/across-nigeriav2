import Link from 'next/link';
import Image from 'next/image';

const ProductCard = ( { title, image, link, date, isOpen } ) => {

  return (
    <div className={' w-[100%] md:w-[300px] flex flex-col h-fit bg-transparent-to-br relative rounded-[5px]'}>
      <Link href={link}>
        <div className="relative px-6 h-[160px] w-[90%] container flex-col gap-0 items-center mx-auto rounded-[6px] md:max-w-xl hover:opacity-85 md:w-200px] cursor-pointer bg-transparent">
          <Image className="rounded-t-[10px] shadow-xl" src={image} alt={title} fill quality={50}/>
        </div>
      </Link>
      <div className='h-[140px] absolute mt-[140px] rounded-[10px] shadow-xl bg-white w-full flex flex-col items-center text-center justify-between pt-3' >
        <span className='text-[15px] text-gray-700'>{date} </span>
        <div className='flex flex-col max-w-[70%] leading-tight'>
          <span className="w-full text-[17px] md:text-[18px] text-green-600 font-bold">{title}</span>
        </div>
        <Link href={link} className={`${isOpen?'bg-green-600 hover:bg-green-500':'bg-gray-300 hover:cursor-default'} h-[45px] flex justify-center items-center text-[18px] w-[100%] rounded-[10px] text-white`}>Join</Link>
      </div>
    </div>
  );

};

export default ProductCard;