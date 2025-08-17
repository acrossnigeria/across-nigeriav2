import Container from "@/components/admin-components/Container";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import BarChart from "@/components/admin-components/BarChart";
import PieChart from "@/components/admin-components/PieChart";
import AllUsersIcon from "@/components/admin-components/graphics/AllUsersIcon";
import axios from "axios";
import NewIcon from "@/components/admin-components/graphics/NewIcon";


export async function  getServerSideProps(context) {
    const session = await getSession(context);

    if ( !session || !session?.user?.isAdmin) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        };
    };

    return { props: { user: session?.user } };
    
}

export default function Dashboard( { user } ) {
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
                backgroundColor: [ 'gray', '#f97316 '], 
            }
        ]
    }
    const ageDataProtoType = {
        labels: [ '18-24', '25-34', '35-44', '45 & above'],
        datasets: [
            {
                label:'Users',
                data:ageData?.list,
                backgroundColor: [ '#facc15', '#f97316', '#2563eb', '#16a34a '], 
            }
        ]
    }

    return (
        <Container admin={user} page={'dashboard'}>
            <div className="text-[16px] font-bold ml-3 mt-[3%]">Performance</div>
            <div className="flex md:flex-row flex-col justify-evenly items-center md:gap-0 gap-1 pt-[10px]">
                <div className="bg-blue-600 flex rounded-[5px] flex-row justify-around items-center h-[70px] p-2 md:w-[53%] w-[98%] text-white">
                    <AllUsersIcon/>
                    <div className="flex flex-col items-center">
                        <span className={`text-[19px] ${stats?.totalUsers?'':'animate-pulse'} font-extralight`}>{stats?.totalUsers?stats?.totalUsers:'loading...'}</span>
                        <span>TOTAL USERS</span>
                    </div>
                </div>
                <div className="bg-yellow-400 rounded-[5px]  flex flex-row justify-around items-center h-[70px] p-2 md:w-[45%] w-[98%] text-white">
                    <NewIcon/>
                    <div className="flex flex-col justify-center items-center">
                        <span className={`text-[19px] ${newUsers?'':'animate-pulse'} font-extralight`}>{newUsers?newUsers.length:'loading...'}</span>
                        <span>NEW USERS</span>
                    </div>
                    <span className="text-[12px]"> In the Last 5 Days</span>
                </div>
            </div>
            <div className="text-[16px] font-bold ml-3 mt-4">Charts</div>
            <div className="flex md:flex-row flex-col md:gap-0 gap-2 border-1 py-[10px] justify-evenly">
                <div className="md:w-[53%] w-[98%]">
                    <BarChart  data={stateData}/>
                </div>
                <div className="md:w-[22%] w-[98%] h-[460px] flex p-2 flex-col items-center rounded-[5px]  border-1 bg-white">
                   <PieChart data={genderDataPrototype}/>
                   { genderData ? (
                        <div className="flex border-1 w-[100%] text-[14px] border-gray-500 flex-col mt-[20px] font-extralight">
                            <div className="border-b-1 flex-row flex border-gray-500 bg-gray-300">
                                <div className="w-[35%] pl-1">Metric</div>
                                <div className="w-[65%] border-l-1 border-gray-500 pl-1">Value</div>
                            </div>

                            <div className="border-b-1 flex-row flex border-gray-500 text-gray-700">
                                <div className="w-[35%] pl-1">Gender Breakdown</div>
                                <div className="w-[65%] border-l-1 border-gray-500 pl-1">{`Male: ${genderData[0]} (${Math.floor((genderData[0]/stats.totalUsers)*100)}%), Female: ${genderData[1]} (${Math.floor((genderData[1]/stats.totalUsers)*100)}%)`}</div>
                            </div>
                            <div className="border-b-1 flex-row flex border-gray-500 text-gray-700">
                                <div className="w-[35%] pl-1">Majority Gender</div>
                                <div className="w-[65%] border-l-1 border-gray-500 pl-1">{genderData[0]>genderData[1]?'Male':'Female'}</div>
                            </div>
                        </div>
                   ):(
                    <div className="h-[100px] w-[100%] bg-gray-300 animate-pulse"></div>
                   )}
                   
                </div>
                <div className="md:w-[22%] w-[98%] h-[460px] flex flex-col pt-[10px] rounded-[5px]  items-center bg-white border-1 p-2">
                    <PieChart data={ageDataProtoType}/>
                    { ageData? (
                        <div className="flex border-1 w-[100%] border-gray-500 text-[14px] flex-col mt-[10px] font-extralight">
                            <div className="border-b-1 flex-row flex border-gray-500 bg-gray-300">
                                <div className="w-[35%] pl-1">Metric</div>
                                <div className="w-[65%] border-l-1 border-gray-500 pl-1">Value</div>
                            </div>

                            <div className="border-b-1 flex-row flex border-gray-500 text-gray-700">
                                <div className="w-[35%] pl-1">Top age group</div>
                                <div className="w-[65%] border-l-1 border-gray-500 pl-1">{`${ageData?.highestAgeGroup?.group} : ${ ageData?.highestAgeGroup?.age} (${Math.floor((ageData?.highestAgeGroup?.age/stats.totalUsers)*100)}%)`}</div>
                            </div>
                            <div className="border-b-1 flex-row flex border-gray-500 text-gray-700">
                                <div className="w-[35%] pl-1">18-24</div>
                                <div className="w-[65%] border-l-1 border-gray-500 pl-1">{`${ ageData?.list[0]} (${Math.floor((ageData?.list[0]/stats.totalUsers)*100)}%) users`}</div>
                            </div>
                            <div className="border-b-1 flex-row flex border-gray-500 text-gray-700">
                                <div className="w-[35%] pl-1">25-34</div>
                                <div className="w-[65%] border-l-1 border-gray-500 pl-1">{`${ ageData?.list[1]} (${Math.floor((ageData?.list[1]/stats.totalUsers)*100)}%) users`}</div>
                            </div>
                            <div className="border-b-1 flex-row flex border-gray-500 text-gray-700">
                                <div className="w-[35%] pl-1">34-44</div>
                                <div className="w-[65%] border-l-1 border-gray-500 pl-1">{`${ ageData?.list[2]} (${Math.floor((ageData?.list[2]/stats.totalUsers)*100)}%) users`}</div>
                            </div>
                            <div className="border-b-1 flex-row flex border-gray-500 text-gray-700">
                                <div className="w-[35%] pl-1">44 above</div>
                                <div className="w-[65%] border-l-1 border-gray-500 pl-1">{`${ ageData?.list[3]} (${Math.floor((ageData?.list[3]/stats.totalUsers)*100)}%) users`}</div>
                            </div>
                        </div>
                    ):(
                        <div className="h-[100px] w-[100%] bg-gray-300 animate-pulse"></div>
                    )}
                </div>
            </div>
            {/* <div className="h-screen md:w-[100%] border-1 gap-3 flex flex-col pt-[250px] items-center">
                <UnderCIcon/>
                <span>Page is still under construction</span>
            </div> */}
        </Container>
    )
}