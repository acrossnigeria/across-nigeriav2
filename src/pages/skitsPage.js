import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react';
import db from '../../utils/db';
import Skits from '@/models/Skits';
import SkitDisp from '@/components/SkitDisp';
import { useRouter } from 'next/router';
import Link from 'next/link';

const prototype = [
  { name: 'aliman', }
]

export default function SkitsPage({ skits }) {
  const router = useRouter();
  const [display, setDisplay] = useState(false);
  const [url, setUrl] = useState("");
  const [sortedSkits, setSortedSkits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const skitsPerPage = 20;

  useEffect(() => {
    // Sort the skits based on the votes property
    const sorted = skits.slice().sort((a, b) => b.votes - a.votes);
    setSortedSkits(sorted);
  }, [skits]);

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
              {/* {currentSkits.map((skit, index) => (
                <div className='bg-white rounded-[5px] md:w-[300px] h-[70px]' key={index}>
                  <span className='text-left px-3'>{skit.title}</span>
                  <span className='text-left px-3'>{skit?.name ?? "No Name"}</span>
                </div>
              ))} */}
                <div className='bg-white rounded-[30px] flex flex-row justify-between px-[20px] items-center shadow-md shadow-green-600 w-full md:w-[300px] h-[60px]'>
                  <div className='flex flex-row gap-2'>
                    <div className='w-[45px] h-[45px] border-1 border-black rounded-[50%]'></div>
                    <div className='flex flex-col'>
                      <span className='text-left px-3 w-[100%] text-[12px] '>{'Guy laughing hard enough to burst his stomach'.slice(0, 25) + '...'}</span>
                      <span className='text-left px-3 text-[14px] font-bold text-green-700'>alimam</span>
                    </div>
                  </div>
                  <span className='text-[35px] text-[#ffd700] font-extrabold'>1</span>
                </div>

                <div className='bg-white rounded-[30px] flex flex-row justify-between px-[20px] items-center shadow-md shadow-green-600 w-full md:w-[300px] h-[60px]'>
                  <div className='flex flex-row gap-2'>
                    <div className='w-[45px] h-[45px] border-1 border-black rounded-[50%]'></div>
                    <div className='flex flex-col'>
                      <span className='text-left px-3 w-[100%] text-[12px] '>{'Guy laughing hard enough to burst his stomach'.slice(0, 25) + '...'}</span>
                      <span className='text-left px-3 text-[14px] font-bold text-green-700'>alimam</span>
                    </div>
                  </div>
                  <span className='text-[35px] text-blue-600 font-extrabold'>2</span>
                </div>

                <div className='bg-white rounded-[30px] flex flex-row justify-between px-[20px] items-center shadow-md shadow-green-600 w-full md:w-[300px] h-[60px]'>
                  <div className='flex flex-row gap-2'>
                    <div className='w-[45px] h-[45px] border-1 border-black rounded-[50%]'></div>
                    <div className='flex flex-col'>
                      <span className='text-left px-3 w-[100%] text-[12px] '>{'Guy laughing hard enough to burst his stomach'.slice(0, 25) + '...'}</span>
                      <span className='text-left px-3 text-[14px] font-bold text-green-700'>alimam</span>
                    </div>
                  </div>
                  <span className='text-[35px] text-green-500 font-extrabold'>3</span>
                </div>   
              </div>

          <div className='mt-3 bg-black/20 text-white p-2 rounded-[20px]'>
            <div className='w-full flex flex-row items-center gap-3 rounded-[15px] px-2 py-1 border-b-1 border-b-black'>
              <span className='font-bold'>4</span>
              <div className='h-[20px] w-[20px] border-1 border-black rounded-[50%]'></div>
              <span className='font-bold text-[14px]'>Aliman</span>
              <span className='text-[13px]'>Guy eating ground nut</span>
            </div> 
            
            <div className='w-full flex flex-row items-center px-2 gap-3 py-1'>
              <span className='font-bold'>5</span>
              <div className='h-[20px] w-[20px] border-1 border-black rounded-[50%]'></div>
              <span className='font-bold text-[14px]'>Aliman</span>
              <span className='text-[13px]'>Guy eating ground nut</span>
            </div> 
          </div>
         
        </div>
        <h2 className="text-[22px] mt-4 mb-2 font-extrabold">All Skits</h2>
        <div className="border-t-1 border-t-black flex md:flex-row flex-col md:justify-evenly justify-center p-[5%] rounded-[20px] md:p-[15px]">
          {currentSkits.map((skit) => (
            <div key={skit._id} onClick={() => setUrl(skit.url)}>
              <SkitDisp watch={watch} content={skit} link={`/skits/${skit._id}`}/>
            </div>
          ))}
            <div className="mb-5 flex flex-col justify-center items-center sm:h-[350px] h-[400px] sm:w-[200px] w-full bg-gradient-to-r from-black/80 to-black/30 rounded-[15px]">
               <span className='text-[20px] font-extrabold text-white'>Click to add a skit</span>
            </div>
        </div>
        {/* Pagination */}
        <div className="flex justify-center my-4">
          {Array.from({ length: Math.ceil(sortedSkits.length / skitsPerPage) }, (_, i) => (
            <button key={i} onClick={() => paginate(i + 1)} className={`mx-1 py-1 px-3 ${currentPage === i + 1 ? 'bg-gray-500 text-white' : 'bg-gray-200'}`}>{i + 1}</button>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const skits = await Skits.find({}).lean();
  await db.disconnect()
  return {
    props: {
      skits: skits.map(db.convertDocToObj),
    },
  };
}
