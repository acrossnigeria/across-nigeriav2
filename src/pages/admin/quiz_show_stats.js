import Container from "@/components/admin-components/Container";
import CycleLoader from "@/components/CycleLoader";
import VidDownloadButton from "@/components/VidDownloadButton";
import axios from "axios";
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

const Page = ( { user } ) => {
    const [ data, setData ] = useState(null);
    const [ errorOccured, setErrorOccured ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('Unknown error boundary');
    const [ isGettingData, setIsGettingData ] = useState(true);

    const getParticipants = async () => {
        setIsGettingData(true);
        setData(null)
        try {
            const response = await axios.get('/api/across_quiz_show/getParticipants');
            if (response.data.success) {
                setData(response.data.participants);
            } else {
                setErrorOccured(true);
                setErrorMessage('Something went wrong when getting data from server');
            };
            setIsGettingData(false)
            
        } catch(err) {
            setIsGettingData(false)
            console.log('An error occured:' + err.message);
        }
    }

    useEffect( () => {
        getParticipants();
    }, [] );

    return (
        <Container admin={user} page={'qs'}>
            <div className="h-[600px] w-[95%] mx-auto mt-[30px]">
                <span className="font-bold text-[14px]">Registered participants</span>
                {isGettingData && <div className="w-[100%] h-[450px] flex justify-center items-center"><CycleLoader size={'40px'}/></div>}
                { data  && 
                     <div className="w-[100%] mt-[20px] overflow-hidden h-fit">
                        <div className="w-full flex flex-row text-[10px] h-[30px] gap-0.5">
                            <div className="flex w-[11.111%] flex-row bg-gray-500 text-white justify-start items-center pl-1">Fullname</div>
                            <div className="flex w-[11.111%] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1">Whatsapp</div>
                            <div className="flex w-[11.111%] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1">status</div>
                            <div className="flex w-[11.111%] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1">Email</div>
                            <div className="flex w-[11.111%] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1">Referred By</div>
                            <div className="flex w-[11.111%] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1">Confidence</div>
                            <div className="flex w-[11.111%] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1">Bank</div>
                            <div className="flex w-[11.111%] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1">Bank Info</div>
                            <div className="flex w-[11.111%] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1">RegAt</div>
                        </div>
                       { data.map( (user, userIndex ) => {
                                return (
                                    <div key={userIndex} className={`w-full flex flex-row gap-0.5 text-[10px] h-[30px]`}>
                                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[11.111%] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>{user.fullname}</div>
                                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[11.111%] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>{user.whatsappPhone}</div>
                                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[11.111%] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>{user.status}</div>
                                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[11.111%] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}> {user.email}</div>
                                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[11.111%] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>{user.referralSource}</div>
                                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[11.111%] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>{user.confidenceInKnowledge}</div>
                                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[11.111%] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>{user.bank}</div>
                                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[11.111%] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>{user.bankInfo}</div>
                                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[11.111%] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>{user.regAt}</div>
                                    </div>
                                )
                                }
                            )
                        }
                    </div>
                }
            </div>
        </Container>
    )
}

export default Page;

import React, { useEffect, useState } from 'react';

