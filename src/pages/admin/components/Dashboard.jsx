import { useEffect, useState } from "react";
import BarChart from "@/components/admin-components/BarChart";
import PieChart from "@/components/admin-components/PieChart";
import AllUsersIcon from "@/components/admin-components/graphics/AllUsersIcon";
import axios from "axios";
import NewIcon from "@/components/admin-components/graphics/NewIcon";
import ShimmerLoader from "@/components/ui/ShimmerLoader";

export default function Dashboard( ) {
    const [ stats, setStats ] = useState(null);
    const [ newUsers, setNewUsers ] = useState(null);
    const [ stateData, setStateData ] = useState(null);
    const [ genderData, setGenderData ] = useState(null);
    const [ ageData, setAgeData ] = useState(null);


    async function getStatData() {
        try {
            const response = await axios.get('/api/admin/getStats');
            const data = response.data.stats;
            setStats(data);
            setNewUsers(data.newUsers);
            setStateData(data.stateData);
            setGenderData(data.genderData);
            setAgeData(data.ageData);
        } catch(err) {
            console.log(err.message);
        }
    }
    useEffect( () => {
        getStatData();
    }, [])

    const genderDataPrototype = {
        labels: [ 'Male', 'Female'],
        datasets: [
            {
                label:'Users',
                data:genderData,
                backgroundColor: [ 
                    "#59A14F",
                    "#EDC948"
                ], 
            }
        ]
    }
    const ageDataProtoType = {
        labels: [ '18-24', '25-34', '35-44', '45 & above'],
        datasets: [
            {
                label:'Users',
                data:ageData?.list,
                backgroundColor: [         
                    "#4E79A7",
                    "#F28E2B",
                    "#E15759",
                    "#76B7B2",
                ], 
            }
        ]
    }

    return (
        < >
            <div className="flex md:flex-row flex-col justify-between mb-3 items-center md:gap-0 gap-1">
                <div className="bg-gradient-to-tr from-green-700 to-green-500 flex rounded-[15px] flex-row justify-around items-center h-[70px] p-2 md:w-[59%] w-[98%] text-white">
                    <AllUsersIcon/>
                    <div className="flex flex-col items-center">
                        <span className={`text-[19px] ${stats?.totalUsers?'':'animate-pulse'} font-extralight`}>{stats?.totalUsers?stats?.totalUsers:'loading...'}</span>
                        <span>TOTAL USERS</span>
                    </div>
                </div>
                <div className="bg-gradient-to-tr from-gray-800 to-gray-400 rounded-[15px]  flex flex-row justify-around items-center h-[70px] p-2 md:w-[40%] w-[98%] text-white">
                    <NewIcon/>
                    <div className="flex flex-col justify-center items-center">
                        <span className={`text-[19px] ${newUsers?'':'animate-pulse'} font-extralight`}>{newUsers?newUsers.length:'loading...'}</span>
                        <span>NEW USERS</span>
                    </div>
                    <span className="text-[12px]"> In the Last 5 Days</span>
                </div>
            </div>
            <div className="flex md:flex-row flex-col md:gap-0 gap-2 justify-between">
                <div className="md:w-[59%] w-[98%] h-[470px]">
                    <BarChart  data={stateData}/>
                </div>
                <div className="md:w-[40%] w-[98%] flex flex-col gap-2">
                    <div className="w-full h-[230px] flex p-2 flex-row justify-between items-center rounded-[15px]  border-1 bg-white shadow-lg">
                    <PieChart data={genderDataPrototype}/>
                    { genderData ? (
                            <div className="flex w-[100%] border text-[13px] border-gray-500 rounded-[7px] flex-col mt-[20px] font-extralight">
                                <div className="flex-row flex rounded-t-[7px] bg-gray-300">
                                    <div className="w-[35%] p-1">Metric</div>
                                    <div className="w-[65%] border-l-1 border-gray-500 p-1">Value</div>
                                </div>

                                <div className="border-b-1 flex-row flex border-gray-500 text-gray-700">
                                    <div className="w-[35%] p-1">Gender</div>
                                    <div className="w-[65%] border-l-1 border-gray-500 p-1">{`Male: ${genderData[0]} (${Math.floor((genderData[0]/stats.totalUsers)*100)}%), Female: ${genderData[1]} (${Math.floor((genderData[1]/stats.totalUsers)*100)}%)`}</div>
                                </div>
                                <div className="border-b-1 flex-row flex rounded-b-[7px] border-gray-500 text-gray-700">
                                    <div className="w-[35%] p-1">Majority Gender</div>
                                    <div className="w-[65%] border-l-1 border-gray-500 p-1">{genderData[0]>genderData[1]?'Male':'Female'}</div>
                                </div>
                            </div>
                    ):(
                        <ShimmerLoader roundedness={'7px'} width={'100%'} height={'150px'} />
                    )}
                    
                    </div>
                    <div className="w-full h-[230px] flex flex-row justify-between rounded-[15px] border items-center bg-white p-2">
                        <PieChart data={ageDataProtoType}/>
                        { ageData? (
                            <div className="flex border-1 w-[100%] border-gray-500 rounded-[7px] text-[13px] flex-col mt-[10px] font-extralight">
                                <div className="flex-row flex rounded-t-[7px]  bg-gray-300">
                                    <div className="w-[35%] p-1">Metric</div>
                                    <div className="w-[65%] border-l-1 border-gray-500 p-1">Value</div>
                                </div>

                                <div className="border-b-1 flex-row flex border-gray-500 text-gray-700">
                                    <div className="w-[35%] p-1">Top age group</div>
                                    <div className="w-[65%] border-l-1 border-gray-500 p-1">{`${ageData?.highestAgeGroup?.group} : ${ ageData?.highestAgeGroup?.age} (${Math.floor((ageData?.highestAgeGroup?.age/stats.totalUsers)*100)}%)`}</div>
                                </div>
                                <div className="border-b-1 flex-row flex border-gray-500 text-gray-700">
                                    <div className="w-[35%] p-1">18-24</div>
                                    <div className="w-[65%] border-l-1 border-gray-500 p-1">{`${ ageData?.list[0]} (${Math.floor((ageData?.list[0]/stats.totalUsers)*100)}%) users`}</div>
                                </div>
                                <div className="border-b-1 flex-row flex border-gray-500 text-gray-700">
                                    <div className="w-[35%] p-1">25-34</div>
                                    <div className="w-[65%] border-l-1 border-gray-500 p-1">{`${ ageData?.list[1]} (${Math.floor((ageData?.list[1]/stats.totalUsers)*100)}%) users`}</div>
                                </div>
                                <div className="border-b-1 flex-row flex border-gray-500 text-gray-700">
                                    <div className="w-[35%] p-1">34-44</div>
                                    <div className="w-[65%] border-l-1 border-gray-500 p-1">{`${ ageData?.list[2]} (${Math.floor((ageData?.list[2]/stats.totalUsers)*100)}%) users`}</div>
                                </div>
                                <div className="border-b-1 flex-row flex border-gray-500 rounded-b-[7px] text-gray-700">
                                    <div className="w-[35%] p-1">44 above</div>
                                    <div className="w-[65%] border-l-1 border-gray-500 p-1">{`${ ageData?.list[3]} (${Math.floor((ageData?.list[3]/stats.totalUsers)*100)}%) users`}</div>
                                </div>
                            </div>
                        ):(
                            <ShimmerLoader roundedness={'7px'} width={'100%'} height={'150px'} />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}