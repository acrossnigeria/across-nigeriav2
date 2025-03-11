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
            <div className="flex flex-col items-center h-[300px] md:w-[350px] w-full">
                <Link className="w-[100%] hover:opacity-85 flex flex-col" href={link}>
                    <Image 
                    className="h-[225px] w-full p-0" 
                    src={sampleThumbnail} 
                    alt={content.description}
                    unoptimized
                    />
                    <div className="w-fit h-fit p-2 bg-black/50 text-white text-[13px] absolute mt-[180px] ml-[10px] rounded-[4px]">
                        <span>5:09</span>
                    </div>
                </Link>
                <div className="w-full flex flex-row items-start justify-between gap-2 pt-[10px] px-2">
                    <div className="flex flex-row gap-2 items-start">
                        <Image 
                        className="h-[45px] w-[45px] rounded-full  p-0" 
                        src={sampleThumbnail} 
                        width={20} 
                        height={20} 
                        alt={content.description}
                        unoptimized
                        />
                        <div className="flex flex-col">
                            <div>
                                <Link href={link} className="text-[20px] hover:opacity-50 hover:font-bold duration-300 transition-all ease-in-out">{content.title.length>30?content.title.slice(0, 30).concat('..'):content.title}</Link>
                            </div>
                            <span style={{lineHeight:'19px'}} className="text-gray-700">
                                <span className="">{"Alimam ahmed"} • </span>
                                <span>123 votes • </span>
                                <span>4 days ago</span>
                            </span>
                        </div>
                    </div>
                    <button className="hover:scale-110 hover:opacity-50"><OptionsIcon/></button>
                   
                </div>
            </div>
 
    )
};

