import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react';
import VideoCard from '@/components/VideoCard';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import TopSkitCard from '@/components/TopSkitCard';
import VideoIcon from '../../../../public/images/icon/VideoIcon';
import axios from 'axios';

function SkitsPage() {
  const router = useRouter();
  const [display, setDisplay] = useState(false);
  const [ allSkits, setAllSkits ] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ oneUser, setOneUser ] = useState(null);
  const [ twoUser, setTwoUser ] = useState(null);
  const [ thirdUser, setThirdUser ] = useState(null);
  const [ fourUser, setFourUser ] = useState(null);
  const [ fiveUser, setFiveUser ] = useState(null);
  const [ currentSkits, setCurrentSkits ] = useState([]);
  const skitsPerPage = 8;

  // loaders states
  const [ isGettingSkits, setIsGettingSkits ] = useState(true);
  
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
    console.log(sorted.length)
    if ( zerosCount === sorted.length ) {
      sorted = [];
    }
    setOneUser(sorted[0]?sorted[0]:null);
    setTwoUser(sorted[1]?sorted[1]:null);
    setThirdUser(sorted[2]?sorted[2]:null);
    setFourUser(sorted[3]?sorted[3]:null);
    setFiveUser(sorted[4]?sorted[4]:null);
    getCurrentSkit(list, currentPage);
  }

  const getCurrentSkit = (list, pageNumber) => {
      // Get current skits
    if ( list.length > skitsPerPage ) {
      let indexOfLastSkit = pageNumber * skitsPerPage;
      const indexOfFirstSkit = indexOfLastSkit - skitsPerPage;
      if ( indexOfLastSkit > allSkits.length - 1) {
        indexOfLastSkit = allSkits.length - 1;
      };
      console.log('first skit: ' + indexOfFirstSkit, 'last skit: '+ indexOfLastSkit);
      setCurrentSkits(list.slice(indexOfFirstSkit, indexOfLastSkit));
    } else {
      let indexOfLastSkit = list.length;
      const indexOfFirstSkit = 0;
      console.log('first skit: ' + indexOfFirstSkit, 'last skit: '+ indexOfLastSkit);
      setCurrentSkits(list.slice(indexOfFirstSkit, indexOfLastSkit));
    }
  }

  const watch = () => {
    setDisplay(true);
  };

  const getAllSkits = async () => {
    try {
      const response = await axios.get('/api/media/upload-theater-skit?type=multi');
      setAllSkits(response.data.vidData);
      sortSkitByVotes(response.data.vidData);
    } catch (error) {
      console.log(error.message)
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
      top:30,
      behavior:'smooth'
    })
  }

  return (
    <Layout>
      <div className='md:ml-[5%] md:mr-[5%] mt-3'>
        <Link href="/upload" className='cursor-pointer mb-2 ml-[2.5%] w-fit hover:bg-green-200 bg-tranparent border-2 flex flex-row justify-center items-center border-green-700 text-green-700 px-4 h-[40px] rounded-[30px]'>
          <span>Click Here to participate</span>
        </Link>
        <div className='w-[95%] md:w-full mx-auto flex flex-col bg-gradient-to-t from-green-800 to-green-400 px-2 pb-2 rounded-[10px]'>
          <div className='text-white font-bold text-center text-[20px]'>Leader Board</div>
          <div className='mt-2 flex flex-row flex-wrap gap-2 justify-center'>
            { [oneUser, twoUser, thirdUser].map( (position, index)=> {
              return  <TopSkitCard key={index} strUrl={position?.vidUrl} exist={position?true:false} votes={position?.votes} position={index+1} creator={position?.fullname} description={position?.vidTitle}/>
            })}
          </div>
          <div className='mt-3 bg-black/20 text-white p-2 rounded-[20px]'>
            <div className='w-full flex flex-row items-center gap-3 px-2 py-2 border-b-1 border-b-black'>
              <span className='font-bold'>4</span>
              <VideoIcon/>
              <span className='font-bold text-[14px]'>{fourUser?(fourUser.votes>0 ? fourUser.fullname:''):''}</span>
              <span className='text-[13px]'>{fourUser?(fourUser.votes>0 ? (fourUser.vidTitle.slice(0, 40) + '...'):'Position empty'):'Position empty'}</span>
            </div> 
            
            <div className='w-full flex flex-row items-center px-2 gap-3 py-2'>
              <span className='font-bold'>5</span>
              <VideoIcon/>
              <span className='font-bold text-[14px]'>{fiveUser?(fiveUser.votes>0 ? fiveUser.fullname:''):''}</span>
              <span className='text-[13px]'>{fiveUser?(fiveUser.votes>0 ? (fiveUser.vidTitle.slice(0, 40) + '...'):'Position empty'):'Position empty'}</span>
            </div> 
          </div>
         
        </div>
        <h2 className="text-[21px] mt-[25px] ml-[2.5%] mb-2 font-bold">All Videos</h2>
        <div className="flex-wrap flex md:flex-row flex-col gap-[25px] md:gap-[20px] justify-center pt-[6px]">
          {currentSkits.map((skit) => (
              <VideoCard key={skit.id} watch={watch} content={skit}/>
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center flex-row gap-2 mt-[10px] mb-[40px]">
          {Array.from({ length: Math.ceil(allSkits.length / skitsPerPage) }, (_, i) => (
            <button key={i} onClick={() => paginate(i + 1)} className={`w-[50px] rounded-[3px] text-[19px] py-1 ${currentPage === i + 1 ? 'bg-transparent border-1 border-green-600 text-green-800' : 'bg-green-600 hover:bg-green-900 text-white'}`}>{i + 1}</button>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default SkitsPage;