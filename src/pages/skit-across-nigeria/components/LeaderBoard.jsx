import React from 'react';
import Profile from '../../../../public/images/icon/Profile';
import Link from 'next/link';
import { PlayCircle } from 'lucide-react';

const LeaderBoard = ({ skits, hideDashboard }) => {
    return (
        <div className={`${hideDashboard?"h-0 overflow-hidden":"h-fit"} w-[98%] transition-all duration-300 ease-in-out rounded-[10px] px-1 mx-auto flex flex-col`}>
            <div className='flex flex-col mt-2 gap-[3px] items-center justify-between w-full'>
                { [ skits?.oneUser, skits?.twoUser, skits?.thirdUser, skits?.fourUser, skits?.fiveUser ].map( (position, index)=> {
                    return (
                        position?.votes > 1 ? (
                        <div key={index} className='w-full flex flex-row px-4 items-center rounded-[20px] gap-4 bg-gradient-to-r from-blue-200 to-blue-100 h-[50px]'>
                            <span className='font-bold'>{index + 1}</span>
                            <div className='flex flex-row flex-grow items-center'>
                                <PlayCircle strokeWidth={1} size={'28px'} bg={'black'}/>
                                <div className='flex flex-col justify-center ml-2 items-start'>
                                    <span className='text-[13px] md:hidden text-black'>{position?.vidCaption?.length > 35? `${position?.vidCaption?.slice(0, 35)}...`:position?.vidCaption}</span>
                                    <span className='text-[14px] hidden md:block text-black'>{position?.vidCaption?.length > 150? `${position?.vidCaption?.slice(0, 150)}...`:position?.vidCaption}</span>
                                    <div className='flex flex-row gap-1 items-center'>
                                        <Profile size={'17px'} bg={'white'}/>
                                        <span className='text-[11px] text-gray-800'>By {position?.fullname}</span>
                                    </div>
                                </div>
                            </div>
                            <Link href={`/skit-across-nigeria/pgs/video/${position?.id}`} className='text-[14px] font-medium hover:underline text-primary-700'>Watch skit</Link>
                        </div>
                        ):(
                        <div key={index} className='w-full flex flex-row px-4 items-center rounded-[20px] gap-4 bg-gradient-to-r from-blue-200 to-blue-100 h-[50px]'>
                            <span className='font-semibold'>{index + 1}</span>
                            <div className='flex flex-row flex-grow items-center'>
                                <PlayCircle strokeWidth={1} size={'28px'} className='opacity-50' color={'gray'}/>
                                <div className='flex flex-col justify-center ml-2 items-start'>
                                    <span className='text-[16px] font-semibold text-gray-700'>Not Taken</span>
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