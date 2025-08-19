import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react';
import VideoCard from '@/components/VideoCard';
import { useRouter } from 'next/router';
import axios from 'axios';
import VideoCardLoader from '@/components/VideoCardLoader';
import ReloadIcon from '../../../../public/images/icon/ReloadIcon';
import { useSession } from 'next-auth/react';
import LeaderBoard from '../components/LeaderBoard';
import { Info, ArrowBigDown, ShieldCheck, ChevronDown, Smile } from 'lucide-react';
import HeadComponent from '@/components/HeadComponent';
import ManageSkitButton from '../components/ManageSkitButton';


function SkitsPage() {
    const [display, setDisplay] = useState(false);
    console.log(display);
    const router = useRouter();
    const { data:session, status } = useSession();
    const [ oneUser, setOneUser ] = useState(null);
    const [ twoUser, setTwoUser ] = useState(null);
    const [ thirdUser, setThirdUser ] = useState(null);
    const [ fourUser, setFourUser ] = useState(null);
    const [ fiveUser, setFiveUser ] = useState(null)
    const [ currentSkits, setCurrentSkits ] = useState([]);
    const [ sortedSkit, setSortedSkit ] = useState([]);
    const [ isUserRegistered, setIsUserRegistered ] = useState(false);
    const [ hideDashboard, setHideDashboard ] = useState(false);
    const skitsPerPage = 6;

    const handleDashboardToggle = () => {
      setHideDashboard(!hideDashboard);
    };

    // loaders states
    const [ isGettingSkits, setIsGettingSkits ] = useState(true);
    const [ errorGettingSkit, setErrorGettingSkit ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');

    // function to sort skits by votes
    function bubbleSort(arr) {
      for (let i = 0; i < arr.length - 1; i++) {
          for (let j = 0; j < arr.length - 1 - i; j++) {
              //if the current element is less than the next element swap them
              if ( arr[j].votes < arr[j + 1].votes ) {
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
        const response = await axios.get(`/api/media/skit_across_nigeria/skit?type=multi&userId=${session?.user?._id ? session.user._id : ''}`);
        sortSkitByVotes(response.data.vidData);
        setIsGettingSkits(false);
        setIsUserRegistered(response.data.isRegistered);
      } catch (error) {
        console.log(error.message)
        setIsGettingSkits(false);
        setErrorGettingSkit(true);
        setErrorMessage('Something went wrong, '+error.message)
      }
    }
    
    useEffect(() => {
      if ( status === "loading" ) return;
      getAllSkits();
    }, [ status ])



    const loadMoreSkits = () => {
      if (currentSkits.length === sortedSkit.length) return;
      const newContent = sortedSkit.slice(0, currentSkits.length + skitsPerPage);
      setCurrentSkits(newContent);
    }

    const reload = () => {
      setErrorGettingSkit(false);
      getAllSkits();
    }


  return (
    <Layout hideNav={true} hideAdvertCard={true} hideFooter={true} >
      <HeadComponent
      title='Skit Across Nigeria'
      desc="Watch and vote for your favorite skits in the Across Nigeria Skit Competition. Support amazing talents and win exciting prizes!"
      image="https://acrossnig.com/images/skit_across_nigeria_skit.jpg"
      canonical="https://acrossnig.com/skit-across-nigeria/pgs"
      url="https://acrossnig.com/skit-across-nigeria/pgs"
      keywords="Nigeria skit competition, win cash for skits, vote skit Nigeria, entertainment Nigeria, Across Nigeria show, talent show Nigeria, best Nigerian skits, online skit challenge"
      />
      <div className='md:ml-[5%] md:mr-[5%] bg-transparent'>
        { errorGettingSkit && 
          <div className='h-screen w-full pt-[30px] flex flex-col gap-10'>
            <div className='text-red-500 font-light text-center md:w-[30%] w-[90%] mx-auto text-[13px]'>{errorMessage}. please check your internet connection</div>
            <button onClick={reload} className='flex flex-col justify-center hover:scale-105 transition-all ease-in-out duration-300 hover:opacity-50 items-center gap-3'>
              <span >Tap to retry</span>
              <ReloadIcon/>
            </button>
          </div>
        }

        { !errorGettingSkit &&
          <div className='pb-[50px] font-poppins'>
            <div className='font-medium w-full flex flex-row justify-between text-center text-[20px] px-4 pt-3'>
                <span className={`font-bold transition-all ease-in-out duration-300 ${hideDashboard?'text-gray-400':'text-black'}`}>Leader Board (Top 5)</span>
                <button className='flex flex-row items-center' onClick={handleDashboardToggle}>
                    <span className='text-[17px] text-gray-800'>{hideDashboard ? "Show" : "Hide"}</span>
                    <ChevronDown size={'20px'} className={`transition-all duration-300 ease-in-out ${hideDashboard ? 'rotate-180' : ''}`} />
                </button>
            </div>
            { !isGettingSkits &&
                <LeaderBoard  skits={ { oneUser, twoUser, thirdUser, fourUser, fiveUser } } hideDashboard={hideDashboard}/> 
            }

            {  isGettingSkits &&
              <div className='w-[98%] rounded-[10px] px-1 h-fit pb-5 mx-auto flex flex-col'>
                  <div className='flex flex-col gap-[3px] mt-3'>
                      { [ 0, 0, 0, 0, 0 ].map( (_, index)=> {
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full md:max-w-6xl">
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
                      <button onClick={()=>{router.push(session?.user?.name ? '/skit-across-nigeria/pgs/video/upload' : '/account/login')}} className='h-[40px] md:w-[150px] w-full text-[15px] bg-green-600 hover:bg-green-700 text-white rounded-[30px]'>{ session?.user?.name ? "Upload My Skit":"Register/ Log In to Participate"}</button>
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

            <div className={`${currentSkits.length === sortedSkit.length ? '' : 'hidden'} flex bg-gradient-to-t from-white via-gray-200 to-white h-[100px] justify-center flex-row gap-2 mt-4`}>
                <div className={`w-fit  flex-row flex gap-1 items-center`}>
                  <span>That&apos;s all for now.</span>
                  <Smile size={'20px'} className='text-gray-800'/>
                </div>
            </div>
          </div>
        }
      </div>
      <div className="mt-3 pb-[50px] w-full flex-row gap-2 justify-center items-center text-xs text-gray-600 text-center">
          <ShieldCheck className="inline-block w-4 h-4 mr-1 text-green-500" />
          Powered by Entertainment Methodz
      </div>
      { !isUserRegistered && (
        <div className={`flex flex-col bg-[url('/svg/Hexagon.svg')] items-center mt-7 text-white justify-center p-4`}>
          <span className='text-[18px] font-bold'>Want to join the competition?</span>
          <span className='text-[17px] '>Upload your skit now!</span>  
          <button onClick={()=>{router.push('/skit-across-nigeria/pgs/landing')}} className='w-[70%] md:w-[400px] border-1 text-white border-black bg-green-600 transition-all ease-in-out duration-250 h-[40px] hover:bg-green-700 rounded-[30px] mt-2 mb-1'>
            Join
          </button>
        </div>
      )}
      { isUserRegistered && <ManageSkitButton /> }
    </Layout>
  );
}

export default SkitsPage;