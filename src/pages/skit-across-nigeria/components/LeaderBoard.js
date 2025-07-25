import React from 'react';
import Image from 'next/image';
import Profile from '../../../../public/images/icon/Profile';
import Link from 'next/link';
import { Info, X } from 'lucide-react';

const LeaderBoard = ({ skits, toShowLeaderBoard }) => {

    const closeModal = () => {
        toShowLeaderBoard(false);
    }
    
    return (
        <div className='w-screen mx-auto flex flex-col justify-center items-center fixed top-0 left-0 z-[1000] bg-black/50 backdrop-blur-sm h-screen '>
            <div className='md:max-w-[500px] w-[95%] bg-gray-200 rounded-[10px] h-fit pb-5 mx-auto flex flex-col'>
            <div className='w-full px-3 pt-[15px]'>
                <div className='font-medium w-full flex flex-row justify-between pb-[15px] text-center text-[20px]'>
                    <button onClick={closeModal}>
                        <X size={'30px'} className='text-gray-600'/>
                    </button>
                    <span>Leader Board (Top 5)</span>
                    <button>
                        <Info size={'20px'} color='green'/>
                    </button>
                </div>
                { skits && (
                    <div className='mt-2 flex flex-row gap-2 justify-center items-baseline'>
                    {/* { [oneUser, twoUser, thirdUser].map( (position, index)=> {
                    return  <TopSkitCard key={index} strUrl={position?.vidUrl} exist={position?true:false} votes={position?.votes} position={index+1} creator={position?.fullname} description={position?.vidTitle}/>
                    })} */}
                    { [skits?.oneUser, skits?.twoUser, skits?.thirdUser].map( (position, index)=> {
                    return  (
                        <div id={index} style={{ height:index === 1?"200px":(index === 0 ? "160px":"120px") }} className='flex flex-col items-center self-end bg-white shadow-2xl rounded-[5px] md:w-[130px] w-[33%]'>
                        <div className='w-full h-fit flex flex-row justify-end'>
                            <div className='h-[30px] w-[30px] flex flex-col justify-center items-center font-semibold text-white text-[18px] bg-green-500 absolute rounded-full mr-[-10px] mt-[-5px]'>
                            <span>{index === 1?1:(index === 0 ? 2:3)}</span>
                            </div>
                        </div>

                        <div className='w-full mt-3 flex flex-col justify-center items-center'>
                            <Profile size={'55px'} bg={'gray'}/>
                            <span className='text-[11px] font-semibold text-gray-700'>{position?.fullname}</span>
                            <Link href={`/skit-across-nigeria/watch/${position?.id}`} className='text-[12px] hover:underline font-medium text-primary-500'>Watch skit</Link>
                        </div>
                        </div>
                    )
                    })}
                </div>
            )}
            <div className='flex flex-col gap-2 mt-[20px]'>
                { [ skits?.fourUser, skits?.fiveUser ].map( (position, index)=> {
                    return (
                        position ? (
                        <div key={index} className='w-full flex flex-row px-4 items-center gap-4 bg-white z-[1000] rounded-[10px] h-[70px]'>
                            <span className='font-semibold'>{index + 4}</span>
                            <div className='flex flex-row flex-grow items-center'>
                                <Profile size={'45px'} bg={'gray'}/>
                                <div className='flex flex-col justify-center ml-2 items-start'>
                                    <span className='text-[16px] font-semibold text-gray-700'>{position?.fullname}</span>
                                </div>
                            </div>
                            <Link href={`/skit-across-nigeria/watch/${position?.id}`} className='text-[14px] font-medium hover:underline text-primary-500'>Watch skit</Link>
                        </div>
                        ):(
                    <div key={index} className='w-full flex flex-row px-4 items-center gap-4 bg-white z-[1000] rounded-[10px] h-[70px]'>
                            <span className='font-semibold'>{index + 4}</span>
                            <div className='flex flex-row flex-grow items-center'>
                                <Profile size={'45px'} bg={'red'}/>
                                <div className='flex flex-col justify-center ml-2 items-start'>
                                    <span className='text-[16px] font-semibold text-gray-700'>No Taken</span>
                                </div>
                            </div>
                        </div>
                        )
                    )
                })}
                </div>
            </div>
        </div>
        </div>
    )
}

export default LeaderBoard;