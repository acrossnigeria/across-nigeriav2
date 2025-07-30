import React from 'react';
import Image from 'next/image';
import Profile from '../../../../public/images/icon/Profile';
import Link from 'next/link';
import { Info, X, Videotape, Video, VideoIcon, PlayCircle } from 'lucide-react';

const LeaderBoard = ({ skits, toShowLeaderBoard }) => {

    const closeModal = () => {
        toShowLeaderBoard(false);
    }
    
    return (
        <div className='w-[98%] rounded-[10px] px-1 h-fit mx-auto flex flex-col'>
            <div className='flex flex-col mt-2 gap-[3px] items-center justify-between w-full'>
                { [ skits?.oneUser, skits?.twoUser, skits?.thirdUser, skits?.fourUser, skits?.fiveUser ].map( (position, index)=> {
                    return (
                        position ? (
                        <div key={index} className='w-full flex flex-row px-4 items-center rounded-[20px] gap-4 bg-gradient-to-r from-blue-200 to-blue-100 h-[50px]'>
                            <span className='font-bold'>{index + 1}</span>
                            <div className='flex flex-row flex-grow items-center'>
                                <PlayCircle strokeWidth={1} size={'28px'} bg={'black'}/>
                                <div className='flex flex-col justify-center ml-2 items-start'>
                                    <span className='text-[14px] md:hidden text-black'>{position?.vidTitle?.length > 30? `${position?.vidTitle?.slice(0, 30)}...`:position?.vidTitle}</span>
                                    <span className='text-[14px] hidden md:block text-black'>{position?.vidTitle?.length > 150? `${position?.vidTitle?.slice(0, 150)}...`:position?.vidTitle}</span>
                                    <div className='flex flex-row gap-1 items-center'>
                                        <Profile size={'17px'} bg={'white'}/>
                                        <span className='text-[11px] text-gray-800'>By {position?.fullname}</span>
                                    </div>
                                </div>
                            </div>
                            <Link href={`/skit-across-nigeria/watch/${position?.id}`} className='text-[14px] font-medium hover:underline text-primary-700'>Watch skit</Link>
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
    )
}

export default LeaderBoard;