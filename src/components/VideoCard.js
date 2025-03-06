import Link from "next/link";
import { Cloudinary } from "@cloudinary/url-gen";
import sampleThumbnail from "../../public/images/sample.PNG";
import Image from "next/image";
import OptionsIcon from "../../public/images/icon/OptionsIcon";

const cld = new Cloudinary( {
    cloud: {
        cloudName:'dcxz7qndp'
    }
});


export default function VideoCard(props) {
    
    const {content, link} = props;
    // const videoId = content?.url.split('/upload/')[1].replace('mp4','jpeg').split('/')[1];
    // const thumbnailUrl = cld.image(videoId).setAssetType('video').format('auto:image').toURL().concat('.jpeg');
    // console.log(thumbnailUrl)

    return(
        <Link href={link}>
            <div className="flex flex-col items-center sm:h-[280px] max-h-[320px] sm:w-[190px] w-full">
                <Image 
                className="h-full rounded-[5px] w-full p-0" 
                src={sampleThumbnail} 
                width={20} 
                height={20} 
                alt={content.description}
                unoptimized
                />
                <div className="md:w-[180px] w-full flex flex-row items-start justify-between gap-2 pt-[10px] px-2">
                    <div className="flex flex-row gap-2 items-start">
                        <Image 
                        className="h-[40px] w-[40px] rounded-full  p-0" 
                        src={sampleThumbnail} 
                        width={20} 
                        height={20} 
                        alt={content.description}
                        unoptimized
                        />
                        <div className="flex flex-col">
                            <div>
                                <span className="font-semibold">{content.title.length>30?content.title.slice(0, 30).concat('..'):content.title}</span>
                            </div>
                            <span style={{lineHeight:'19px'}} className="text-gray-600">
                                <span className="">{"Alimam ahmed"} • </span>
                                <span>123 votes • </span>
                                <span>4 days ago</span>
                            </span>
                        </div>
                    </div>
                    <button><OptionsIcon/></button>
                   
                </div>
            </div>
        </Link>
 
    )
};

