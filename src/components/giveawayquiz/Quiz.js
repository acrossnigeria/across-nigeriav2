import { set } from 'lodash';
import React, { useState } from 'react';
import PaystackBtn from '../PaystackBtn';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Loader from '@/components/Loader';
import Link from 'next/link';
import Close from '../../../public/images/icon/Close';
import CycleLoader from '../CycleLoader';
import Money from '../../../public/images/icon/Money';

const question = {
    question: `Which language is the official language of Nigeria?`,
    options: ['A. Yoruba', 'B. Hausa', 'C. English', 'D. Igbo'],
    answer: 2, // Index of the correct answer option
  }
const Quiz = ( { state }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFinalAnswer, setshowFinalAnswer] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [Congratulations, setCongratulations] = useState(false);
  const [ showLoader, setShowLoader ] = useState(false);

  const handleOptionClick = (index) => {
    setSelectedAnswer(index);
    console.log(selectedAnswer, question.answer)
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      setshowFinalAnswer(true); // Show terms on final question
    }
  };

  const handleFinalAnswer = (accepted) => {
    setshowFinalAnswer(false);
     if (accepted) {
      setShowTerms(true)
          } else {
      // Handle returning to question page
      setCurrentQuestion(currentQuestion);
    }
  };

  const newData = { name:session?.user.name?? null, userId:session?.user._id?? null, email:session?.user.email?? null};

  const paySuccesAction = async (ref) => {
    const oldData = {...newData, referencePay:ref.reference}
    setShowLoader(true);
    console.log(selectedAnswer, question.answer)
    
    if (selectedAnswer === question.answer) {
      const data = {...oldData, correctAnswer:true}
      await axios.post('/api/quiz', data);
    } else{
      const data = {...oldData, correctAnswer:false}
      await axios.post('/api/quiz', data);
    }
    setIsChecked(false)
    setShowTerms(false)
    setShowLoader(false)
    setCongratulations(true)   
  }

  return (
    <div className='flex flex-col justify-center'>
      <div className={`${showLoader?'':'hidden'} h-screen w-screen flex flex-col gap-2 fixed top-0 right-0 z-[5000] justify-center items-center bg-gray-100`}><CycleLoader/><span className='font-bold text-[20px] text-green-700 animate-pulse flex flex-row gap-2'>Giveaway Quizzes <Money/></span></div>
        <div className={`flex bg-gradient-to-br from-green-400 to-green-800 h-screen mx-auto flex-col space-y-4 w-[100%] ${state} `}>
        <Loader/>
        <div className='flex flex-row justify-end px-8 py-3'>
            <Link className='bg-white w-[50px] rounded-[50%] flex flex-row justify-center items-center h-[50px]' href={'/giveaway-quiz'}><Close/></Link> 
        </div>
        <div className='bg-white md:w-[500px] w-[95%] self-center p-4 flex flex-col items-center rounded-[20px]'>
            <div className="md:p-4 p-2 md:h-[100px] w-full rounded-md">
                <h2 className="text-2xl font-bold">{question.question}</h2>
            </div> 

            <ul className="space-y-4 w-[350px] flex flex-col justify-center items-center mt-[20px]">
                { question.options.map((option, index) => (
                <li key={index} className={`p-4 rounded-[30px] md:w-[100%] w-[90%] cursor-pointer md:hover:scale-105 ${selectedAnswer === index ? 'bg-green-700 text-white border-none':'border-green-700 border-1'}`} onClick={() => handleOptionClick(index)} >
                    {option}
                </li>
                )) }
            </ul>
        </div>

        <button className="py-4 self-center w-[95%] bg-orange-600 border-white border-1 md:w-[fit-content] md:px-[100px] text-white rounded-[30px] disabled:bg-transparent hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 disabled:cursor-not-allowed" disabled={selectedAnswer === null} onClick={handleNext}>
        SUBMIT
        </button>

        {showFinalAnswer && (
            <div className="fixed top-[-20px] inset-0 bg-gray-500/50 flex justify-center items-center z-[1000]">
                <div className="bg-white p-4 text-[19px] rounded-[20px] shadow-md">
                    <p>Is option <span className='italic font-semibold'>{question.options[selectedAnswer]}</span> your final answer?</p>
                    <div className="flex justify-between mt-4">
                    <button className="h-[49px] text-[19px] px-4 bg-transparent text-green-700 rounded-[15px] border-2 border-green-700 hover:border-none hover:bg-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" onClick={() => handleFinalAnswer(false)}>
                        No
                    </button>
                    <button className="h-[49px] text-[19px] px-4 bg-green-700 text-white rounded-[15px] hover:bg-transparent hover:border-2 hover:border-green-700 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400" onClick={() => handleFinalAnswer(true)}>
                        Yes
                    </button>
                    </div>
                </div>
            </div>
        )}
        
        {showTerms && (
            <div className="fixed top-[-20px] transform ease-in-out duration-1000 inset-0 bg-gray-500/50 flex justify-center items-center">
            <div className="bg-white text-[19px] p-2 w-[95%] md:w-[fit-content] rounded-[20px] shadow-md">
                <p>Please accept our terms and conditions to submit your answer.</p>
                <label htmlFor="terms">{session?.user?.name} to participate, you must accept our terms and conditions</label>
                <div className='flex flex-row justify-between'>
                <button className="h-[49px] text-[19px] px-4 border-2 border-green-700 bg-transparent text-green-700 rounded-[15px] hover:bg-green-700 hover:text-white hover:border-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 mt-4" onClick={() =>setShowTerms(false)}>
                    Back
                </button>
                <button className="h-[49px] text-[19px] px-4 bg-green-700 text-white rounded-[15px] hover:bg-transparent hover:border-2 hover:border-green-700 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 mt-4" onClick={() =>setIsChecked(true)}>
                Accept Our Terms 
                </button>
                </div>

                {isChecked&&(<PaystackBtn pay={paySuccesAction} amount={100} email={session?.user.email?? null} purpose="Payment for Giveaway Quiz"/>)}
            </div>

            </div>
        )}

        {Congratulations && (
            <div className="transform top-[-20px] ease-in-out duration-1000 fixed inset-0 bg-gray-500/50 flex justify-center items-center z-50">
            <div className="bg-white h-screen w-screen flex justify-center items-center flex-col p-4 rounded-md shadow-md">
                <p className='font-semibold text-[18px] text-center'>Thank you <span className='font-bold'>{session?.user.name}</span> for participating in the quiz, Kindly wait for our quiz draw, Winners will be contacted</p>
                <div className="flex flex-row w-[80%] md:w-[500px] mt-4 justify-around">
                  <button className="border-1 hover:bg-green-300 border-green-700 h-[48px] px-[10px] rounded-[30px] cursor-pointer bg-transparent text-green-700 text-[17px]  font-semibold" onClick={()=>{router.push('/giveaway-quiz')}}>
                      Back home
                  </button>
                  <button className="border-1 hover:bg-green-900 h-[48px] px-[10px] rounded-[30px] cursor-pointer bg-green-700 text-white text-[17px]  font-semibold" onClick={()=>{setCongratulations(false)}}>
                      Play Again
                  </button>
                </div>
            </div>
            </div>
        )}

        </div>
    </div>
  );
};

export default Quiz;
