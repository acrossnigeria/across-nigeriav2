import { Check, Eye, Users2, Videotape, Vote, X } from "lucide-react";
import { useEffect, useState } from "react";
import ProfileIcon from "../../../../public/images/icon/ProfileIcon";
import SANRS_profile_modal from "./SANRS_profile_modal";
import DynamicBarChart from "@/components/admin-components/DynamicBarChart";
import axios from "axios";
import ShimmerLoader from "@/components/ui/ShimmerLoader";

const SANRS_stat = ( { changePage } ) => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ showProfileModal, setShowProfileModal ] = useState(false);
    const [ registeredParticipants, setRegisteredParticipants ] = useState([]);
    const [ stateData, setStateData ] = useState([]);
    const [ totalVotes, setTotalVotes ] = useState(0);
    const [ totalSubmitted, setTotalSubmitted ] = useState(0);

    const [ profileSelected, setProfileSelected ] = useState(null);
    const profileToBeViewed = registeredParticipants?.find( user => user?.id === profileSelected );

    const handleProfileSelection = (id) => {
        setProfileSelected(id);
        handleShowProfileModal();
    };

    const nigeriaStates = [
        'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
        'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
        'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
        'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
    ];

    const handleShowProfileModal = () => {
        setShowProfileModal(true);
    };

    useEffect( () => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('/api/admin/SANRS/statistics');
                const data = response.data;
                setRegisteredParticipants(data?.registeredParticipants);
                setStateData(data?.stateData);
                setTotalVotes(data?.totalVotes);
                setTotalSubmitted(data?.totalSubmitted);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
        { isLoading ? (
            <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-row justify-between items-center">
                    <ShimmerLoader roundedness={'15px'} width={'33%'} height={'70px'}/>
                    <ShimmerLoader roundedness={'15px'} width={'33%'} height={'70px'}/>
                    <ShimmerLoader roundedness={'15px'} width={'33%'} height={'70px'}/>
                </div>

                <div className="flex flex-row justify-between h-[480px] pt-2 items-center">
                    <div className="w-[60%] flex flex-col justify-between h-full">
                        <ShimmerLoader roundedness={'15px'} width={'100%'} height={'66%'}/>
                        <ShimmerLoader roundedness={'15px'} width={'100%'} height={'33%'}/>
                    </div>
                    <ShimmerLoader roundedness={'15px'} width={'38%'} height={'100%'}/>
                </div>
            </div>
        ): (
            <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-row justify-between items-center">
                    <div className="bg-gradient-to-tr from-gray-700 to-gray-400 flex rounded-[15px] flex-row justify-around items-center h-[70px] p-2 w-[33%] text-white">
                        <Users2 strokeWidth={1.5} size={30}/>
                        <div className="flex flex-col items-center">
                            {/* <span className={`text-[19px] ${stats?.totalUsers?'':'animate-pulse'} font-extralight`}>{stats?.totalUsers?stats?.totalUsers:'loading...'}</span> */}
                            <span className={`text-[19px] font-extralight`}>{registeredParticipants.length}</span>
                            <span className="text-[12px]">TOTAL REGISTERED</span>
                        </div>
                    </div>
                    <div className="bg-gradient-to-tr from-gray-700 to-gray-400 flex rounded-[15px] flex-row justify-around items-center h-[70px] p-2 w-[33%] text-white">
                        <Videotape strokeWidth={1.5} size={30}/>
                        <div className="flex flex-col items-center">
                            {/* <span className={`text-[19px] ${stats?.totalUsers?'':'animate-pulse'} font-extralight`}>{stats?.totalUsers?stats?.totalUsers:'loading...'}</span> */}
                            <span className={`text-[19px] font-extralight`}>{totalSubmitted}</span>
                            <span className="text-[12px]">TOTAL SKITS SUBMISSIONS</span>
                        </div>
                    </div>
                    <div className="bg-gradient-to-tr from-gray-700 to-gray-400 flex rounded-[15px] flex-row justify-around items-center h-[70px] p-2 w-[33%] text-white">
                        <Vote strokeWidth={1.5} size={30}/>
                        <div className="flex flex-col items-center">
                            {/* <span className={`text-[19px] ${stats?.totalUsers?'':'animate-pulse'} font-extralight`}>{stats?.totalUsers?stats?.totalUsers:'loading...'}</span> */}
                            <span className={`text-[19px] font-extralight`}>{totalVotes}</span>
                            <span className="text-[12px]">TOTAL VOTE CAST</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row justify-between h-[480px] pt-2 items-center">
                    <div className="w-[60%] flex flex-col justify-between h-full">
                        <div className="w-full border h-[66%] rounded-[15px] bg-white shadow-lg">
                            <DynamicBarChart title={"Registered participants by state"} labels={nigeriaStates} dataList={stateData} individualLabel={'Participants'}/>
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
                            { registeredParticipants.map( (user, index) => {
                                return (
                                    <div key={index} onClick={()=>{handleProfileSelection(user?.id)}} className="w-full flex flex-row justify-between cursor-pointer hover:bg-gray-100 transition-all duration-200 ease-in-out p-2 rounded-[10px] items-center">
                                        <div className="flex items-center flex-row justify-start gap-2 flex-grow">
                                            <ProfileIcon size={'50px'} bg={'gray'}/>
                                            <div className="flex flex-col text-[13px] leading-tight mt-2">
                                                <span className="text-[12px] font-bold">{user?.fullname}</span>
                                                <div className="flex flex-row gap-1 items-center">
                                                    <span className="text-[11px] text-gray-500">{user?.hasSubmitted?'Submitted ' : <span className="text-red-500">Not Submitted</span>}</span>
                                                    <span className="text-[11px] text-gray-500">{user?.hasSubmitted?<Check color="green" size={10}/> : <X color="red" size={10}/>}</span>
                                                </div>
                                                <span className="text-[11px] text-gray-500">{ user?.createdAt }</span>
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
                    <SANRS_profile_modal profileToBeViewed={profileToBeViewed} closeModal={()=>{setShowProfileModal(false)}}/>
                )}
            </div>
        )}
        </>
    );
}

export default SANRS_stat;
