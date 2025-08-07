import { useState } from 'react';
import sgImage from "../../../../../public/images/squid-game.jpg";
import Image from 'next/image';
import Close from '../../../../../public/images/icon/Close';
import Button from '@/components/ui/Button';
import ProcessLoader from '@/components/ui/ProcessLoader';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Success from '@/pages/account/registration-success';
import SuccessCard from '@/components/ui/SuccessCard';
import ErrorCard from '@/components/ui/ErrorCard';
import { useRouter } from 'next/router';

export default function SquidGameEntryPage( { setUserValidated }) {
  const [ showModal, setShowModal ] = useState(false);
  const [ entryCode, setEntryCode ] = useState('');
  const [ isValidatingCode, setIsValidatingCode ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ showErrorMessage, setShowErrorMessage ] = useState(false);
  const [ validationSuccess, setValidationSuccess ] = useState(false);

  const router = useRouter();
  const { data:session } = useSession();

  const handleError = ( error ) => {
    setErrorMessage(error);
    setShowErrorMessage(true);
  }

  const validateCode = async (e) => {
    e.preventDefault();

    if ( entryCode === '' ) {
        handleError('Invalid input, please enter a code');
        return;
    }

    if ( entryCode.length > 12 || entryCode.length < 12 ) {
        handleError('Invalid code, please enter the 12 character code that was given to you during registration');
        return;
    }

    try {
        setIsValidatingCode(true);
        const data = { userId: session?.user?._id, entryCode };

        const response = await axios.post('/api/squid_game/validateCode', data );
        setValidationSuccess(true);
        if ( response?.data?.success ) {
            setValidationSuccess(true);

            setTimeout(() => {
                router.push('/collaborations/squid-game#top');
                setUserValidated(2)
            }, 2000);
        }

    } catch (error) {
        handleError(error?.response?.data.message);
        setIsValidatingCode(false);
    }
  }

  return (
    <div className="h-fit bg-transparent flex flex-col items-center justify-start md:px-0 px-3 pt-[15px] pb-[50px]">
      {/* Hero Section */}
      <div className="max-w-6xl md:w-[600px] w-full bg-white rounded-[7px] shadow-xl border border-pink-200 overflow-hidden flex flex-col">
        
        {/* Flyer Image */}
        <div className="relative md:h-[250px] h-[180px] flex flex-col">
          <Image fill src={sgImage} className="w-full h-full object-cover" />
          <div className='absolute md:h-[250px] h-[180px] w-full bg-gradient-to-b from-transparent to-black/50'></div>
        </div>

        {/* Game Info */}
        <div className="p-6 flex flex-col justify-center">
          <h1 className="md:text-3xl text-4xl font-extrabold text-pink-600 mb-3">Online Squid Game 2</h1>
          
          <p className="text-gray-700 mb-2 font-medium">
            A collaboration between <span className="text-pink-500 font-bold">Across Nigeria Reality Show</span> & <span className="text-indigo-500 font-bold">Kidmiel BOT</span>.
          </p>

          <p className="text-gray-600 text-sm mb-4">
            Experience one of the most exciting online game challenges ever held. This season, only one of the stages will be held on this platform. Will you survive it?
          </p>

          <p className="text-sm text-gray-500 mb-6">
            Registration runs from <strong>June 13</strong> to <strong>July 8</strong>. After payment via WhatsApp, enter the unique code provided to access the online stage.
          </p>

          <button
            className="bg-gray-400 text-white py-3 px-6 rounded-[5px] font-semibold transition duration-300"
          >
            Submit Entry Code
          </button>
        </div>
      </div>

      {/* Entry Code Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center flex-col pt-[150px] justify-start z-50">
          <div className="bg-white rounded-[5px] shadow-xl p-4 w-[92%] md:w-[350px] max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              <Close size={'15px'} bg={'black'}/>
            </button>

            <h2 className="text-[22px] text-pink-600 font-bold text-center mb-2">Enter Your Code</h2>
            <p className="text-sm text-center text-gray-600 mb-6">
              Enter the code provided to you on WhatsApp after payment. The code can only be used once.
            </p>
            <SuccessCard className={'mt-2'} showSuccess={validationSuccess} message={'Code validated and submitted Successfully. please wait..'}/>
            <ErrorCard className={'mt-2'} setShowError={setShowErrorMessage} showError={showErrorMessage} error={errorMessage}/>

            <form onSubmit={validateCode} className="space-y-4">
              <input
                type="text"
                placeholder="e.g. SQUID250001"
                value={entryCode}
                onChange={ (e)=>{ setShowErrorMessage(false); setEntryCode(e.target.value) } }
                className="w-full px-4 py-2 rounded-[5px] bg-gray-100 border-1 border-gray-300 focus:outline-none focus:ring-1 focus:ring-pink-400"
              />
                <Button disabled={isValidatingCode} type='submit' size={'md'} bg={'bg-pink-600 hover:bg-pink-700'} className='w-full'>
                    { isValidatingCode ? <ProcessLoader/> : "Submit Entry Code"}
                </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
