import Link from 'next/link';
import Image from 'next/image';
const BlogPostCard = (props) => {
    const{title, image, link}=props;
     return (
    <Link href={link}legacyBehavior><a 
  className="relative px-6 h-24 md:h-52 container flex mb-4 gap-0 items-center mx-auto
   bg-transparent border border-gray-200 rounded-lg shadow-lg
    shadow-gray-700 md:flex-row md:max-w-xl
   hover:bg-gray-100 w-full 
 md:w-200px] overflow-clip">
 <Image className="rounded-t-lg object-cover relative md:rounded-none md:rounded-s-lg"
    src={image} alt={title} fill
        quality={100}/>
  
</a></Link>
  );
};

export default BlogPostCard;
<div className=''></div>