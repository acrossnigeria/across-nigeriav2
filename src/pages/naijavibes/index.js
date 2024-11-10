import Layout from '@/components/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const vids=[{
  slug:"tweTwe",
  title:"Twe Twe",
  description:"Some Description"},
{slug:"musik",title:"Musik", description:"Some Description"},
{slug:"dance", title: "Dance",description:"Some Description"},
{slug:"skitsPranks",title:"Skits & Pranks",description:"Some Description"
},];
const pics=[{
  slug:"naijaFaces",
  title:"FACES",},
{slug:"showdem",
 title:"SHOW DEM"},
 {slug:"lookingood",
 title:"LOOKING GOOD"
},
{slug:"scenes",
 title:"SCENES"
},
];

const Index = () => {
  const [selectedSection, setSelectedSection] = useState(null);
 const router=useRouter()
  const handleVideoClick = () => {
    setSelectedSection('videos');
  };

  const handlePictureClick = () => {
    setSelectedSection('pictures');
  };

  return (
    <Layout>
      <div className='mx-5 lg:mx-10 py-4 my-0 bg-gray-400 h-screen'>
      <div className='cursor-pointer px-6 py-4 mt-4 font-semibold mb-6 bg-green-700 w-fit ml-10 rounded-xl'>
        <Link href="naijavibes/upload" >Get Involved</Link>
      </div>
      <div
        className={`font-bold text-lg px-4 py-4 text-center mx-auto rounded-md mb-2 
        w-60 cursor-pointer transition-transform transform hover:scale-105 ${selectedSection === 'videos' ? 
        'bg-yellow-700' : 'bg-gray-200'}`}
        onClick={handleVideoClick}
      >
         {selectedSection === 'videos'?(<Link href="naijavibes/naijavideos/"> NaijaVibes Videos</Link>):(<p>NaijaVibes Videos </p>)}

             
      {/* Render respective lists based on selected section */}
      {selectedSection === 'videos' && (
        <div className=" transform transition-all ease-in-out duration-3000 flex bg-yellow-700 flex-col items-center w-fit mx-auto mb-8">
                  <ul>
            {vids.map(({ slug, title }) => (
        <li
          key={slug}
          className="bg-yellow-700 border-b-2 border-gray-300 transition-colors duration-150 hover:bg-gray-300"
          onClick={() => router.push(`naijavibes/naijavideos/?cat=${slug}`)}
        >
          {title}
        </li>
      ))} </ul>
        </div>
      )}</div>
      <div
        className={`cursor-pointer font-bold text-lg px-4 py-4 mx-auto rounded-md text-center mb-2 w-60
        transition-transform transform hover:scale-105 ${selectedSection === 'pictures' ? 'bg-yellow-700' : 'bg-gray-200'}`}
        onClick={handlePictureClick}
      >
        {selectedSection === 'pictures'?(<Link className=' cursor-pointer' href="naijavibes/naijaphotos/">NaijaVibes Pictures</Link>):(<p className=' cursor-pointer'> NaijaVibes Pictures</p>)}

      
      {/* Render respective lists based on selected section */}
      {selectedSection === 'pictures' && (
        <div className="transform transition-all ease-in-out duration-3000  flex bg-yellow-700 flex-col items-center  w-fit px-2 py-0 mx-auto mb-8">
          <p></p>
          <ul>
            {pics.map(({ slug, title }) => (
        <li
          key={slug}
          className="bg-yellow-700 w-full border-b-2 border-gray-300 cursor-pointer transition-colors duration-150 hover:bg-gray-300"
          onClick={() => router.push(`naijavibes/naijaphotos/?cat=${slug}`)}
        >
          {title}
        </li>
      ))}
          </ul>
        </div>
      )}</div>
      </div>
    </Layout>
  );
}

export default Index;
