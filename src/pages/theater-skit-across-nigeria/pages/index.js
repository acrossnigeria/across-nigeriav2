import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react';
import VideoCard from '@/components/VideoCard';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import TopSkitCard from '@/components/TopSkitCard';
import VideoIcon from '../../../../public/images/icon/VideoIcon';

const prototype = [
  { title: 'dancing dog', description:'a video of a dog dancing happily', _id:1, votes:6 },
  { title: 'dead man', description:'a video of a dog dancing happily', _id:2, votes:21 },
  { title: 'dancing dog', description:'a video of a dog dancing happily', _id:3, votes:9 },
  { title: 'dancing dog', description:'a video of a dog dancing happily', _id:4, votes:25 },
  { title: 'dancing dog', description:'a video of a dog dancing happily', _id:5, votes:34 },
  { title: 'guy laughing', description:'a video of a dog dancing happily', _id:6, votes:1 },
  { title: 'dancing dog', description:'a video of a dog dancing happily', _id:7, votes:0 },
  { title: 'running faster than your shadow', description:'a video of a dog dancing happily', _id:8, votes:34 },
  { title: 'dancing dog', description:'a video of a dog dancing happily', _id:9, votes:12 },
  { title: 'funny old guy', description:'a video of a dog dancing happily', _id:10, votes:24 },
  { title: 'african masqurade', description:'a video of a dog dancing happily', _id:11, votes:13 },
  { title: 'dancing dog', description:'a video of a dog dancing happily', _id:12, votes:5 },
]

export default function SkitsPage() {
  const router = useRouter();
  const [display, setDisplay] = useState(false);
  const [ allSkits, setAllSkits ] = useState([]);
  const [sortedSkits, setSortedSkits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ oneUser, setOneUser ] = useState(null);
  const [ twoUser, setTwoUser ] = useState(null);
  const [ threeUser, setThreeUser ] = useState(null);
  const [ fourUser, setFourUser ] = useState(null);
  const [ fiveUser, setFiveUser ] = useState(null);
  const [ currentSkits, setCurrentSkits ] = useState([]);
  const skitsPerPage = 15;

  // loaders states
  const [ isGettingSkits, setIsGettingSkits ] = useState(true);

  const sortSkitByVotes = ( list ) => {
    const sorted = list.slice().sort((a, b) => b.votes - a.votes);
    setSortedSkits(sorted);
    setOneUser(sorted[0]);
    setTwoUser(sorted[1]);
    setThreeUser(sorted[2]);
    setFourUser(sorted[3]);
    setFiveUser(sorted[4]);
    getCurrentSkit(list);
  }

  const getCurrentSkit = (list) => {
      // Get current skits
    const sorted = list.slice().sort((a, b) => b.votes - a.votes);
    const indexOfLastSkit = currentPage * skitsPerPage;
    const indexOfFirstSkit = indexOfLastSkit - skitsPerPage;
    setCurrentSkits(sorted.slice(indexOfFirstSkit, indexOfLastSkit));
  }

  const watch = () => {
    setDisplay(true);
  };

  const getAllSkits = async () => {
    setAllSkits(prototype);
    sortSkitByVotes(prototype);
  }
  
  useEffect(() => {
    getAllSkits();
  }, [])

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <div className='ml-[3%] mr-[3%] md:ml-[5%] md:mr-[5%] mt-3'>
        <Link href="/upload" className='cursor-pointer mb-2 w-fit hover:bg-green-200 bg-tranparent border-2 flex flex-row justify-center items-center border-green-700 text-green-700 px-4 h-[40px] rounded-[30px]'>
          <span>Click Here to participate</span>
        </Link>
        <div className='w-full flex flex-col bg-gradient-to-t from-green-800 to-green-400 px-2 pb-2 rounded-[10px]'>
          <div className='text-white font-bold text-center text-[20px]'>Leader Board</div>
          <div className='mt-2 flex flex-row flex-wrap gap-2 justify-center'>
            <TopSkitCard strUrl={oneUser?.url} exist={oneUser?true:false} votes={oneUser?.votes} position={1} name={oneUser?.name} description={oneUser?.description}/>
            <TopSkitCard strUrl={twoUser?.url} exist={twoUser?true:false} votes={twoUser?.votes} position={2} name={twoUser?.name} description={twoUser?.description}/>
            <TopSkitCard strUrl={threeUser?.url} exist={threeUser?true:false} votes={threeUser?.votes} position={3} name={threeUser?.name} description={threeUser?.description}/>
          </div>
          <div className='mt-3 bg-black/20 text-white p-2 rounded-[20px]'>
            <div className='w-full flex flex-row items-center gap-3 px-2 py-2 border-b-1 border-b-black'>
              <span className='font-bold'>4</span>
              <VideoIcon/>
              <span className='font-bold text-[14px]'>{fourUser?(fourUser.votes>0 ? fourUser.name:''):''}</span>
              <span className='text-[13px]'>{fourUser?(fourUser.votes>0 ? (fourUser.description.slice(0, 40) + '...'):'Position empty'):'Position empty'}</span>
            </div> 
            
            <div className='w-full flex flex-row items-center px-2 gap-3 py-2'>
              <span className='font-bold'>5</span>
              <VideoIcon/>
              <span className='font-bold text-[14px]'>{fiveUser?(fiveUser.votes>0 ? fiveUser.name:''):''}</span>
              <span className='text-[13px]'>{fiveUser?(fiveUser.votes>0 ? (fiveUser.description.slice(0, 40) + '...'):'Position empty'):'Position empty'}</span>
            </div> 
          </div>
         
        </div>
        <h2 className="text-[20px] mt-4 mb-2 font-bold">All Skits</h2>
        <div className="flex-wrap flex md:flex-row flex-col md:justify-start gap-[65px] justify-center pt-[6px]">
          {currentSkits.map((skit) => (
              <VideoCard key={skit._id} watch={watch} content={skit} link={`/skits/${skit._id}`}/>
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center my-4 mt-[80px] mb-[80px]">
          {Array.from({ length: Math.ceil(sortedSkits.length / skitsPerPage) }, (_, i) => (
            <button key={i} onClick={() => paginate(i + 1)} className={`mx-1 rounded-[3px] text-[19px] py-1 px-3 ${currentPage === i + 1 ? 'bg-transparent border-1 border-green-600 text-green-800' : 'bg-green-600 hover:bg-green-900 text-white'}`}>{i + 1}</button>
          ))}
        </div>
      </div>
    </Layout>
  );
}

