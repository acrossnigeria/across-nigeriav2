import { set } from 'lodash';
import React, { useState } from 'react';
import PaystackBtn from '../../components/PaystackBtn';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Loader from '@/components/Loader';
import Link from 'next/link';
import Close from '../../../public/images/icon/Close';
import Quiz from '@/components/giveawayquiz/Quiz';

const questions = [
  {
    question: `What is the name of the Nigerian movie industry?`,
    options: ['A. Bollywood', 'B. Hollywood', 'C. Nollywood', 'D. Ghollywood'],
    answer: 3, // Index of the correct answer option
  },
  // ... add more questions here
];
const quizSession = ( { state }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFinalAnswer, setshowFinalAnswer] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [Congratulations, setCongratulations] = useState(false);

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

  const newData = { name:session?.user.name?? null, userId:session?.user._id?? null, email:session?.user.email?? null};

  const paySuccesAction = async (ref) => {
    const oldData = {...newData, referencePay:ref.reference}
    
    if (selectedAnswer === question.answer) {
      const data = {...oldData, correctAnswer:true}
      await axios.post('/api/quiz', data);
    } else{
      const data = {...oldData, correctAnswer:false}
      await axios.post('/api/quiz', data);
    }
    setIsChecked(false)
    setShowTerms(false)
    setCongratulations(true)   
  }
      
  
  const question = questions[currentQuestion];

  return (
    <Quiz/>
  )

};
quizSession.auth = true;
export default quizSession;
