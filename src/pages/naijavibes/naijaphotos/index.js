import Layout from '@/components/Layout';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Sample content for demonstration
const contentMap = [
 {
  slug:"naijaFaces",
  title:"Faces"},
{slug:"showdem",title:"Show Dem"},
{slug:"lookingood", title: "Looking Good"},
{slug:"scenes",title:"Scenes"}
];

export default function Home() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [content, setContent] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortedSkits, setSortedSkits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const skitsPerPage = 5;
  const router =useRouter();
  const {cat}=router.query;
useEffect(() => {
    if (cat) {
     handleOptionClick(cat);
      setContent(contentMap.find(item => item.slug === cat));
      clearQueryParams();
    }
  }, []);
  useEffect(() => {
    // Sort the skits based on the votes property
    if (data){const sorted = data.slice().sort((a, b) => b.votes - a.votes);
    setSortedSkits(sorted);}
  }, [data]);
  
  // Get current skits
  const indexOfLastSkit = currentPage * skitsPerPage;
  const indexOfFirstSkit = indexOfLastSkit - skitsPerPage;
  const currentSkits = sortedSkits.slice(indexOfFirstSkit, indexOfLastSkit);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setContent(contentMap.find(item => item.slug === option));
  };
  const clearQueryParams = () => {
    router.replace(router.pathname); // Replace current URL with the same URL (effectively removing query parameters)
  };

  useEffect(() => {
    setData(null)
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/naijavibes/getVibes", { params: { 'fileType': "photos", 'subcategory': selectedOption } });
        console.log("selected option is:", selectedOption)
        setData(response.data);
        console.log(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedOption) {
      fetchData();
    }
  }, [selectedOption]);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <Layout><div className='flex-1'>
      <div className="flex justify-between py-4 px-20">
      <div className="flex items-center"> {/* Div on the left */}
      <Link className="text-white bg-yellow-700 px-4 py-2 rounded-md" href="/naijavibes/"> Back</Link>
        
      </div>
      <div className="flex items-center"> {/* Div on the right */}
        <Link className="text-white bg-green-700 px-4 py-2 rounded-md" href="/naijavibes/upload" >Get involved</Link>
      </div>
    </div>
      <div className="flex h-screen">
        {/* Left side menu */}
        <div className="bg-gray-200 w-1/4 p-4">
          <h1 className="text-xl font-bold mb-4">Picture Options</h1>
          <ul>
            {contentMap.map((item, index) => (
             <div key={index}>
              <li  className="cursor-pointer mb-2" onClick={() => handleOptionClick(item.slug)}>
                {item.title}
              </li></div> 
            ))}
          </ul>
        </div>

        {/* Main content */}
        <div className="flex-1 p-4">
          <h1 className="text-xl font-bold mb-4">{content ? content.title : "Select an option"}</h1>
        {loading?(<div className="bg-gray-100 font-black p-4"> Loading from Database, Please wait....</div>):(<div className="bg-gray-100 p-4">
          {currentSkits.length>1?(currentSkits.map((item,index)=>(
            <div key={index}><Link href={`/naijavibes/naijaphotos/${item._id}`}> <Image alt={item.description} width={60} height={60} src={item.url} /> 
          <p >{item.title}</p></Link>
          </div> 
          ))):<p>No Content Found</p> }
            {error && <p>Error: {error.message}</p>}
          </div>)}
        
         
        </div>
        
      </div><div className="flex justify-center my-4">
        {Array.from({ length: Math.ceil(sortedSkits.length / skitsPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)} className={`mx-1 py-1 px-3 ${currentPage === i + 1 ? 'bg-gray-500 text-white' : 'bg-gray-200'}`}>{i + 1}</button>
        ))}
      </div></div>
    </Layout>
  );
}
