import Image from "next/image";
import sgImage from "../../public/images/squid-game.jpg";
import Link from "next/link";

const ShowCard = () => {
    return (
        <div className="md:h-[300px] md:w-full w-[95%] mx-auto flex md:flex-row md:justify-between border-1 border-pink-200 items-center flex-col bg-white shadow-lg rounded-[5px]">
            <div className="relative flex flex-col md:w-[40%] w-full md:h-full h-[200px]">
                <Image src={sgImage} fill className="md:rounded-l-[5px] rounded-t-[5px] object-cover"/>
                <div className="w-full md:h-full h-[200px] bg-gradient-to-b from-transparent to-pink-700/40 absolute"></div>
            </div>
            <div className="md:w-[50%] md:h-[260px]">
                <div className="text-white p-4 space-y-2">
                    <h3 className="text-3xl font-bold text-pink-500">Online Squid Game 2</h3>
                    <p className="text-sm text-gray-500">
                        ₦200K cash prize for 3 winners. Entry Fee: ₦500.
                    </p>
                    <p className="text-xs text-gray-400">Registration: June 13 – July 8</p>

                    {/* CTA button */}
                    <Link href={'/collaborations/squid-game'} className="block text-center bg-pink-600 hover:bg-pink-700 transition-colors py-2 rounded-md font-semibold">
                        Submit Entry Code
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ShowCard;