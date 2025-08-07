import Container from "@/components/admin-components/Container";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import CycleLoader from "@/components/CycleLoader";
import ListSheet from "@/components/ListSheet";

const pro = [ 'Jan2025', 'Dec2025']


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
    const [ gettingPresentSession, setGettingPresentSession ] = useState(false);
    const [ errorOccured, setErrorOccured ] = useState(false);
    const [ genLoading, setGenLoading ] = useState(false)
    const [ genError, setGenError ] = useState(false);
    const [ history, setHistory ] = useState(null);
    const [ presentSheet, setPresentSheet ] = useState(`${getThisMonth()}${getThisYear()}`);
    

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
        const quizSession = `${getThisMonth()}${getThisYear()}`;
       try {
            const response = await axios.get( `/api/admin/genGiveawayQuizWinners?type=generateWinners&quizSession=${quizSession}`);
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
            setSelectedWinners(null);
       }

    }

    async function saveWinners() {
        setIsSavingData(true);
        const data = {
            quizSession: `${getThisMonth()}${getThisYear()}`,
            winners: selectedWinners,
        }

        try {
            const response = await axios.post(`/api/admin/genGiveawayQuizWinners?type=saveWinners`, data);
            if (response.data.success) {
                setIsSavingData(false);
                setIsGenDataSaved(true);
            }
        } catch( err) {
            setIsSavingData(false);
            setIsGenDataSaved(false);
        }
    }

    async function getWinners(session) {
        const quizSession = session ? session : `${getThisMonth()}${getThisYear()}`;
        setGettingPresentSession(true);
        setPresentSheet(quizSession);
        setSelectedWinners(null);
       try {
         const response = await axios.get(`/api/admin/genGiveawayQuizWinners?type=getWinners&quizSession=${quizSession}`);
         if (response.data.available) {
            setSelectedWinners(response.data.winners.winners);
            setIsAvailable(true);
         } else {
            setIsAvailable(false);
         }
         setGettingPresentSession(false);
       } catch (err) {
          setErrorOccured(true);
          setGettingPresentSession(false);
       }
    }

    async function getHistory() {
       try {
        const response = await axios.get('/api/admin/genGiveawayQuizWinners?type=getHistory');
        const todayIsExcluded = !response.data.history.includes(`${getThisMonth()}${getThisYear()}`)
            setHistory( [ ...response.data.history, (todayIsExcluded && `${getThisMonth()}${getThisYear()}`) ]);
       } catch(err) {
            setErrorOccured(true);
       }
    }

    useEffect( () => {
        getHistory();
        getWinners();
    }, [])

    return (
        <div>
            <Container admin={user} page={'gqrs'}>
                <div className="h-screen md:w-[100%] gap-3 flex flex-col">
                    <span className="text-[15px] font-bold mt-2 text-left ml-[3%]">Giveaway Quizzes winners selector algorithm</span>
                    <div className="flex items-center flex-row ml-[3%] gap-3">
                        <span className="font-bold text-[14px]">History :</span>
                        {history? (
                            <div className="flex flex-row gap-2">
                                { history.map( str => <button key={str} disabled={presentSheet===str} onClick={()=>{getWinners(str)}} className={`bg-transparent flex flex-row border-1 ${presentSheet===str?'border-blue-600':'border-gray-600'} justify-center rounded-[25px] text-gray-800 hover:bg-gray-400 items-center w-[130px] h-[30px]`}>{str}</button>)}
                            </div>
                        ) : (
                            <div className="flex flex-row gap-2">
                                <div className="animate-pulse justify-center rounded-[25px] bg-gray-400 w-[130px] h-[30px]"></div>
                                <div className="animate-pulse justify-center rounded-[25px] bg-gray-400 w-[130px] h-[30px]"></div>
                                <div className="animate-pulse justify-center rounded-[25px] bg-gray-400 w-[130px] h-[30px]"></div>
                            </div>
                        )}
                        
                    </div>
                    { errorOccured ? (
                        <div className="text-[14px] mt-[50px]">
                            <span className="text-red-600">An error occured please check your internet connection and try again</span>
                            <button className={`bg-transparent flex flex-row border-1 mt-[20px] border-gray-600 justify-center rounded-[5px] text-gray-800 hover:bg-gray-400 items-center w-[130px] h-[35px]`} onClick={getWinners}>Retry</button>
                        </div> 
                    ): ( gettingPresentSession ? ( <div className="flex flex-row justify-center h-[200px] mt-[50px]"><CycleLoader size={'25px'}/></div> 
                    ) : ( isAvailable ? (
                        <div className="flex w-[96%] mx-auto flex-col pt-3 gap-3">
                            <span>Total selected winners: {selectedWinners.length}</span>
                            <ListSheet list={selectedWinners}/>
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
                                            <ListSheet list={selectedWinners}/>
                                        </div>
                                    } 
                                    { genError && 
                                        <div className="text-[14px] mt-[50px]">
                                            <span className="text-red-600">An error occured please check your internet connection and try again</span>
                                        </div>
                                    }
                                </div>
                            )       
                    )
                    )}
                
                </div>
            {/* <div className="h-screen md:w-[100%] gap-3 border-1 flex flex-col pt-[250px] items-center">
                <UnderCIcon/>
                <span>Page is still under construction</span>
            </div> */}
            </Container> 
        </div>
    )
}
