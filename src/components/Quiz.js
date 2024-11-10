import { set } from 'lodash';
import React, { useState } from 'react';
import PaystackBtn from './PaystackBtn';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';

const questions = [
  {
    question: `What is the name of the Nigerian movie industry?`,
    options: ['A) Bollywood', 'B) Hollywood', 'C) Nollywood', 'D) Ghollywood'],
    answer: 3, // Index of the correct answer option
  },
  // ... add more questions here
];
const Quiz = () => {
   const router=useRouter();
  const { data: session } = useSession();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFinalAnswer, setshowFinalAnswer] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const[Congratulations, setCongratulations]=useState(false)



  const handleOptionClick = (index) => {
    setSelectedAnswer(index);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      if (currentQuestion === questions.length - 1) {
        setshowFinalAnswer(true); // Show terms on final question
      } else {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null); // Reset selected answer for next question
      }
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
    const newData={name:session?.user.name?? null, userId:session?.user._id?? null,email:session?.user.email?? null}
      const paySuccesAction= async(ref)=>{
       const oldData={...newData,referencePay:ref.reference}
   
        if(selectedAnswer===question.answer){
         const data={...oldData, correctAnswer:true}
          await axios.post('/api/quiz',data);
          }else{
             const data={...oldData, correctAnswer:false}
           await axios.post('/api/quiz',data);
          }
       setIsChecked(false)
       setShowTerms(false)
       setCongratulations(true)
      
      }
      
  
  const question = questions[currentQuestion];

  return (
    <div className="flex mx-auto flex-col space-y-4 p-4 md:w-[600px] ">
      <div className="bg-gray-200 p-4 md:h-[100px] w-full rounded-md">
        <h2 className="text-3xl font-bold">{question.question}</h2>
      </div>
      <ul className="space-y-2 md:w-[350px]">
        {question.options.map((option, index) => (
          <li
            key={index}
            className={`p-2 rounded-md cursor-pointer hover:bg-gray-300 ${
              selectedAnswer === index ? 'bg-green-600 text-white' : ''
            }`}
            onClick={() => handleOptionClick(index)}
          >
            {option}
          </li>
        ))}
      </ul>
      <button className="py-2 px-4 bg-yellow-600  md:w-20 text-white rounded-md disabled:bg-gray-400 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2
       focus:ring-blue-400 disabled:cursor-not-allowed" disabled={selectedAnswer === null} onClick={handleNext}>
       submit
      </button>
      {showFinalAnswer && (
        <div className="fixed inset-0 bg-gray-500/50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-md shadow-md">
            <p>Is option <span className='italic font-semibold'>{question.options[selectedAnswer]}</span> your final answer?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700
               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400" onClick={() => handleFinalAnswer(true)}>
                Yes
              </button>
              <button className="py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" onClick={() => handleFinalAnswer(false)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
      
       {showTerms && (
        <div className="fixed transform ease-in-out duration-1000 inset-0 bg-gray-500/50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md shadow-md">
            <p>Please accept our terms and conditions to submit your answer.</p>
           
            <label htmlFor="terms">{session?.user?.name} to participate, you must accept our terms and conditions</label>
            <div className='flex mx-auto'>
            <button className="py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 mt-4" onClick={() =>setShowTerms(false)}>
                Back
              </button>
              <button className="py-2 right-1 mx-10 px-4 bg-green-700 text-white rounded-md hover:bg-gray-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 mt-4" onClick={() =>setIsChecked(true)}>
               Accept Our Terms 
              </button></div>
            {isChecked&&(<PaystackBtn pay={paySuccesAction} 
            amount={100} email={session?.user.email?? null} 
            purpose="Payment for Giveaway Quiz"/>)}
           </div>

        </div>
      )}
                          {Congratulations && (
                    <div className="transform ease-in-out duration-1000 fixed inset-0 bg-gray-500/50 flex justify-center items-center z-50">
                      <div className="bg-white p-4 rounded-md shadow-md">
                        <p className='font-semibold text-lg'>Thank you <span className='font-bold'>{session?.user.name}</span> for participating in the quiz, Kindly wait for our quiz draw, Winners will be contacted</p>
                        <div className="flex justify-end space-x-2 mt-4">
                          <div className="border-yellow-500 border h-fit py-1 w-40 rounded-lg cursor-pointer bg-green-700 text-white text-xl
     font-semibold italic mx-auto text-center" onClick={()=>{router.push('/')}}>
                         Click Here to continue
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

    </div>
  );
};

export default Quiz;
