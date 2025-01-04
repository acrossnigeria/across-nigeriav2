import UnderCIcon from "@/components/admin-components/graphics/UnderCIcon";
import Container from "@/components/admin-components/Container";
import { getSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import CycleLoader from "@/components/CycleLoader";


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

export default function Gqrs( { user }) {
    const [ selectedWinners, setSelectedWinners ] = useState(null);
    const [ isGenDataSaved, setIsGenDataSaved ] = useState(false);
    const [ isSavingData, setIsSavingData ] = useState(false);
    const [ isAvailable, setIsAvailable ] = useState(false);
    const [ errorOccured, setErrorOccured ] = useState(false);
    const [ genLoading, setGenLoading ] = useState(false)
    const [ genError, setGenError ] = useState(false);

    function getThisMonth() {
       const today = new Date();
       const months = [ 'Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
       const month = months[today.getMonth()];
       return month;
    }

    function getThisYear() {
        const today = new Date();
        const year = today.getFullYear();
        return year;
    }

    const genWinners = async () => {
        setGenLoading(true);
        setGenError(false);
       try {
            const response = await axios.get( '/api/admin/genGiveawayQuizWinners?type=generateWinners');
            if (response.data.success) {
                setSelectedWinners(response.data.winners);
                setGenLoading(false);
            } else {
                setIsAvailable(true); //show winners has already been generated 
                setGenLoading(false);
            }
       } catch(err) {
            setGenLoading(false);
            setGenError(true); //display error message
       }

    }

    async function saveWinners() {
        setIsSavingData(true);
        const data = {
            quizSession: `${getThisMonth()}${getThisYear()}`,
            winners: selectedWinners,
        }

        try {
            const response = await axios.post(`/api/genGiveawayQuizWinners?type=saveWinners`, data);
            if (response.data.success) {
                setIsSavingData(false);
                setIsGenDataSaved(true);
            }
        } catch( err) {
            setIsSavingData(false);
            setIsGenDataSaved(false);
        }
    }

    async function getWinners(quizSession) {

    }

    return (
        <div>
            <Container admin={user} page={'gqrs'}>
                <div className="h-screen md:w-[100%] gap-3 flex flex-col items-center">
                    <span className="text-[25px] font-extralight mt-2 text-left ml-2">Giveaway Quizzes winners selector algorithm</span>
                { isAvailable ? (
                    <div>
                        <span>winners table</span>
                    </div>
                    ) : (
                        <div>
                            <div className="">
                                { selectedWinners ? (
                                    <div className="flex flex-row justify-center border gap-2">
                                        <button onClick={saveWinners} disabled={isGenDataSaved || isSavingData} className={`bg-transparent flex flex-row border-1 border-gray-600 justify-center rounded-[5px] text-gray-800 hover:bg-gray-400 items-center w-[200px] h-[35px]`}>{isSavingData?'Loading':(isGenDataSaved?'Saved':'Save')}</button>
                                        <button className={`bg-transparent flex flex-row border-1 border-gray-600 justify-center rounded-[5px] text-gray-800 hover:bg-gray-400 items-center w-[200px] h-[35px]`}>Notify winners</button>
                                        <button className={`bg-transparent flex flex-row border-1 border-gray-600 justify-center rounded-[5px] text-gray-800 hover:bg-gray-400 items-center w-[200px] h-[35px]`}>Send credit notifications</button>
                                    </div>
                                ): (
                                    <div className="flex flex-col gap-3 items-center h-fit border mt-[20px]">
                                        <button onClick={genWinners} disabled={genLoading} className={`bg-transparent flex flex-row border-1 border-gray-600 justify-center rounded-[5px] text-gray-800 ${!genLoading && 'hover:bg-gray-400'} items-center w-[200px] h-[35px]`}>{genLoading?'Loading...':'Generate winners'}</button>
                                        { !genLoading && <span>No winners selected</span> }  
                                    </div>
                                )}
                            </div>
                            { genLoading && <div className="flex flex-row justify-center mt-[50px]"><CycleLoader/></div>}
                            { selectedWinners && 
                                <div className="flex flex-col pt-3 gap-3">
                                    <span>Total selected winners: {selectedWinners.length}</span>
                                    <div className="md:w-fit overflow-scroll h-[400px]">
                                        <div className="w-full flex flex-row text-[13px] h-[30px] gap-0.5">
                                            <div className="flex w-[140px] flex-row bg-gray-500 text-white justify-start items-center pl-1">Fullname</div>
                                            <div className="flex w-[140px] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1">Plays</div>
                                            <div className="flex w-[140px] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1">Residence</div>
                                            <div className="flex w-[200px] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1"> Email</div>
                                            <div className="flex w-[140px] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1">Phone</div>
                                        </div>
                
                                        { selectedWinners.length > 0 ? (
                                            selectedWinners.map( (user, userIndex ) => {
                                                return (
                                                    <div key={user.userId} className={`w-full flex flex-row gap-0.5 text-[13px] h-[30px]`}>
                                                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[140px] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>{user.fullname}</div>
                                                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[140px] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>{user.plays}</div>
                                                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[140px] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>{user.residence}</div>
                                                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[200px] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}> {user.email}</div>
                                                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[140px] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>+{user.phone}</div>
                                                    </div>
                                                    )
                                            }) 
                                        ) : (
                                            <div className="w-full text-center mt-5">No user found.</div>
                                        )
                                    }
                                    </div>
                                </div>
                            } 
                            { genError && 
                                <div className="text-[14px] mt-[50px]">
                                    <span className="text-red-600">An error occured please check your internet connection and try again</span>
                                </div>
                            }
                        </div>
                    )
                }
                </div>
            {/* <div className="h-screen md:w-[100%] gap-3 border-1 flex flex-col pt-[250px] items-center">
                <UnderCIcon/>
                <span>Page is still under construction</span>
            </div> */}
            </Container> 
        </div>
    )
}
