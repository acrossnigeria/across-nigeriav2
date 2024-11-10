import Image from "next/image";
import Link from "next/link";

export default function SkitDisp(props) {
    
    const {content, link}=props;
    const oldUrl=content?.url?.split('.');
    const url =oldUrl[0]+"."+oldUrl[1]+"."+oldUrl[2]+".jpg";
    return(
     <div className="mb-5 block h-16 rounded-lg border border-gray-200
     shadow-md">
        <Image className="rounded-full h-5 w-5 p-0" src={url} width={20} height={20} alt={content.description}/>
<Link href={link}>
    <p className="text-gray-800 text-small">{content.title}</p></Link>
    <p className="text-[7px] mb-4">by {content.email}</p>
            </div>
    )
};

