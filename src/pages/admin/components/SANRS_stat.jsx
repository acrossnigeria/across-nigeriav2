import { Check, Eye, Users2, Videotape, Vote, X } from "lucide-react";
import { useState } from "react";
import ProfileIcon from "../../../../public/images/icon/ProfileIcon";
import SANRS_profile_modal from "./SANRS_profile_modal";
import DynamicBarChart from "@/components/admin-components/DynamicBarChart";

const SANRS_stat = ( { changePage } ) => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ showProfileModal, setShowProfileModal ] = useState(false);

    const nigeriaStates = [
        'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
        'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
        'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
        'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
    ];

    const dummyList = [
                9,
                8,
                19,
                12,
                11,
                8,
                17,
                9,
                10,
                13,
                3,
                13,
                17,
                22,
                61,
                6,
                5,
                5,
                276,
                10,
                4,
                1,
                26,
                57,
                280,
                13,
                10,
                43,
                19,
                35,
                41,
                13,
                5,
                2,
                6,
                10,
                8
            ]

    const handleShowProfileModal = () => {
        setShowProfileModal(true);
    };

    return (
        <>
        { isLoading ? (
            <div>Loading...</div>
        ): (
            <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-row justify-between items-center">
                    <div className="bg-gradient-to-tr from-gray-700 to-gray-400 flex rounded-[15px] flex-row justify-around items-center h-[70px] p-2 w-[33%] text-white">
                        <Users2 strokeWidth={1.5} size={30}/>
                        <div className="flex flex-col items-center">
                            {/* <span className={`text-[19px] ${stats?.totalUsers?'':'animate-pulse'} font-extralight`}>{stats?.totalUsers?stats?.totalUsers:'loading...'}</span> */}
                            <span className={`text-[19px] font-extralight`}>1039</span>
                            <span className="text-[12px]">TOTAL REGISTERED</span>
                        </div>
                    </div>
                    <div className="bg-gradient-to-tr from-gray-700 to-gray-400 flex rounded-[15px] flex-row justify-around items-center h-[70px] p-2 w-[33%] text-white">
                        <Videotape strokeWidth={1.5} size={30}/>
                        <div className="flex flex-col items-center">
                            {/* <span className={`text-[19px] ${stats?.totalUsers?'':'animate-pulse'} font-extralight`}>{stats?.totalUsers?stats?.totalUsers:'loading...'}</span> */}
                            <span className={`text-[19px] font-extralight`}>1039</span>
                            <span className="text-[12px]">TOTAL SKITS SUBMISSIONS</span>
                        </div>
                    </div>
                    <div className="bg-gradient-to-tr from-gray-700 to-gray-400 flex rounded-[15px] flex-row justify-around items-center h-[70px] p-2 w-[33%] text-white">
                        <Vote strokeWidth={1.5} size={30}/>
                        <div className="flex flex-col items-center">
                            {/* <span className={`text-[19px] ${stats?.totalUsers?'':'animate-pulse'} font-extralight`}>{stats?.totalUsers?stats?.totalUsers:'loading...'}</span> */}
                            <span className={`text-[19px] font-extralight`}>1039</span>
                            <span className="text-[12px]">TOTAL VOTE CAST</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row justify-between h-[480px] pt-2 items-center">
                    <div className="w-[60%] flex flex-col justify-between h-full">
                        <div className="w-full border h-[66%] rounded-[15px] bg-white shadow-lg">
                            <DynamicBarChart title={"Registered participants by state"} labels={nigeriaStates} dataList={dummyList} individualLabel={'Participants'}/>
                        </div>
                        <div className="w-full border h-[33%] flex flex-col gap-1 rounded-[15px] bg-white p-4 shadow-lg">
                            <div className="flex flex-row gap-1 items-center">
                                <Users2 strokeWidth={1.5} size={20}/>
                                <span className="text-[15px]">Phase</span>
                            </div>
                            

                            <div className="flex flex-col gap-1 h-fit">
                                <span className="text-[10px] text-gray-500">Phase: <span className="font-semibold text-gray-800">September 2025</span></span>
                                <span className="text-[10px] text-gray-500">Start date: <span className="font-semibold text-gray-800">1st September</span></span>
                                <span className="text-[10px] text-gray-500">Scheduled end date: <span className="font-semibold text-gray-800">25 September</span></span>
                                <span className="text-[10px] text-gray-500">Total vote cast: <span className="font-semibold text-gray-800">72 votes</span></span>
                            </div>
                            <button onClick={changePage} className="px-2 py-1 text-[14px] text-white rounded-[7px] bg-green-600 hover:bg-green-700 transition-all ease-in-out duration-300">
                                Phase Management
                            </button>
                        </div>
                    </div>

                    <div className="w-[38%] flex px-4 pt-4 pb-2 h-full flex-col rounded-[15px] bg-white shadow-lg">
                        <div className="flex flex-row gap-1 items-center">
                            <Users2 strokeWidth={1.5} size={20}/>
                            <span className="text-[15px]">Registered Participants</span>
                        </div>
    
                        <div className="w-full flex-grow mt-2 flex flex-col gap-1 overflow-y-scroll">
                            { [ 0, 0, 0, 0, 0, 0, 0, 0].map( (item, index) => {
                                return (
                                    <div key={index} onClick={handleShowProfileModal} className="w-full flex flex-row justify-between cursor-pointer hover:bg-gray-100 transition-all duration-200 ease-in-out p-2 rounded-[10px] items-center">
                                        <div className="flex items-center flex-row justify-start gap-2 flex-grow">
                                            <ProfileIcon size={'50px'} bg={'gray'}/>
                                            <div className="flex flex-col text-[13px] leading-tight mt-2">
                                                <span className="text-[12px] font-bold">Alimam Ahmed</span>
                                                <div className="flex flex-row gap-1 items-center">
                                                    <span className="text-[11px] text-gray-500">Submitted skit</span>
                                                    <Check color="green" size={10}/>
                                                </div>
                                                <span className="text-[11px] text-gray-500">2 days ago</span>
                                            </div>
                                        </div>
                                        <Eye size={'20px'} className="text-gray-500"/>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                { showProfileModal && (
                    <SANRS_profile_modal closeModal={()=>{setShowProfileModal(false)}}/>
                )}
            </div>
        )}
        </>
    );
}

export default SANRS_stat;
