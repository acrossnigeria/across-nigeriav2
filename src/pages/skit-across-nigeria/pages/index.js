import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react';
import VideoCard from '@/components/VideoCard';
import { useRouter } from 'next/router';
import TopSkitCard from '@/components/TopSkitCard';
import VideoIcon from '../../../../public/images/icon/VideoIcon';
import axios from 'axios';
import VideoCardLoader from '@/components/VideoCardLoader';
import ReloadIcon from '../../../../public/images/icon/ReloadIcon';
import { useSession } from 'next-auth/react';
import logo1 from "../../../../public/images/logo1.png";
import Close from "../../../../public/images/icon/Close";
import Image from 'next/image';
import BottomNav from '../components/BottomNav';
import BottomMenu from '@/components/BottomMenu';
import Profile from '../../../../public/images/icon/Profile';
import LeaderBoard from '../components/LeaderBoard';
import Link from 'next/link';


function SkitsPage() {
  const [display, setDisplay] = useState(false);
  console.log(display);
  const router = useRouter();
  const { status, data:session } = useSession();
  const [ allSkits, setAllSkits ] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ oneUser, setOneUser ] = useState(null);
  const [ twoUser, setTwoUser ] = useState(null);
  const [ thirdUser, setThirdUser ] = useState(null);
  const [ fourUser, setFourUser ] = useState(null);
  const [ fiveUser, setFiveUser ] = useState(null);
  const [ sixUser, setSixUser ] = useState(null);
  const [ currentSkits, setCurrentSkits ] = useState([]);
  const skitsPerPage = 6;

  // loaders states
  const [ isGettingSkits, setIsGettingSkits ] = useState(true);
  const [ errorGettingSkit, setErrorGettingSkit ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');

  const [ nlModalOpacity, setNlModalOpacity ] = useState('opacity-0');
  const [ nlBgOpacity, setNlBgOpacity ] = useState('opacity-0');
  const [ showModal, setShowModal ] = useState(false);

  const [ showLeaderboard, setShowLeaderboard ] = useState(false);

  const toShowLeaderBoard = (show) => {
    setShowLeaderboard(show);
  }
  
  function bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            //if the current element is less than the next element swap them
            if ( arr[j].votes.length < arr[j + 1].votes.length ) {
                //swap using a temparary variable
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
      return arr;
  }
  
  const sortSkitByVotes = ( list ) => {
    let sorted = bubbleSort(list);
    let zerosCount = 0;
    sorted.map((obj) => {
      if ( obj.votes.length === 0 ) {
        zerosCount = zerosCount+1
      }
    });
    console.log(zerosCount);
    console.log(sorted);
    if ( zerosCount === sorted.length ) {
      sorted = [];
    }
    setOneUser(sorted[0]?sorted[0]:null);
    setTwoUser(sorted[1]?sorted[1]:null);
    setThirdUser(sorted[2]?sorted[2]:null);
    setFourUser(sorted[3]?sorted[3]:null);
    setFiveUser(sorted[4]?sorted[4]:null);
    setSixUser(sorted[5]?sorted[5]:null);
    getCurrentSkit(list, currentPage);
  }

  const getCurrentSkit = (list, pageNumber) => {
    if (!list.length) return setCurrentSkits([]); // Handle empty list case
  
    const indexOfLastSkit = pageNumber * skitsPerPage;
    const indexOfFirstSkit = indexOfLastSkit - skitsPerPage;
    console.log(indexOfLastSkit);
    console.log(indexOfFirstSkit);
  
    setCurrentSkits(list.slice(indexOfFirstSkit, indexOfLastSkit));
  };
  

  const watch = () => {
    setDisplay(true);
  };

  const getAllSkits = async () => {
    setIsGettingSkits(true);
    try {
      const response = await axios.get('/api/media/skit_across_nigeria/skit?type=multi');
      setAllSkits(response.data.vidData);
      sortSkitByVotes(response.data.vidData);
      setIsGettingSkits(false)
    } catch (error) {
      console.log(error.message)
      setIsGettingSkits(false);
      setErrorGettingSkit(true);
      setErrorMessage('Something went wrong, '+error.message)
    }
  }
  
  useEffect(() => {
    getAllSkits();
  }, [])

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    getCurrentSkit(allSkits, pageNumber);
    window.scrollTo( {
      top:0,
      behavior:'smooth'
    })
  }

  const reload = () => {
    setErrorGettingSkit(false);
    getAllSkits();
  }

  const toUploadPage = () => {
    if (session?.user?.name) {
        router.push('/skit-across-nigeria/pages/add-skit');
    } else {
        notLoggedIn('in');
    }
}

