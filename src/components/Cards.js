import Link from 'next/link';
import Image from 'next/image';

const Card = (props) => {
    const { title, image, link, date }=props;
     return (
    <Link href={link} style={{ flexDirection:'column', borderTop:'none'}} className={'border-gray-400 w-[100%] md:w-[402px] border-b-1 border-x-1 bg-gradient-to-br from-gray-100 to-white rounded-[20px]'}>
      <div className="relative px-6 h-[160px] md:h-52 w-[97%] md:w-[400px] container flex-col gap-0 items-center mx-auto bg-transparent rounded-lg md:max-w-xl hover:opacity-85 w-full md:w-200px] cursor-pointer bg-transparent">
      <Image className="rounded-[20px]" src={image} alt={title} fill quality={50}/>
      </div>
      <div style={{ height:'fit-content', paddingLeft:'20px', paddingBottom:'5px', paddingTop:'5px', display:'flex', flexDirection:'column'}}>
        <span className="w-full text-green-700 font-extrabold tracking-wider">{title}</span>
        <span style={{fontSize:'14px', color:'grey'}}>Starting: {date} </span>
        </div>
    </Link>
  );
};

export default Card;
<div className=''></div>