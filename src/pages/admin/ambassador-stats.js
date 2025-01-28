import Container from "@/components/admin-components/Container";
import ListSheet2 from "@/components/ListSheet2";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
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

const tp = [ { fullname: 'Ali bayo', refs:'30', orgName:'Ahmadu bello university', status:'student', residence:'nasarawa', city:'Auta balefi', phone:'2349014349736', email:'example@email.com' },
            { fullname: 'Ali bayo', refs:'30', orgName:'Ahmadu bello university', status:'student', residence:'nasarawa', city:'Auta balefi', phone:'2349014349736', email:'example@email.com' },
            { fullname: 'Ali bayo', refs:'30', orgName:'Ahmadu bello university', status:'student', residence:'nasarawa', city:'Auta balefi', phone:'2349014349736', email:'example@email.com' },
            { fullname: 'Ali bayo', refs:'30', orgName:'Ahmadu bello university', status:'student', residence:'nasarawa', city:'Auta balefi', phone:'2349014349736', email:'example@email.com' },
            { fullname: 'Ali bayo', refs:'30', orgName:'Ahmadu bello university', status:'student', residence:'nasarawa', city:'Auta balefi', phone:'2349014349736', email:'example@email.com' },
          ]

const Amb = ( { user }) => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ data, setData ] = useState([]);
    const [ isErrorOccurred, setIsErrorOccurred ] = useState(false);
    const [ errorType, setErrorType ] = useState('Unknown error');

    async function getAmbassadors() {
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
        getAmbassadors();
    }, [])

    return (
        <Container admin={user} page={'amb'}>
            <div>
                <div className="pl-[20px]">
                    <div className="flex flex-row  gap-2 mt-[20px] items-center">
                        <span className="text-[20px] self-center font-extralight">Top 5 Ambassadors List</span>
                        <button disabled={isLoading} onClick={refreshAmbassadorList} className={`bg-transparent flex flex-row border-1 border-gray-600 justify-center rounded-[5px] text-gray-800 hover:bg-gray-400 items-center w-[130px] h-[35px]`}>{isLoading?'Loading...':'Refresh'}</button>
                    </div>
                    <div className="mt-[20px] h-[400px] max-w-[900px]">
                        { isLoading && (
                            <div className="w-[100%] h-[100%] flex flex-col justify-center items-center">
                                <CycleLoader/>
                            </div>
                        )}
                        { (!isLoading && !isErrorOccurred) && ( <ListSheet2 list={data}/> )}
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Amb;