const notLoggedIn = (transiton) => {
    if (transiton==='in') {
        setShowModal(true);
        setTimeout(() => {
            setNlBgOpacity('opacity-100');
            setNlModalOpacity('opacity-100');
        }, 300);
    } else {
        setNlBgOpacity('opacity-0');
        setNlModalOpacity('opacity-0');
        setTimeout(() => {
            setShowModal(false);
        }, 1000);
    }
}

  return (
    <Layout hideNav={session?.user?.name?true:false}>
      <div className='md:ml-[5%] md:mr-[5%] mt-3'>

        { showModal && 
            <div className={`fixed ${nlBgOpacity} transition-all duration-300 ease-in-out backdrop-blur-sm left-0 h-screen w-screen flex flex-co items-center justify-center gap-3 bg-black/50 z-[1000] top-0`}>
                <div className="h-fit flex flex-col justify-center w-[100%] items-center">
                    <button onClick={()=>{notLoggedIn('out')}} className="border-1 text-[14px] flex flex-row gap-2 text-white hover:bg-green-600/50 hover:scale-105 transition-all duration-300 ease-in-out justify-center items-center px-[20px] py-1 rounded-[20px] mb-[20px] border-gray-100">
                        <Close bg={'white'} size={'15px'}/>
                        Close
                    </button>
                    <div className={`overflow-hidden h-[400px] md:w-[400px] transition-all duration-500 ease-in-out w-[80%] text-center ${nlModalOpacity} p-3 flex flex-col justify-center items-center bg-gray-100 rounded-[5px]`}>
                        <div className='text-center mb-[35px] flex flex-row justify-center gap-1 items-center'>
                            <Image src={logo1} alt='logo' placeholder='blur' className='h-[30px] w-[35px]' />
                            <div className='flex flex-col justify-center items-start gap-0'>
                                <span className='text-[12px] font-semibold text-green-700'>ACROSS NIGERIA</span>
                                <span className='text-[10px] text-green-500'>REALITY SHOW</span>
                            </div>
                        </div>
                        <span className="text-[14px]">Oops! You have to Log In or Register</span>
                        <div className="flex mt-[20px] flex-col items-center gap-2">
                            <button onClick={()=>router.push('/account/reg')} className="h-[40px] px-[20px] text-white bg-green-500 hover:bg-green-700 rounded-[20px]">Register Now</button>
                            <button onClick={()=>router.push('/account/login')} className="text-gray-600 hover:text-black">Log In</button>
                        </div>
                    </div>
                </div>
            </div>
        }
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
          <div>
            { !isGettingSkits &&
              <div className='w-[95%] md:w-full mx-auto pb-2 gap-2 flex flex-col md:px-2'>
                <div className='font-semibold flex flex-row items-center gap-2 justify-between text-center mb-3 text-[22px]'>
                  <span>Leader Board</span>
                  <button onClick={()=>toShowLeaderBoard(true)} className='ml-2 md:text-[14px] text-[13px] px-2 py-1 bg-blue-700 font-semibold text-white rounded hover:underline'>Show full Leader Board</button>
                </div>
                <div className='flex flex-row md:gap-5 gap-2 justify-center items-baseline'>
                  {/* { [oneUser, twoUser, thirdUser].map( (position, index)=> {
                    return  <TopSkitCard key={index} strUrl={position?.vidUrl} exist={position?true:false} votes={position?.votes} position={index+1} creator={position?.fullname} description={position?.vidTitle}/>
                  })} */}
                  { [oneUser, twoUser, thirdUser].map( (position, index)=> {
                    return  (
                      <div id={index} style={{ height:index === 1?"210px":(index === 0 ? "170px":"130px") }} className='flex flex-col items-center self-end bg-white border-1 border-gray-200 shadow-2xl rounded-[5px] md:w-[150px] w-[33%]'>
                        <div className='w-full h-fit flex flex-row justify-end'>
                          <div className='h-[30px] w-[30px] flex flex-col justify-center items-center font-bold text-white text-[18px] bg-green-500 absolute rounded-full mr-[-10px] mt-[-10px]'>
                            <span>{index === 1?1:(index === 0 ? 2:3)}</span>
                          </div>
                        </div>

                        <div className='w-full mt-3 flex flex-col justify-center items-center'>
                            <Profile size={'55px'} bg={'gray'}/>
                            <span className='text-[12px] font-semibold'>{position?.vidTitle.length > 50 ? position?.vidTitle.slice(0, 50) + '...' : position?.vidTitle}</span>
                            <span className='text-[10px] font-semibold'>by {position?.fullname}</span>
                            <Link href={`/skit-across-nigeria/watch/${position?.id}`} className='text-[12px] hover:underline font-medium text-primary-500'>Watch skit</Link>
                        </div>
                      </div>
                    )
                  })}
                </div>
                { showLeaderboard && <LeaderBoard toShowLeaderBoard={toShowLeaderBoard} skits={ { oneUser, twoUser, thirdUser, fourUser, fiveUser, sixUser } }/> }
                {/* <div className='mt-3 bg-black/20 text-white p-1 rounded-[3px]'>
                  <div className='w-full flex flex-row items-center gap-3 px-2 py-1 mb-2'>
                    <span className=''>4</span>
                    <VideoIcon/>
                    <div className='flex flex-col'>
                      <span className=' text-[14px]'>{fourUser?(fourUser.votes.length>0 ? fourUser.fullname:''):''}</span>
                      <span className='text-[13px]'>{fourUser?(fourUser.votes.length>0 ? (fourUser.vidTitle.slice(0, 40) + '...'):'Position empty'):'Position empty'}</span>
                    </div>
                  </div> 
                  
                  <div className='w-full flex flex-row items-center px-2 gap-3 py-1'>
                    <span className=''>5</span>
                    <VideoIcon/>
                    <div className='flex flex-col'>
                      <span className=' text-[14px]'>{fiveUser?(fiveUser.votes.length>0 ? fiveUser.fullname:''):''}</span>
                      <span className='text-[13px]'>{fiveUser?(fiveUser.votes.length>0 ? (fiveUser.vidTitle.slice(0, 40) + '...'):'Position empty'):'Position empty'}</span>
                    </div>
                  </div> 
                </div> */}
              
              </div>
            }

            {  isGettingSkits &&
              <div className='w-[95%] md:w-full mx-auto pb-2 gap-2 flex flex-col md:px-2'>
                <div className='font-semibold flex flex-row items-center gap-2 mb-3 justify-between text-center text-[22px]'>
                  <span>Leader Board</span>
                  <div className='ml-2 md:text-[14px] w-[150px] h-[35px] text-[13px] px-2 py-1 bg-blue-300 font-semibold overflow-hidden relative rounded'>
                     <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                  </div>
                </div>
                <div className='flex flex-row md:gap-5 gap-2 justify-center items-baseline'>
                  { [ 0, 0, 0].map( (_, index)=> {
                    return  (
                      <div id={index} style={{ height:index === 1?"210px":(index === 0 ? "170px":"130px") }} className='flex flex-col items-center self-end animate-pulse bg-white border-1 border-gray-200 shadow-2xl rounded-[5px] md:w-[150px] w-[33%]'>
                      </div>
                    )
                  })}
                </div>
              </div>
            }
        
            <h2 className="text-[22px] mt-5 border-t-1 border-gray-300 px-5 pt-2 font-semibold mb-3 ">All skits</h2>
            { !isGettingSkits &&
            <div className='flex flex-row justify-center pt-5 items-center w-full'>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
                { currentSkits?.length > 0 ? (
                  currentSkits.map((skit) => (
                    <VideoCard key={skit.id} watch={watch} content={skit}/>
                  ))
                ):(
                  <div className='h-[800px] flex flex-col md:w-[50%] w-[90%] items-center text-center mt-4 mx-auto'>
                    <span className='font-semibold text-center text-[18px]'>No Skits Yet? Be the First to Upload!</span>
                    <div className='mx-w-[70%] text-[14px] text-center mt-3'>⏳ The stage is set! the competition starts now.</div>
                    <div className='mx-w-[70%] text-[14px] text-center'>🚀 Be the first to showcase your talent! Upload your skit now and compete for amazing cash prizes on Across Nigeria Reality Show! 🏆 Don&apos;t miss this chance to shine!</div>
                    <div className='flex md:flex-row flex-col mt-4 gap-2 justify-between items-center'>
                      <button onClick={toUploadPage} className='h-[35px] w-[150px] text-[15px] bg-green-600 hover:bg-green-700 text-white rounded-[5px]'>Upload Your Skit</button>
                      <button onClick={()=>{router.push('/skit-across-nigeria/pages/landing')}} className='h-[35px] w-[150px] text-[15px] border-1 border-black bg-transparent hover:bg-gray-300 rounded-[5px]'>Learn more</button>
                    </div>
                  </div>
                )
                }
              </div>
            </div>
            }
            { isGettingSkits &&
              <div className="flex-wrap flex md:flex-row flex-col gap-[25px] md:gap-[20px] justify-center pt-[6px]">
                {[0,0,0].map((_, index) => (
                    <VideoCardLoader key={index}/>
                ))}
              </div>
            }

            {/* Pagination */}
            <div className="flex justify-center flex-row gap-2 mt-[10px] mb-[20px]">
              {Array.from({ length: Math.ceil(allSkits.length / skitsPerPage) }, (_, i) => (
                <button key={i} onClick={() => paginate(i + 1)} className={`w-[50px] rounded-[3px] text-[19px] py-1 ${currentPage === i + 1 ? 'bg-transparent border-1 border-green-600 text-green-800' : 'bg-green-600 hover:bg-green-900 text-white'}`}>{i + 1}</button>
              ))}
            </div>
            <div className='flex flex-col items-center mb-5 justify-center'>
              <span className='text-[18px] font-semibold'>Want to join the competition?</span>
              <span className='text-[17px] text-gray-600'>Upload your skit now!</span>  
              <button onClick={()=>{router.push('/skit-across-nigeria/pages/landing')}} className='w-[70%] md:w-[250px] border-1 ml-2 md:ml-0 border-black hover:scale-105 transition-all ease-in-out duration-250 h-[40px] bg-transparent hover:bg-gray-300 rounded-[5px] mt-2 mb-1'>Join</button>
            </div>

          </div>
        }
        { session?.user?.name && <BottomNav/> }
        <BottomMenu hideNav={session?.user ? true:false} />
      </div>
    </Layout>
  );
}

export default SkitsPage;