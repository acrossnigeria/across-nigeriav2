import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react';
import db from '../../utils/db';
import Skits from '@/models/Skits';
import SkitDisp from '@/components/SkitDisp';
import { useRouter } from 'next/router';
import Link from 'next/link';

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
      <div className='cursor-pointer flex ml-5 mt-10 w-fit bg-yellow-700 text-white px-4 py-1 rounded-md'>
        <Link href="/upload">Click Here to participate</Link>
      </div>
      <h2 className="h2 my-4">Latest Skits</h2>
      <div className="px-10 grid grid-cols-3 gap-4 md:grid-cols-5 lg:grid-cols-4">
        {currentSkits.map((skit) => (
          <div key={skit._id} onClick={() => setUrl(skit.url)}>
            <SkitDisp watch={watch} content={skit} link={`/skits/${skit._id}`}/>
          </div>
        ))}
      </div>
      {/* <div className='mx-auto w-3/4'>
        <p className='font-bold text-xl underline mb-4 w-fit'><span className='shadow-md shadow-gray-600'>Leader Board</span></p>
        <table>
          <thead>
            <tr>
              <th className='text-left px-1' >Title</th>
              <th className='text-left px-2'>Creator</th>
            </tr>
          </thead>
          <tbody>
            {currentSkits.map((skit, index) => (
              <tr key={index}>
                <td className='text-left px-3'>{skit.title}</td>
                <td className='text-left px-3'>{skit?.name ?? "No Name"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      {/* Pagination */}
      <div className="flex justify-center my-4">
        {Array.from({ length: Math.ceil(sortedSkits.length / skitsPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)} className={`mx-1 py-1 px-3 ${currentPage === i + 1 ? 'bg-gray-500 text-white' : 'bg-gray-200'}`}>{i + 1}</button>
        ))}
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
