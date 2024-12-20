const { default: Container } = require("@/components/admin-components/Container");
import { useEffect, useState } from "react";
import axios from "axios";
import CycleLoader from "@/components/CycleLoader";
import Next from "../../../public/images/icon/Next";
import { getSession } from "next-auth/react";


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


export default function Users( { user } ) {
    const [ users, setUsers ] = useState(null);
    const [ pageSize, setPageSize ] = useState(0);
    const [ results, setResult ] = useState(null);
    const [ searchKey, setSearchKey ] = useState('');
    const [ reminderPageSize, setReminderPageSize ] = useState(0);
    const [ showNavs, setShowNavs ] = useState(true);


    function formatDate(date) {
        const dateObj = new Date(date);
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit'};
        const brokenDateStr = dateObj.toLocaleDateString('en-US', options).split(', ');
        const formatedDate = `${brokenDateStr[0]} ${brokenDateStr[1]} ${brokenDateStr[2]}`
        return formatedDate;
    }

    async function getUsers() {
        try {
            const response = await axios.get('/api/admin/getUsers');
            setUsers(response.data.users);  
            setResult(response.data.users);
            setPageSize(response.data.users.length >= 13 ? 13 : 12);
            setReminderPageSize(response.data.users.length % 13);
        } catch(err) {
            console.log(err.message);
        }
    }

    function searchRelated( key ) {
        if (results) {
            if (key==='') {
                setShowNavs(true);
                setResult(users);
            } else {
                setShowNavs(false);
                const newResult = users.filter( user => user.fullname.includes(key));
                setResult(newResult);
            } 
        }

    }

    useEffect( () => {
       getUsers();
    }, [])

    function nextPage() {
        if (pageSize<users.length) {
            if ( pageSize + 13 > results.length) {
                setPageSize(users.length)
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

    return (
        <Container admin={user}>
            <div className=" p-2 h-screen">
                <div className="text-[40px] md:text-left text-center w-[100%] text-gray-800 font-light">Users</div>
                <div className="mb-3 flex md:flex-row flex-col md:justify-start justify-center items-center gap-3">
                    <div className="flex flex-row gap-1">
                        <input value={searchKey} onChange={(e)=>{setSearchKey(e.target.value);searchRelated(e.target.value.toLocaleLowerCase());}}  className="h-[40px] focus:outline-none bg-transparent border-1 rounded-[5px] border-gray-600 px-3" type="text" placeholder="Search user by name"/> 
                        <button onClick={searchRelated} className="h-[40px] hover:bg-gray-300 bg-transparent border-1 w-[50px] rounded-[5px] border-gray-600">Go</button>
                    </div>
                    <div className={`${showNavs?'':'hidden'} flex gap-4 flex-row justify-center items-center`}>
                        <div className="border-1 border-gray-600 flex flex-row rounded-[5px]">
                            <button onClick={prevPage} className="h-[38px] flex flex-row justify-center items-center rotate-180 border-l-1 hover:bg-gray-300 border-gray-600 w-[50px]"><Next size={'15px'} bg={'#6b7280'}/></button>
                            <button onClick={nextPage} className="h-[38px] flex flex-row justify-center hover:bg-gray-300 items-center w-[50px]"><Next size={'15px'} bg={'#6b7280'}/></button>
                        </div>
                        <span className="h-[40px] flex flex-row justify-center items-center">Showing results {pageSize-13<0?0:pageSize-13} to {pageSize}</span>      
                    </div>
                
            
                </div>
                { results ? (
                    <div className="md:overflow-hidden overflow-scroll h-[450px]">
                        <div className="w-full grid grid-flow-col grid-rows-1 text-[13px] h-[30px] gap-1">
                            <div className="flex w-[150px] flex-row bg-gray-500 text-white justify-start items-center pl-1">Fullname</div>
                            <div className="flex w-[150px] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1">Date of birth</div>
                            <div className="flex w-[150px] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1">Residence</div>
                            <div className="flex w-[150px] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1"> Email</div>
                            <div className="flex w-[150px] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1">Phone</div>
                            <div className="flex w-[150px] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1">Gender</div>
                            <div className="flex w-[80px] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1">Referrals</div>
                            <div className="flex w-[150px] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1">JoinedAt</div>
                        </div>

                        {results.map( (user, userIndex ) => {
                            if ( userIndex < pageSize && userIndex >= (pageSize===results.length? pageSize - reminderPageSize: pageSize-13)) {
                                return (
                                    <div key={user._id} className="w-full grid grid-flow-col grid-rows-1 text-[13px] h-[30px] gap-1">
                                        <div className="flex w-[150px] overflow-x-hidden flex-row bg-gray-300 mt-1 text-black justify-start items-center pl-1">{user.fullname}</div>
                                        <div className="flex w-[150px] overflow-x-hidden flex-row bg-gray-300 mt-1 text-black justify-start items-center pl-1">{user.dob}</div>
                                        <div className="flex w-[150px] overflow-x-hidden flex-row bg-gray-300 mt-1 text-black justify-start items-center pl-1">{user.residence}</div>
                                        <div className="flex w-[150px] overflow-x-hidden flex-row bg-gray-300 mt-1 text-black justify-start items-center pl-1"> {user.email}</div>
                                        <div className="flex w-[150px] overflow-x-hidden flex-row bg-gray-300 mt-1 text-black justify-start items-center pl-1">{user.phone}</div>
                                        <div className="flex w-[150px] overflow-x-hidden flex-row bg-gray-300 mt-1 text-black justify-start items-center pl-1">{user.gender}</div>
                                        <div className="flex w-[80px] overflow-x-hidden flex-row bg-gray-300 mt-1 text-black justify-start items-center pl-1">{user.referrals}</div>
                                        <div className="flex w-[150px] overflow-x-hidden flex-row bg-gray-300 mt-1 text-black justify-start items-center pl-1">{formatDate(user.joinedAt)}</div>
                                    </div>
                            )
                            }
                            }
                        )}
                    </div>
                ) : (
                    <div className="h-[450px] w-full flex flex-col justify-center items-center"><CycleLoader/></div>
                )}
            </div>
        </Container>
    )

}
