import { useEffect, useState } from "react";
import axios from "axios";
import ProcessLoader from "@/components/ui/ProcessLoader"; 
import { ChevronLeft, ChevronRight } from "lucide-react";


export default function Users() {
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
            const flattenedData = response.data.users.flat(Infinity);
            setUsers(flattenedData);
            setResult(flattenedData);
            setPageSize(response.data.users.length >= 15 ? 15 : 12);
            setReminderPageSize(response.data.users.length % 15);
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
            if ( pageSize + 15 > results.length) {
                setPageSize(users.length)
            } else {
                setPageSize(pageSize+15)  
            }

        }
    }
    function prevPage() {
        if (pageSize===results.length) {
            setPageSize(pageSize-reminderPageSize);
        } else if (pageSize>15) {
            setPageSize(pageSize-15);
        }
    }

    return (
            <div className="">
                <div className="mb-3 flex md:flex-row flex-col md:justify-start justify-center items-center gap-3">
                    <div className="flex flex-row gap-1">
                        <input value={searchKey} onChange={(e)=>{setSearchKey(e.target.value);searchRelated(e.target.value.toLocaleLowerCase());}}  className="h-[30px] focus:outline-none bg-transparent border-1 rounded-[7px] border-gray-600 px-3" type="text" placeholder="Search user by name"/> 
                        <button onClick={searchRelated} className="h-[30px] hover:bg-gray-300 bg-transparent border-1 w-[50px] rounded-[7px] border-gray-600">Go</button>
                    </div>
                    <div className={`${showNavs?'':'hidden'} flex gap-4 flex-row justify-center items-center`}>
                        <div className="border-1 border-gray-600 flex flex-row rounded-[5px]">
                            <button onClick={prevPage} className="h-[30px] flex flex-row justify-center items-center border-l-1 hover:bg-gray-300 border-gray-600 w-[50px]"><ChevronLeft size={'20px'} color={'#6b7280'}/></button>
                            <button onClick={nextPage} className="h-[30px] flex flex-row justify-center hover:bg-gray-300 items-center w-[50px]"><ChevronRight size={'20px'} color={'#6b7280'}/></button>
                        </div>
                        <span className="h-[40px] flex flex-row justify-center items-center">Showing results {pageSize-15<0?0:pageSize-15} to {pageSize}</span>      
                    </div>
                
            
                </div>
                <div className="flex w-full mx-auto">
                    { results ? (
                    <div className="w-[100%] h-[450px]">
                        <div className="w-full flex flex-row text-[11px] h-[30px] gap-0.5">
                            <div className="flex w-[12.5%] flex-row bg-green-700 rounded-tl-[7px] text-white justify-start items-center pl-1">Fullname</div>
                            <div className="flex w-[12.5%] overflow-x-hidden flex-row bg-green-700 text-white justify-start items-center pl-1">Date of birth</div>
                            <div className="flex w-[12.5%] overflow-x-hidden flex-row bg-green-700 text-white justify-start items-center pl-1">Residence</div>
                            <div className="flex w-[12.5%] overflow-x-hidden flex-row bg-green-700 text-white justify-start items-center pl-1"> Email</div>
                            <div className="flex w-[12.5%] overflow-x-hidden flex-row bg-green-700 text-white justify-start items-center pl-1">Phone</div>
                            <div className="flex w-[12.5%] overflow-x-hidden flex-row bg-green-700 text-white justify-start items-center pl-1">Gender</div>
                            <div className="flex w-[12.5%] overflow-x-hidden flex-row bg-green-700 text-white justify-start items-center pl-1">Referrals</div>
                            <div className="flex w-[12.5%] overflow-x-hidden flex-row bg-green-700 rounded-tr-[7px] text-white justify-start items-center pl-1">JoinedAt</div>
                        </div>

                        { results.length > 0 ? (
                            results.map( (user, userIndex ) => {
                            if ( userIndex < pageSize && userIndex >= (pageSize===results.length? pageSize - reminderPageSize: pageSize-15)) {
                                return (
                                    <div key={user._id} className={`w-full flex flex-row gap-0.5 text-[11px] h-[30px]`}>
                                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[12.5%] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>{user.fullname}</div>
                                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[12.5%] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>{user.dob}</div>
                                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[12.5%] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>{user.residence}</div>
                                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[12.5%] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}> {user.email}</div>
                                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[12.5%] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>{user.phone}</div>
                                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[12.5%] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>{user.gender}</div>
                                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[12.5%] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>{user.referrals}</div>
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
                    <div className="h-[450px] w-full flex flex-col justify-center items-center">
                        <ProcessLoader size={'30px'}/>
                        <span className="text-gray-500 text-[12px]">Loading users...</span>
                    </div>
                )}
            </div>
            </div>

    )

}
