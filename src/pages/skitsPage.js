import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react';
import db from '../../utils/db';
import Skits from '@/models/Skits';
import SkitDisp from '@/components/SkitDisp';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getSession } from 'next-auth/react';
import CreatorIcon from '../../public/images/icon/CreatorIcon';
import Image from 'next/image';
import TopSkitCard from '@/components/TopSkitCard';
import VideoIcon from '../../public/images/icon/VideoIcon';

const prototype = [
  { name: 'aliman', }
]

export default function SkitsPage({ skits, user }) {
  const router = useRouter();
  const [display, setDisplay] = useState(false);
  const [sortedSkits, setSortedSkits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ oneUser, setOneUser ] = useState(null);
  const [ twoUser, setTwoUser ] = useState(null);
  const [ threeUser, setThreeUser ] = useState(null);
  const [ fourUser, setFourUser ] = useState(null);
  const [ fiveUser, setFiveUser ] = useState(null);
  const skitsPerPage = 15;

  useEffect(() => {
    // Sort the skits based on the votes property
    const sorted = skits.slice().sort((a, b) => b.votes - a.votes);
    setSortedSkits(sorted);
    setOneUser(sorted[0]);
    setTwoUser(sorted[1]);
    setThreeUser(sorted[2]);
    setFourUser(sorted[3]);
    setFiveUser(sorted[4]);
  }, [skits]);
  console.log(sortedSkits);

  // Get current skits
  const indexOfLastSkit = currentPage * skitsPerPage;
  const indexOfFirstSkit = indexOfLastSkit - skitsPerPage;
  const currentSkits = sortedSkits.slice(indexOfFirstSkit, indexOfLastSkit);

  const watch = () => {
    setDisplay(true);
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <div className='ml-[3%] mr-[3%] md:ml-[5%] md:mr-[5%] mt-3'>
        <Link href="/upload" className='cursor-pointer flex mb-2 w-fit hover:bg-green-200 bg-tranparent border-2 flex flex-row justify-center items-center border-green-700 text-green-700 px-4 h-[40px] rounded-[30px]'>
          <span>Click Here to participate</span>
        </Link>
        <div className='w-full flex flex-col bg-gradient-to-t from-green-800 to-green-400 px-2 pb-2 rounded-[30px]'>
          <div className='text-white font-bold text-center text-[22px]'>Leader Board</div>
          <div className='mt-2 flex flex-row flex-wrap gap-2 justify-center'>
            <TopSkitCard strUrl={oneUser?.url} exist={oneUser?true:false} votes={oneUser?.votes} position={1} name={oneUser?.name} description={oneUser?.description}/>
            <TopSkitCard strUrl={twoUser?.url} exist={twoUser?true:false} votes={twoUser?.votes} position={2} name={twoUser?.name} description={twoUser?.description}/>
            <TopSkitCard strUrl={threeUser?.url} exist={threeUser?true:false} votes={threeUser?.votes} position={3} name={threeUser?.name} description={threeUser?.description}/>
          </div>
          <div className='mt-3 bg-black/20 text-white p-2 rounded-[20px]'>
            <div className='w-full flex flex-row items-center gap-3 rounded-[15px] px-2 py-1 border-b-1 border-b-black'>
              <span className='font-bold'>4</span>
              <VideoIcon/>
              <span className='font-bold text-[14px]'>{fourUser?(fourUser.votes>0 ? fourUser.name:''):''}</span>
              <span className='text-[13px]'>{fourUser?(fourUser.votes>0 ? (fourUser.description.slice(0, 40) + '...'):'Position empty'):'Position empty'}</span>
            </div> 
            
            <div className='w-full flex flex-row items-center px-2 gap-3 py-1'>
              <span className='font-bold'>5</span>
              <VideoIcon/>
              <span className='font-bold text-[14px]'>{fiveUser?(fiveUser.votes>0 ? fiveUser.name:''):''}</span>
              <span className='text-[13px]'>{fiveUser?(fiveUser.votes>0 ? (fiveUser.description.slice(0, 40) + '...'):'Position empty'):'Position empty'}</span>
            </div> 
          </div>
         
        </div>
        <h2 className="text-[22px] mt-4 mb-2 font-extrabold">All Skits</h2>
        <div className="border-t-1 border-t-black flex-wrap flex md:flex-row flex-col md:justify-start gap-4 justify-center p-[5%] rounded-[20px] md:p-[15px]">
          {currentSkits.map((skit) => (
              <SkitDisp key={skit.id} watch={watch} content={skit} link={`/skits/${skit._id}`}/>
          ))}
            <button onClick={()=>{router.push('/upload')}} className={`${user?'':'hidden'} mb-5 flex flex-col justify-center items-center hover:opacity-70 sm:h-[280px] h-[400px] sm:w-[190px] w-full bg-gradient-to-br from-gray-400 to-gray-200 rounded-[15px]`}>
               <span className='text-[14px] font-extrabold text-white'>Click to add a skit</span>
               <CreatorIcon/>
            </button>
        </div>
        {/* Pagination */}
        <div className="flex justify-center my-4">
          {Array.from({ length: Math.ceil(sortedSkits.length / skitsPerPage) }, (_, i) => (
            <button key={i} onClick={() => paginate(i + 1)} className={`mx-1 rounded-[3px] text-[19px] py-1 px-3 ${currentPage === i + 1 ? 'bg-transparent border-1 border-green-600 text-green-800' : 'bg-green-600 hover:bg-green-900 text-white'}`}>{i + 1}</button>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const user = session?.user;

  await db.connect();
  const skits = await Skits.find({}).lean();
  await db.disconnect();
  return {
    props: {
      skits: skits.map(db.convertDocToObj),
      user
    },
  };
}
