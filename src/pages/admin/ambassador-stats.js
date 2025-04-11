import Container from "@/components/admin-components/Container";
import ListSheet2 from "@/components/ListSheet2";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import CycleLoader from "@/components/CycleLoader";
import Next from "../../../public/images/icon/Next";

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


const Amb = ( { user }) => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ data, setData ] = useState([]);
    const [ isErrorOccurred, setIsErrorOccurred ] = useState(false);
    const [ errorType, setErrorType ] = useState('Unknown error');

    const [ allAmbassadors, setAllAmbassadors ] = useState([]);
    const [ pageSize, setPageSize ] = useState(0);
    const [ results, setResult ] = useState(null);
    const [ searchKey, setSearchKey ] = useState('');
    const [ reminderPageSize, setReminderPageSize ] = useState(0);
    const [ showNavs, setShowNavs ] = useState(true);

    async function getTopAmbassadors() {
        setIsLoading(true);
        try {
            const response = await axios.get('/api/ambassador/getAmbassadors');
            if (response.data.success) {
                setData(response.data.list);
            } else {
                setIsErrorOccurred(true);
                setErrorType(`Error of type: ${response.data.error}`);
            }
        } catch (err) {
            setIsErrorOccurred(true);
            setErrorType(`Error of type: ${err.message}`);
        }
        setIsLoading(false);
    }

    async function getAllAmbassadors() {
        try {
            const response = await axios.get('/api/ambassador/adduser');
            setAllAmbassadors(response.data.list);
            setResult(response.data.list);
            setPageSize(response.data.list.length >= 13 ? 13 : 12);
            setReminderPageSize(response.data.list.length % 13);
        } catch(err) {
            console.log('something went wrong while trying to get ambassadors data');
        }
    }


    async function refreshAmbassadorList() {
        setIsLoading(true);
        try {
            const response = await axios.patch('/api/ambassador/getAmbassadors');
            if (response.data.success) {
                setData(response.data.list);
            } else {
                setIsErrorOccurred(true);
                setErrorType(`Error of type: ${response.data.error}`);
            }
        } catch (err) {
            setIsErrorOccurred(true);
            setErrorType(`Error of type: ${err.message}`);
        }
        setIsLoading(false);
    }

    useEffect( ()=> {
        getTopAmbassadors();
        getAllAmbassadors();
    }, [])

    function nextPage() {
        if (pageSize<allAmbassadors.length) {
            if ( pageSize + 13 > results.length) {
                setPageSize(allAmbassadors.length)
            } else {
                setPageSize(pageSize+13)  
            }

        }
    }
    function prevPage() {
        if (pageSize===results.length) {
            setPageSize(pageSize-reminderPageSize);
        } else if (pageSize>13) {
            setPageSize(pageSize-13);
        }
    }

    function searchRelated( key ) {
        if (results) {
            if (key==='') {
                setShowNavs(true);
                setResult(allAmbassadors);
            } else {
                setShowNavs(false);
                const newResult = allAmbassadors.filter( user => user.fullname.includes(key));
                setResult(newResult);
            } 
        }

    }

    function formatDate(date) {
        const dateObj = new Date(date);
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit'};
        const brokenDateStr = dateObj.toLocaleDateString('en-US', options).split(', ');
        const formatedDate = `${brokenDateStr[0]} ${brokenDateStr[1]} ${brokenDateStr[2]}`
        return formatedDate;
    }

    return (
        <Container admin={user} page={'amb'}>
            <div className="h-fit flex flex-col overflow-visible">
                <div className="w-[100%]">
                    <div className="flex flex-row  gap-2 mt-[20px] ml-[3%] items-center">
                        <span className="text-[14px] font-bold">Top 5 Ambassadors List</span>
                        <button disabled={isLoading} onClick={refreshAmbassadorList} className={`bg-transparent cursor-pointer flex flex-row border-1 border-gray-600 justify-center rounded-[25px] text-gray-800 hover:bg-gray-400 items-center w-[130px] h-[30px]`}>{isLoading?'Loading...':'Refresh'}</button>
                    </div>
                    <div className="mt-[20px] mx-auto w-[96%] h-fit">
                        { isLoading && (
                            <div className="w-[100%] h-[150px] flex flex-col justify-center items-center">
                                <CycleLoader size={'25px'}/>
                            </div>
                        )}
                        { (!isLoading && !isErrorOccurred) && ( <ListSheet2 list={data}/> )}
                    </div>
                </div>

                <span className="ml-[3%] mt-[20px] text-[14px] font-bold">All Ambassadors</span>
                <div className="mb-3 ml-[3%] flex mt-[10px] md:flex-row flex-col md:justify-start justify-center items-center gap-4">
                    <div className="flex flex-row justify-center items-center gap-2">
                        <input value={searchKey} onChange={(e)=>{setSearchKey(e.target.value);searchRelated(e.target.value.toLocaleLowerCase());}}  className="h-[30px] focus:outline-none bg-transparent border-1 rounded-[25px] border-gray-600 px-3" type="text" placeholder="Search user by name"/> 
                        <button onClick={searchRelated} className="h-[30px] hover:bg-gray-300 bg-transparent border-1 w-[50px] rounded-[25px] border-gray-600">Go</button>
                    </div>
                    <div className={`${showNavs?'':'hidden'} flex gap-4 flex-row justify-center items-center`}>
                        <div className="border-1 border-gray-600 flex flex-row rounded-[5px]">
                            <button onClick={prevPage} className="h-[30px] flex flex-row justify-center items-center rotate-180 border-l-1 hover:bg-gray-300 border-gray-600 w-[50px]"><Next size={'15px'} bg={'#6b7280'}/></button>
                            <button onClick={nextPage} className="h-[30px] flex flex-row justify-center hover:bg-gray-300 items-center w-[50px]"><Next size={'15px'} bg={'#6b7280'}/></button>
                        </div>
                        <span className="h-[40px] flex flex-row justify-center items-center">Showing results {pageSize-13<0?0:pageSize-13} to {pageSize}</span>      
                    </div>
            
                </div>
                { results ? (
                    <div className="w-[96%] overflow-hidden mx-auto text-[11px] h-fit mb-[100px]">
                        <div className="w-full flex flex-row h-[30px] gap-0.5">
                            <div className="flex w-[12.5%] flex-row bg-gray-500 text-white justify-start items-center pl-1">Fullname</div>
                            <div className="flex w-[7.5%] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1">Status</div>
                            <div className="flex w-[17.5%] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1">Institute</div>
                            <div className="flex w-[7.5%] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1"> Residence</div>
                            <div className="flex w-[17.5%] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1">City</div>
                            <div className="flex w-[17.5%] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1">Email</div>
                            <div className="flex w-[7.5%] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1">Referrals</div>
                            <div className="flex w-[12.5%] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1">JoinedAt</div>
                        </div>

                        { results.length > 0 ? (
                            results.map( (user, userIndex ) => {
                            if ( userIndex < pageSize && userIndex >= (pageSize===results.length? pageSize - reminderPageSize: pageSize-13)) {
                                return (
                                    <div key={user._id} className={`w-full flex flex-row gap-0.5 h-[30px]`}>
                                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[12.5%] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>{user.fullname}</div>
                                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[7.5%] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>{user.status}</div>
                                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[17.5%] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>{user.orgName}</div>
                                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[7.5%] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}> {user.residence}</div>
                                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[17.5%] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>{user.city}</div>
                                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[17.5%] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>{user.email}</div>
                                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[7.5%] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>{user.refs}</div>
                                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[12.5%] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>{formatDate(user.joinedAt)}</div>
                                    </div>
                            )
                            }
                            }) 
                        ) : (
                            <div className="w-full text-center mt-5">No user found.</div>
                        )
                    }
                    </div>
                ) : (
                    <div className="h-[200px] w-full flex flex-col justify-center items-center"><CycleLoader size={'25px'}/></div>
                )}
            </div>
        </Container>
    )
}

export default Amb;