import { ExternalLink, MapPin, X } from "lucide-react";
import ProfileIcon from "../../../../public/images/icon/ProfileIcon";
import Image from "next/image";

const SANRS_profile_modal = ( { closeModal }) => {
    return (
            <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
                <div className="bg-white min-w-[700px] min-h-[500px] rounded-[15px] p-4">
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-lg font-bold">Profile Details</h2>
                        <button onClick={closeModal} className="hover:bg-gray-200 flex-col justify-center items-center rounded-full p-2">
                            <X size={20} color="black" className="cursor-pointer"/>
                        </button>
                    </div>
                    <div className="flex flex-row justify-start items-center mt-2 gap-3">
                        <ProfileIcon size={'200px'} bg={'gray'}/>
                        <div className="flex flex-col gap-2 flex-grow">
                            <div className="flex flex-col border-b border-gray-300 pb-2">
                                <span className="text-[16px] font-bold">Alimam Ahmed</span>
                                <div className="flex flex-row gap-1 items-center">
                                    <MapPin size={'12px'} className="text-blue-700"/>
                                    <span className="text-[12px] text-blue-700">Lagos</span>
                                </div>
                            </div>
                            <span className="text-[13px] text-gray-500">ID: <span className="font-semibold text-gray-800">12345</span></span>
                            <span className="text-[13px] text-gray-500">Email: <span className="font-semibold text-gray-800">alimamahmed@example.com</span></span>
                            <span className="text-[13px] text-gray-500">Phone: <span className="font-semibold text-gray-800">alimamahmed@example.com</span></span>
                            <span className="text-[13px] text-gray-500">Registration Date: <span className="font-semibold text-gray-800">2 days ago</span></span>
                            <span className="text-[13px] text-gray-500">Skit Submission Status: <span className="font-semibold text-gray-800">Submitted</span></span>
                        </div>
                    </div>
                    <div className="bg-gray-200 rounded-[15px] flex flex-row gap-4 items-center mt-3 p-4 h-[200px] w-full">
                        <div className="h-full w-[200px] flex flex-col justify-center items-center rounded-[15px] overflow-hidden relative">
                            <Image
                            src={'/images/image-placeholder.jpg'} // Replace with real thumbnails
                            alt={`vVideo thumbnail`}
                            layout="fill"
                            objectFit="cover"
                            />
                            <div className="w-[200px] bg-black/40 absolute hover:opacity-100 transition-all ease-in-out duration-300 cursor-pointer opacity-0  h-full flex flex-col justify-center items-center">
                                <ExternalLink strokeWidth={1.5} size={30} color="white"/>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 h-fit">
                            <span className="text-[13px] text-gray-500">Title: <span className="font-semibold text-gray-800">12345</span></span>
                            <span className="text-[13px] text-gray-500">ID: <span className="font-semibold text-gray-800">12345</span></span>
                            <span className="text-[13px] text-gray-500">Votes: <span className="font-semibold text-gray-800">alimamahmed@example.com</span></span>
                            <span className="text-[13px] text-gray-500">Ranking Position: <span className="font-semibold text-gray-800">alimamahmed@example.com</span></span>
                            <span className="text-[13px] text-gray-500">Phase: <span className="font-semibold text-gray-800">2 days ago</span></span>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default SANRS_profile_modal;