import Link from 'next/link';
import Image from 'next/image';

const BlogPostCard = (props) => {
    const{title, image, link, date}=props;
     return (
    <Link href={link} style={{border:'0.5px solid rgb(206, 206, 206)', flexDirection:'column', borderRadius:'1.3rem', borderTop:'none', backgroundColor:'rgb(240, 240, 240)'}}>
      <div className="relative px-6 h-[160px] md:h-52 container flex-col gap-0 items-center mx-auto bg-transparent rounded-lg md:max-w-xl hover:opacity-85 w-full md:w-200px] cursor-pointer bg-transparent">
      <Image style={{ borderRadius:'23px'}} className="rounded-lg md:rounded-none md:rounded-s-lg" src={image} alt={title} fill quality={50}/>
      </div>
      <div style={{ height:'fit-content', paddingLeft:'20px', paddingBottom:'5px', paddingTop:'5px', display:'flex', flexDirection:'column'}}>
        <span className="w-full font-bold tracking-wider">{title}</span>
        <span style={{fontSize:'14px', color:'grey'}}>Starting: {date} </span>
        </div>
    </Link>
  );
};

export default BlogPostCard;
<div className=''></div>