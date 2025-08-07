import Image from "next/image";
import sgImage from "../../public/images/squid-game.jpg";
import Link from "next/link";

const ShowCard = ( { content }) => {
    return (
        <div className="md:h-[250px] md:w-full w-[95%] mx-auto flex md:flex-row md:justify-between p-2 items-center flex-col bg-white shadow-lg rounded-[10px]">
            <div className="relative flex flex-col md:w-[40%] w-full md:h-full h-[200px]">
                <Image src={content?.image} fill className="md:rounded-[10px] rounded-t-[10px] object-cover"/>
                <div className="w-full md:h-full h-[200px] bg-gradient-to-b from-transparent to-black/60 absolute"></div>
            </div>
            <div className="md:w-[60%] md:h-[260px]">
                <div className="text-white p-4">
                    <h3 className={`text-xl font-bold ${content?.txtThemeColor}`}>{content?.header}</h3>
                    <p className="text-[16px] font-semibold text-black">
                        {content?.subHeader}
                    </p>
                    <p className="text-[13px] text-gray-500">
                        {content?.pg}
                    </p>

                    {/* CTA button */}
                    {content?.button?.hasButton && (
                        <Link href={content?.button?.link} className={`block text-center ${content?.bgThemeColor} hover:opacity-70 transition-all ease-in-out md:w-[60%] mt-4 duration-200 py-2 rounded-[30px] font-semibold`}>
                            {content?.button?.text}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ShowCard;