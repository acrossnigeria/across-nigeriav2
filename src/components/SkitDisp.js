import Image from "next/image";
import Link from "next/link";
import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary( {
    cloud: {
        cloudName:'dcxz7qndp'
    }
});


export default function SkitDisp(props) {
    
    const {content, link} = props;
    const videoId = content?.url.split('/upload/')[1].replace('mp4','jpeg').split('/')[1];
    const thumbnailUrl = cld.image(videoId).setAssetType('video').format('auto:image').toURL().concat('.jpeg');
    console.log(thumbnailUrl);
    // const oldUrl=content?.url?.split('.');
    const oldUrl = content?.url.replace('/video/upload/', '/video/upload/so_6,q_auto/').split('.');
    const url =oldUrl[0]+"."+oldUrl[1]+"."+oldUrl[2]+".webp";

    return(
        <Link href={link}>
            <div className="mb-5 flex flex-col items-center sm:h-[350px] h-[400px] sm:w-[200px] w-full bg-gray-100 rounded-[15px] shadow-md">
                <img className="h-full rounded-[15px] w-full p-0" src={thumbnailUrl} width={20} height={20} alt={content.description}/>
                <div className="absolute bg-gradient-to-t from-black/70 to-black/20 md:w-[190px] rounded-[15px] w-[80%] flex flex-col px-2 mt-[310px] sm:mt-[260px]">
                    <p className="text-white text-[25px] sm:text-[16px] font-bold">{content.title.split(0, 15).concat('...')}</p>
                    <p className=" text-white text-[19px] sm:text-[15px] mb-4">by {content.name}</p>
                </div>
            </div>
        </Link>
 
    )
};

