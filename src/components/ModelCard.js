import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useReducer, useState } from 'react';
import { getError } from '../../utils/error';
import axios from 'axios';


function reducer(state, action) {
  switch (action.type) {
     case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
}
const PersonCard = ({ imageUrl, name, age, occupation }) => {
 
 const [data, setData] = useState([]);
 const [{loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading:false,
      error: '',
    });
     useEffect(() => {
    setData([]);
    const fetchData = async () => {
      try {
       dispatch({type:'UPLOAD_REQUEST'});
        const response = await axios.get("/api/booking/booking", {params:{param:'show'}});
        console.log(response.data)
     setData(response.data);
    } catch (error) {
      dispatch({ type: 'UPDATE_FAIL' });
    } finally {
      dispatch({ type: 'UPLOAD_SUCCESS' });
    }
    console.log('Data is:',data)
  };
  fetchData();
}, []);
 
  return (
    <div>
   { data.map((shoutout)=>(<div key={shoutout._id}  className="flex flex-1 items-center lg:px-44 mx-auto space-x-4">
    <div className="relative w-96 h-80">
        <Image
          src={shoutout.mediaUrl}
          alt={shoutout.name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className='grid md:pl-32 grid-cols-1'>
        <h2 className="text-xl font-bold">{shoutout.name}</h2>
        <p className='font-semibold'>{`Age: ${shoutout?.age?? ""}`}</p>
        <p className='font-semibold'>{`Occupation: ${shoutout?.occupation?? ""}`}</p>
        <div className="bg-gray-100 border-l-4 border-gray-500 text-gray-700 p-2">
  <p className="text-lg font-bold mb-4 italic">{`"${shoutout.shoutOut}"`}</p>
  <p className="text-sm">-{shoutout.name}</p>
</div><Link className='underline mt-8 text-green-500' href="/shoutout/booking">Make a shout Out</Link>

      </div>
       
    </div>)) }
    </div>
  );
};

export default PersonCard;