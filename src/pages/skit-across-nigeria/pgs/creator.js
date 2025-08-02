import Layout from '@/components/Layout';
import ReloadIcon from '../../../../public/images/icon/ReloadIcon';
import AddIcon from '../../../../public/images/icon/AddIcon';
import HomeIcon from '../../../../public/images/icon/HomeIcon';
import ProfileIcon from '../../../../public/images/icon/ProfileIcon';
import Link from 'next/link';
import Next from '../../../../public/images/icon/Next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ManageSkitCard from '@/components/ManageSkitCard';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const CreatorPage = () => {
    const router = useRouter();
    const { status, data:session } = useSession();
    const [ skits, setSkits ] = useState(null);
    const [ gettingSkitLoading, setGettingSkitLoading ] = useState(true);
    const [ errorGettingSkit, setErrorGettingSkit ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ getSkitCount, setGetSkitCount ] = useState(0);

    const getUsersSkit = async () => {
        setGettingSkitLoading(true);
        try {
            const response = await axios.get(`/api/media/user-skit-videos?user=${session?.user?._id}`);
            setSkits(response.data.skits);
            setGettingSkitLoading(false);
        } catch(error) {
            setErrorGettingSkit(true);
            setErrorMessage(error.message);
            setGettingSkitLoading(false);
        }
    }

    const reload = () => {
        setErrorGettingSkit(false);
        getUsersSkit();
    }

    useEffect( () => {
        if ( session?.user?.name ) {
            if ( getSkitCount < 1 ) {
                getUsersSkit();
                setGetSkitCount(getSkitCount+1)
            }
        }
    }, [ session ])


    return (
        <Layout hideNav={true}>
            <div className='pt-[10px] bg-gray pb-[100px]'>
                { errorGettingSkit && 
                    <div className='h-screen w-full pt-[30px] flex flex-col gap-10'>
                    <div className='text-red-500 font-light text-center md:w-[30%] w-[90%] mx-auto text-[13px]'>{errorMessage}. please check your internet connection</div>
                        <button onClick={reload} className='flex flex-col justify-center hover:scale-105 transition-all ease-in-out duration-300 hover:opacity-50 items-center gap-3'>
                            <span className=']'>Tap to retry</span>
                            <ReloadIcon/>
                        </button>
                    </div>
                } 
               { !errorGettingSkit &&
                    <div className=' md:w-[50%] mx-auto w-[100%] md:px-0 px-[3%]'>
                        
                        <div className="mb-[10px]">
                            <button onClick={()=>{router.push('/theater-skit-across-nigeria/pages')}} className="w-fit flex flex-row items-center transition-all duration-500 ease-in-out hover:scale-105 gap-2"><div className="rotate-180"><Next bg={'black'} size={'20px'}/></div>Go back</button>
                        </div>
                        <div className='h-fit pt-[20px] mb-[10px] font-semibold text-[19px] border-b-1 border-b-gray-600 pb-[10px]'>
                            <span className='text-[18px]'>Manage Skits</span>
                        </div>
                        { gettingSkitLoading ? (
                            <div className='flex flex-col gap-2'>
                                <div className='w-[100%] h-[120px] md:h-[150px] flex flex-row gap-2 rounded-[5px]'>
                                    <div className='w-[40%] h-[120px] md:h-[150px] bg-gray-300 animate-pulse rounded-[5px]'></div>
                                    <div className='w-[55%] flex flex-col gap-2'>
                                        <div className='w-[100%] h-[40px] bg-gray-300 animate-pulse rounded-[5px]'></div>
                                        <div className='w-[100%] h-[20px] bg-gray-300 animate-pulse rounded-[5px]'></div>
                                    </div>
                                </div>
                                <div className='w-[100%] h-[120px] md:h-[150px] flex flex-row gap-2 rounded-[5px]'>
                                    <div className='w-[40%] h-[120px] md:h-[150px] bg-gray-300 animate-pulse rounded-[5px]'></div>
                                    <div className='w-[55%] flex flex-col gap-2'>
                                        <div className='w-[100%] h-[40px] bg-gray-300 animate-pulse rounded-[5px]'></div>
                                        <div className='w-[100%] h-[20px] bg-gray-300 animate-pulse rounded-[5px]'></div>
                                    </div>
                                </div>
                                <div className='w-[100%] h-[120px] md:h-[150px] flex flex-row gap-2 rounded-[5px]'>
                                    <div className='w-[40%] h-[120px] md:h-[150px] bg-gray-300 animate-pulse rounded-[5px]'></div>
                                    <div className='w-[55%] flex flex-col gap-2'>
                                        <div className='w-[100%] h-[40px] bg-gray-300 animate-pulse rounded-[5px]'></div>
                                        <div className='w-[100%] h-[20px] bg-gray-300 animate-pulse rounded-[5px]'></div>
                                    </div>
                                </div>
                            </div>
                        ): ( skits?.length > 0 ? (
                                <div className='flex flex-col gap-2'>
                                { skits.map((skit, i) => {
                                        return (
                                            <ManageSkitCard vidLength={skit.vidLength} votes={skit.votes} vidUrl={skit?.vidUrl} title={skit?.vidTitle} id={skit?._id} caption={skit?.vidCaption} url={`https://acrossnig.com/theater-skit-across-nigeria/pages/skit-video/${skit?._id}`} key={i}/>
                                        )
                                        })
                                    }
                                </div>
                            ): (
                                <div className='h-[600px] flex flex-col pt-[50px] items-center gap-2'>
                                    <span className='text-gray-600 text-[15px]'>You have no skits.</span>
                                    <button onClick={()=>{router.push('/theater-skit-across-nigeria/pages/add-skit')}} className='h-[35px] text-[15px] text-white mt-[5px] w-[100px] bg-green-500 rounded-[20px] hover:bg-green-600'>Add skit</button>
                                </div>
                            )
                        )}
                    </div>
                }
                <div className={`flex mt-2 fixed bottom-0 rounded-t-[5px] w-[100%] z-[1000] bg-green-600 flex-row font-sans h-[50px] pb-1 items-end justify-around`}>
                {/* Second Line Menus */}
                <Link style={{alignItems:'center'}} href="/" className="text-green-200 text-[13px] hover:scale-105 items-center flex flex-col justify-center">
                    <HomeIcon bg={'#bbf7d0'} size={'22px'}/>
                    Home
                </Link>
                <Link style={{alignItems:'center'}} href="/skit-across-nigeria/pgs/video/upload" className="text-green-200 text-[13px] pt-2 px-2 rounded-full bg-green-600 hover:scale-105 items-center flex flex-col justify-center">
                    <AddIcon bg={'#bbf7d0'} size={'30px'}/>
                    Add Skit 
                </Link>
                <Link style={{alignItems:'center'}} href="/skit-across-nigeria/pgs/creator" className="text-green-200 text-[13px] hover:scale-105 items-center flex flex-col justify-center">
                    <ProfileIcon size={'22px'}/>
                    you
                </Link>
                </div>
            </div>
        </Layout>
    )
}

export default CreatorPage;