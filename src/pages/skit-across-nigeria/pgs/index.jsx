import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react';
import VideoCard from '@/components/VideoCard';
import { useRouter } from 'next/router';
import axios from 'axios';
import VideoCardLoader from '@/components/VideoCardLoader';
import ReloadIcon from '../../../../public/images/icon/ReloadIcon';
import { useSession } from 'next-auth/react';
import logo1 from "../../../../public/images/logo1.png";
import Close from "../../../../public/images/icon/Close";
import Image from 'next/image';
import LeaderBoard from '../components/LeaderBoard';
import { Info, ArrowBigDown } from 'lucide-react';
import HeadComponent from '@/components/HeadComponent';


function SkitsPage() {
    const [display, setDisplay] = useState(false);
    console.log(display);
    const router = useRouter();
    const { status, data:session } = useSession();
    const [ oneUser, setOneUser ] = useState(null);
    const [ twoUser, setTwoUser ] = useState(null);
    const [ thirdUser, setThirdUser ] = useState(null);
    const [ fourUser, setFourUser ] = useState(null);
    const [ fiveUser, setFiveUser ] = useState(null)
    const [ currentSkits, setCurrentSkits ] = useState([]);
    const [ sortedSkit, setSortedSkit ] = useState([]);
    const skitsPerPage = 6;

    // loaders states
    const [ isGettingSkits, setIsGettingSkits ] = useState(true);
    const [ errorGettingSkit, setErrorGettingSkit ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');

    const [ nlModalOpacity, setNlModalOpacity ] = useState('opacity-0');
    const [ nlBgOpacity, setNlBgOpacity ] = useState('opacity-0');
    const [ showModal, setShowModal ] = useState(false);

    
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
      setSortedSkit(sorted);
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

      setCurrentSkits(sorted.slice(0, skitsPerPage));
    }
    

    const watch = () => {
      setDisplay(true);
    };

    const getAllSkits = async () => {
      setIsGettingSkits(true);
      try {
        const response = await axios.get('/api/media/skit_across_nigeria/skit?type=multi');
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

    useEffect( () => {
      document.addEventListener("DOMContentLoaded", () => {
        configureMeta();
      })
    }, [])


    const loadMoreSkits = () => {
      if (currentSkits.length === sortedSkit.length) return;
      const newContent = sortedSkit.slice(0, currentSkits.length + skitsPerPage);
      setCurrentSkits(newContent)
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
    <Layout hideAdvertCard={true} >
      <HeadComponent
      title='Skit Across Nigeria'
      desc="Watch and vote for your favorite skits in the Across Nigeria Skit Competition. Support amazing talents and win exciting prizes!"
      image="https://acrossnig.com/images/skitBanner.jpg"
      canonical="https://acrossnig.com/skit-across-nigeria/pgs"
      url="https://acrossnig.com/skit-across-nigeria/pgs"
      keywords="Nigeria skit competition, win cash for skits, vote skit Nigeria, entertainment Nigeria, Across Nigeria show, talent show Nigeria, best Nigerian skits, online skit challenge"
      />
      <div className='md:ml-[5%] md:mr-[5%] bg-transparent'>

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
            <div className='font-medium w-full flex flex-row justify-between text-center text-[20px] px-4 pt-3'>
                <span className='font-bold'>Leader Board (Top 5)</span>
                <button>
                    <Info size={'17px'} color='green'/>
                </button>
            </div>
            { !isGettingSkits &&
                <LeaderBoard  skits={ { oneUser, twoUser, thirdUser, fourUser, fiveUser } }/> 
            }

            {  isGettingSkits &&
              <div className='w-[98%] rounded-[10px] px-1 h-fit pb-5 mx-auto flex flex-col'>
                  <div className='flex flex-col gap-[3px] mt-3'>
                      { [ 0, 0, 0, 0, 0 ].map( (position, index)=> {
                          return (
                            <div key={index} className='w-full flex flex-row px-4 items-center gap-4 overflow-hidden relative bg-blue-200 z-[1000] rounded-[20px] h-[50px]'>
                              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                            </div>
                          )
                      })}
                  </div>
              </div>
            }
        
            <h2 className="text-[22px] mt-5 border-t-1 border-gray-300 px-5 md:px-8 pt-2 font-semibold">All skits</h2>
            { !isGettingSkits &&
            <div className='flex flex-row justify-center pt-4 items-center w-full'>
                { currentSkits?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
                    {currentSkits.map((skit) => (
                      <VideoCard isLandscape={true} key={skit.id} watch={watch} content={skit}/>
                    ))}
                  </div>
                ):(
                  <div className='h-fit border border-gray-300 shadow-sm bg-gray-50 rounded-[15px] flex flex-col max-w-[900px] p-4 w-[90%] items-center text-center mt-4 mx-auto'>
                    <span className='font-semibold text-center text-[18px]'>No Skits Yet? Be the First to Upload!</span>
                    <div className='mx-w-[70%] text-[14px] text-center mt-3'>⏳ The stage is set! the competition starts now.</div>
                    <div className='mx-w-[70%] text-[14px] text-center'>🚀 Be the first to showcase your talent! Upload your skit now and compete for amazing cash prizes on Across Nigeria Reality Show! 🏆 Don&apos;t miss this chance to shine!</div>
                    <div className='flex md:flex-row flex-col w-full mt-4 gap-2 justify-center items-center'>
                      <button onClick={()=>{router.push('/skit-across-nigeria/pgs/video/upload')}} className='h-[40px] md:w-[150px] w-full text-[15px] bg-green-600 hover:bg-green-700 text-white rounded-[30px]'>{ session?.user?.name ? "Upload My Skit":"Register/ Log In to Participate"}</button>
                      <button onClick={()=>{router.push('/skit-across-nigeria/pgs/landing')}} className='h-[40px] md:w-[150px] w-full text-[15px] border-1 border-black bg-transparent hover:bg-gray-300 rounded-[30px]'>Learn more</button>
                    </div>
                  </div>
                )
                }
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
            <div className="flex justify-center flex-row gap-2 mt-4">
                <button onClick={loadMoreSkits} className={`w-[80%] md:w-[400px] ${currentSkits.length === sortedSkit.length ? 'hidden' : ''} bg-green-600 py-3 text-white transition-all duration-300 ease-in-out hover:bg-green-700 rounded-[25px]`}>
                  Load more
                  <ArrowBigDown color='white' size={'20px'} className='inline ml-2' />
                </button>
            </div>

          </div>
        }
      </div>
      <div className={`flex flex-col bg-[url('/svg/Hexagon.svg')] items-center mt-7 text-white justify-center p-4`}>
        <span className='text-[18px] font-bold'>Want to join the competition?</span>
        <span className='text-[17px] '>Upload your skit now!</span>  
        <button onClick={()=>{router.push('/skit-across-nigeria/pgs/landing')}} className='w-[70%] md:w-[400px] border-1 text-white border-black bg-green-600 transition-all ease-in-out duration-250 h-[40px] hover:bg-green-700 rounded-[30px] mt-2 mb-1'>
          Join
        </button>
      </div>
    </Layout>
  );
}

export default SkitsPage;